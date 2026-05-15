<?php
/**
 * AFD PCE Precision Delivery Helper
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Helper;

use Magento\Framework\App\Helper\AbstractHelper;
use Magento\Framework\App\Helper\Context;
use Magento\Store\Model\ScopeInterface;
use Magento\Framework\Encryption\EncryptorInterface;
use Magento\Store\Model\StoreManagerInterface;
use Psr\Log\LoggerInterface;

/**
 * Class PrecisionDelivery
 * 
 * Helper class for Precision Delivery configuration settings
 */
class PrecisionDelivery extends AbstractHelper
{
    const XML_PATH_ENABLED = 'afd_typeahead/precision_delivery/enabled';
    const XML_PATH_GOOGLE_MAPS_API_KEY = 'afd_typeahead/precision_delivery/google_maps_api_key';
    const XML_PATH_INSTRUCTION_TEXT = 'afd_typeahead/precision_delivery/instruction_text';
    const XML_PATH_DEFAULT_ZOOM = 'afd_typeahead/precision_delivery/default_zoom';
    const XML_PATH_DEFAULT_MAP_TYPE = 'afd_typeahead/precision_delivery/default_map_type';
    const XML_PATH_POINTER_IMAGE = 'afd_typeahead/precision_delivery/pointer_image';
    const XML_PATH_ENABLE_DISTANCE_WARNING = 'afd_typeahead/precision_delivery/enable_distance_warning';
    const XML_PATH_WARNING_THRESHOLD_URBAN = 'afd_typeahead/precision_delivery/warning_threshold_urban';
    const XML_PATH_WARNING_THRESHOLD_RURAL = 'afd_typeahead/precision_delivery/warning_threshold_rural';
    const XML_PATH_TRIGGER_WARNING_STOREFRONT = 'afd_typeahead/precision_delivery/trigger_warning_storefront';
    const XML_PATH_WARNING_MESSAGE = 'afd_typeahead/precision_delivery/warning_message';
    const XML_PATH_ENABLE_QR_CODE = 'afd_typeahead/precision_delivery/enable_qr_code';
    const XML_PATH_DISPLAY_IN_PACKINGSLIP = 'afd_typeahead/precision_delivery/display_in_packingslip';
    const XML_PATH_DISPLAY_STATIC_MAP_ORDER = 'afd_typeahead/precision_delivery/display_static_map_order';
    const XML_PATH_DISPLAY_STATIC_MAP_SHIPMENT = 'afd_typeahead/precision_delivery/display_static_map_shipment';
    const XML_PATH_ENABLE_DELIVERY_NOTES = 'afd_typeahead/precision_delivery/enable_delivery_notes';
    const XML_PATH_DELIVERY_NOTES_PLACEHOLDER = 'afd_typeahead/precision_delivery/delivery_notes_placeholder';
    const XML_PATH_DISPLAY_ON_SUCCESS_PAGE = 'afd_typeahead/precision_delivery/display_on_success_page';
    const XML_PATH_METADATA_ENABLED = 'afd_typeahead/metadata/enabled';

    /**
     * @var EncryptorInterface
     */
    private $encryptor;

    /**
     * @var StoreManagerInterface
     */
    private $storeManager;

    /**
     * @var LoggerInterface
     */
    private $logger;

    /**
     * Constructor
     *
     * @param Context $context
     * @param EncryptorInterface $encryptor
     * @param StoreManagerInterface $storeManager
     * @param LoggerInterface $logger
     */
    public function __construct(
        Context $context,
        EncryptorInterface $encryptor,
        StoreManagerInterface $storeManager,
        LoggerInterface $logger
    ) {
        parent::__construct($context);
        $this->encryptor = $encryptor;
        $this->storeManager = $storeManager;
        $this->logger = $logger;
    }

    /**
     * Check if Precision Delivery is enabled
     *
     * @param int|null $storeId
     * @return bool
     */
    public function isEnabled($storeId = null): bool
    {
        // Precision Delivery requires metadata to be enabled
        $metadataEnabled = (bool)$this->scopeConfig->getValue(
            self::XML_PATH_METADATA_ENABLED,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );

        if (!$metadataEnabled) {
            return false;
        }

        return (bool)$this->scopeConfig->getValue(
            self::XML_PATH_ENABLED,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );
    }

    /**
     * Get Google Maps API Key (decrypted)
     *
     * @param int|null $storeId
     * @return string
     */
    public function getGoogleMapsApiKey($storeId = null): string
    {
        $encryptedKey = $this->scopeConfig->getValue(
            self::XML_PATH_GOOGLE_MAPS_API_KEY,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );

        if ($encryptedKey) {
            return $this->encryptor->decrypt($encryptedKey);
        }

        return '';
    }

