<?php
/**
 * AFD PCE Save Order Address Metadata Plugin
 *
 * PURPOSE:
 * This is the FINAL step in the metadata flow. It saves metadata from extension attributes
 * to the afd_pce_order_address_metadata table after the order is fully created.
 *
 * WHEN IT RUNS:
 * - Intercepts: OrderManagementInterface::place()
 * - Timing: AFTER order is placed and addresses have IDs
 * - Runs once per order, processes both shipping and billing addresses
 *
 * WHY IT'S NEEDED:
 * - ToOrderAddressPlugin stores metadata in extension attributes (in-memory only)
 * - At that point, order addresses don't have IDs yet
 * - This plugin runs AFTER addresses are saved and have IDs
 * - Now we can persist metadata to the database
 *
 * WHAT IT DOES:
 * 1. Gets shipping and billing addresses from the order
 * 2. For each address:
 *    a. Checks extension attributes for metadata
 *    b. Extracts JSON string from metadata object
 *    c. Saves to afd_pce_order_address_metadata table with order address ID
 *
 * DATA FLOW:
 * Extension attributes (in-memory) → afd_pce_order_address_metadata table (persistent)
 *
 * COMPLETE METADATA JOURNEY:
 * 1. Frontend: User selects address → metadata stored
 * 2. ShippingInformationManagementPlugin: Saves to quote table
 * 3. CopyMetadataToBillingPlugin: Saves billing to quote table
 * 4. ToOrderAddressPlugin: Copies to order extension attributes
 * 5. THIS PLUGIN: Saves to order table ← FINAL DESTINATION
 *
 * @category    Afd
 * @package     Afd_Pce
 * @author      AFD Software
 */
declare(strict_types=1);

namespace Afd\Pce\Plugin\Order;

use Afd\Pce\Helper\DebugConfig;
use Afd\Pce\Helper\PrecisionDelivery;
use Afd\Pce\Model\OrderAddressMetadataFactory;
use Afd\Pce\Model\OrderAddressMetadataRepository;
use Afd\Pce\Model\QuoteAddressMetadataRepository;
use Afd\Pce\Model\OrderAddressMapDataFactory;
use Afd\Pce\Model\OrderAddressMapDataRepository;
use Afd\Pce\Model\QuoteAddressMapDataRepository;
use Magento\Framework\Exception\CouldNotSaveException;
use Magento\Framework\Exception\NoSuchEntityException;
use Magento\Sales\Api\Data\OrderInterface;
use Magento\Sales\Api\OrderManagementInterface;
use Psr\Log\LoggerInterface;

/**
 * Class SaveOrderAddressMetadataPlugin
 */
class SaveOrderAddressMetadataPlugin
{
    /**
     * @var OrderAddressMetadataFactory
     */
    private $orderAddressMetadataFactory;

    /**
     * @var OrderAddressMetadataRepository
     */
    private $orderAddressMetadataRepository;

    /**
     * @var QuoteAddressMetadataRepository
     */
    private $quoteAddressMetadataRepository;

    /**
     * @var OrderAddressMapDataFactory
     */
    private $orderAddressMapDataFactory;

    /**
     * @var OrderAddressMapDataRepository
     */
    private $orderAddressMapDataRepository;

    /**
     * @var QuoteAddressMapDataRepository
     */
    private $quoteAddressMapDataRepository;

    /**
     * @var LoggerInterface
     */
    private $logger;

    /**
     * @var DebugConfig
     */
    private $debugConfig;

    /**
     * @var PrecisionDelivery
     */
    private $precisionDeliveryHelper;

