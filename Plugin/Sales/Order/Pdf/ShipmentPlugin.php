<?php
/**
 * AFD PCE Shipment PDF Plugin
 *
 * Adds Precision Delivery information to the packing slip PDF
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Plugin\Sales\Order\Pdf;

use Afd\Pce\Helper\PrecisionDelivery;
use Afd\Pce\Model\OrderAddressMapDataRepository;
use Magento\Framework\Exception\NoSuchEntityException;
use Magento\Sales\Model\Order\Pdf\Shipment;
use Psr\Log\LoggerInterface;

class ShipmentPlugin
{
    /**
     * @var PrecisionDelivery
     */
    private $precisionDeliveryHelper;

    /**
     * @var OrderAddressMapDataRepository
     */
    private $mapDataRepository;

    /**
     * @var LoggerInterface
     */
    private $logger;

    /**
     * Constructor
     *
     * @param PrecisionDelivery $precisionDeliveryHelper
     * @param OrderAddressMapDataRepository $mapDataRepository
     * @param LoggerInterface $logger
     */
    public function __construct(
        PrecisionDelivery $precisionDeliveryHelper,
        OrderAddressMapDataRepository $mapDataRepository,
        LoggerInterface $logger
    ) {
        $this->precisionDeliveryHelper = $precisionDeliveryHelper;
        $this->mapDataRepository = $mapDataRepository;
        $this->logger = $logger;
    }

    /**
     * After get PDF - add precision delivery info to each page
     *
     * @param Shipment $subject
     * @param \Zend_Pdf $result
     * @param array $shipments
     * @return \Zend_Pdf
     */
    public function afterGetPdf(Shipment $subject, $result, $shipments = [])
    {
        if (!$this->precisionDeliveryHelper->isEnabled() || !$this->precisionDeliveryHelper->isDisplayInPackingSlipEnabled()) {
            return $result;
        }

        try {
            foreach ($shipments as $shipment) {
                $order = $shipment->getOrder();
                $shippingAddress = $order->getShippingAddress();

                if (!$shippingAddress) {
                    continue;
                }

                try {
                    $mapData = $this->mapDataRepository->getByParentId((int)$shippingAddress->getId());
                } catch (NoSuchEntityException $e) {
                    continue;
                }

                if (!$mapData->getSelectedLat() || !$mapData->getSelectedLng()) {
                    continue;
                }

                // Get the last page and current Y position from the PDF renderer
                $page = end($result->pages);
                if (!$page) {
                    continue;
                }

                // Calculate total height needed for precision delivery section
                // Header (15) + message (15) + map (~176) + URL (10) + padding (15) = ~231
                $pageWidth = $page->getWidth();
                $leftMargin = 35;
                $contentWidth = $pageWidth - (2 * $leftMargin);
                $mapWidth = (int)($contentWidth * 0.5);
                $mapHeight = (int)($mapWidth * 0.65);
                $sectionHeight = $mapHeight + 60;

                // Check if there's enough space below the items on the current page
                // $subject->y is where the item list ended; we need sectionHeight below that
                $currentY = $subject->y;
                if ($currentY - $sectionHeight < 15) {
                    // Not enough space — add a new page
                    $page = $subject->newPage();
                    $currentY = $subject->y; // Reset to 800 (top of new page)
                }

                $this->addPrecisionDeliveryToPdf($page, $mapData, $subject, $currentY);
            }
        } catch (\Exception $e) {
            $this->logger->error('[AFD PCE] Error adding Precision Delivery to PDF: ' . $e->getMessage());
        }

        return $result;
    }

    /**
     * Add precision delivery information to PDF page
     *
     * @param \Zend_Pdf_Page $page
     * @param \Afd\Pce\Api\Data\MapDataInterface $mapData
     * @param Shipment $shipment
     * @param int $startY Y position to start drawing from
     * @return void
     */
    private function addPrecisionDeliveryToPdf($page, $mapData, $shipment, $startY)
    {
        $font = \Zend_Pdf_Font::fontWithName(\Zend_Pdf_Font::FONT_HELVETICA);
        $fontBold = \Zend_Pdf_Font::fontWithName(\Zend_Pdf_Font::FONT_HELVETICA_BOLD);

        $lat = $mapData->getSelectedLat();
        $lng = $mapData->getSelectedLng();
        $googleMapsUrl = $this->precisionDeliveryHelper->getGoogleMapsUrl((float)$lat, (float)$lng);

        // Calculate layout - map on left (50% width ~270pt), info on right
        $pageWidth = $page->getWidth(); // ~612pt for letter/A4
        $leftMargin = 35;
        $contentWidth = $pageWidth - (2 * $leftMargin); // ~542pt
        $mapWidth = (int)($contentWidth * 0.5); // 50% width ~271pt
        $mapHeight = (int)($mapWidth * 0.65); // Maintain aspect ratio ~176pt
        $qrSize = 80; // Bigger QR code
        $rightColumnX = $leftMargin + $mapWidth + 15;

        // Start drawing below the item list with some padding
        $yPosition = $startY - 20;

        // Draw section header spanning full width
        $page->setFont($fontBold, 10);
        $page->drawText(__('Precision Delivery Information'), $leftMargin, $yPosition);
        $yPosition -= 15;

        // Add recipient message
        $page->setFont($font, 9);
        $page->drawText(__('The recipient has provided a precise drop-off location for this delivery'), $leftMargin, $yPosition);
        $yPosition -= 15;
        
        // Draw static map image on the left
        // Note: Per Google Maps ToS, we fetch the image at generation time (not cached)
        $mapImageDrawn = $this->drawStaticMap($page, (float)$lat, (float)$lng, $leftMargin, $yPosition, $mapWidth, $mapHeight);
        
        // Draw text info on the right side of the map
        $textY = $yPosition - 5;
        $page->setFont($font, 9);

        // Draw delivery coordinates
        $page->drawText((string)__('Coordinates: %1, %2', $lat, $lng), $rightColumnX, $textY);
        $textY -= 12;

        // Draw adjusted status
        if ($mapData->getIsAdjusted()) {
            $page->drawText(__('Location Adjusted: Yes'), $rightColumnX, $textY);
            $textY -= 12;

            $distance = (float)$mapData->getDistanceFromAddress();
            if ($distance > 0) {
                $formattedDistance = $distance < 1000
                    ? round($distance) . ' m'
                    : round($distance / 1000, 2) . ' km';
                $page->drawText(__('Distance from Address: %1', $formattedDistance), $rightColumnX, $textY);
                $textY -= 12;
            }
        } else {
            $page->drawText(__('Location Adjusted: No'), $rightColumnX, $textY);
            $textY -= 12;
        }

        // Draw urban/rural classification
        $urbanRural = $mapData->getUrbanRural();
        if ($urbanRural) {
            $page->drawText((string)__('Area Type: %1', ucfirst($urbanRural)), $rightColumnX, $textY);
            $textY -= 12;
        }

        // Draw QR code to the right of the map, below the text info
        if ($this->precisionDeliveryHelper->isQrCodeEnabled()) {
            // Position QR code below the text, aligned with right column
            $qrY = $textY - 10; // Start below the last text line
            $this->drawQrCode($page, $googleMapsUrl, $rightColumnX, $qrY, $qrSize);
        }

        // Draw Google Maps URL below the map
        $urlY = $yPosition - $mapHeight - 10;
        $page->setFont($font, 7);
        $page->drawText(__('Maps: %1', $googleMapsUrl), $leftMargin, $urlY);

        // Draw delivery notes if present
        $deliveryNotes = $mapData->getDeliveryNotes();
        if (!empty($deliveryNotes)) {
            $notesY = $urlY - 15;
            $page->setFont($fontBold, 9);
            $page->drawText(__('Delivery Instructions:'), $leftMargin, $notesY);
            $notesY -= 12;

            $page->setFont($font, 9);
            foreach ($this->wordWrapText((string)$deliveryNotes, 90) as $line) {
                $page->drawText($line, $leftMargin, $notesY);
                $notesY -= 12;
            }
        }
    }

    /**
     * Word-wrap a string into lines of at most $width characters
     *
     * @param string $text
     * @param int $width
     * @return string[]
     */
    private function wordWrapText(string $text, int $width): array
    {
        $lines = [];
        foreach (explode("\n", $text) as $paragraph) {
            $words = explode(' ', $paragraph);
            $currentLine = '';
            foreach ($words as $word) {
                if ($currentLine === '') {
                    $currentLine = $word;
                } elseif (strlen($currentLine) + 1 + strlen($word) <= $width) {
                    $currentLine .= ' ' . $word;
                } else {
                    $lines[] = $currentLine;
                    $currentLine = $word;
                }
            }
            if ($currentLine !== '') {
                $lines[] = $currentLine;
            }
        }
        return $lines ?: [''];
    }
    
    /**
     * Draw static map image on PDF page
     * Note: Per Google Maps ToS, images are fetched at generation time and not cached
     *
     * @param \Zend_Pdf_Page $page
     * @param float $lat
     * @param float $lng
     * @param int $x
     * @param int $y
     * @param int $width
     * @param int $height
     * @return bool
     */
    private function drawStaticMap($page, $lat, $lng, $x, $y, $width, $height)
    {
        try {
            // Use zoom level 19 for street-level detail with house numbers
            $staticMapUrl = $this->precisionDeliveryHelper->getStaticMapUrl($lat, $lng, $width * 2, $height * 2, 19);
            
            if (!$staticMapUrl) {
                return false;
            }
            
            // Fetch the image from Google Maps API
            $imageContent = @file_get_contents($staticMapUrl);
            
            if (!$imageContent) {
                $this->logger->warning('[AFD PCE] Could not fetch static map image from Google Maps API');
                return false;
            }
            
            // Create temporary file for the map image
            $tempFile = tempnam(sys_get_temp_dir(), 'map_') . '.png';
            file_put_contents($tempFile, $imageContent);
            
            // Draw the map image on the PDF
            $mapImage = \Zend_Pdf_Image::imageWithPath($tempFile);
            $page->drawImage($mapImage, $x, $y - $height, $x + $width, $y);
            
            // Clean up temp file immediately (not caching per Google ToS)
            @unlink($tempFile);
            
            return true;
            
        } catch (\Exception $e) {
            $this->logger->error('[AFD PCE] Error drawing static map on PDF: ' . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Draw QR code on PDF page
     *
     * @param \Zend_Pdf_Page $page
     * @param string $data
     * @param int $x
     * @param int $y
     * @param int $size
     * @return void
     */
    private function drawQrCode($page, $data, $x, $y, $size = 80)
    {
        try {
            $qrImageData = $this->generateQrCode($data, $size);
            
            if (!$qrImageData) {
                $this->logger->warning('[AFD PCE] QR code generation not available');
                return;
            }
            
            // Create temporary file for the QR code image
            $tempFile = tempnam(sys_get_temp_dir(), 'qr_') . '.png';
            file_put_contents($tempFile, $qrImageData);
            
            // Draw the QR code image on the PDF
            $qrImage = \Zend_Pdf_Image::imageWithPath($tempFile);
            $page->drawImage($qrImage, $x, $y - $size, $x + $size, $y);
            
            // Clean up temp file
            @unlink($tempFile);
            
        } catch (\Exception $e) {
            $this->logger->error('[AFD PCE] Error drawing QR code on PDF: ' . $e->getMessage());
        }
    }

    /**
     * Generate QR code image data
     * Supports endroid/qr-code v4 (Magento 2.4.5-2.4.7) and v6 (Magento 2.4.8+)
     *
     * @param string $data
     * @param int $size
     * @return string|null PNG image data or null on failure
     */
    private function generateQrCode(string $data, int $size): ?string
    {
        // Detect version: v6 Builder constructor accepts named args,
        // v4 Builder constructor accepts no args (fluent API via Builder::create())
        $isV6 = false;
        if (class_exists(\Endroid\QrCode\Builder\Builder::class)) {
            $reflection = new \ReflectionClass(\Endroid\QrCode\Builder\Builder::class);
            $constructor = $reflection->getConstructor();
            $isV6 = $constructor && $constructor->getNumberOfParameters() > 0;
        }

        if ($isV6) {
            try {
                $builder = new \Endroid\QrCode\Builder\Builder(
                    writer: new \Endroid\QrCode\Writer\PngWriter(),
                    writerOptions: [],
                    validateResult: false,
                    data: $data,
                    encoding: new \Endroid\QrCode\Encoding\Encoding('UTF-8'),
                    errorCorrectionLevel: \Endroid\QrCode\ErrorCorrectionLevel::Medium,
                    size: $size,
                    margin: 3,
                    roundBlockSizeMode: \Endroid\QrCode\RoundBlockSizeMode::Margin
                );
                return $builder->build()->getString();
            } catch (\Throwable $e) {
                $this->logger->error('[AFD PCE] QR code v6 API failed: ' . $e->getMessage());
            }
        }

        // v4 fluent builder API (Magento 2.4.5-2.4.7)
        if (class_exists(\Endroid\QrCode\Builder\Builder::class) && method_exists(\Endroid\QrCode\Builder\Builder::class, 'create')) {
            try {
                $result = \Endroid\QrCode\Builder\Builder::create()
                    ->writer(new \Endroid\QrCode\Writer\PngWriter())
                    ->data($data)
                    ->encoding(new \Endroid\QrCode\Encoding\Encoding('UTF-8'))
                    ->errorCorrectionLevel(new \Endroid\QrCode\ErrorCorrectionLevel\ErrorCorrectionLevelMedium())
                    ->size($size)
                    ->margin(3)
                    ->roundBlockSizeMode(new \Endroid\QrCode\RoundBlockSizeMode\RoundBlockSizeModeMargin())
                    ->build();
                return $result->getString();
            } catch (\Throwable $e) {
                $this->logger->error('[AFD PCE] QR code v4 Builder API failed: ' . $e->getMessage());
            }
        }

        $this->logger->error('[AFD PCE] No compatible endroid/qr-code version found');
        return null;
    }
}
