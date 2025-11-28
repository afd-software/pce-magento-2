<?php
/**
 * AFD PCE Address Metadata Block for Customer Address Edit Form
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Block\Customer\Address;

use Afd\Pce\Helper\AddressMetadata as AddressMetadataHelper;
use Afd\Pce\Model\CustomerAddressMetadataFactory;
use Afd\Pce\Model\CustomerAddressMetadataRepository;
use Magento\Customer\Api\AddressRepositoryInterface;
use Magento\Customer\Model\Session as CustomerSession;
use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\Exception\NoSuchEntityException;
use Magento\Framework\Serialize\Serializer\Json;
use Magento\Framework\View\Element\Template;
use Magento\Framework\View\Element\Template\Context;

class Metadata extends Template
{
    /**
     * @var AddressMetadataHelper
     */
    private $addressMetadataHelper;

    /**
     * @var CustomerAddressMetadataRepository
     */
    private $customerAddressMetadataRepository;

    /**
     * @var CustomerAddressMetadataFactory
     */
    private $customerAddressMetadataFactory;

    /**
     * @var CustomerSession
     */
    private $customerSession;

    /**
     * @var AddressRepositoryInterface
     */
    private $addressRepository;

    /**
     * @var Json
     */
    private $serializer;

    /**
     * @param Context $context
     * @param AddressMetadataHelper $addressMetadataHelper
     * @param CustomerAddressMetadataRepository $customerAddressMetadataRepository
     * @param CustomerAddressMetadataFactory $customerAddressMetadataFactory
     * @param CustomerSession $customerSession
     * @param AddressRepositoryInterface $addressRepository
     * @param Json $serializer
     * @param array $data
     */
    public function __construct(
        Context $context,
        AddressMetadataHelper $addressMetadataHelper,
        CustomerAddressMetadataRepository $customerAddressMetadataRepository,
        CustomerAddressMetadataFactory $customerAddressMetadataFactory,
        CustomerSession $customerSession,
        AddressRepositoryInterface $addressRepository,
        Json $serializer,
        array $data = []
    ) {
        $this->addressMetadataHelper = $addressMetadataHelper;
        $this->customerAddressMetadataRepository = $customerAddressMetadataRepository;
        $this->customerAddressMetadataFactory = $customerAddressMetadataFactory;
        $this->customerSession = $customerSession;
        $this->addressRepository = $addressRepository;
        $this->serializer = $serializer;
        parent::__construct($context, $data);
    }

    /**
     * Check if metadata is enabled
     *
     * @return bool
     */
    public function isMetadataEnabled(): bool
    {
        return $this->addressMetadataHelper->isEnabled();
    }

    /**
     * Get metadata fields to capture from configuration
     *
     * @return array
     */
    public function getCaptureFields(): array
    {
        return $this->addressMetadataHelper->getCaptureFields();
    }

    /**
     * Get address ID from request
     *
     * @return int|null
     */
    public function getAddressId(): ?int
    {
        $addressId = $this->getRequest()->getParam('id');
        return $addressId ? (int)$addressId : null;
    }

    /**
     * Get address metadata for the current address
     *
     * @return \Afd\Pce\Model\CustomerAddressMetadata|null
     */
    public function getAddressMetadata()
    {
        $addressId = $this->getAddressId();
        if (!$addressId) {
            return null;
        }

        try {
            return $this->customerAddressMetadataRepository->getByParentId($addressId, 'customer');
        } catch (NoSuchEntityException $e) {
            return null;
        }
    }

    /**
     * Get metadata value
     *
     * @param string $key
     * @param mixed $default
     * @return mixed
     */
    public function getMetadataValue($key, $default = null)
    {
        $metadata = $this->getAddressMetadata();
        if (!$metadata) {
            return $default;
        }
        
        return $metadata->getMetadataValue($key, $default);
    }
    
    /**
     * Get metadata as JSON string
     *
     * @return string
     */
    public function getMetadataJson()
    {
        $metadata = $this->getAddressMetadata();
        if (!$metadata) {
            return '{}';
        }
        
        $metadataArray = [];
        $metadataString = $metadata->getMetadata();

        if ($metadataString) {
            try {
                $metadataArray = $this->serializer->unserialize($metadataString);
            } catch (\Exception $e) {
                $this->_logger->error("[AFD PCE] Error unserializing metadata: " . $e->getMessage());
                return '{}';
            }
        }
        
        $jsonResult = json_encode($metadataArray);
        return $jsonResult;
    }
}
