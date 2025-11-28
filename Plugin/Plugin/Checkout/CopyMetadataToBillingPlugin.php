<?php
/**
 * AFD PCE Copy Metadata To Billing Plugin
 *
 * Handles billing address metadata during checkout by managing two different scenarios:
 * 
 * 1. NEW billing address (afterSavePaymentInformation):
 *    - Captures metadata from frontend validation
 *    - Saves to quote_address_metadata table
 *    - Flow: Frontend → Quote address metadata table → Order
 * 
 * 2. SAVED billing address (aroundSavePaymentInformationAndPlaceOrder):
 *    - Loads metadata from customer_address_metadata table
 *    - Attaches to quote before order placement
 *    - Flow: Customer address metadata table → Quote → Order
 *
 * @category    Afd
 * @package     Afd_Pce
 * @author      AFD Software
 */
declare(strict_types=1);

namespace Afd\Pce\Plugin\Checkout;

use Afd\Pce\Helper\DebugConfig;
use Afd\Pce\Model\QuoteAddressMetadataFactory;
use Afd\Pce\Model\QuoteAddressMetadataRepository;
use Magento\Framework\Exception\NoSuchEntityException;
use Magento\Quote\Api\CartRepositoryInterface;
use Magento\Quote\Api\Data\AddressInterface;
use Magento\Quote\Model\QuoteIdMaskFactory;
use Psr\Log\LoggerInterface;

class CopyMetadataToBillingPlugin
{
    /**
     * @var LoggerInterface
     */
    private $logger;

    /**
     * @var DebugConfig
     */
    private $debugConfig;

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
     * CopyMetadataToBillingPlugin constructor.
     *
     * @param LoggerInterface $logger
     * @param DebugConfig $debugConfig
     * @param QuoteAddressMetadataRepository $quoteAddressMetadataRepository
     * @param QuoteAddressMetadataFactory $quoteAddressMetadataFactory
     * @param CartRepositoryInterface $cartRepository
     * @param QuoteIdMaskFactory $quoteIdMaskFactory
     */
    public function __construct(
        LoggerInterface $logger,
        DebugConfig $debugConfig,
        QuoteAddressMetadataRepository $quoteAddressMetadataRepository,
        QuoteAddressMetadataFactory $quoteAddressMetadataFactory,
        CartRepositoryInterface $cartRepository,
        QuoteIdMaskFactory $quoteIdMaskFactory
    ) {
        $this->logger = $logger;
        $this->debugConfig = $debugConfig;
        $this->quoteAddressMetadataRepository = $quoteAddressMetadataRepository;
        $this->quoteAddressMetadataFactory = $quoteAddressMetadataFactory;
        $this->cartRepository = $cartRepository;
        $this->quoteIdMaskFactory = $quoteIdMaskFactory;
    }

