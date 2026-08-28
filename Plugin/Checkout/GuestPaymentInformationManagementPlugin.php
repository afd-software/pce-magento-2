<?php
/**
 * AFD PCE Guest Payment Information Management Plugin
 *
 * This plugin handles the AFD PCE metadata for billing addresses during guest checkout payment
 * It prevents extension attributes from corrupting the API response by extracting and removing them
 * before the response is built, then saving them to the database afterwards.
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Plugin\Checkout;

use Afd\Pce\Helper\DebugConfig;
use Afd\Pce\Helper\PrecisionDelivery;
use Afd\Pce\Model\QuoteAddressMetadataRepository;
use Afd\Pce\Model\QuoteAddressMetadataFactory;
use Afd\Pce\Model\QuoteAddressMapDataRepository;
use Afd\Pce\Model\QuoteAddressMapDataFactory;
use Magento\Checkout\Model\GuestPaymentInformationManagement;
use Magento\Framework\App\RequestInterface;
use Magento\Quote\Api\CartRepositoryInterface;
use Magento\Quote\Api\Data\AddressInterface;
use Magento\Quote\Api\Data\PaymentInterface;
use Magento\Quote\Model\QuoteIdMaskFactory;
use Psr\Log\LoggerInterface;

/**
 * Plugin for Magento\Checkout\Model\GuestPaymentInformationManagement
 */