    /**
     * SaveOrderAddressMetadataPlugin constructor.
     *
     * @param OrderAddressMetadataFactory $orderAddressMetadataFactory
     * @param OrderAddressMetadataRepository $orderAddressMetadataRepository
     * @param QuoteAddressMetadataRepository $quoteAddressMetadataRepository
     * @param OrderAddressMapDataFactory $orderAddressMapDataFactory
     * @param OrderAddressMapDataRepository $orderAddressMapDataRepository
     * @param QuoteAddressMapDataRepository $quoteAddressMapDataRepository
     * @param LoggerInterface $logger
     * @param DebugConfig $debugConfig
     * @param PrecisionDelivery $precisionDeliveryHelper
     */
    public function __construct(
        OrderAddressMetadataFactory $orderAddressMetadataFactory,
        OrderAddressMetadataRepository $orderAddressMetadataRepository,
        QuoteAddressMetadataRepository $quoteAddressMetadataRepository,
        OrderAddressMapDataFactory $orderAddressMapDataFactory,
        OrderAddressMapDataRepository $orderAddressMapDataRepository,
        QuoteAddressMapDataRepository $quoteAddressMapDataRepository,
        LoggerInterface $logger,
        DebugConfig $debugConfig,
        PrecisionDelivery $precisionDeliveryHelper
    ) {
        $this->orderAddressMetadataFactory = $orderAddressMetadataFactory;
        $this->orderAddressMetadataRepository = $orderAddressMetadataRepository;
        $this->quoteAddressMetadataRepository = $quoteAddressMetadataRepository;
        $this->orderAddressMapDataFactory = $orderAddressMapDataFactory;
        $this->orderAddressMapDataRepository = $orderAddressMapDataRepository;
        $this->quoteAddressMapDataRepository = $quoteAddressMapDataRepository;
        $this->logger = $logger;
        $this->debugConfig = $debugConfig;
        $this->precisionDeliveryHelper = $precisionDeliveryHelper;
    }

    /**
     * After place order
     *
     * @param OrderManagementInterface $subject
     * @param OrderInterface $result
     * @return OrderInterface
     */
    public function afterPlace(
        OrderManagementInterface $subject,
        OrderInterface $result
    ) {
        // Wrap everything in try-catch to ensure order placement never fails due to our plugin
        try {
            if ($this->debugConfig->isDebugEnabled()) {
                $this->logger->info('=== AFD PCE: SaveOrderAddressMetadataPlugin::afterPlace CALLED ===');
                $this->logger->info('Order ID: ' . $result->getEntityId());
            }
            // Get quote address IDs for map data copying
            $quoteShippingAddressId = null;
            $quoteBillingAddressId = null;
            try {
                $quote = null;
                if ($result->getQuoteId()) {
                    $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
                    $quoteRepository = $objectManager->get(\Magento\Quote\Api\CartRepositoryInterface::class);
                    try {
                        $quote = $quoteRepository->get($result->getQuoteId());
                    } catch (\Exception $e) {
                        // Quote may have been deleted or inactive
                        if ($this->debugConfig->isDebugEnabled()) {
                            $this->logger->info('[AFD PCE] Could not load quote: ' . $e->getMessage());
                        }
                    }
                }
                if ($quote) {
                    $quoteShippingAddressId = $quote->getShippingAddress() ? (int)$quote->getShippingAddress()->getId() : null;
                    $quoteBillingAddressId = $quote->getBillingAddress() ? (int)$quote->getBillingAddress()->getId() : null;
                    if ($this->debugConfig->isDebugEnabled()) {
                        $this->logger->info('Quote shipping address ID: ' . $quoteShippingAddressId . ', Quote billing address ID: ' . $quoteBillingAddressId);
                    }
                }
            } catch (\Exception $e) {
                $this->logger->error('[AFD PCE] Error getting quote for map data: ' . $e->getMessage());
            }
            
            // Process shipping address
            $shippingAddress = $result->getShippingAddress();
            if ($this->debugConfig->isDebugEnabled()) {
                $this->logger->info('Processing shipping address ID: ' . ($shippingAddress ? $shippingAddress->getId() : 'NULL'));
            }
            $this->processAddress($shippingAddress);
            
            // Copy map data from quote shipping address to order shipping address
            if ($shippingAddress && $shippingAddress->getId() && $quoteShippingAddressId) {
                $this->copyMapDataFromQuoteToOrder($quoteShippingAddressId, (int)$shippingAddress->getId());
            }
            
            // Process billing address
            $billingAddress = $result->getBillingAddress();
            if ($this->debugConfig->isDebugEnabled()) {
                $this->logger->info('Processing billing address ID: ' . ($billingAddress ? $billingAddress->getId() : 'NULL'));
            }
            $this->processAddress($billingAddress);
            
            // Copy map data from quote billing address to order billing address
            if ($billingAddress && $billingAddress->getId() && $quoteBillingAddressId) {
                $this->copyMapDataFromQuoteToOrder($quoteBillingAddressId, (int)$billingAddress->getId());
            }
            
            // If billing doesn't have metadata AND addresses are the same, copy from shipping
            if ($billingAddress && $billingAddress->getId() && $shippingAddress && $shippingAddress->getId()) {
                try {
                    // Check if billing has metadata
                    $billingMetadata = $this->orderAddressMetadataRepository->getByParentId(
                        (int)$billingAddress->getId(),
                        'order'
                    );
                    if ($this->debugConfig->isDebugEnabled()) {
                        $this->logger->info('Billing already has metadata, no need to copy from shipping');
                    }
                } catch (NoSuchEntityException $e) {
                    // Billing doesn't have metadata, check if addresses are the same
                    $addressesAreSame = (
                        $billingAddress->getStreet() === $shippingAddress->getStreet() &&
                        $billingAddress->getCity() === $shippingAddress->getCity() &&
                        $billingAddress->getPostcode() === $shippingAddress->getPostcode() &&
                        $billingAddress->getCountryId() === $shippingAddress->getCountryId()
                    );
                    
                    if ($addressesAreSame) {
                        if ($this->debugConfig->isDebugEnabled()) {
                            $this->logger->info('Billing and shipping addresses are the same, copying metadata');
                        }
                        try {
                            $shippingMetadata = $this->orderAddressMetadataRepository->getByParentId(
                                (int)$shippingAddress->getId(),
                                'order'
                            );
                            
                            // Copy to billing
                            $billingMetadata = $this->orderAddressMetadataFactory->create();
                            $billingMetadata->setParentId((int)$billingAddress->getId());
                            $billingMetadata->setMetadata($shippingMetadata->getMetadata());
                            $billingMetadata->setIsValidated($shippingMetadata->getIsValidated());
                            $billingMetadata->setParentType('order');
                            $this->orderAddressMetadataRepository->save($billingMetadata);
                            if ($this->debugConfig->isDebugEnabled()) {
                                $this->logger->info('Copied shipping metadata to billing order address (same address)');
                            }
                        } catch (NoSuchEntityException $e2) {
                            if ($this->debugConfig->isDebugEnabled()) {
                                $this->logger->info('No shipping metadata to copy to billing');
                            }
                        }
                    } else {
                        if ($this->debugConfig->isDebugEnabled()) {
                            $this->logger->info('Billing and shipping addresses are different, not copying metadata');
                        }
                    }
                }
            }
            
        } catch (\Exception $e) {
            $this->logger->error('[AFD PCE] SaveOrderAddressMetadataPlugin error: ' . $e->getMessage(), [
                'order_id' => $result->getEntityId(),
                'exception' => $e,
                'trace' => $e->getTraceAsString()
            ]);
        }
        
        return $result;
    }
    
