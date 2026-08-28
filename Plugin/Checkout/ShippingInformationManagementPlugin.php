<?php
/**
 * AFD PCE Shipping Information Management Plugin
 *
 * PURPOSE:
 * This plugin intercepts the shipping information save process during checkout to capture
 * and persist AFD address metadata (e.g., Latitude, Longitude) from the shipping address.
 *
 * FLOW:
 * 1. User selects address via AFD typeahead on shipping step
 * 2. Frontend stores metadata in metadataStore
 * 3. set-shipping-information-mixin attaches metadata to address extension attributes
 * 4. This plugin intercepts afterSaveAddressInformation
 * 5. Extracts metadata from extension attributes
 * 6. Saves to afd_pce_quote_address_metadata table
 *
 * WHY THIS IS NEEDED:
 * - Extension attributes are not automatically persisted to database
 * - We need metadata in the quote table so it can be copied to the order later
 * - This ensures metadata survives the quote → order conversion
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Plugin\Checkout;

use Afd\Pce\Helper\DebugConfig;
use Afd\Pce\Helper\PrecisionDelivery;
use Afd\Pce\Model\CustomerAddressMetadataRepository;
use Afd\Pce\Model\CustomerAddressMapDataRepository;
use Afd\Pce\Model\QuoteAddressMetadataRepository;
use Afd\Pce\Model\QuoteAddressMetadataFactory;
use Afd\Pce\Model\QuoteAddressMapDataRepository;
use Afd\Pce\Model\QuoteAddressMapDataFactory;
use Magento\Checkout\Api\Data\ShippingInformationInterface;
use Magento\Checkout\Model\ShippingInformationManagement;
use Magento\Quote\Api\CartRepositoryInterface;
use Magento\Framework\App\RequestInterface;
use Psr\Log\LoggerInterface;

/**
 * Plugin for Magento\Checkout\Model\ShippingInformationManagement
 */
class ShippingInformationManagementPlugin
{
    /**
     * @var QuoteAddressMetadataRepository
     */
    private $quoteAddressMetadataRepository;
    
    /**
     * @var QuoteAddressMetadataFactory
     */
    private $quoteAddressMetadataFactory;
    
    /**
     * @var QuoteAddressMapDataRepository
     */
    private $quoteAddressMapDataRepository;
    
    /**
     * @var QuoteAddressMapDataFactory
     */
    private $quoteAddressMapDataFactory;
    
    /**
     * @var CartRepositoryInterface
     */
    private $cartRepository;
    
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
     * @var RequestInterface
     */
    private $request;

    /**
     * @var CustomerAddressMetadataRepository
     */
    private $customerAddressMetadataRepository;

    /**
     * @var CustomerAddressMapDataRepository
     */
    private $customerAddressMapDataRepository;

    /**
     * @var array|null Temporarily stores metadata extracted in beforeSaveAddressInformation
     */
    private $pendingMetadata = null;
    