    /**
     * Load existing customer address metadata BEFORE placing order
     * 
     * Purpose: When a customer selects a SAVED billing address during checkout (one with a customer_address_id),
     * this method loads the metadata from the customer_address_metadata table and attaches it to the quote
     * billing address BEFORE the order is placed. This ensures the metadata is available when the order
     * address is created.
     * 
     * Flow: Customer address metadata table → Quote billing address extension attributes → Order address
     * 
     * Example: Customer selects their saved "Home" address which was previously validated. This method
     * loads that validation metadata so it's included in the order.
     * 
     * @param mixed $subject
     * @param callable $proceed
     * @param string $cartId - Masked cart ID for guest checkout
     * @param string $email
     * @param mixed $paymentMethod
     * @param AddressInterface|null $billingAddress
     * @return mixed
     */
    public function aroundSavePaymentInformationAndPlaceOrder(
        $subject,
        callable $proceed,
        $cartId,
        $email,
        $paymentMethod,
        AddressInterface $billingAddress = null
    ) {
        if ($this->debugConfig->isDebugEnabled()) {
            $this->logger->info('=== AFD PCE: CopyMetadataToBillingPlugin::aroundSavePaymentInformationAndPlaceOrder CALLED ===');
        }
        
        // Get quote
        try {
            $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
            $quoteRepository = $objectManager->get('\Magento\Quote\Api\CartRepositoryInterface');
            $quoteIdMaskFactory = $objectManager->get('\Magento\Quote\Model\QuoteIdMaskFactory');
            $customerAddressMetadataRepository = $objectManager->get('Afd\Pce\Model\CustomerAddressMetadataRepository');
            
            $quoteIdMask = $quoteIdMaskFactory->create()->load($cartId, 'masked_id');
            $realQuoteId = $quoteIdMask->getQuoteId() ?: $cartId;
            
            $quote = $quoteRepository->get($realQuoteId);
            $quoteBillingAddress = $quote->getBillingAddress();
            
            if ($quoteBillingAddress && $quoteBillingAddress->getCustomerAddressId()) {
                if ($this->debugConfig->isDebugEnabled()) {
                    $this->logger->info('Billing address has customer_address_id: ' . $quoteBillingAddress->getCustomerAddressId());
                }
                
                // Load metadata from customer address metadata table
                try {
                    $customerMetadata = $customerAddressMetadataRepository->getByParentId(
                        (int)$quoteBillingAddress->getCustomerAddressId(),
                        'customer'
                    );
                    
                    if ($this->debugConfig->isDebugEnabled()) {
                        $this->logger->info('Found customer address metadata for billing: ' . $customerMetadata->getMetadata());
                    }
                    
                    // Set on quote billing address extension attributes
                    $quoteBillingExt = $quoteBillingAddress->getExtensionAttributes();
                    if ($quoteBillingExt && method_exists($quoteBillingExt, 'setAfdAddressMetadata')) {
                        $quoteBillingExt->setAfdAddressMetadata($customerMetadata);
                        $quoteBillingAddress->setExtensionAttributes($quoteBillingExt);
                        if ($this->debugConfig->isDebugEnabled()) {
                            $this->logger->info('Set customer address metadata on quote billing address');
                        }
                    }
                } catch (NoSuchEntityException $e) {
                    if ($this->debugConfig->isDebugEnabled()) {
                        $this->logger->info('No metadata found for customer address ID: ' . $quoteBillingAddress->getCustomerAddressId());
                    }
                }
            }
        } catch (\Exception $e) {
            $this->logger->error('Error loading billing metadata: ' . $e->getMessage());
        }
        
        // Call the original method to place the order
        return $proceed($cartId, $email, $paymentMethod, $billingAddress);
    }

    /**
     * Save NEW billing address metadata AFTER payment information is saved
     * 
     * Purpose: When a customer enters a NEW billing address during checkout (with metadata from frontend),
     * this method saves that metadata to the quote_address_metadata table. This happens AFTER the billing
     * address has been saved and has an ID.
     * 
     * Flow: Frontend metadata → Quote billing address extension attributes → Quote address metadata table
     * 
     * Example: Customer enters a new billing address and validates it. This method captures that validation
     * metadata and saves it to the database so it can be transferred to the order.
     * 
     * Technical Note: This plugin intercepts BOTH logged-in and guest checkout methods which have different
     * signatures, so we use flexible parameter names and detect which one by checking parameter types:
     * - Logged-in: PaymentInformationManagement::savePaymentInformation($cartId, $paymentMethod, $billingAddress)
     * - Guest: GuestPaymentInformationManagement::savePaymentInformation($cartId, $email, $paymentMethod, $billingAddress)
     *
     * @param mixed $subject
     * @param mixed $result
     * @param int|string $cartId - int for logged-in, string (masked ID) for guest
     * @param mixed $paymentMethodOrEmail - PaymentInterface for logged-in, email string for guest
     * @param mixed|null $billingAddressOrPaymentMethod - AddressInterface for logged-in, PaymentInterface for guest
     * @param AddressInterface|null $guestBillingAddress - Only used for guest checkout
     * @return mixed
     */
    public function afterSavePaymentInformation(
        $subject,
        $result,
        $cartId,
        $paymentMethodOrEmail,
        $billingAddressOrPaymentMethod = null,
        ?AddressInterface $guestBillingAddress = null
    ) {
        // Detect checkout type by checking if second param is a string (email for guest) or object (payment method for logged-in)
        $isGuest = is_string($paymentMethodOrEmail);
        
        if ($isGuest) {
            // Guest: ($cartId, $email, $paymentMethod, $billingAddress)
            $billingAddress = $guestBillingAddress;
        } else {
            // Logged-in: ($cartId, $paymentMethod, $billingAddress)
            $billingAddress = $billingAddressOrPaymentMethod;
        }
        
        return $this->processSavePaymentInformation($cartId, $billingAddress, $isGuest, $result);
    }

