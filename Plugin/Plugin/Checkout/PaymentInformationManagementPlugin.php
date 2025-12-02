<?php
/**
 * AFD PCE Payment Information Management Plugin
 *
 * This plugin handles the AFD PCE metadata for billing addresses during payment information save
 * It prevents extension attributes from corrupting the API response by extracting and removing them
 * before the response is built, then saving them to the database afterwards.
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Plugin\Checkout;

use Afd\Pce\Model\QuoteAddressMetadataRepository;
use Afd\Pce\Model\QuoteAddressMetadataFactory;
use Magento\Checkout\Model\PaymentInformationManagement;
use Magento\Framework\App\RequestInterface;
use Magento\Quote\Api\CartRepositoryInterface;
use Magento\Quote\Api\Data\AddressInterface;
use Magento\Quote\Api\Data\PaymentInterface;
use Psr\Log\LoggerInterface;

/**
 * Plugin for Magento\Checkout\Model\PaymentInformationManagement
 */
class PaymentInformationManagementPlugin
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
     * @var RequestInterface
     */
    private $request;
    
    /**
     * @var LoggerInterface
     */
    private $logger;
    
    /**
     * @var array|null Temporarily stores metadata extracted in around plugin
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
     */
    public function __construct(
        QuoteAddressMetadataRepository $quoteAddressMetadataRepository,
        QuoteAddressMetadataFactory $quoteAddressMetadataFactory,
        CartRepositoryInterface $cartRepository,
        RequestInterface $request,
        LoggerInterface $logger
    ) {
        $this->quoteAddressMetadataRepository = $quoteAddressMetadataRepository;
        $this->quoteAddressMetadataFactory = $quoteAddressMetadataFactory;
        $this->cartRepository = $cartRepository;
        $this->request = $request;
        $this->logger = $logger;
    }
    
    /**
     * Around save payment information - extract and store metadata from addresses,
     * remove extension attributes to prevent array_diff issues, then proceed
     *
     * @param PaymentInformationManagement $subject
     * @param callable $proceed
     * @param int $cartId
     * @param PaymentInterface $paymentMethod
     * @param AddressInterface|null $billingAddress
     * @return int
     */
    public function aroundSavePaymentInformation(
        PaymentInformationManagement $subject,
        callable $proceed,
        $cartId,
        PaymentInterface $paymentMethod,
        AddressInterface $billingAddress = null
    ) {
        $this->logger->info('=== AFD PCE: PaymentInformationManagementPlugin::aroundSavePaymentInformation CALLED ===');
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
                        'is_validated' => $metadataArray['is_validated'] ?? false
                    ];
                    $this->logger->info('[AFD PCE Metadata] Stored billing metadata from HTTP header');
                } catch (\Exception $e) {
                    $this->logger->error('[AFD PCE Metadata] Error parsing HTTP header metadata: ' . $e->getMessage());
                }
            }
            
            $quote = $this->cartRepository->getActive($cartId);
            
            /*
             * LEGACY SUPPORT (can be removed when Magento 2.4.5 and 2.4.6 are EOL):
             * Clean extension attributes from addresses to prevent CheckoutStaging's array_diff() errors
             */
            $shippingAddress = $quote->getShippingAddress();
            if ($shippingAddress) {
                $addressData = $shippingAddress->getData();
                if (isset($addressData['extension_attributes'])) {
                    unset($addressData['extension_attributes']);
                    $shippingAddress->setData($addressData);
                    $this->logger->info('[AFD PCE Metadata] Removed extension_attributes from shipping address');
                }
            }
            
            // Handle billing address
            if ($billingAddress) {
                // If no HTTP header, check for metadata in extension attributes
                if (!$headerMetadata) {
                    $extensionAttributes = $billingAddress->getExtensionAttributes();
                    
                    if ($extensionAttributes && method_exists($extensionAttributes, 'getAfdAddressMetadata')) {
                        $afdMetadata = $extensionAttributes->getAfdAddressMetadata();
                        
                        if ($afdMetadata) {
                            $this->logger->info('[AFD PCE Metadata] Found metadata in billing extension attributes');
                            
                            // Handle both object and array formats
                            if (is_array($afdMetadata)) {
                                $metadata = $afdMetadata['metadata'] ?? null;
                                $isAfdValidated = $afdMetadata['is_validated'] ?? false;
                            } else {
                                $metadata = $afdMetadata->getMetadata();
                                $isAfdValidated = $afdMetadata->getIsValidated();
                            }
                            
                            $this->pendingMetadata = [
                                'metadata' => $metadata,
                                'is_validated' => $isAfdValidated
                            ];
                            
                            $this->logger->info('[AFD PCE Metadata] Stored billing metadata from extension attributes');
                        }
                    }
                }
                
                // Remove extension_attributes from billing address data
                $billingData = $billingAddress->getData();
                if (isset($billingData['extension_attributes'])) {
                    unset($billingData['extension_attributes']);
                    $billingAddress->setData($billingData);
                    $this->logger->info('[AFD PCE Metadata] Removed extension_attributes from billing address');
                }
            }
        } catch (\Exception $e) {
            $this->logger->error('[AFD PCE] Error in aroundSavePaymentInformation: ' . $e->getMessage());
        }
        
        // Call the original method
        $this->logger->info('[AFD PCE Metadata] Calling proceed to save payment information');
        $result = $proceed($cartId, $paymentMethod, $billingAddress);
        $this->logger->info('[AFD PCE Metadata] Payment information saved');
        
        // Now save the metadata after payment info is saved
        try {
            // Check if we have metadata from the before part
            if ($this->pendingMetadata) {
                $metadata = $this->pendingMetadata['metadata'];
                $isAfdValidated = $this->pendingMetadata['is_validated'];
                
                $this->logger->info('[AFD PCE Metadata] Processing pending billing metadata: ' . $metadata . ', is_validated = ' . ($isAfdValidated ? 'true' : 'false'));
                
                // Get the quote with the saved billing address (which has an ID)
                $quote = $this->cartRepository->getActive($cartId);
                $savedBillingAddress = $quote->getBillingAddress();
                
                if ($savedBillingAddress && $savedBillingAddress->getId()) {
                    // Try to find existing metadata for this address
                    try {
                        $addressMetadata = $this->quoteAddressMetadataRepository->getByParentId(
                            (int)$savedBillingAddress->getId(),
                            'quote'
                        );
                        $this->logger->info('[AFD PCE Metadata] Found existing metadata for billing address ID: ' . $savedBillingAddress->getId());
                    } catch (\Magento\Framework\Exception\NoSuchEntityException $e) {
                        // Create new metadata if not found
                        $addressMetadata = $this->quoteAddressMetadataFactory->create();
                        $addressMetadata->setParentId((int)$savedBillingAddress->getId());
                        $this->logger->info('[AFD PCE Metadata] Created new metadata for billing address ID: ' . $savedBillingAddress->getId());
                    }
                    
                    // Set metadata and is_validated flag
                    $addressMetadata->setMetadata($metadata);
                    $addressMetadata->setIsValidated($isAfdValidated);
                    $addressMetadata->setParentType('quote');
                    
                    $this->logger->info('[AFD PCE Metadata] About to save billing metadata with is_validated = ' . ($isAfdValidated ? 'true' : 'false') . ' for address ID: ' . $savedBillingAddress->getId());
                    $this->quoteAddressMetadataRepository->save($addressMetadata);
                    $this->logger->info('[AFD PCE Metadata] Saved billing metadata for address ID: ' . $savedBillingAddress->getId());
                }
                
                // Clear the pending metadata
                $this->pendingMetadata = null;
            }
        } catch (\Exception $e) {
            // Log but don't interrupt checkout
            $this->logger->error('Error saving AFD PCE billing metadata: ' . $e->getMessage());
        }
        
        return $result;
    }
}