    /**
     * Constructor
     *
     * @param QuoteAddressMetadataRepository $quoteAddressMetadataRepository
     * @param QuoteAddressMetadataFactory $quoteAddressMetadataFactory
     * @param QuoteAddressMapDataRepository $quoteAddressMapDataRepository
     * @param QuoteAddressMapDataFactory $quoteAddressMapDataFactory
     * @param CartRepositoryInterface $cartRepository
     * @param RequestInterface $request
     * @param LoggerInterface $logger
     * @param DebugConfig $debugConfig
     * @param PrecisionDelivery $precisionDeliveryHelper
     * @param CustomerAddressMetadataRepository $customerAddressMetadataRepository
     * @param CustomerAddressMapDataRepository $customerAddressMapDataRepository
     */
    public function __construct(
        QuoteAddressMetadataRepository $quoteAddressMetadataRepository,
        QuoteAddressMetadataFactory $quoteAddressMetadataFactory,
        QuoteAddressMapDataRepository $quoteAddressMapDataRepository,
        QuoteAddressMapDataFactory $quoteAddressMapDataFactory,
        CartRepositoryInterface $cartRepository,
        RequestInterface $request,
        LoggerInterface $logger,
        DebugConfig $debugConfig,
        PrecisionDelivery $precisionDeliveryHelper,
        CustomerAddressMetadataRepository $customerAddressMetadataRepository,
        CustomerAddressMapDataRepository $customerAddressMapDataRepository
    ) {
        $this->quoteAddressMetadataRepository = $quoteAddressMetadataRepository;
        $this->quoteAddressMetadataFactory = $quoteAddressMetadataFactory;
        $this->quoteAddressMapDataRepository = $quoteAddressMapDataRepository;
        $this->quoteAddressMapDataFactory = $quoteAddressMapDataFactory;
        $this->cartRepository = $cartRepository;
        $this->request = $request;
        $this->logger = $logger;
        $this->debugConfig = $debugConfig;
        $this->precisionDeliveryHelper = $precisionDeliveryHelper;
        $this->customerAddressMetadataRepository = $customerAddressMetadataRepository;
        $this->customerAddressMapDataRepository = $customerAddressMapDataRepository;
    }
    
    /**
     * Before saving the shipping information - store the metadata for use after save has happened
     *
     * @param ShippingInformationManagement $subject
     * @param int $cartId
     * @param ShippingInformationInterface $addressInformation
     * @return array
     */
    public function beforeSaveAddressInformation(
        ShippingInformationManagement $subject,
        $cartId,
        ShippingInformationInterface $addressInformation
    ) {
        if ($this->debugConfig->isDebugEnabled()) {
            $this->logger->info('=== AFD PCE: ShippingInformationManagementPlugin::beforeSaveAddressInformation CALLED ===');
            $this->logger->info('Cart ID: ' . $cartId);
        }
        
        try {
            /*
             * LEGACY SUPPORT (can be removed when Magento 2.4.5 and 2.4.6 are EOL):
             * Check for metadata in custom HTTP header first (used by Magento 2.4.5 and 2.4.6).
             * These versions have bugs with extension attributes on addresses that cause:
             * - Response serialization errors
             * - CheckoutStaging array_diff() failures
             */
            $headerMetadata = $this->request->getHeader('X-AFD-Address-Metadata');
            if ($headerMetadata) {
                if ($this->debugConfig->isDebugEnabled()) {
                    $this->logger->info('[AFD PCE Metadata] Found metadata in HTTP header (Magento 2.4.5/2.4.6 mode)');
                    $this->logger->info('[AFD PCE Metadata] Raw header value: ' . $headerMetadata);
                }
                try {
                    $metadataArray = json_decode($headerMetadata, true);
                    if ($this->debugConfig->isDebugEnabled()) {
                        $this->logger->info('[AFD PCE Metadata] Decoded header: ' . json_encode($metadataArray));
                    }
                    $this->pendingMetadata = [
                        'metadata' => $metadataArray['metadata'] ?? '{}',
                        'is_validated' => $metadataArray['is_validated'] ?? false,
                        'map_data' => $metadataArray['map_data'] ?? null
                    ];
                    if ($this->debugConfig->isDebugEnabled()) {
                        $this->logger->info('[AFD PCE Metadata] Stored metadata from HTTP header');
                        if (isset($metadataArray['map_data'])) {
                            $this->logger->info('[AFD PCE Metadata] map_data found in header: ' . json_encode($metadataArray['map_data']));
                        } else {
                            $this->logger->info('[AFD PCE Metadata] NO map_data in header!');
                        }
                    }
                } catch (\Exception $e) {
                    $this->logger->error('[AFD PCE Metadata] Error parsing HTTP header metadata: ' . $e->getMessage());
                }
                return [$cartId, $addressInformation];
            }
            
            // Standard approach for Magento 2.4.7+: Check extension attributes
            $shippingAddress = $addressInformation->getShippingAddress();
            $extensionAttributes = $shippingAddress->getExtensionAttributes();
            
            if (!$extensionAttributes) {
                return [$cartId, $addressInformation];
            }
            
            $afdMetadata = $extensionAttributes->getAfdAddressMetadata();
            if ($afdMetadata) {
                if ($this->debugConfig->isDebugEnabled()) {
                    $this->logger->info('[AFD PCE Metadata] Found metadata in extension attributes');
                }
                
                // Handle both object and array formats
                if (is_array($afdMetadata)) {
                    $metadata = $afdMetadata['metadata'] ?? null;
                    $isAfdValidated = $afdMetadata['is_validated'] ?? false;
                    $mapData = $afdMetadata['map_data'] ?? null;
                } else {
                    $metadata = $afdMetadata->getMetadata();
                    $isAfdValidated = $afdMetadata->getIsValidated();
                    $mapData = $afdMetadata->getMapData();
                }
                
                // Store temporarily for use in afterSaveAddressInformation
                $this->pendingMetadata = [
                    'metadata' => $metadata,
                    'is_validated' => $isAfdValidated,
                    'map_data' => $mapData
                ];
                
                if ($this->debugConfig->isDebugEnabled() && $mapData) {
                    $this->logger->info('[AFD PCE Metadata] map_data found in extension attributes: ' . json_encode($mapData));
                }
            }
        } catch (\Exception $e) {
            $this->logger->error('[AFD PCE] Error in beforeSaveAddressInformation: ' . $e->getMessage());
        }
        
        return [$cartId, $addressInformation];
    }
    