    /**
     * Get instruction text
     *
     * @param int|null $storeId
     * @return string
     */
    public function getInstructionText($storeId = null): string
    {
        return (string)$this->scopeConfig->getValue(
            self::XML_PATH_INSTRUCTION_TEXT,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );
    }

    /**
     * Get default zoom level
     *
     * @param int|null $storeId
     * @return int
     */
    public function getDefaultZoom($storeId = null): int
    {
        $zoom = $this->scopeConfig->getValue(
            self::XML_PATH_DEFAULT_ZOOM,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );

        return $zoom ? (int)$zoom : 17;
    }

    /**
     * Get default map type
     *
     * @param int|null $storeId
     * @return string
     */
    public function getDefaultMapType($storeId = null): string
    {
        $mapType = $this->scopeConfig->getValue(
            self::XML_PATH_DEFAULT_MAP_TYPE,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );

        return $mapType ?: 'roadmap';
    }

    /**
     * Get custom pointer image URL
     *
     * @param int|null $storeId
     * @return string|null
     */
    public function getPointerImageUrl($storeId = null): ?string
    {
        $image = $this->scopeConfig->getValue(
            self::XML_PATH_POINTER_IMAGE,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );

        if ($image) {
            try {
                $mediaUrl = $this->storeManager->getStore()->getBaseUrl(\Magento\Framework\UrlInterface::URL_TYPE_MEDIA);
                return $mediaUrl . 'afd/precision_delivery/' . $image;
            } catch (\Exception $e) {
                $this->logger->error('Error getting pointer image URL: ' . $e->getMessage());
            }
        }

        return null;
    }

    /**
     * Check if distance warning is enabled
     *
     * @param int|null $storeId
     * @return bool
     */
    public function isDistanceWarningEnabled($storeId = null): bool
    {
        return (bool)$this->scopeConfig->getValue(
            self::XML_PATH_ENABLE_DISTANCE_WARNING,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );
    }

    /**
     * Get warning threshold for urban addresses (in meters)
     *
     * @param int|null $storeId
     * @return int
     */
    public function getWarningThresholdUrban($storeId = null): int
    {
        $threshold = $this->scopeConfig->getValue(
            self::XML_PATH_WARNING_THRESHOLD_URBAN,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );

        return $threshold ? (int)$threshold : 150;
    }

    /**
     * Get warning threshold for rural addresses (in meters)
     *
     * @param int|null $storeId
     * @return int
     */
    public function getWarningThresholdRural($storeId = null): int
    {
        $threshold = $this->scopeConfig->getValue(
            self::XML_PATH_WARNING_THRESHOLD_RURAL,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );

        return $threshold ? (int)$threshold : 750;
    }

    /**
     * Check if storefront warning is enabled
     *
     * @param int|null $storeId
     * @return bool
     */
    public function isStorefrontWarningEnabled($storeId = null): bool
    {
        return $this->isDistanceWarningEnabled($storeId) && (bool)$this->scopeConfig->getValue(
            self::XML_PATH_TRIGGER_WARNING_STOREFRONT,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );
    }

    /**
     * Get warning message with placeholder support
     *
     * @param int|null $storeId
     * @return string
     */
    public function getWarningMessage($storeId = null): string
    {
        $message = $this->scopeConfig->getValue(
            self::XML_PATH_WARNING_MESSAGE,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );

        return $message ?: 'The distance selected on the map from the original search location is {distance}m, are you sure this is the correct delivery location?';
    }

    /**
     * Check if QR code generation is enabled
     *
     * @param int|null $storeId
     * @return bool
     */
    public function isQrCodeEnabled($storeId = null): bool
    {
        return (bool)$this->scopeConfig->getValue(
            self::XML_PATH_ENABLE_QR_CODE,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );
    }

    /**
     * Check if Precision Delivery should be displayed in packing slip PDF
     *
     * @param int|null $storeId
     * @return bool
     */
    public function isDisplayInPackingSlipEnabled($storeId = null): bool
    {
        return (bool)$this->scopeConfig->getValue(
            self::XML_PATH_DISPLAY_IN_PACKINGSLIP,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );
    }

    /**
     * Check if static map should be displayed in admin order view
     *
     * @param int|null $storeId
     * @return bool
     */
    public function isDisplayStaticMapOrderEnabled($storeId = null): bool
    {
        return (bool)$this->scopeConfig->getValue(
            self::XML_PATH_DISPLAY_STATIC_MAP_ORDER,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );
    }

    /**
     * Check if static map should be displayed in admin shipment view
     *
     * @param int|null $storeId
     * @return bool
     */
    public function isDisplayStaticMapShipmentEnabled($storeId = null): bool
    {
        return (bool)$this->scopeConfig->getValue(
            self::XML_PATH_DISPLAY_STATIC_MAP_SHIPMENT,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );
    }

