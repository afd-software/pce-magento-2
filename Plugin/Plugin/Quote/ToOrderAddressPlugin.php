<?php
/**
 * AFD PCE Quote to Order Address Converter Plugin
 *
 * PURPOSE:
 * This plugin transfers AFD address metadata from quote addresses to order addresses
 * during the quote → order conversion process.
 *
 * WHEN IT RUNS:
 * - Intercepts: Quote\Address\ToOrderAddress::convert()
 * - Timing: During order placement, AFTER quote is converted to order
 * - Runs TWICE per order: once for shipping address, once for billing address
 *
 * WHAT IT DOES:
 * 1. Loads metadata from afd_pce_quote_address_metadata table using quote address ID
 * 2. Attaches metadata to order address extension attributes (in-memory only)
 * 3. Returns early - does NOT save to order table yet (order address has no ID yet)
 *
 * WHY EXTENSION ATTRIBUTES:
 * - At this point, the order address doesn't have an ID yet
 * - We can't save to afd_pce_order_address_metadata table without an ID
 * - We store metadata in extension attributes temporarily
 * - SaveOrderAddressMetadataPlugin will save it to the order table later
 *
 * DATA FLOW:
 * Quote metadata table → Extension attributes → SaveOrderAddressMetadataPlugin → Order metadata table
 *
 * NOTE:
 * This is a critical bridge in the metadata flow. Without this plugin, metadata would
 * be lost during the quote → order conversion.
 *
 * @category    Afd
 * @package     Afd_Pce
 * @author      AFD Software
 */
declare(strict_types=1);

namespace Afd\Pce\Plugin\Quote;

use Afd\Pce\Api\Data\AddressMetadataInterface;
use Afd\Pce\Helper\DebugConfig;
use Afd\Pce\Model\OrderAddressMetadataFactory;
use Afd\Pce\Model\OrderAddressMetadataRepository;
use Afd\Pce\Model\QuoteAddressMetadataRepository;
use Magento\Framework\Exception\NoSuchEntityException;
use Magento\Quote\Model\Quote\Address as QuoteAddress;
use Magento\Quote\Model\Quote\Address\ToOrderAddress;
use Magento\Sales\Api\Data\OrderAddressInterface;

/**
 * Class ToOrderAddressPlugin
 */
class ToOrderAddressPlugin
{
    /**
     * @var QuoteAddressMetadataRepository
     */
    private $quoteAddressMetadataRepository;

    /**
     * @var OrderAddressMetadataRepository
     */
    private $orderAddressMetadataRepository;

    /**
     * @var OrderAddressMetadataFactory
     */
    private $orderAddressMetadataFactory;

    /**
     * @var DebugConfig
     */
    private $debugConfig;

    /**
     * ToOrderAddressPlugin constructor.
     *
     * @param QuoteAddressMetadataRepository $quoteAddressMetadataRepository
     * @param OrderAddressMetadataRepository $orderAddressMetadataRepository
     * @param OrderAddressMetadataFactory $orderAddressMetadataFactory
     * @param DebugConfig $debugConfig
     */
    public function __construct(
        QuoteAddressMetadataRepository $quoteAddressMetadataRepository,
        OrderAddressMetadataRepository $orderAddressMetadataRepository,
        OrderAddressMetadataFactory $orderAddressMetadataFactory,
        DebugConfig $debugConfig
    ) {
        $this->quoteAddressMetadataRepository = $quoteAddressMetadataRepository;
        $this->orderAddressMetadataRepository = $orderAddressMetadataRepository;
        $this->orderAddressMetadataFactory = $orderAddressMetadataFactory;
        $this->debugConfig = $debugConfig;
    }