    /**
     * After save shipping information - save the metadata that was extracted in before plugin
     *
     * @param ShippingInformationManagement $subject
     * @param mixed $result
     * @param int $cartId
     * @param ShippingInformationInterface $addressInformation
     * @return mixed
     */
    public function afterSaveAddressInformation(
        ShippingInformationManagement $subject,
        $result,
        $cartId,
        ShippingInformationInterface $addressInformation
    ) {
        if ($this->debugConfig->isDebugEnabled()) {
            $this->logger->info('=== AFD PCE: ShippingInformationManagementPlugin::afterSaveAddressInformation CALLED ===');
            $this->logger->info('Cart ID: ' . $cartId);
        }
        
        try {
            // Check if we have metadata from the before plugin
            if (!$this->pendingMetadata) {
                if ($this->debugConfig->isDebugEnabled()) {
                    $this->logger->info('[AFD PCE Metadata] No pending metadata to save, checking for saved customer address');
                }

                // Fallback: check if shipping address uses a saved customer address
                $this->copyFromCustomerAddress($cartId);

                return $result;
            }
            
            $metadata = $this->pendingMetadata['metadata'];
            $isAfdValidated = $this->pendingMetadata['is_validated'];
            
            if ($this->debugConfig->isDebugEnabled()) {
                $this->logger->info('[AFD PCE Metadata] Processing pending metadata: ' . $metadata . ', is_validated = ' . ($isAfdValidated ? 'true' : 'false'));
            }
            
            // Get the quote with the saved shipping address (which has an ID)
            $quote = $this->cartRepository->getActive($cartId);
            $savedShippingAddress = $quote->getShippingAddress();
            
            if (!$savedShippingAddress || !$savedShippingAddress->getId()) {
                if ($this->debugConfig->isDebugEnabled()) {
                    $this->logger->info('[AFD PCE Metadata] Saved shipping address has no ID yet');
                }
                return $result;
            }
            
            // Try to find existing metadata for this address
            try {
                $addressMetadata = $this->quoteAddressMetadataRepository->getByParentId(
                    (int)$savedShippingAddress->getId(),
                    'quote'
                );
                if ($this->debugConfig->isDebugEnabled()) {
                    $this->logger->info('[AFD PCE Metadata] Found existing metadata for address ID: ' . $savedShippingAddress->getId() . ', current is_validated: ' . ($addressMetadata->getIsValidated() ? 'true' : 'false'));
                }
            } catch (\Magento\Framework\Exception\NoSuchEntityException $e) {
                // Create new metadata if not found
                $addressMetadata = $this->quoteAddressMetadataFactory->create();
                $addressMetadata->setParentId((int)$savedShippingAddress->getId());
                if ($this->debugConfig->isDebugEnabled()) {
                    $this->logger->info('[AFD PCE Metadata] Created new metadata for address ID: ' . $savedShippingAddress->getId());
                }
            }
            
            // Set metadata and is_validated flag (only true if actual AFD data exists)
            $addressMetadata->setMetadata($metadata);
            $addressMetadata->setIsValidated($isAfdValidated);
            $addressMetadata->setParentType('quote');
            
            if ($this->debugConfig->isDebugEnabled()) {
                $this->logger->info('[AFD PCE Metadata] About to save with is_validated = ' . ($isAfdValidated ? 'true' : 'false') . ' for address ID: ' . $savedShippingAddress->getId());
            }
            $this->quoteAddressMetadataRepository->save($addressMetadata);
            if ($this->debugConfig->isDebugEnabled()) {
                $this->logger->info('[AFD PCE Metadata] Saved metadata for address ID: ' . $savedShippingAddress->getId());
            }
            
            // Save map_data if present and Precision Delivery is enabled
            $mapData = $this->pendingMetadata['map_data'] ?? null;
            $this->saveMapData($mapData, (int)$savedShippingAddress->getId());

            // If no map_data was provided (e.g. saved address selected via frontend sends metadata
            // in the HTTP header but not map_data), fall back to copying from the customer address
            if (!$mapData && $this->precisionDeliveryHelper->isEnabled()) {
                $this->copyMapDataFromCustomerAddress($savedShippingAddress);
            }

            // Clear the pending metadata
            $this->pendingMetadata = null;
        } catch (\Exception $e) {
            // Log but don't interrupt checkout
            $this->logger->error('Error saving AFD PCE metadata: ' . $e->getMessage());
        }
        
        return $result;
    }
    