    /**
     * Process an address to save its metadata
     *
     * @param \Magento\Sales\Api\Data\OrderAddressInterface|null $address
     * @return void
     */
    private function processAddress($address)
    {
        if (!$address || !$address->getId()) {
            if ($this->debugConfig->isDebugEnabled()) {
                $this->logger->info('processAddress: Address is null or has no ID');
            }
            return;
        }
        
        if ($this->debugConfig->isDebugEnabled()) {
            $this->logger->info('processAddress: Processing address ID: ' . $address->getId());
        }
        
        // Check if metadata already exists for this address
        try {
            $existing = $this->orderAddressMetadataRepository->getByParentId((int)$address->getId(), 'order');
            if ($this->debugConfig->isDebugEnabled()) {
                $this->logger->info('processAddress: Metadata already exists for address ID: ' . $address->getId());
            }
            return; // Metadata already exists, no need to create it
        } catch (NoSuchEntityException $e) {
            // No metadata exists, continue with creation
            if ($this->debugConfig->isDebugEnabled()) {
                $this->logger->info('processAddress: No existing metadata found for address ID: ' . $address->getId());
            }
        }
        
        // Get extension attributes
        $extensionAttributes = $address->getExtensionAttributes();
        if (!$extensionAttributes) {
            if ($this->debugConfig->isDebugEnabled()) {
                $this->logger->info('processAddress: No extension attributes found');
            }
            return;
        }
        
        if ($this->debugConfig->isDebugEnabled()) {
            $this->logger->info('processAddress: Extension attributes found');
        }
        
        // Get metadata from extension attributes
        $metadata = null;
        $isValidated = false;
        
        // Try to get metadata object from extension attributes
        if (method_exists($extensionAttributes, 'getAfdAddressMetadata')) {
            $metadataObj = $extensionAttributes->getAfdAddressMetadata();
            if ($this->debugConfig->isDebugEnabled()) {
                $this->logger->info('processAddress: getAfdAddressMetadata returned: ' . ($metadataObj ? (is_object($metadataObj) ? get_class($metadataObj) : 'string') : 'NULL'));
            }

            if ($metadataObj) {
                if (is_object($metadataObj) && method_exists($metadataObj, 'getMetadata')) {
                    $metadata = $metadataObj->getMetadata();

                    if ($this->debugConfig->isDebugEnabled()) {
                        $this->logger->info('processAddress: Extracted metadata JSON from extension attributes: ' . $metadata);
                    }
                    $isValidated = $metadataObj->getIsValidated();
                } elseif (is_string($metadataObj)) {
                    $metadata = $metadataObj;
                }
            }
        }
        
        // If we have metadata, save it
        if ($metadata) {
            try {
                $orderAddressMetadata = $this->orderAddressMetadataFactory->create();
                $orderAddressMetadata->setParentId((int)$address->getId());
                $orderAddressMetadata->setMetadata($metadata);
                $orderAddressMetadata->setIsValidated($isValidated);
                
                // Set parent type if the method exists
                if (method_exists($orderAddressMetadata, 'setParentType')) {
                    $orderAddressMetadata->setParentType('order');
                }
                
                $this->orderAddressMetadataRepository->save($orderAddressMetadata);
                
                // Save map data if present and Precision Delivery is enabled
                $this->saveMapDataFromMetadata($metadata, (int)$address->getId());
            } catch (CouldNotSaveException $e) {
                $this->logger->error('SaveOrderAddressMetadataPlugin::processAddress - Could not save metadata: ' . $e->getMessage());
            } catch (\Exception $e) {
                $this->logger->error('SaveOrderAddressMetadataPlugin::processAddress - Error: ' . $e->getMessage());
            }
        }
    }
    
