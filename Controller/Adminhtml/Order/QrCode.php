<?php
/**
 * AFD PCE QR Code Controller
 *
 * Generates QR code images server-side for Precision Delivery locations
 * Uses endroid/qr-code library bundled with Magento's TwoFactorAuth module
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Controller\Adminhtml\Order;

use Afd\Pce\Helper\PrecisionDelivery;
use Afd\Pce\Model\OrderAddressMapDataRepository;
use Magento\Backend\App\Action;
use Magento\Backend\App\Action\Context;
use Magento\Framework\Controller\Result\RawFactory;
use Magento\Framework\Exception\NoSuchEntityException;
use Magento\Sales\Api\OrderRepositoryInterface;
use Psr\Log\LoggerInterface;

class QrCode extends Action
{
    /**
     * Authorization level
     */
    const ADMIN_RESOURCE = 'Magento_Sales::sales';

    /**
     * @var OrderRepositoryInterface
     */
    private $orderRepository;

    /**
     * @var OrderAddressMapDataRepository
     */
    private $mapDataRepository;

    /**
     * @var PrecisionDelivery
     */
    private $precisionDeliveryHelper;

    /**
     * @var RawFactory
     */
    private $resultRawFactory;

    /**
     * @var LoggerInterface
     */
    private $logger;

    /**
     * Constructor
     *
     * @param Context $context
     * @param OrderRepositoryInterface $orderRepository
     * @param OrderAddressMapDataRepository $mapDataRepository
     * @param PrecisionDelivery $precisionDeliveryHelper
     * @param RawFactory $resultRawFactory
     * @param LoggerInterface $logger
     */
    public function __construct(
        Context $context,
        OrderRepositoryInterface $orderRepository,
        OrderAddressMapDataRepository $mapDataRepository,
        PrecisionDelivery $precisionDeliveryHelper,
        RawFactory $resultRawFactory,
        LoggerInterface $logger
    ) {
        parent::__construct($context);
        $this->orderRepository = $orderRepository;
        $this->mapDataRepository = $mapDataRepository;
        $this->precisionDeliveryHelper = $precisionDeliveryHelper;
        $this->resultRawFactory = $resultRawFactory;
        $this->logger = $logger;
    }

    /**
     * Execute action
     *
     * @return \Magento\Framework\Controller\Result\Raw
     */
    public function execute()
    {
        $result = $this->resultRawFactory->create();
        
        try {
            $orderId = (int)$this->getRequest()->getParam('order_id');
            $size = (int)$this->getRequest()->getParam('size', 150);
            
            if (!$orderId) {
                throw new \InvalidArgumentException('Order ID is required');
            }
            
            // Limit size to reasonable bounds
            $size = max(50, min(500, $size));
            
            // Get order and shipping address
            $order = $this->orderRepository->get($orderId);
            $shippingAddress = $order->getShippingAddress();
            
            if (!$shippingAddress) {
                throw new NoSuchEntityException(__('No shipping address found'));
            }
            
            // Get map data for shipping address
            $mapData = $this->mapDataRepository->getByParentId((int)$shippingAddress->getId());
            
            $lat = $mapData->getSelectedLat();
            $lng = $mapData->getSelectedLng();
            
            if (!$lat || !$lng) {
                throw new NoSuchEntityException(__('No coordinates found'));
            }
            
            // Generate Google Maps URL
            $googleMapsUrl = $this->precisionDeliveryHelper->getGoogleMapsUrl((float)$lat, (float)$lng);
            
            // Generate QR code using endroid/qr-code (bundled with Magento's TwoFactorAuth)
            $qrImageData = $this->generateQrCode($googleMapsUrl, $size);
            
            if (!$qrImageData) {
                throw new \RuntimeException('QR code generation failed');
            }
            
            // Return the image
            $result->setHeader('Content-Type', 'image/png');
            $result->setHeader('Cache-Control', 'public, max-age=86400');
            $result->setContents($qrImageData);
            
        } catch (NoSuchEntityException $e) {
            // Return a 1x1 transparent PNG for missing data
            $result->setHeader('Content-Type', 'image/png');
            $result->setContents(base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='));
        } catch (\Exception $e) {
            $this->logger->error('[AFD PCE QrCode] Error generating QR code: ' . $e->getMessage());
            // Return a 1x1 transparent PNG on error
            $result->setHeader('Content-Type', 'image/png');
            $result->setContents(base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='));
        }
        
        return $result;
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
                    margin: 10,
                    roundBlockSizeMode: \Endroid\QrCode\RoundBlockSizeMode::Margin
                );
                return $builder->build()->getString();
            } catch (\Throwable $e) {
                $this->logger->error('[AFD PCE QrCode] v6 API failed: ' . $e->getMessage());
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
                    ->margin(10)
                    ->roundBlockSizeMode(new \Endroid\QrCode\RoundBlockSizeMode\RoundBlockSizeModeMargin())
                    ->build();
                return $result->getString();
            } catch (\Throwable $e) {
                $this->logger->error('[AFD PCE QrCode] v4 Builder API failed: ' . $e->getMessage());
            }
        }

        $this->logger->error('[AFD PCE QrCode] No compatible endroid/qr-code version found');
        return null;
    }
}
