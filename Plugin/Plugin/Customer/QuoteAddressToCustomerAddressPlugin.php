<?php
/**
 * AFD PCE Quote Address to Customer Address Plugin
 *
 * This plugin copies metadata from a checkout address to a customer's address book when they
 * choose to save a new address. It ensures that if an address was validated during checkout,
 * that validation status and additional information is preserved when saved to the customer's account.
 *
 * @category    Afd
 * @package     Afd_Pce
 * @author      AFD Software
 */
declare(strict_types=1);

namespace Afd\Pce\Plugin\Customer;

use Afd\Pce\Api\Data\AddressMetadataInterfaceFactory;
use Afd\Pce\Model\CustomerAddressMetadataRepository;
use Afd\Pce\Model\QuoteAddressMetadataRepository;
use Magento\Customer\Api\Data\AddressInterface as CustomerAddressInterface;
use Magento\Customer\Api\Data\AddressExtensionFactory;
use Magento\Framework\Exception\NoSuchEntityException;
use Magento\Quote\Model\Quote\Address as QuoteAddress;
use Psr\Log\LoggerInterface;

/**
 * Plugin to transfer metadata from quote address to customer address
 * 
 * This plugin ensures that when a customer saves a new address during checkout,
 * all metadata and validation information is properly transferred to the customer address.
 * This preserves the validation status and additional details for future use.
 * 
 * Technical Details:
 * - Intercepts: Quote\Address::exportCustomerAddress
 * - Type: After plugin
 * - Purpose: Transfers metadata when saving new addresses from checkout to address book
 * - Data Flow: Quote address metadata → Customer address extension attributes
 * 
 * Real-World Example:
 * When a customer enters and validates a new address during checkout and clicks "Save in address book,"
 * this plugin ensures that the validation status and all additional metadata are transferred to the
 * new saved address, so they don't need to validate it again in the future.
 */
class QuoteAddressToCustomerAddressPlugin
{
    /**
     * @var CustomerAddressMetadataRepository
     */
    private $customerAddressMetadataRepository;

    /**
     * @var QuoteAddressMetadataRepository
     */
    private $quoteAddressMetadataRepository;

    /**
     * @var AddressMetadataInterfaceFactory
     */
    private $addressMetadataFactory;

    /**
     * @var AddressExtensionFactory
     */
    private $addressExtensionFactory;

    /**
     * @var LoggerInterface
     */
    private $logger;

    /**
     * QuoteAddressToCustomerAddressPlugin constructor.
     *
     * @param CustomerAddressMetadataRepository $customerAddressMetadataRepository
     * @param QuoteAddressMetadataRepository $quoteAddressMetadataRepository
     * @param AddressMetadataInterfaceFactory $addressMetadataFactory
     * @param AddressExtensionFactory $addressExtensionFactory
     * @param LoggerInterface $logger
     */
    public function __construct(
        CustomerAddressMetadataRepository $customerAddressMetadataRepository,
        QuoteAddressMetadataRepository $quoteAddressMetadataRepository,
        AddressMetadataInterfaceFactory $addressMetadataFactory,
        AddressExtensionFactory $addressExtensionFactory,
        LoggerInterface $logger
    ) {
        $this->customerAddressMetadataRepository = $customerAddressMetadataRepository;
        $this->quoteAddressMetadataRepository = $quoteAddressMetadataRepository;
        $this->addressMetadataFactory = $addressMetadataFactory;
        $this->addressExtensionFactory = $addressExtensionFactory;
        $this->logger = $logger;
    }

    /**
     * After export quote address to customer address
     * Transfer metadata from quote address to customer address
     *
     * @param QuoteAddress $subject
     * @param CustomerAddressInterface $result
     * @return CustomerAddressInterface
     */
    public function afterExportCustomerAddress(
        QuoteAddress $subject,
        CustomerAddressInterface $result
    ) {
        // Only proceed if we have a valid quote address ID
        if (!$subject->getId()) {
            return $result;
        }

        try {
            // Get quote address metadata
            $quoteAddressMetadata = $this->quoteAddressMetadataRepository->getByParentId(
                (int)$subject->getId(),
                'quote'
            );

            // Set extension attributes on customer address
            $extensionAttributes = $result->getExtensionAttributes();
            if ($extensionAttributes === null) {
                $extensionAttributes = $this->addressExtensionFactory->create();
            }
            
            $extensionAttributes->setAfdAddressMetadata($quoteAddressMetadata);
            $extensionAttributes->setAfdAddressValidated($quoteAddressMetadata->getIsValidated());
            $result->setExtensionAttributes($extensionAttributes);
        } catch (NoSuchEntityException $e) {
            // No metadata exists for this quote address
        } catch (\Exception $e) {
            $this->logger->error('[AFD PCE] QuoteAddressToCustomerAddressPlugin error: ' . $e->getMessage(), [
                'quote_address_id' => $subject->getId(),
                'exception' => $e
            ]);
        }

        return $result;
    }
}