    /**
     * Common logic for processing payment information save
     *
     * @param int|string $cartId - int for logged-in, string (masked ID) for guest
     * @param AddressInterface|null $billingAddress
     * @param bool $isGuest
     * @param mixed $result
     * @return mixed
     */
    private function processSavePaymentInformation(
        $cartId,
        ?AddressInterface $billingAddress,
        bool $isGuest,
        $result
    ) {
        if ($this->debugConfig->isDebugEnabled()) {
            $this->logger->info('=== AFD PCE: CopyMetadataToBillingPlugin::processSavePaymentInformation CALLED ===');
            $this->logger->info('Cart ID: ' . $cartId . ' (Guest: ' . ($isGuest ? 'yes' : 'no') . ')');
        }

        try {
            // Handle masked cart ID for guest checkout
            if ($isGuest) {
                $quoteIdMask = $this->quoteIdMaskFactory->create()->load($cartId, 'masked_id');
                $realQuoteId = $quoteIdMask->getQuoteId();
            } else {
                $realQuoteId = $cartId;
            }
            
            if ($this->debugConfig->isDebugEnabled()) {
                $this->logger->info('Real Quote ID: ' . $realQuoteId);
            }

            // Get the quote with the saved billing address (which now has an ID)
            $quote = $this->cartRepository->get($realQuoteId);
            $savedBillingAddress = $quote->getBillingAddress();

            if (!$savedBillingAddress || !$savedBillingAddress->getId()) {
                if ($this->debugConfig->isDebugEnabled()) {
                    $this->logger->info('Saved billing address has no ID yet');
                }
                return $result;
            }

            if ($this->debugConfig->isDebugEnabled()) {
                $this->logger->info('Saved billing address ID: ' . $savedBillingAddress->getId());
            }

            // Check if billing address has metadata in extension attributes (from frontend)
            $extensionAttributes = $billingAddress ? $billingAddress->getExtensionAttributes() : null;
            
            if (!$extensionAttributes) {
                if ($this->debugConfig->isDebugEnabled()) {
                    $this->logger->info('No extension attributes on billing address from request');
                }
                return $result;
            }

            $afdMetadata = $extensionAttributes->getAfdAddressMetadata();
            if (!$afdMetadata) {
                if ($this->debugConfig->isDebugEnabled()) {
                    $this->logger->info('No AFD metadata in extension attributes');
                }
                return $result;
            }

            // Extract metadata JSON string
            $metadata = $afdMetadata->getMetadata();
            if (!$metadata) {
                if ($this->debugConfig->isDebugEnabled()) {
                    $this->logger->info('Metadata is empty');
                }
                return $result;
            }

            // Get is_validated flag
            $isAfdValidated = $afdMetadata->getIsValidated();

            if ($this->debugConfig->isDebugEnabled()) {
                $this->logger->info('Found metadata in billing address extension attributes: ' . $metadata);
                $this->logger->info('is_validated: ' . ($isAfdValidated ? 'true' : 'false'));
            }

            // Try to find existing metadata for this address
            try {
                $addressMetadata = $this->quoteAddressMetadataRepository->getByParentId(
                    (int)$savedBillingAddress->getId(),
                    'quote'
                );
                if ($this->debugConfig->isDebugEnabled()) {
                    $this->logger->info('Found existing metadata for billing address ID: ' . $savedBillingAddress->getId());
                }
            } catch (NoSuchEntityException $e) {
                // Create new metadata if not found
                $addressMetadata = $this->quoteAddressMetadataFactory->create();
                $addressMetadata->setParentId((int)$savedBillingAddress->getId());
                if ($this->debugConfig->isDebugEnabled()) {
                    $this->logger->info('Created new metadata for billing address ID: ' . $savedBillingAddress->getId());
                }
            }

            // Set metadata and is_validated flag
            $addressMetadata->setMetadata($metadata);
            $addressMetadata->setIsValidated($isAfdValidated);
            $addressMetadata->setParentType('quote');

            if ($this->debugConfig->isDebugEnabled()) {
                $this->logger->info('About to save billing metadata with is_validated = ' . ($isAfdValidated ? 'true' : 'false'));
            }

            $this->quoteAddressMetadataRepository->save($addressMetadata);

            if ($this->debugConfig->isDebugEnabled()) {
                $this->logger->info('Successfully saved billing address metadata for address ID: ' . $savedBillingAddress->getId());
            }

        } catch (\Exception $e) {
            // Log but don't interrupt checkout
            $this->logger->error('Error saving billing address metadata in afterSavePaymentInformation: ' . $e->getMessage());
            $this->logger->error('Stack trace: ' . $e->getTraceAsString());
        }

        return $result;
    }
}