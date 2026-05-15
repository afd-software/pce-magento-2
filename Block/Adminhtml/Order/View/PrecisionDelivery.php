<?php
/**
 * AFD PCE Order Precision Delivery Block
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Block\Adminhtml\Order\View;

use Afd\Pce\Helper\PrecisionDelivery as PrecisionDeliveryHelper;
use Afd\Pce\Model\OrderAddressMapDataRepository;
use Afd\Pce\Model\ResourceModel\OrderAddressMetadata\CollectionFactory as MetadataCollectionFactory;
use Magento\Framework\Exception\NoSuchEntityException;
use Magento\Framework\Serialize\Serializer\Json;
use Magento\Sales\Block\Adminhtml\Order\AbstractOrder;

/**
 * Class PrecisionDelivery
 * 
 * Block for displaying precision delivery map data in admin order view
 */
class PrecisionDelivery extends AbstractOrder
{
    /**
     * @var OrderAddressMapDataRepository
     */
    private $orderAddressMapDataRepository;

    /**
     * @var PrecisionDeliveryHelper
     */
    protected $precisionDeliveryHelper;

    /**
     * @var MetadataCollectionFactory
     */
    private $metadataCollectionFactory;

    /**
     * @var Json
     */
    private $serializer;

    /**
     * @var array|null Cached metadata lat/lng from order address metadata
     */
    private $metadataLatLng = null;

    /**
     * @var bool Flag to indicate if metadata lat/lng has been loaded
     */
    private $metadataLatLngLoaded = false;

    /**
     * @param \Magento\Backend\Block\Template\Context $context
     * @param \Magento\Framework\Registry $registry
     * @param \Magento\Sales\Helper\Admin $adminHelper
     * @param OrderAddressMapDataRepository $orderAddressMapDataRepository
     * @param PrecisionDeliveryHelper $precisionDeliveryHelper
     * @param MetadataCollectionFactory $metadataCollectionFactory
     * @param Json $serializer
     * @param array $data
     */
    public function __construct(
        \Magento\Backend\Block\Template\Context $context,
        \Magento\Framework\Registry $registry,
        \Magento\Sales\Helper\Admin $adminHelper,
        OrderAddressMapDataRepository $orderAddressMapDataRepository,
        PrecisionDeliveryHelper $precisionDeliveryHelper,
        MetadataCollectionFactory $metadataCollectionFactory,
        Json $serializer,
        array $data = []
    ) {
        $this->orderAddressMapDataRepository = $orderAddressMapDataRepository;
        $this->precisionDeliveryHelper = $precisionDeliveryHelper;
        $this->metadataCollectionFactory = $metadataCollectionFactory;
        $this->serializer = $serializer;
        parent::__construct($context, $registry, $adminHelper, $data);
    }

    /**
     * Check if Precision Delivery is enabled
     *
     * @return bool
     */
    public function isEnabled(): bool
    {
        return $this->precisionDeliveryHelper->isEnabled();
    }

    /**
     * Get the shipping address from the order
     *
     * @return \Magento\Sales\Model\Order\Address|null
     */
    public function getShippingAddress()
    {
        $order = $this->getOrder();
        return $order ? $order->getShippingAddress() : null;
    }

    /**
     * Get map data for the shipping address
     *
     * @return \Afd\Pce\Api\Data\MapDataInterface|null
     */
    public function getMapData()
    {
        $address = $this->getShippingAddress();
        
        if (!$address || !$address->getId()) {
            return null;
        }

        try {
            return $this->orderAddressMapDataRepository->getByParentId((int)$address->getId());
        } catch (NoSuchEntityException $e) {
            return null;
        }
    }

    /**
     * Check if map data or metadata lat/lng exists for this order
     *
     * @return bool
     */
    public function hasMapData(): bool
    {
        return $this->getMapData() !== null || $this->getMetadataLatLng() !== null;
    }

    /**
     * Get lat/lng from order address metadata (fallback when no map data exists)
     *
     * @return array|null Array with 'lat', 'lng', and optionally 'urban_rural' keys
     */
    public function getMetadataLatLng(): ?array
    {
        if ($this->metadataLatLngLoaded) {
            return $this->metadataLatLng;
        }

        $this->metadataLatLngLoaded = true;
        $address = $this->getShippingAddress();

        if (!$address || !$address->getId()) {
            return null;
        }

        try {
            // Use collection factory to directly query the metadata table
            $collection = $this->metadataCollectionFactory->create();
            $collection->addFieldToFilter('parent_id', (int)$address->getId());
            $collection->setPageSize(1);
            
            $metadata = $collection->getFirstItem();
            
            if (!$metadata || !$metadata->getId()) {
                return null;
            }
            
            $metadataString = $metadata->getMetadata();

            if (!$metadataString) {
                return null;
            }

            $metadataArray = $this->serializer->unserialize($metadataString);
            $lat = $metadataArray['Latitude'] ?? $metadataArray['latitude'] ?? null;
            $lng = $metadataArray['Longitude'] ?? $metadataArray['longitude'] ?? null;
            $urbanRural = $metadataArray['UrbanRuralCode'] ?? $metadataArray['UrbanRuralName'] ?? null;

            if ($lat && $lng) {
                $this->metadataLatLng = [
                    'lat' => $lat,
                    'lng' => $lng,
                    'urban_rural' => $urbanRural
                ];
                return $this->metadataLatLng;
            }
        } catch (\Exception $e) {
            // Log error but don't break the page
            return null;
        }

        return null;
    }