    /**
     * Save map data if Precision Delivery is enabled
     *
     * @param array|null $mapDataArray
     * @param int $addressId
     * @return void
     */
    private function saveMapData($mapDataArray, int $addressId): void
    {
        if (!$this->precisionDeliveryHelper->isEnabled()) {
            return;
        }
        
        if (!$mapDataArray || !is_array($mapDataArray)) {
            if ($this->debugConfig->isDebugEnabled()) {
                $this->logger->info('[AFD PCE MapData] No map_data provided');
            }
            return;
        }
        
        try {
            
            if ($this->debugConfig->isDebugEnabled()) {
                $this->logger->info('[AFD PCE MapData] Processing map_data: ' . json_encode($mapDataArray));
            }
            
            // Try to find existing map data for this address
            try {
                $mapData = $this->quoteAddressMapDataRepository->getByParentId($addressId);
                if ($this->debugConfig->isDebugEnabled()) {
                    $this->logger->info('[AFD PCE MapData] Found existing map data for address ID: ' . $addressId);
                }
            } catch (\Magento\Framework\Exception\NoSuchEntityException $e) {
                // Create new map data if not found
                $mapData = $this->quoteAddressMapDataFactory->create();
                $mapData->setParentId($addressId);
                if ($this->debugConfig->isDebugEnabled()) {
                    $this->logger->info('[AFD PCE MapData] Created new map data for address ID: ' . $addressId);
                }
            }
            
            // Set map data fields
            $mapData->setOriginalLat($mapDataArray['original_lat'] ?? null);
            $mapData->setOriginalLng($mapDataArray['original_lng'] ?? null);
            $mapData->setSelectedLat($mapDataArray['selected_lat'] ?? null);
            $mapData->setSelectedLng($mapDataArray['selected_lng'] ?? null);
            $mapData->setDistanceFromAddress($mapDataArray['distance_from_address'] ?? 0);
            $mapData->setUrbanRural($mapDataArray['urban_rural'] ?? null);
            $mapData->setIsAdjusted($mapDataArray['is_adjusted'] ?? false);
            $mapData->setDeliveryNotes($mapDataArray['delivery_notes'] ?? null);
            
            $this->quoteAddressMapDataRepository->save($mapData);
            
            if ($this->debugConfig->isDebugEnabled()) {
                $this->logger->info('[AFD PCE MapData] Saved map data for address ID: ' . $addressId);
            }
        } catch (\Exception $e) {
            $this->logger->error('[AFD PCE MapData] Error saving map data: ' . $e->getMessage());
        }
    }

