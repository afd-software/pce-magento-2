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
use Afd\Pce\Model\QuoteAddressMetadataRepository;
use Afd\Pce\Model\QuoteAddressMetadataFactory;
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
     * @var RequestInterface
     */
    private $request;
    
    /**
     * @var array|null Temporarily stores metadata extracted in beforeSaveAddressInformation
     */
    private $pendingMetadata = null;
    
    /**
     * Constructor
     *
     * @param QuoteAddressMetadataRepository $quoteAddressMetadataRepository
     * @param QuoteAddressMetadataFactory $quoteAddressMetadataFactory
     * @param CartRepositoryInterface $cartRepository
     * @param RequestInterface $request
     * @param LoggerInterface $logger
     * @param DebugConfig $debugConfig
     */
    public function __construct(
        QuoteAddressMetadataRepository $quoteAddressMetadataRepository,
        QuoteAddressMetadataFactory $quoteAddressMetadataFactory,
        CartRepositoryInterface $cartRepository,
        RequestInterface $request,
        LoggerInterface $logger,
        DebugConfig $debugConfig
    ) {
        $this->quoteAddressMetadataRepository = $quoteAddressMetadataRepository;
        $this->quoteAddressMetadataFactory = $quoteAddressMetadataFactory;
        $this->cartRepository = $cartRepository;
        $this->request = $request;
        $this->logger = $logger;
        $this->debugConfig = $debugConfig;
    }
    
    /**
     * Before save shipping information - extract and store metadata, then remove from address
     * to prevent response serialization issues in Magento 2.4.5
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
                }
                try {
                    $metadataArray = json_decode($headerMetadata, true);
                    $this->pendingMetadata = [
                        'metadata' => $metadataArray['metadata'] ?? '{}',
                        'is_validated' => $metadataArray['is_validated'] ?? false
                    ];
                    if ($this->debugConfig->isDebugEnabled()) {
                        $this->logger->info('[AFD PCE Metadata] Stored metadata from HTTP header');
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
                } else {
                    $metadata = $afdMetadata->getMetadata();
                    $isAfdValidated = $afdMetadata->getIsValidated();
                }
                
                // Store temporarily for use in afterSaveAddressInformation
                $this->pendingMetadata = [
                    'metadata' => $metadata,
                    'is_validated' => $isAfdValidated
                ];
                
                // Remove from response to prevent serialization issues
                $extensionAttributes->setAfdAddressMetadata(null);
                if ($this->debugConfig->isDebugEnabled()) {
                    $this->logger->info('[AFD PCE Metadata] Removed extension attribute from response');
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
                    $this->logger->info('[AFD PCE Metadata] No pending metadata to save');
                }
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
            
            // Clear the pending metadata
            $this->pendingMetadata = null;
        } catch (\Exception $e) {
            // Log but don't interrupt checkout
            $this->logger->error('Error saving AFD PCE metadata: ' . $e->getMessage());
        }
        
        return $result;
    }
}