    /**
     * Check if delivery notes collection is enabled
     *
     * @param int|null $storeId
     * @return bool
     */
    public function isDeliveryNotesEnabled($storeId = null): bool
    {
        return (bool)$this->scopeConfig->getValue(
            self::XML_PATH_ENABLE_DELIVERY_NOTES,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );
    }

    /**
     * Check if Precision Delivery should be displayed on the checkout success/confirmation page
     *
     * @param int|null $storeId
     * @return bool
     */
    public function isDisplayOnSuccessPageEnabled($storeId = null): bool
    {
        return (bool)$this->scopeConfig->getValue(
            self::XML_PATH_DISPLAY_ON_SUCCESS_PAGE,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );
    }

    /**
     * Get delivery notes placeholder text
     *
     * @param int|null $storeId
     * @return string
     */
    public function getDeliveryNotesPlaceholder($storeId = null): string
    {
        $placeholder = $this->scopeConfig->getValue(
            self::XML_PATH_DELIVERY_NOTES_PLACEHOLDER,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );

        return $placeholder ?: 'Any specific delivery information?';
    }

    /**
     * Get the appropriate warning threshold based on urban/rural classification
     *
     * @param string $urbanRural
     * @param int|null $storeId
     * @return int
     */
    public function getWarningThreshold($urbanRural, $storeId = null): int
    {
        if (strtolower($urbanRural) === 'rural') {
            return $this->getWarningThresholdRural($storeId);
        }

        return $this->getWarningThresholdUrban($storeId);
    }

    /**
     * Check if distance exceeds threshold
     *
     * @param float $distance
     * @param string $urbanRural
     * @param int|null $storeId
     * @return bool
     */
    public function isDistanceExceedsThreshold($distance, $urbanRural, $storeId = null): bool
    {
        if (!$this->isDistanceWarningEnabled($storeId)) {
            return false;
        }

        $threshold = $this->getWarningThreshold($urbanRural, $storeId);
        return $distance > $threshold;
    }

    /**
     * Generate Google Maps URL for a location
     *
     * @param string $lat
     * @param string $lng
     * @return string
     */
    public function getGoogleMapsUrl($lat, $lng): string
    {
        return sprintf(
            'https://www.google.com/maps/search/?api=1&query=%s,%s',
            urlencode((string)$lat),
            urlencode((string)$lng)
        );
    }

    /**
     * Generate Static Maps URL for an image
     *
     * @param string $lat
     * @param string $lng
     * @param int $width
     * @param int $height
     * @param int|null $zoom
     * @param int|null $storeId
     * @return string
     */
    public function getStaticMapUrl($lat, $lng, $width = 400, $height = 300, $zoom = null, $storeId = null): string
    {
        $apiKey = $this->getGoogleMapsApiKey($storeId);
        $zoom = $zoom ?? $this->getDefaultZoom($storeId);
        $mapType = $this->getDefaultMapType($storeId);

        return sprintf(
            'https://maps.googleapis.com/maps/api/staticmap?center=%s,%s&zoom=%d&size=%dx%d&maptype=%s&markers=color:red%%7C%s,%s&key=%s',
            $lat,
            $lng,
            $zoom,
            $width,
            $height,
            $mapType,
            $lat,
            $lng,
            $apiKey
        );
    }

    /**
     * Get all configuration as array for frontend
     *
     * @param int|null $storeId
     * @return array
     */
    public function getConfigArray($storeId = null): array
    {
        return [
            'enabled' => $this->isEnabled($storeId),
            'apiKey' => $this->getGoogleMapsApiKey($storeId),
            'instructionText' => $this->getInstructionText($storeId),
            'defaultZoom' => $this->getDefaultZoom($storeId),
            'defaultMapType' => $this->getDefaultMapType($storeId),
            'pointerImageUrl' => $this->getPointerImageUrl($storeId),
            'enableDistanceWarning' => $this->isDistanceWarningEnabled($storeId),
            'warningThresholdUrban' => $this->getWarningThresholdUrban($storeId),
            'warningThresholdRural' => $this->getWarningThresholdRural($storeId),
            'triggerWarningStorefront' => $this->isStorefrontWarningEnabled($storeId),
            'warningMessage' => $this->getWarningMessage($storeId),
            'enableQrCode' => $this->isQrCodeEnabled($storeId),
            'enableDeliveryNotes' => $this->isDeliveryNotesEnabled($storeId),
            'deliveryNotesPlaceholder' => $this->getDeliveryNotesPlaceholder($storeId),
        ];
    }
}