    /**
     * Copy map data from a saved customer address to the quote shipping address
     *
     * When a saved address is selected, the frontend sends metadata via the HTTP header
     * but does not include map_data. This method copies map data from the customer address
     * to the quote address so it can flow through to the order.
     *
     * @param \Magento\Quote\Model\Quote\Address $shippingAddress
     * @return void
     */
    private function copyMapDataFromCustomerAddress($shippingAddress): void
    {
        try {
            $customerAddressId = $shippingAddress->getCustomerAddressId();
            if (!$customerAddressId) {
                return;
            }

            $quoteAddressId = (int)$shippingAddress->getId();

            // Check if quote address already has map data
            try {
                $this->quoteAddressMapDataRepository->getByParentId($quoteAddressId);
                if ($this->debugConfig->isDebugEnabled()) {
                    $this->logger->info('[AFD PCE MapData] Quote address already has map data, skipping customer copy');
                }
                return;
            } catch (\Magento\Framework\Exception\NoSuchEntityException $e) {
                // No existing map data, proceed with copy
            }

            $customerMapData = $this->customerAddressMapDataRepository->getByParentId(
                (int)$customerAddressId
            );

            $quoteMapData = $this->quoteAddressMapDataFactory->create();
            $quoteMapData->setParentId($quoteAddressId);
            $quoteMapData->setOriginalLat($customerMapData->getOriginalLat());
            $quoteMapData->setOriginalLng($customerMapData->getOriginalLng());
            $quoteMapData->setSelectedLat($customerMapData->getSelectedLat());
            $quoteMapData->setSelectedLng($customerMapData->getSelectedLng());
            $quoteMapData->setDistanceFromAddress($customerMapData->getDistanceFromAddress());
            $quoteMapData->setUrbanRural($customerMapData->getUrbanRural());
            $quoteMapData->setIsAdjusted($customerMapData->getIsAdjusted());
            $quoteMapData->setDeliveryNotes($customerMapData->getDeliveryNotes());
            $this->quoteAddressMapDataRepository->save($quoteMapData);

            if ($this->debugConfig->isDebugEnabled()) {
                $this->logger->info('[AFD PCE MapData] Copied map data from customer address ' . $customerAddressId . ' to quote address ' . $quoteAddressId);
            }
        } catch (\Magento\Framework\Exception\NoSuchEntityException $e) {
            if ($this->debugConfig->isDebugEnabled()) {
                $this->logger->info('[AFD PCE MapData] No map data found for customer address ID: ' . ($shippingAddress->getCustomerAddressId() ?? 'null'));
            }
        } catch (\Exception $e) {
            $this->logger->error('[AFD PCE MapData] Error copying map data from customer address: ' . $e->getMessage());
        }
    }