    /**
     * After convert quote address to order address
     *
     * @param ToOrderAddress $subject
     * @param OrderAddressInterface $result
     * @param QuoteAddress $quoteAddress
     * @return OrderAddressInterface
     */
    public function afterConvert(
        ToOrderAddress $subject,
        OrderAddressInterface $result,
        QuoteAddress $quoteAddress
    ) {
        // Use Magento's standard logger instead of Zend_Log directly
        $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
        $logger = $objectManager->get(\Psr\Log\LoggerInterface::class);
        
        if ($this->debugConfig->isDebugEnabled()) {
            $logger->info('=== AFD PCE: ToOrderAddressPlugin::afterConvert CALLED ===');
            $logger->info('Quote Address ID: ' . $quoteAddress->getId());
            $logger->info('Order Address ID: ' . $result->getId());
        }

        try {
            $quoteAddressMetadata = null;
            
            // First, try to get metadata from quote address extension attributes
            $quoteExtensionAttributes = $quoteAddress->getExtensionAttributes();
            if ($quoteExtensionAttributes && method_exists($quoteExtensionAttributes, 'getAfdAddressMetadata')) {
                $quoteAddressMetadata = $quoteExtensionAttributes->getAfdAddressMetadata();
                if ($quoteAddressMetadata && $this->debugConfig->isDebugEnabled()) {
                    $logger->info('ToOrderAddressPlugin: Found metadata in quote address extension attributes');
                }
            }
            
            // If not in extension attributes, try database
            if (!$quoteAddressMetadata) {
                $quoteAddressMetadata = $this->quoteAddressMetadataRepository->getByParentId(
                    (int)$quoteAddress->getId(),
                    'quote'
                );
                if ($quoteAddressMetadata && $this->debugConfig->isDebugEnabled()) {
                    $logger->info('ToOrderAddressPlugin: Found metadata in quote_address_metadata table');
                }
            }
            
            if ($quoteAddressMetadata && $quoteAddressMetadata->getMetadata()) {

                // Create new order address metadata
                $orderAddressMetadata = $this->orderAddressMetadataFactory->create();
                
                // Check if the order address ID is available
                if (!$result->getId()) {
                    // Store metadata in extension attributes for now
                    $extensionAttributes = $result->getExtensionAttributes();
                    if ($extensionAttributes) {
                        $extensionAttributes->setAfdAddressMetadata($quoteAddressMetadata);
                        $extensionAttributes->setAfdAddressValidated($quoteAddressMetadata->getIsValidated());
                        $result->setExtensionAttributes($extensionAttributes);
                    }
                    
                    // Return early - we'll save the metadata when the order address ID is available
                    return $result;
                }
                
                $orderAddressMetadata->setParentId((int)$result->getId());

                // Copy metadata JSON from quote to order
                $orderAddressMetadata->setMetadata($quoteAddressMetadata->getMetadata());
                $orderAddressMetadata->setIsValidated($quoteAddressMetadata->getIsValidated());

                // Set the parent type if the method exists
                if (method_exists($orderAddressMetadata, 'setParentType')) {
                    $orderAddressMetadata->setParentType('order');
                } else {
                    $logger->debug('ToOrderAddressPlugin::afterConvert - WARNING: setParentType method does not exist on OrderAddressMetadata');
                }

                // Save order address metadata
                $logger->debug('ToOrderAddressPlugin::afterConvert - Attempting to save order address metadata');
                try {
                    $savedMetadata = $this->orderAddressMetadataRepository->save($orderAddressMetadata);
                } catch (\Exception $saveException) {
                    $logger->error('ToOrderAddressPlugin::afterConvert - Error saving order address metadata: ' . $saveException->getMessage());
                    $logger->error('ToOrderAddressPlugin::afterConvert - Error trace: ' . $saveException->getTraceAsString());
                }
                
                // Set extension attributes on order address
                $extensionAttributes = $result->getExtensionAttributes();
                if ($extensionAttributes) {
                    // Pass the entire metadata object instead of just the metadata string
                    $extensionAttributes->setAfdAddressMetadata($orderAddressMetadata);
                    $extensionAttributes->setAfdAddressValidated($quoteAddressMetadata->getIsValidated());
                    $result->setExtensionAttributes($extensionAttributes);
                } else {
                    $logger->debug('ToOrderAddressPlugin::afterConvert - WARNING: Extension attributes are null for order address');
                }
            } else {
                $logger->debug('ToOrderAddressPlugin::afterConvert - No metadata found for quote address ID: ' . $quoteAddress->getId());
            }
        } catch (NoSuchEntityException $e) {
            // No metadata exists for this quote address, so nothing to copy
        } catch (\Exception $e) {
            // Log any other exceptions but don't interrupt checkout
            $logger->error('Error in ToOrderAddressPlugin::afterConvert: ' . $e->getMessage());
        }
        
        return $result;
    }
}