    /**
     * Save map data from metadata JSON if Precision Delivery is enabled
     *
     * @param string|null $metadataJson
     * @param int $orderAddressId
     * @return void
     */
    private function saveMapDataFromMetadata($metadataJson, int $orderAddressId): void
    {
        if (!$this->precisionDeliveryHelper->isEnabled()) {
            return;
        }
        
        if (!$metadataJson) {
            return;
        }
        
        try {
            $metadataArray = json_decode($metadataJson, true);
            
            // Check if map data already exists for this order address
            try {
                $existingMapData = $this->orderAddressMapDataRepository->getByParentId($orderAddressId);
                if ($this->debugConfig->isDebugEnabled()) {
                    $this->logger->info('[AFD PCE MapData] Map data already exists for order address ID: ' . $orderAddressId);
                }
                return; // Already exists
            } catch (NoSuchEntityException $e) {
                // Create new map data
            }
            
            $mapDataArray = null;
            $lat = null;
            $lng = null;
            
            // First check for explicit map_data
            if (isset($metadataArray['map_data']) && is_array($metadataArray['map_data'])) {
                $mapDataArray = $metadataArray['map_data'];
                if ($this->debugConfig->isDebugEnabled()) {
                    $this->logger->info('[AFD PCE MapData] Processing order map_data: ' . json_encode($mapDataArray));
                }
            } else {
                // No explicit map_data - it will be copied from quote by copyMapDataFromQuoteToOrder
                if ($this->debugConfig->isDebugEnabled()) {
                    $this->logger->info('[AFD PCE MapData] No map_data in metadata, will be copied from quote');
                }
                return;
            }
            
            $mapData = $this->orderAddressMapDataFactory->create();
            $mapData->setParentId($orderAddressId);
            $mapData->setOriginalLat($mapDataArray['original_lat'] ?? null);
            $mapData->setOriginalLng($mapDataArray['original_lng'] ?? null);
            $mapData->setSelectedLat($mapDataArray['selected_lat'] ?? null);
            $mapData->setSelectedLng($mapDataArray['selected_lng'] ?? null);
            $mapData->setDistanceFromAddress($mapDataArray['distance_from_address'] ?? 0);
            $mapData->setUrbanRural($mapDataArray['urban_rural'] ?? null);
            $mapData->setIsAdjusted($mapDataArray['is_adjusted'] ?? false);
            $mapData->setDeliveryNotes($mapDataArray['delivery_notes'] ?? null);
            
            $this->orderAddressMapDataRepository->save($mapData);
            
            if ($this->debugConfig->isDebugEnabled()) {
                $this->logger->info('[AFD PCE MapData] Saved map data for order address ID: ' . $orderAddressId);
            }
        } catch (\Exception $e) {
            $this->logger->error('[AFD PCE MapData] Error saving order map data: ' . $e->getMessage());
        }
    }
    
