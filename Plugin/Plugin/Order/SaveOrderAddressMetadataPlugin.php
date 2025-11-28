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
use Afd\Pce\Model\OrderAddressMetadataFactory;
use Afd\Pce\Model\OrderAddressMetadataRepository;
use Afd\Pce\Model\QuoteAddressMetadataRepository;
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
     * @var LoggerInterface
     */
    private $logger;

    /**
     * @var DebugConfig
     */
    private $debugConfig;

    /**
     * SaveOrderAddressMetadataPlugin constructor.
     *
     * @param OrderAddressMetadataFactory $orderAddressMetadataFactory
     * @param OrderAddressMetadataRepository $orderAddressMetadataRepository
     * @param QuoteAddressMetadataRepository $quoteAddressMetadataRepository
     * @param LoggerInterface $logger
     * @param DebugConfig $debugConfig
     */
    public function __construct(
        OrderAddressMetadataFactory $orderAddressMetadataFactory,
        OrderAddressMetadataRepository $orderAddressMetadataRepository,
        QuoteAddressMetadataRepository $quoteAddressMetadataRepository,
        LoggerInterface $logger,
        DebugConfig $debugConfig
    ) {
        $this->orderAddressMetadataFactory = $orderAddressMetadataFactory;
        $this->orderAddressMetadataRepository = $orderAddressMetadataRepository;
        $this->quoteAddressMetadataRepository = $quoteAddressMetadataRepository;
        $this->logger = $logger;
        $this->debugConfig = $debugConfig;
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
            // Process shipping address
            $shippingAddress = $result->getShippingAddress();
            if ($this->debugConfig->isDebugEnabled()) {
                $this->logger->info('Processing shipping address ID: ' . ($shippingAddress ? $shippingAddress->getId() : 'NULL'));
            }
            $this->processAddress($shippingAddress);
            
            // Process billing address
            $billingAddress = $result->getBillingAddress();
            if ($this->debugConfig->isDebugEnabled()) {
                $this->logger->info('Processing billing address ID: ' . ($billingAddress ? $billingAddress->getId() : 'NULL'));
            }
            $this->processAddress($billingAddress);
            
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
            } catch (CouldNotSaveException $e) {
                $this->logger->error('SaveOrderAddressMetadataPlugin::processAddress - Could not save metadata: ' . $e->getMessage());
            } catch (\Exception $e) {
                $this->logger->error('SaveOrderAddressMetadataPlugin::processAddress - Error: ' . $e->getMessage());
            }
        }
    }
}