    /**
     * Get the selected latitude (from map data or metadata fallback)
     *
     * @return string|null
     */
    public function getSelectedLat(): ?string
    {
        $mapData = $this->getMapData();
        if ($mapData) {
            return $mapData->getSelectedLat();
        }

        $metadataLatLng = $this->getMetadataLatLng();
        return $metadataLatLng ? (string)$metadataLatLng['lat'] : null;
    }

    /**
     * Get the selected longitude (from map data or metadata fallback)
     *
     * @return string|null
     */
    public function getSelectedLng(): ?string
    {
        $mapData = $this->getMapData();
        if ($mapData) {
            return $mapData->getSelectedLng();
        }

        $metadataLatLng = $this->getMetadataLatLng();
        return $metadataLatLng ? (string)$metadataLatLng['lng'] : null;
    }

    /**
     * Get the original latitude
     *
     * @return string|null
     */
    public function getOriginalLat(): ?string
    {
        $mapData = $this->getMapData();
        return $mapData ? $mapData->getOriginalLat() : null;
    }

    /**
     * Get the original longitude
     *
     * @return string|null
     */
    public function getOriginalLng(): ?string
    {
        $mapData = $this->getMapData();
        return $mapData ? $mapData->getOriginalLng() : null;
    }

    /**
     * Get the distance from original address
     *
     * @return float|null
     */
    public function getDistanceFromAddress(): ?float
    {
        $mapData = $this->getMapData();
        return $mapData ? (float)$mapData->getDistanceFromAddress() : null;
    }

    /**
     * Check if the delivery point was adjusted
     *
     * @return bool
     */
    public function isAdjusted(): bool
    {
        $mapData = $this->getMapData();
        return $mapData ? $mapData->getIsAdjusted() : false;
    }

    /**
     * Get urban/rural classification (from map data or metadata fallback)
     *
     * @return string|null
     */
    public function getUrbanRural(): ?string
    {
        $mapData = $this->getMapData();
        if ($mapData && $mapData->getUrbanRural()) {
            return $mapData->getUrbanRural();
        }

        $metadataLatLng = $this->getMetadataLatLng();
        return $metadataLatLng ? $metadataLatLng['urban_rural'] : null;
    }

    /**
     * Get the static map image URL
     *
     * @param int $width
     * @param int $height
     * @return string|null
     */
    public function getStaticMapUrl(int $width = 400, int $height = 300): ?string
    {
        $lat = $this->getSelectedLat();
        $lng = $this->getSelectedLng();

        if (!$lat || !$lng) {
            return null;
        }

        return $this->precisionDeliveryHelper->getStaticMapUrl($lat, $lng, $width, $height);
    }

    /**
     * Get the Google Maps URL for the delivery location
     *
     * @return string|null
     */
    public function getGoogleMapsUrl(): ?string
    {
        $lat = $this->getSelectedLat();
        $lng = $this->getSelectedLng();

        if (!$lat || !$lng) {
            return null;
        }

        return $this->precisionDeliveryHelper->getGoogleMapsUrl($lat, $lng);
    }

    /**
     * Check if QR code is enabled
     *
     * @return bool
     */
    public function isQrCodeEnabled(): bool
    {
        return $this->precisionDeliveryHelper->isQrCodeEnabled();
    }

    /**
     * Get QR code image URL (server-side generated)
     *
     * @param int $size
     * @return string|null
     */
    public function getQrCodeUrl(int $size = 150): ?string
    {
        $order = $this->getOrder();
        if (!$order || !$order->getId()) {
            return null;
        }

        $mapData = $this->getMapData();
        if (!$mapData || !$mapData->getSelectedLat() || !$mapData->getSelectedLng()) {
            return null;
        }

        // Generate URL to our server-side QR code controller
        return $this->getUrl('afd_pce/order/qrCode', [
            'order_id' => $order->getId(),
            'size' => $size
        ]);
    }

    /**
     * Format coordinates for display
     *
     * @return string
     */
    public function getFormattedCoordinates(): string
    {
        $lat = $this->getSelectedLat();
        $lng = $this->getSelectedLng();

        if (!$lat || !$lng) {
            return '';
        }

        return sprintf('%s, %s', $lat, $lng);
    }

    /**
     * Format distance for display
     *
     * @return string
     */
    public function getFormattedDistance(): string
    {
        $distance = $this->getDistanceFromAddress();

        if ($distance === null) {
            return '';
        }

        if ($distance >= 1000) {
            return sprintf('%.2f km', $distance / 1000);
        }

        return sprintf('%d m', (int)$distance);
    }

    /**
     * Get delivery notes
     *
     * @return string|null
     */
    public function getDeliveryNotes(): ?string
    {
        $mapData = $this->getMapData();
        return $mapData ? $mapData->getDeliveryNotes() : null;
    }

    /**
     * Check if delivery notes exist
     *
     * @return bool
     */
    public function hasDeliveryNotes(): bool
    {
        $notes = $this->getDeliveryNotes();
        return !empty($notes);
    }

    /**
     * Check if static map should be displayed in order view
     *
     * @return bool
     */
    public function isStaticMapEnabled(): bool
    {
        return $this->precisionDeliveryHelper->isDisplayStaticMapOrderEnabled();
    }
}
