<?php
/**
 * AFD PCE Customer Address Metadata Save Plugin
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Plugin\Customer;

use Afd\Pce\Api\Data\AddressMetadataInterface;
use Afd\Pce\Helper\AddressMetadata as AddressMetadataHelper;
use Afd\Pce\Helper\PrecisionDelivery as PrecisionDeliveryHelper;
use Afd\Pce\Model\CustomerAddressMetadataFactory;
use Afd\Pce\Model\CustomerAddressMetadataRepository;
use Afd\Pce\Model\CustomerAddressMapDataFactory;
use Afd\Pce\Model\CustomerAddressMapDataRepository;
use Magento\Customer\Api\AddressRepositoryInterface;
use Magento\Customer\Api\Data\AddressInterface;
use Magento\Framework\App\RequestInterface;
use Magento\Framework\Exception\CouldNotSaveException;
use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\Exception\NoSuchEntityException;
use Magento\Framework\Serialize\Serializer\Json;
use Psr\Log\LoggerInterface;
use Magento\Customer\Api\Data\AddressExtensionFactory;

class SaveCustomerAddressMetadataPlugin
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
     * @var CustomerAddressMapDataRepository
     */
    private $customerAddressMapDataRepository;

    /**
     * @var CustomerAddressMapDataFactory
     */
    private $customerAddressMapDataFactory;

    /**
     * @var PrecisionDeliveryHelper
     */
    private $precisionDeliveryHelper;

    /**
     * @var RequestInterface
     */
    private $request;

    /**
     * @var Json
     */
    private $serializer;

    /**
     * @var LoggerInterface
     */
    private $logger;

    /**
     * @var AddressExtensionFactory
     */
    private $addressExtensionFactory;

    /**
     * @var array Temporary storage for extension attributes metadata
     */
    private $pendingMetadata = [];

    /**
     * @param AddressMetadataHelper $addressMetadataHelper
     * @param CustomerAddressMetadataRepository $customerAddressMetadataRepository
     * @param CustomerAddressMetadataFactory $customerAddressMetadataFactory
     * @param CustomerAddressMapDataRepository $customerAddressMapDataRepository
     * @param CustomerAddressMapDataFactory $customerAddressMapDataFactory
     * @param PrecisionDeliveryHelper $precisionDeliveryHelper
     * @param RequestInterface $request
     * @param Json $serializer
     * @param LoggerInterface $logger
     * @param AddressExtensionFactory $addressExtensionFactory
     */
    public function __construct(
        AddressMetadataHelper $addressMetadataHelper,
        CustomerAddressMetadataRepository $customerAddressMetadataRepository,
        CustomerAddressMetadataFactory $customerAddressMetadataFactory,
        CustomerAddressMapDataRepository $customerAddressMapDataRepository,
        CustomerAddressMapDataFactory $customerAddressMapDataFactory,
        PrecisionDeliveryHelper $precisionDeliveryHelper,
        RequestInterface $request,
        Json $serializer,
        LoggerInterface $logger,
        AddressExtensionFactory $addressExtensionFactory
    ) {
        $this->addressMetadataHelper = $addressMetadataHelper;
        $this->customerAddressMetadataRepository = $customerAddressMetadataRepository;
        $this->customerAddressMetadataFactory = $customerAddressMetadataFactory;
        $this->customerAddressMapDataRepository = $customerAddressMapDataRepository;
        $this->customerAddressMapDataFactory = $customerAddressMapDataFactory;
        $this->precisionDeliveryHelper = $precisionDeliveryHelper;
        $this->request = $request;
        $this->serializer = $serializer;
        $this->logger = $logger;
        $this->addressExtensionFactory = $addressExtensionFactory;
    }

    /**
     * Before save plugin to extract metadata from extension attributes
     *
     * @param AddressRepositoryInterface $subject
     * @param AddressInterface $address
     * @return array
     */
    public function beforeSave(
        AddressRepositoryInterface $subject,
        AddressInterface $address
    ) {
        try {
            $extensionAttributes = $address->getExtensionAttributes();
            
            if ($extensionAttributes && is_object($extensionAttributes)) {
                if (method_exists($extensionAttributes, 'getAfdAddressMetadata')) {
                    $metadata = $extensionAttributes->getAfdAddressMetadata();
                    if ($metadata && is_object($metadata) && method_exists($metadata, 'getMetadata')) {
                        // Create a unique key based on customer ID and address data
                        $addressKey = md5(
                            $address->getCustomerId() . '|' .
                            implode('|', $address->getStreet() ?: []) . '|' .
                            $address->getCity() . '|' .
                            $address->getPostcode() . '|' .
                            $address->getCountryId()
                        );
                        
                        $this->pendingMetadata[$addressKey] = [
                            'metadata' => $metadata->getMetadata(),
                            'is_validated' => $metadata->getIsValidated(),
                            'timestamp' => time()
                        ];
                        $this->logger->info('[AFD PCE] beforeSave: Captured metadata from extension attributes', [
                            'address_key' => $addressKey,
                            'customer_id' => $address->getCustomerId(),
                            'is_validated' => $metadata->getIsValidated()
                        ]);
                    }
                }
            }
        } catch (\Exception $e) {
            $this->logger->error('[AFD PCE] SaveCustomerAddressMetadataPlugin::beforeSave error: ' . $e->getMessage(), [
                'exception' => $e
            ]);
        }
        
        return [$address];
    }

    /**
     * After save plugin to save address metadata
     *
     * @param AddressRepositoryInterface $subject
     * @param AddressInterface $result
     * @param AddressInterface $address
     * @return AddressInterface
     */
    public function afterSave(
        AddressRepositoryInterface $subject,
        AddressInterface $result,
        AddressInterface $address
    ) {
        $this->logger->info('[AFD PCE] SaveCustomerAddressMetadataPlugin::afterSave CALLED', [
            'address_id' => $result->getId(),
            'customer_id' => $result->getCustomerId()
        ]);
        
        // Wrap everything in try-catch to ensure address save never fails due to our plugin
        try {
            $addressId = $result->getId();
            
            // PRIORITY 1: Check if we have pending metadata from extension attributes (checkout flow)
            // This should ALWAYS run regardless of config, since metadata was already captured during checkout
            $addressKey = md5(
                $result->getCustomerId() . '|' .
                implode('|', $result->getStreet() ?: []) . '|' .
                $result->getCity() . '|' .
                $result->getPostcode() . '|' .
                $result->getCountryId()
            );
            
            $this->logger->info('[AFD PCE] afterSave: Checking for pending metadata', [
                'address_id' => $addressId,
                'address_key' => $addressKey,
                'customer_id' => $result->getCustomerId(),
                'has_pending' => isset($this->pendingMetadata[$addressKey]),
                'pending_keys' => array_keys($this->pendingMetadata)
            ]);
            
            if (isset($this->pendingMetadata[$addressKey])) {
                try {
                    $pending = $this->pendingMetadata[$addressKey];
                    $this->logger->info('[AFD PCE] afterSave: Found pending metadata, saving to database', [
                        'address_id' => $addressId,
                        'is_validated' => $pending['is_validated']
                    ]);
                    
                    try {
                        $customerAddressMetadata = $this->customerAddressMetadataRepository->getByParentId(
                            (int)$addressId,
                            'customer'
                        );
                    } catch (NoSuchEntityException $e) {
                        $customerAddressMetadata = $this->customerAddressMetadataFactory->create();
                        $customerAddressMetadata->setParentId((int)$addressId);
                        $customerAddressMetadata->setParentType(AddressMetadataInterface::PARENT_TYPE_CUSTOMER);
                    }
                    
                    $customerAddressMetadata->setMetadata($pending['metadata']);
                    $customerAddressMetadata->setIsValidated($pending['is_validated']);
                    $this->customerAddressMetadataRepository->save($customerAddressMetadata);
                    
                    $this->logger->info('[AFD PCE] afterSave: Successfully saved customer address metadata', [
                        'address_id' => $addressId
                    ]);
                    
                    // Save map data if present and Precision Delivery is enabled
                    $this->saveMapDataFromMetadata($pending['metadata'], (int)$addressId);
                    
                    unset($this->pendingMetadata[$addressKey]);
                    
                    // Clean up old pending metadata (older than 5 minutes)
                    $cutoff = time() - 300;
                    foreach ($this->pendingMetadata as $key => $data) {
                        if (isset($data['timestamp']) && $data['timestamp'] < $cutoff) {
                            unset($this->pendingMetadata[$key]);
                        }
                    }
                } catch (\Exception $e) {
                    $this->logger->error('[AFD PCE] Error saving address metadata from extension attributes: ' . $e->getMessage(), [
                        'address_id' => $addressId,
                        'exception' => $e
                    ]);
                }
            }
            
            // PRIORITY 2: Check for metadata from request parameters (form submission flow)
            // Only check config for request-based metadata (admin/customer account forms)
            $configEnabled = $this->addressMetadataHelper->isEnabled();
            if ($configEnabled) {
                $metadataEnabled = $this->request->getParam('metadata_enabled');
                if ($metadataEnabled) {
                    $metadataParams = $this->getMetadataFromRequest();
                    
                    if (!empty($metadataParams)) {
                        try {
                            $this->saveAddressMetadata((int)$addressId, $metadataParams);
                        } catch (\Exception $e) {
                            $this->logger->error('[AFD PCE] Error saving address metadata from request: ' . $e->getMessage(), [
                                'address_id' => $addressId,
                                'exception' => $e
                            ]);
                        }
                    }
                    
                    // Save map data from request if Precision Delivery is enabled
                    $this->saveMapDataFromRequest((int)$addressId);
                }
            }
        } catch (\Exception $e) {
            $this->logger->error('[AFD PCE] SaveCustomerAddressMetadataPlugin error: ' . $e->getMessage(), [
                'exception' => $e
            ]);
        }
        
        return $result;
    }

    /**
     * Save address metadata
     *
     * @param int $addressId
     * @param array $metadataParams
     * @return void
     * @throws CouldNotSaveException
     * @throws LocalizedException
     */
    private function saveAddressMetadata(int $addressId, array $metadataParams): void
    {

        try {
            $addressMetadata = $this->customerAddressMetadataRepository->getByParentId($addressId, 'customer');
        } catch (NoSuchEntityException $e) {
            $this->logger->debug('[AFD PCE] No existing metadata found, creating new entity for address ID: ' . $addressId);
            // Create new metadata entity if it doesn't exist
            $addressMetadata = $this->customerAddressMetadataFactory->create();
            $addressMetadata->setParentId($addressId);
            $addressMetadata->setParentType(AddressMetadataInterface::PARENT_TYPE_CUSTOMER);
        }

        if (!empty($metadataParams)) {
            $serializedMetadata = $this->serializer->serialize($metadataParams);

            $addressMetadata->setMetadata($serializedMetadata);
            $addressMetadata->setIsValidated(true);
            
            $savedMetadata = $this->customerAddressMetadataRepository->save($addressMetadata);
        }
    }
    
    /**
     * Extract metadata from request
     *
     * @return array
     */
    private function getMetadataFromRequest(): array
    {
        $metadata = [];
        $request = $this->request->getParams();
        
        // Log all request parameters for debugging

        // Check for metadata_enabled parameter - could be 1, '1', or true
        $metadataEnabled = isset($request['metadata_enabled']) && 
            ($request['metadata_enabled'] == 1 || $request['metadata_enabled'] === '1' || 
             $request['metadata_enabled'] === true || $request['metadata_enabled'] === 'true');
        
        if (!$metadataEnabled) {
            return $metadata;
        }
        
        // Get metadata from the hidden field
        $metadataFieldName = 'customer-address-metadata';
        if (isset($request[$metadataFieldName]) && !empty($request[$metadataFieldName])) {
            try {
                $metadataJson = $request[$metadataFieldName];

                // Handle empty JSON object case
                if ($metadataJson === '{}') {
                    return $metadata;
                }
                
                $metadataData = json_decode($metadataJson, true);
                if (json_last_error() !== JSON_ERROR_NONE) {
                    return $metadata;
                }
                
                if (is_array($metadataData)) {
                    // Filter metadata to only include configured capture fields
                    $captureFields = $this->addressMetadataHelper->getCaptureFields();

                    if (empty($captureFields)) {
                        return $metadata;
                    }
                    
                    foreach ($metadataData as $key => $value) {
                        if (in_array($key, $captureFields)) {
                            $metadata[$key] = $value;
                        }
                    }
                }
            } catch (\Exception $e) {
                $this->logger->error('[AFD PCE] Error processing metadata JSON: ' . $e->getMessage());
            }
        } else {
            $this->logger->debug('[AFD PCE] No ' . $metadataFieldName . ' in request or it is empty');
        }
        
        return $metadata;
    }
    
    /**
     * Save map data from request parameters if Precision Delivery is enabled
     * This handles the customer address edit form submission flow
     *
     * @param int $addressId
     * @return void
     */
    private function saveMapDataFromRequest(int $addressId): void
    {
        if (!$this->precisionDeliveryHelper->isEnabled()) {
            return;
        }
        
        $metadataFieldName = 'customer-address-metadata';
        $metadataJson = $this->request->getParam($metadataFieldName);
        
        if (!$metadataJson || $metadataJson === '{}') {
            $this->logger->debug('[AFD PCE MapData] No metadata in request for map data extraction');
            return;
        }
        
        try {
            $metadataArray = json_decode($metadataJson, true);
            
            if (json_last_error() !== JSON_ERROR_NONE) {
                $this->logger->error('[AFD PCE MapData] Invalid JSON in request metadata');
                return;
            }
            
            if (!isset($metadataArray['map_data']) || !is_array($metadataArray['map_data'])) {
                $this->logger->debug('[AFD PCE MapData] No map_data found in request metadata');
                return;
            }
            
            $mapDataArray = $metadataArray['map_data'];
            
            $this->logger->info('[AFD PCE MapData] Processing map_data from request: ' . json_encode($mapDataArray));
            
            // Check if map data already exists for this customer address
            try {
                $existingMapData = $this->customerAddressMapDataRepository->getByParentId($addressId);
                $this->logger->info('[AFD PCE MapData] Updating existing map data for customer address ID: ' . $addressId);
                $mapData = $existingMapData;
            } catch (NoSuchEntityException $e) {
                // Create new map data
                $mapData = $this->customerAddressMapDataFactory->create();
                $mapData->setParentId($addressId);
                $this->logger->info('[AFD PCE MapData] Creating new map data for customer address ID: ' . $addressId);
            }
            
            $mapData->setOriginalLat($mapDataArray['original_lat'] ?? null);
            $mapData->setOriginalLng($mapDataArray['original_lng'] ?? null);
            $mapData->setSelectedLat($mapDataArray['selected_lat'] ?? null);
            $mapData->setSelectedLng($mapDataArray['selected_lng'] ?? null);
            $mapData->setDistanceFromAddress($mapDataArray['distance_from_address'] ?? 0);
            $mapData->setUrbanRural($mapDataArray['urban_rural'] ?? null);
            $mapData->setIsAdjusted($mapDataArray['is_adjusted'] ?? false);
            $mapData->setDeliveryNotes($mapDataArray['delivery_notes'] ?? null);
            
            $this->customerAddressMapDataRepository->save($mapData);
            
            $this->logger->info('[AFD PCE MapData] Saved map data from request for customer address ID: ' . $addressId);
        } catch (\Exception $e) {
            $this->logger->error('[AFD PCE MapData] Error saving map data from request: ' . $e->getMessage());
        }
    }
    
    /**
     * Save map data from metadata JSON if Precision Delivery is enabled
     *
     * @param string|null $metadataJson
     * @param int $addressId
     * @return void
     */
    private function saveMapDataFromMetadata($metadataJson, int $addressId): void
    {
        if (!$this->precisionDeliveryHelper->isEnabled()) {
            return;
        }
        
        if (!$metadataJson) {
            return;
        }
        
        try {
            $metadataArray = json_decode($metadataJson, true);
            
            if (!isset($metadataArray['map_data']) || !is_array($metadataArray['map_data'])) {
                $this->logger->debug('[AFD PCE MapData] No map_data found in customer address metadata');
                return;
            }
            
            $mapDataArray = $metadataArray['map_data'];
            
            $this->logger->info('[AFD PCE MapData] Processing customer address map_data: ' . json_encode($mapDataArray));
            
            // Check if map data already exists for this customer address
            try {
                $existingMapData = $this->customerAddressMapDataRepository->getByParentId($addressId);
                $this->logger->info('[AFD PCE MapData] Updating existing map data for customer address ID: ' . $addressId);
                $mapData = $existingMapData;
            } catch (NoSuchEntityException $e) {
                // Create new map data
                $mapData = $this->customerAddressMapDataFactory->create();
                $mapData->setParentId($addressId);
                $this->logger->info('[AFD PCE MapData] Creating new map data for customer address ID: ' . $addressId);
            }
            
            $mapData->setOriginalLat($mapDataArray['original_lat'] ?? null);
            $mapData->setOriginalLng($mapDataArray['original_lng'] ?? null);
            $mapData->setSelectedLat($mapDataArray['selected_lat'] ?? null);
            $mapData->setSelectedLng($mapDataArray['selected_lng'] ?? null);
            $mapData->setDistanceFromAddress($mapDataArray['distance_from_address'] ?? 0);
            $mapData->setUrbanRural($mapDataArray['urban_rural'] ?? null);
            $mapData->setIsAdjusted($mapDataArray['is_adjusted'] ?? false);
            $mapData->setDeliveryNotes($mapDataArray['delivery_notes'] ?? null);
            
            $this->customerAddressMapDataRepository->save($mapData);
            
            $this->logger->info('[AFD PCE MapData] Saved map data for customer address ID: ' . $addressId);
        } catch (\Exception $e) {
            $this->logger->error('[AFD PCE MapData] Error saving customer address map data: ' . $e->getMessage());
        }
    }
}