    /**
     * Copy map data from quote address to order address
     *
     * @param int $quoteAddressId
     * @param int $orderAddressId
     * @return void
     */
    private function copyMapDataFromQuoteToOrder(int $quoteAddressId, int $orderAddressId): void
    {
        if (!$this->precisionDeliveryHelper->isEnabled()) {
            return;
        }
        
        try {
            // Check if order already has map data
            try {
                $this->orderAddressMapDataRepository->getByParentId($orderAddressId);
                if ($this->debugConfig->isDebugEnabled()) {
                    $this->logger->info('[AFD PCE MapData] Order address already has map data, skipping copy');
                }
                return; // Already has map data
            } catch (NoSuchEntityException $e) {
                // Continue to copy
            }
            
            // Get quote map data
            $quoteMapData = $this->quoteAddressMapDataRepository->getByParentId($quoteAddressId);
            
            if ($this->debugConfig->isDebugEnabled()) {
                $this->logger->info('[AFD PCE MapData] Found quote map data for address ID: ' . $quoteAddressId);
            }
            
            // Copy to order
            $orderMapData = $this->orderAddressMapDataFactory->create();
            $orderMapData->setParentId($orderAddressId);
            $orderMapData->setOriginalLat($quoteMapData->getOriginalLat());
            $orderMapData->setOriginalLng($quoteMapData->getOriginalLng());
            $orderMapData->setSelectedLat($quoteMapData->getSelectedLat());
            $orderMapData->setSelectedLng($quoteMapData->getSelectedLng());
            $orderMapData->setDistanceFromAddress($quoteMapData->getDistanceFromAddress());
            $orderMapData->setUrbanRural($quoteMapData->getUrbanRural());
            $orderMapData->setIsAdjusted($quoteMapData->getIsAdjusted());
            $orderMapData->setDeliveryNotes($quoteMapData->getDeliveryNotes());
            
            $this->orderAddressMapDataRepository->save($orderMapData);
            
            if ($this->debugConfig->isDebugEnabled()) {
                $this->logger->info('[AFD PCE MapData] Copied map data from quote address ' . $quoteAddressId . ' to order address ' . $orderAddressId);
            }
        } catch (NoSuchEntityException $e) {
            if ($this->debugConfig->isDebugEnabled()) {
                $this->logger->info('[AFD PCE MapData] No quote map data found for address ID: ' . $quoteAddressId);
            }
        } catch (\Exception $e) {
            $this->logger->error('[AFD PCE MapData] Error copying map data from quote to order: ' . $e->getMessage());
        }
    }
    
    /**
     * Copy map data from shipping to billing address if addresses are the same
     *
     * @param int $shippingAddressId
     * @param int $billingAddressId
     * @return void
     */
    private function copyMapDataToBilling(int $shippingAddressId, int $billingAddressId): void
    {
        if (!$this->precisionDeliveryHelper->isEnabled()) {
            return;
        }
        
        try {
            // Check if billing already has map data
            try {
                $this->orderAddressMapDataRepository->getByParentId($billingAddressId);
                return; // Already has map data
            } catch (NoSuchEntityException $e) {
                // Continue to copy
            }
            
            // Get shipping map data
            $shippingMapData = $this->orderAddressMapDataRepository->getByParentId($shippingAddressId);
            
            // Copy to billing
            $billingMapData = $this->orderAddressMapDataFactory->create();
            $billingMapData->setParentId($billingAddressId);
            $billingMapData->setOriginalLat($shippingMapData->getOriginalLat());
            $billingMapData->setOriginalLng($shippingMapData->getOriginalLng());
            $billingMapData->setSelectedLat($shippingMapData->getSelectedLat());
            $billingMapData->setSelectedLng($shippingMapData->getSelectedLng());
            $billingMapData->setDistanceFromAddress($shippingMapData->getDistanceFromAddress());
            $billingMapData->setUrbanRural($shippingMapData->getUrbanRural());
            $billingMapData->setIsAdjusted($shippingMapData->getIsAdjusted());
            $billingMapData->setDeliveryNotes($shippingMapData->getDeliveryNotes());
            
            $this->orderAddressMapDataRepository->save($billingMapData);
            
            if ($this->debugConfig->isDebugEnabled()) {
                $this->logger->info('[AFD PCE MapData] Copied map data from shipping to billing order address');
            }
        } catch (NoSuchEntityException $e) {
            // No shipping map data to copy
        } catch (\Exception $e) {
            $this->logger->error('[AFD PCE MapData] Error copying map data to billing: ' . $e->getMessage());
        }
    }
}