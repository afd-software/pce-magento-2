<?php
/**
 * AFD PCE Customer Address Metadata Config Provider
 *
 * PURPOSE:
 * Loads customer address metadata and exposes it to the frontend checkout
 * so that saved addresses can include their validation status and metadata.
 *
 * HOW IT WORKS:
 * - Implements ConfigProviderInterface, which Magento automatically calls during checkout initialization
 * - Called by: Magento\Checkout\Model\CompositeConfigProvider (via di.xml configuration)
 * - Timing: Before checkout page renders, during layout generation
 * - Output: Merged into window.checkoutConfig JavaScript object
 *
 * WHAT IT PROVIDES:
 * - customerAddressMetadata: Map of address ID => {metadata, is_validated}
 * - afdDebugMode: Boolean flag for enabling debug logging
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1); // Enables strict type checking - function parameters must match declared types exactly

namespace Afd\Pce\Model\Checkout;

use Afd\Pce\Helper\DebugConfig;
use Afd\Pce\Model\CustomerAddressMetadataRepository; // Repository: Handles database operations for customer address metadata
use Magento\Checkout\Model\ConfigProviderInterface; // Interface: Tells Magento this class provides checkout config
use Magento\Customer\Model\Session as CustomerSession; // Session: Access to logged-in customer data
use Magento\Customer\Api\AddressRepositoryInterface; // Repository: Loads customer addresses from database
use Magento\Framework\Api\SearchCriteriaBuilder; // Builder: Creates database query filters
use Magento\Framework\App\ProductMetadataInterface; // Interface: Provides Magento version info
use Magento\Framework\Exception\NoSuchEntityException; // Exception: Thrown when entity not found in database
use Psr\Log\LoggerInterface; // Interface: Standard logging interface

/**
 * Provides customer address metadata to checkout configuration
 */
class CustomerAddressMetadataConfigProvider implements ConfigProviderInterface
{
    /**
     * @var CustomerSession
     */
    private $customerSession;

    /**
     * @var AddressRepositoryInterface
     */
    private $addressRepository;

    /**
     * @var CustomerAddressMetadataRepository
     */
    private $customerAddressMetadataRepository;

    /**
     * @var SearchCriteriaBuilder
     */
    private $searchCriteriaBuilder;

    /**
     * @var LoggerInterface
     */
    private $logger;

    /**
     * @var DebugConfig
     */
    private $debugConfig;
    
    /**
     * @var ProductMetadataInterface
     */
    private $productMetadata;

    /**
     * @param CustomerSession $customerSession
     * @param AddressRepositoryInterface $addressRepository
     * @param CustomerAddressMetadataRepository $customerAddressMetadataRepository
     * @param SearchCriteriaBuilder $searchCriteriaBuilder
     * @param LoggerInterface $logger
     * @param DebugConfig $debugConfig
     * @param ProductMetadataInterface $productMetadata
     */
    public function __construct(
        CustomerSession $customerSession,
        AddressRepositoryInterface $addressRepository,
        CustomerAddressMetadataRepository $customerAddressMetadataRepository,
        SearchCriteriaBuilder $searchCriteriaBuilder,
        LoggerInterface $logger,
        DebugConfig $debugConfig,
        ProductMetadataInterface $productMetadata
    ) {
        $this->customerSession = $customerSession;
        $this->addressRepository = $addressRepository;
        $this->customerAddressMetadataRepository = $customerAddressMetadataRepository;
        $this->searchCriteriaBuilder = $searchCriteriaBuilder;
        $this->logger = $logger;
        $this->debugConfig = $debugConfig;
        $this->productMetadata = $productMetadata;
    }

    /**
     * Get customer address metadata for checkout config
     *
     * CALLED BY:
     * - Magento\Checkout\Model\CompositeConfigProvider::getConfig()
     * - Triggered during checkout page layout generation
     * - Happens before checkout JavaScript initializes
     *
     * FLOW:
     * 1. Magento sees this class implements ConfigProviderInterface (via di.xml)
     * 2. CompositeConfigProvider collects all config providers
     * 3. Calls getConfig() on each provider
     * 4. Merges all results into window.checkoutConfig
     *
     * @return array Configuration array that gets merged into window.checkoutConfig
     */
    public function getConfig()
    {
        $config = [
            'customerAddressMetadata' => [],
            'afdDebugMode' => $this->debugConfig->isDebugEnabled(),
            'magentoVersion' => $this->productMetadata->getVersion()
        ];

        if (!$this->customerSession->isLoggedIn()) {
            return $config;
        }

        $customerId = $this->customerSession->getCustomerId();
        
        try {
            // Get all customer addresses
            $searchCriteria = $this->searchCriteriaBuilder
                ->addFilter('parent_id', $customerId)
                ->create();
            
            $addresses = $this->addressRepository->getList($searchCriteria)->getItems();
            
            foreach ($addresses as $address) {
                $addressId = $address->getId();
                
                try {
                    // Try to get metadata for this address
                    $metadata = $this->customerAddressMetadataRepository->getByParentId(
                        (int)$addressId,
                        'customer'
                    );
                    
                    // Store metadata for this address ID
                    $config['customerAddressMetadata'][$addressId] = [
                        'metadata' => $metadata->getMetadata(),
                        'is_validated' => $metadata->getIsValidated()
                    ];
                    
                    if ($this->debugConfig->isDebugEnabled()) {
                        $this->logger->info('[AFD PCE Config Provider] Loaded metadata for customer address ID: ' . $addressId);
                    }
                } catch (NoSuchEntityException $e) {
                    // No metadata for this address, skip it
                }
            }
        } catch (\Exception $e) {
            $this->logger->error('[AFD PCE Config Provider] Error loading customer address metadata: ' . $e->getMessage());
        }

        return $config;
    }
}