class GuestPaymentInformationManagementPlugin
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
     * @var CartRepositoryInterface
     */
    private $cartRepository;
    
    /**
     * @var QuoteIdMaskFactory
     */
    private $quoteIdMaskFactory;
    
    /**
     * @var LoggerInterface
     */
    private $logger;
    
    /**
     * @var RequestInterface
     */
    private $request;
    
    /**
     * @var QuoteAddressMapDataRepository
     */
    private $quoteAddressMapDataRepository;
    
    /**
     * @var QuoteAddressMapDataFactory
     */
    private $quoteAddressMapDataFactory;
    
    /**
     * @var PrecisionDelivery
     */
    private $precisionDeliveryHelper;
    
    /**
     * @var array|null Temporarily stores metadata extracted in before plugin
     */
    private $pendingMetadata = null;
    
    /**
     * Constructor
     *
     * @param QuoteAddressMetadataRepository $quoteAddressMetadataRepository
     * @param QuoteAddressMetadataFactory $quoteAddressMetadataFactory
     * @param CartRepositoryInterface $cartRepository
     * @param QuoteIdMaskFactory $quoteIdMaskFactory
     * @param RequestInterface $request
     * @param LoggerInterface $logger
     * @param QuoteAddressMapDataRepository $quoteAddressMapDataRepository
     * @param QuoteAddressMapDataFactory $quoteAddressMapDataFactory
     * @param PrecisionDelivery $precisionDeliveryHelper
     */
    public function __construct(
        QuoteAddressMetadataRepository $quoteAddressMetadataRepository,
        QuoteAddressMetadataFactory $quoteAddressMetadataFactory,
        CartRepositoryInterface $cartRepository,
        QuoteIdMaskFactory $quoteIdMaskFactory,
        RequestInterface $request,
        LoggerInterface $logger,
        QuoteAddressMapDataRepository $quoteAddressMapDataRepository,
        QuoteAddressMapDataFactory $quoteAddressMapDataFactory,
        PrecisionDelivery $precisionDeliveryHelper
    ) {
        $this->quoteAddressMetadataRepository = $quoteAddressMetadataRepository;
        $this->quoteAddressMetadataFactory = $quoteAddressMetadataFactory;
        $this->cartRepository = $cartRepository;
        $this->quoteIdMaskFactory = $quoteIdMaskFactory;
        $this->request = $request;
        $this->logger = $logger;
        $this->quoteAddressMapDataRepository = $quoteAddressMapDataRepository;
        $this->quoteAddressMapDataFactory = $quoteAddressMapDataFactory;
        $this->precisionDeliveryHelper = $precisionDeliveryHelper;
    }
    
    /**
     * Around save payment information - extract and store metadata from addresses,
     * remove extension attributes to prevent array_diff issues, then proceed
     *
     * @param GuestPaymentInformationManagement $subject
     * @param callable $proceed
     * @param string $cartId
     * @param string $email
     * @param PaymentInterface $paymentMethod
     * @param AddressInterface|null $billingAddress
     * @return int
     */
    public function aroundSavePaymentInformationAndPlaceOrder(
        GuestPaymentInformationManagement $subject,
        callable $proceed,
        $cartId,
        $email,
        PaymentInterface $paymentMethod,
        ?AddressInterface $billingAddress = null
    ) {
        $this->logger->info('=== AFD PCE: GuestPaymentInformationManagementPlugin::aroundSavePaymentInformationAndPlaceOrder CALLED ===');
        $this->logger->info('Cart ID: ' . $cartId);
        
        try {
            /*
             * LEGACY SUPPORT (can be removed when Magento 2.4.5 and 2.4.6 are EOL):
             * Check for metadata in custom HTTP header (used by Magento 2.4.5 and 2.4.6)
             */
            $headerMetadata = $this->request->getHeader('X-AFD-Address-Metadata');
            if ($headerMetadata) {
                $this->logger->info('[AFD PCE Metadata] Found billing metadata in HTTP header (Magento 2.4.5/2.4.6 mode)');
                try {
                    $metadataArray = json_decode($headerMetadata, true);
                    $this->pendingMetadata = [
                        'metadata' => $metadataArray['metadata'] ?? '{}',
                        'is_validated' => $metadataArray['is_validated'] ?? false,
                        'map_data' => $metadataArray['map_data'] ?? null,
                        'masked_cart_id' => $cartId
                    ];
                    $this->logger->info('[AFD PCE Metadata] Stored billing metadata from HTTP header');
                    if (isset($metadataArray['map_data'])) {
                        $this->logger->info('[AFD PCE Metadata] map_data found in header: ' . json_encode($metadataArray['map_data']));
                    }
                } catch (\Exception $e) {
                    $this->logger->error('[AFD PCE Metadata] Error parsing HTTP header metadata: ' . $e->getMessage());
                }
            }
            
            $quoteIdMask = $this->quoteIdMaskFactory->create()->load($cartId, 'masked_id');
            $realCartId = $quoteIdMask->getQuoteId();
            $quote = $this->cartRepository->getActive($realCartId);
            
            /*
             * LEGACY SUPPORT (can be removed when Magento 2.4.5 and 2.4.6 are EOL):
             * Clean extension attributes from addresses to prevent CheckoutStaging's array_diff() errors.
             * In 2.4.5/2.4.6, extension attribute objects cause "AddressExtension could not be converted to string" errors.
             */
            $shippingAddress = $quote->getShippingAddress();
            if ($shippingAddress) {
                $this->logger->info('[AFD PCE Metadata] Cleaning shipping address extension attributes');
                
                $addressData = $shippingAddress->getData();
                if (isset($addressData['extension_attributes'])) {
                    unset($addressData['extension_attributes']);
                    $shippingAddress->setData($addressData);
                    $this->logger->info('[AFD PCE Metadata] Removed extension_attributes from shipping address');
                }
            }
            
            // Clean billing address (if provided)
            if ($billingAddress) {
                // If no HTTP header, check for metadata in extension attributes
                if (!$headerMetadata) {
                    $extensionAttributes = $billingAddress->getExtensionAttributes();
                    
                    if ($extensionAttributes && method_exists($extensionAttributes, 'getAfdAddressMetadata')) {
                        $afdMetadata = $extensionAttributes->getAfdAddressMetadata();
                        
                        if ($afdMetadata) {
                            $this->logger->info('[AFD PCE Metadata] Found metadata in guest billing address extension attributes');
                            
                            // Handle both object and array formats
                            if (is_array($afdMetadata)) {
                                $metadata = $afdMetadata['metadata'] ?? null;
                                $isAfdValidated = $afdMetadata['is_validated'] ?? false;
                            } else {
                                $metadata = $afdMetadata->getMetadata();
                                $isAfdValidated = $afdMetadata->getIsValidated();
                            }
                            
                            // Store metadata
                            $this->pendingMetadata = [
                                'metadata' => $metadata,
                                'is_validated' => $isAfdValidated,
                                'masked_cart_id' => $cartId
                            ];
                            
                            $this->logger->info('[AFD PCE Metadata] Stored billing metadata from extension attributes');
                        }
                    }
                }
                
                // Remove extension attributes from billing address (regardless of source)
                $billingData = $billingAddress->getData();
                if (isset($billingData['extension_attributes'])) {
                    $this->logger->info('[AFD PCE Metadata] Removing extension_attributes key from billing address data array');
                    unset($billingData['extension_attributes']);
                    $billingAddress->setData($billingData);
                    $this->logger->info('[AFD PCE Metadata] Successfully removed extension_attributes from billing address data');
                }
            }
        } catch (\Exception $e) {
            $this->logger->error('[AFD PCE] Error in aroundSavePaymentInformationAndPlaceOrder: ' . $e->getMessage());
        }
        
        // Call the original method
        $this->logger->info('[AFD PCE Metadata] Calling proceed to place order');
        $result = $proceed($cartId, $email, $paymentMethod, $billingAddress);
        $this->logger->info('[AFD PCE Metadata] Order placed, result: ' . $result);
        
        // Now save the metadata after the order is placed
        // The $result is the order ID, we need to load the order to get the billing address
        try {
            // Check if we have metadata from the before part
            if ($this->pendingMetadata) {
                $metadata = $this->pendingMetadata['metadata'];
                $isAfdValidated = $this->pendingMetadata['is_validated'];
                
                $this->logger->info('[AFD PCE Metadata] Processing pending guest billing metadata: ' . $metadata . ', is_validated = ' . ($isAfdValidated ? 'true' : 'false'));
                
                // Load the order to get the billing address
                $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
                $orderRepository = $objectManager->get(\Magento\Sales\Api\OrderRepositoryInterface::class);
                $order = $orderRepository->get($result);
                
                $orderBillingAddress = $order->getBillingAddress();
                
                if ($orderBillingAddress && $orderBillingAddress->getId()) {
                    // Get the order address metadata repository and factory
                    $orderAddressMetadataRepository = $objectManager->get(\Afd\Pce\Model\OrderAddressMetadataRepository::class);
                    $orderAddressMetadataFactory = $objectManager->get(\Afd\Pce\Model\OrderAddressMetadataFactory::class);
                    
                    // Try to find existing metadata for this order address
                    try {
                        $addressMetadata = $orderAddressMetadataRepository->getByParentId(
                            (int)$orderBillingAddress->getId(),
                            'order'
                        );
                        $this->logger->info('[AFD PCE Metadata] Found existing metadata for order billing address ID: ' . $orderBillingAddress->getId());
                    } catch (\Magento\Framework\Exception\NoSuchEntityException $e) {
                        // Create new metadata if not found
                        $addressMetadata = $orderAddressMetadataFactory->create();
                        $addressMetadata->setParentId((int)$orderBillingAddress->getId());
                        $this->logger->info('[AFD PCE Metadata] Created new metadata for order billing address ID: ' . $orderBillingAddress->getId());
                    }
                    
                    // Set metadata and is_validated flag
                    $addressMetadata->setMetadata($metadata);
                    $addressMetadata->setIsValidated($isAfdValidated);
                    $addressMetadata->setParentType('order');
                    
                    $this->logger->info('[AFD PCE Metadata] About to save order billing metadata with is_validated = ' . ($isAfdValidated ? 'true' : 'false') . ' for address ID: ' . $orderBillingAddress->getId());
                    $orderAddressMetadataRepository->save($addressMetadata);
                    $this->logger->info('[AFD PCE Metadata] Saved order billing metadata for address ID: ' . $orderBillingAddress->getId());
                    
                    // Save map_data if present and Precision Delivery is enabled
                    $mapData = $this->pendingMetadata['map_data'] ?? null;
                    if ($mapData && $this->precisionDeliveryHelper->isEnabled()) {
                        $this->saveOrderMapData($mapData, (int)$orderBillingAddress->getId());
                    }
                }
                
                // Clear the pending metadata
                $this->pendingMetadata = null;
            }
        } catch (\Exception $e) {
            // Log but don't interrupt checkout
            $this->logger->error('Error saving AFD PCE guest billing metadata: ' . $e->getMessage());
        }
        
        return $result;
    }
    
    /**
     * Save map data to order address if Precision Delivery is enabled
     *
     * @param array|null $mapDataArray
     * @param int $orderAddressId
     * @return void
     */
    private function saveOrderMapData($mapDataArray, int $orderAddressId): void
    {
        if (!$mapDataArray || !is_array($mapDataArray)) {
            $this->logger->info('[AFD PCE MapData] No map_data provided for order billing');
            return;
        }
        
        try {
            $this->logger->info('[AFD PCE MapData] Processing map_data for order billing: ' . json_encode($mapDataArray));
            
            $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
            $orderAddressMapDataRepository = $objectManager->get(\Afd\Pce\Model\OrderAddressMapDataRepository::class);
            $orderAddressMapDataFactory = $objectManager->get(\Afd\Pce\Model\OrderAddressMapDataFactory::class);
            
            // Try to find existing map data for this order address
            try {
                $mapData = $orderAddressMapDataRepository->getByParentId($orderAddressId);
                $this->logger->info('[AFD PCE MapData] Found existing map data for order billing address ID: ' . $orderAddressId);
            } catch (\Magento\Framework\Exception\NoSuchEntityException $e) {
                // Create new map data if not found
                $mapData = $orderAddressMapDataFactory->create();
                $mapData->setParentId($orderAddressId);
                $this->logger->info('[AFD PCE MapData] Created new map data for order billing address ID: ' . $orderAddressId);
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
            
            $orderAddressMapDataRepository->save($mapData);
            
            $this->logger->info('[AFD PCE MapData] Saved map data for order billing address ID: ' . $orderAddressId);
        } catch (\Exception $e) {
            $this->logger->error('[AFD PCE MapData] Error saving map data for order billing: ' . $e->getMessage());
        }
    }
}
