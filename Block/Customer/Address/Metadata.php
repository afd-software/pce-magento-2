<?php
/**
 * AFD PCE Address Metadata Block for Customer Address Edit Form
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Block\Customer\Address;

use Afd\Pce\Helper\AddressMetadata as AddressMetadataHelper;
use Afd\Pce\Helper\PrecisionDelivery as PrecisionDeliveryHelper;
use Afd\Pce\Helper\CleanseOnSubmit as CleanseOnSubmitHelper;
use Afd\Pce\Model\CustomerAddressMetadataFactory;
use Afd\Pce\Model\CustomerAddressMetadataRepository;
use Afd\Pce\Model\CustomerAddressMapDataRepository;
use Magento\Customer\Api\AddressRepositoryInterface;
use Magento\Customer\Model\Session as CustomerSession;
use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\Exception\NoSuchEntityException;
use Magento\Framework\Serialize\Serializer\Json;
use Magento\Framework\View\Element\Template;
use Magento\Framework\View\Element\Template\Context;

class Metadata extends Template
{
    /**
     * @var AddressMetadataHelper
     */
    private $addressMetadataHelper;

    /**
     * @var CustomerAddressMetadataRepository
     */
    private $customerAddressMetadataRepository;

    /**
     * @var CustomerAddressMetadataFactory
     */
    private $customerAddressMetadataFactory;

    /**
     * @var CustomerSession
     */
    private $customerSession;

    /**
     * @var AddressRepositoryInterface
     */
    private $addressRepository;

    /**
     * @var Json
     */
    private $serializer;

    /**
     * @var PrecisionDeliveryHelper
     */
    private $precisionDeliveryHelper;

    /**
     * @var CleanseOnSubmitHelper
     */
    private $cleanseOnSubmitHelper;

    /**
     * @var CustomerAddressMapDataRepository
     */
    private $customerAddressMapDataRepository;

    /**
     * @param Context $context
     * @param AddressMetadataHelper $addressMetadataHelper
     * @param CustomerAddressMetadataRepository $customerAddressMetadataRepository
     * @param CustomerAddressMetadataFactory $customerAddressMetadataFactory
     * @param CustomerSession $customerSession
     * @param AddressRepositoryInterface $addressRepository
     * @param Json $serializer
     * @param PrecisionDeliveryHelper $precisionDeliveryHelper
     * @param CleanseOnSubmitHelper $cleanseOnSubmitHelper
     * @param CustomerAddressMapDataRepository $customerAddressMapDataRepository
     * @param array $data
     */
    public function __construct(
        Context $context,
        AddressMetadataHelper $addressMetadataHelper,
        CustomerAddressMetadataRepository $customerAddressMetadataRepository,
        CustomerAddressMetadataFactory $customerAddressMetadataFactory,
        CustomerSession $customerSession,
        AddressRepositoryInterface $addressRepository,
        Json $serializer,
        PrecisionDeliveryHelper $precisionDeliveryHelper,
        CleanseOnSubmitHelper $cleanseOnSubmitHelper,
        CustomerAddressMapDataRepository $customerAddressMapDataRepository,
        array $data = []
    ) {
        $this->addressMetadataHelper = $addressMetadataHelper;
        $this->customerAddressMetadataRepository = $customerAddressMetadataRepository;
        $this->customerAddressMetadataFactory = $customerAddressMetadataFactory;
        $this->customerSession = $customerSession;
        $this->addressRepository = $addressRepository;
        $this->serializer = $serializer;
        $this->precisionDeliveryHelper = $precisionDeliveryHelper;
        $this->cleanseOnSubmitHelper = $cleanseOnSubmitHelper;
        $this->customerAddressMapDataRepository = $customerAddressMapDataRepository;
        parent::__construct($context, $data);
    }

    /**
     * Check if metadata is enabled
     *
     * @return bool
     */
    public function isMetadataEnabled(): bool
    {
        return $this->addressMetadataHelper->isEnabled();
    }

    /**
     * Get metadata fields to capture from configuration
     *
     * @return array
     */
    public function getCaptureFields(): array
    {
        return $this->addressMetadataHelper->getCaptureFields();
    }

    /**
     * Get address ID from request
     *
     * @return int|null
     */
    public function getAddressId(): ?int
    {
        $addressId = $this->getRequest()->getParam('id');
        return $addressId ? (int)$addressId : null;
    }

    /**
     * Get address metadata for the current address
     *
     * @return \Afd\Pce\Model\CustomerAddressMetadata|null
     */
    public function getAddressMetadata()
    {
        $addressId = $this->getAddressId();
        if (!$addressId) {
            return null;
        }

        try {
            return $this->customerAddressMetadataRepository->getByParentId($addressId, 'customer');
        } catch (NoSuchEntityException $e) {
            return null;
        }
    }

    /**
     * Get metadata value
     *
     * @param string $key
     * @param mixed $default
     * @return mixed
     */
    public function getMetadataValue($key, $default = null)
    {
        $metadata = $this->getAddressMetadata();
        if (!$metadata) {
            return $default;
        }
        
        return $metadata->getMetadataValue($key, $default);
    }
    
    /**
     * Get metadata as JSON string
     *
     * @return string
     */
    public function getMetadataJson()
    {
        $metadata = $this->getAddressMetadata();
        if (!$metadata) {
            return '{}';
        }
        
        $metadataArray = [];
        $metadataString = $metadata->getMetadata();

        if ($metadataString) {
            try {
                $metadataArray = $this->serializer->unserialize($metadataString);
            } catch (\Exception $e) {
                $this->_logger->error("[AFD PCE] Error unserializing metadata: " . $e->getMessage());
                return '{}';
            }
        }
        
        $jsonResult = json_encode($metadataArray);
        return $jsonResult;
    }

    /**
     * Get Precision Delivery configuration as JSON
     *
     * @return string
     */
    public function getPrecisionDeliveryConfigJson(): string
    {
        $config = $this->precisionDeliveryHelper->getConfigArray();
        return json_encode($config);
    }

    /**
     * Check if Precision Delivery is enabled
     *
     * @return bool
     */
    public function isPrecisionDeliveryEnabled(): bool
    {
        return $this->precisionDeliveryHelper->isEnabled();
    }

    /**
     * Check if we are editing an existing address (vs adding new)
     *
     * @return bool
     */
    public function isEditingExistingAddress(): bool
    {
        return $this->getAddressId() !== null;
    }

    /**
     * Get map data for the current address
     *
     * @return array|null
     */
    public function getMapData(): ?array
    {
        $addressId = $this->getAddressId();
        if (!$addressId) {
            return null;
        }

        try {
            $mapData = $this->customerAddressMapDataRepository->getByParentId($addressId);
            return [
                'original_lat' => $mapData->getOriginalLat(),
                'original_lng' => $mapData->getOriginalLng(),
                'selected_lat' => $mapData->getSelectedLat(),
                'selected_lng' => $mapData->getSelectedLng(),
                'distance_from_address' => $mapData->getDistanceFromAddress(),
                'urban_rural' => $mapData->getUrbanRural(),
                'is_adjusted' => $mapData->getIsAdjusted(),
                'delivery_notes' => $mapData->getDeliveryNotes()
            ];
        } catch (NoSuchEntityException $e) {
            return null;
        }
    }

    /**
     * Get map data as JSON string
     *
     * @return string
     */
    public function getMapDataJson(): string
    {
        $mapData = $this->getMapData();
        return $mapData ? json_encode($mapData) : 'null';
    }

    /**
     * Get lat/lng from metadata (fallback when no map data exists)
     *
     * @return array|null
     */
    public function getMetadataLatLng(): ?array
    {
        $metadata = $this->getAddressMetadata();
        if (!$metadata) {
            return null;
        }

        $metadataString = $metadata->getMetadata();
        if (!$metadataString) {
            return null;
        }

        try {
            $metadataArray = $this->serializer->unserialize($metadataString);
            $lat = $metadataArray['Latitude'] ?? $metadataArray['latitude'] ?? null;
            $lng = $metadataArray['Longitude'] ?? $metadataArray['longitude'] ?? null;
            $urbanRural = $metadataArray['UrbanRuralCode'] ?? $metadataArray['UrbanRuralName'] ?? null;

            if ($lat && $lng) {
                return [
                    'lat' => $lat,
                    'lng' => $lng,
                    'urban_rural' => $urbanRural
                ];
            }
        } catch (\Exception $e) {
            return null;
        }

        return null;
    }

    /**
     * Get metadata lat/lng as JSON string
     *
     * @return string
     */
    public function getMetadataLatLngJson(): string
    {
        $latLng = $this->getMetadataLatLng();
        return $latLng ? json_encode($latLng) : 'null';
    }

    /**
     * Check if Cleanse on Submit is enabled for customer account
     *
     * @return bool
     */
    public function isCleanseOnSubmitEnabled(): bool
    {
        return $this->cleanseOnSubmitHelper->isEnabledForCustomerAccount();
    }

    /**
     * Get Cleanse on Submit configuration as JSON
     *
     * @return string
     */
    public function getCleanseOnSubmitConfigJson(): string
    {
        $config = $this->cleanseOnSubmitHelper->getConfigArray();
        return json_encode($config);
    }
}