    /**
     * Copy metadata and map data from a saved customer address to the quote shipping address
     *
     * When a customer selects a saved address during checkout, the frontend does not send
     * metadata or map data via extension attributes. This method checks if the shipping
     * address references a saved customer address and copies the stored data to the quote.
     *
     * @param int $cartId
     * @return void
     */
    private function copyFromCustomerAddress($cartId): void
    {
        try {
            $quote = $this->cartRepository->getActive($cartId);
            $shippingAddress = $quote->getShippingAddress();

            if (!$shippingAddress || !$shippingAddress->getId()) {
                return;
            }

            $customerAddressId = $shippingAddress->getCustomerAddressId();
            if (!$customerAddressId) {
                return;
            }

            if ($this->debugConfig->isDebugEnabled()) {
                $this->logger->info('[AFD PCE] Shipping address uses saved customer address ID: ' . $customerAddressId);
            }

            $quoteAddressId = (int)$shippingAddress->getId();

            // Copy metadata from customer address to quote address
            try {
                $customerMetadata = $this->customerAddressMetadataRepository->getByParentId(
                    (int)$customerAddressId,
                    'customer'
                );

                if ($customerMetadata && $customerMetadata->getMetadata()) {
                    // Check if quote address already has metadata
                    try {
                        $this->quoteAddressMetadataRepository->getByParentId($quoteAddressId, 'quote');
                        if ($this->debugConfig->isDebugEnabled()) {
                            $this->logger->info('[AFD PCE] Quote address already has metadata, skipping copy');
                        }
                    } catch (\Magento\Framework\Exception\NoSuchEntityException $e) {
                        $quoteMetadata = $this->quoteAddressMetadataFactory->create();
                        $quoteMetadata->setParentId($quoteAddressId);
                        $quoteMetadata->setMetadata($customerMetadata->getMetadata());
                        $quoteMetadata->setIsValidated($customerMetadata->getIsValidated());
                        $quoteMetadata->setParentType('quote');
                        $this->quoteAddressMetadataRepository->save($quoteMetadata);

                        if ($this->debugConfig->isDebugEnabled()) {
                            $this->logger->info('[AFD PCE] Copied customer address metadata to quote address ID: ' . $quoteAddressId);
                        }
                    }
                }
            } catch (\Magento\Framework\Exception\NoSuchEntityException $e) {
                if ($this->debugConfig->isDebugEnabled()) {
                    $this->logger->info('[AFD PCE] No metadata found for customer address ID: ' . $customerAddressId);
                }
            }

            // Copy map data from customer address to quote address
            if ($this->precisionDeliveryHelper->isEnabled()) {
                try {
                    $customerMapData = $this->customerAddressMapDataRepository->getByParentId(
                        (int)$customerAddressId
                    );

                    // Check if quote address already has map data
                    try {
                        $this->quoteAddressMapDataRepository->getByParentId($quoteAddressId);
                        if ($this->debugConfig->isDebugEnabled()) {
                            $this->logger->info('[AFD PCE] Quote address already has map data, skipping copy');
                        }
                    } catch (\Magento\Framework\Exception\NoSuchEntityException $e) {
                        $quoteMapData = $this->quoteAddressMapDataFactory->create();
                        $quoteMapData->setParentId($quoteAddressId);
                        $quoteMapData->setOriginalLat($customerMapData->getOriginalLat());
                        $quoteMapData->setOriginalLng($customerMapData->getOriginalLng());
                        $quoteMapData->setSelectedLat($customerMapData->getSelectedLat());
                        $quoteMapData->setSelectedLng($customerMapData->getSelectedLng());
                        $quoteMapData->setDistanceFromAddress($customerMapData->getDistanceFromAddress());
                        $quoteMapData->setUrbanRural($customerMapData->getUrbanRural());
                        $quoteMapData->setIsAdjusted($customerMapData->getIsAdjusted());
                        $quoteMapData->setDeliveryNotes($customerMapData->getDeliveryNotes());
                        $this->quoteAddressMapDataRepository->save($quoteMapData);

                        if ($this->debugConfig->isDebugEnabled()) {
                            $this->logger->info('[AFD PCE] Copied customer address map data to quote address ID: ' . $quoteAddressId);
                        }
                    }
                } catch (\Magento\Framework\Exception\NoSuchEntityException $e) {
                    if ($this->debugConfig->isDebugEnabled()) {
                        $this->logger->info('[AFD PCE] No map data found for customer address ID: ' . $customerAddressId);
                    }
                }
            }
        } catch (\Exception $e) {
            $this->logger->error('[AFD PCE] Error copying customer address data to quote: ' . $e->getMessage());
        }
    }
}
