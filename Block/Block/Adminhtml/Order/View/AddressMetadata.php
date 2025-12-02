<?php
/**
 * AFD PCE Order Address Metadata Block
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Block\Adminhtml\Order\View;

use Afd\Pce\Api\AddressMetadataRepositoryInterface;
use Afd\Pce\Api\Data\AddressMetadataInterface;
use Afd\Pce\Helper\AddressMetadata as AddressMetadataHelper;
use Afd\Pce\Model\Config\Source\CategorisedMetadataFields;
use Magento\Framework\Exception\NoSuchEntityException;
use Magento\Framework\Serialize\Serializer\Json;
use Magento\Sales\Block\Adminhtml\Order\AbstractOrder;

/**
 * Class AddressMetadata
 * 
 * Block for displaying order address metadata in admin order view
 */
class AddressMetadata extends AbstractOrder
{
    /**
     * @var AddressMetadataRepositoryInterface
     */
    private $orderAddressMetadataRepository;

    /**
     * @var Json
     */
    private $serializer;

    /**
     * @var CategorisedMetadataFields
     */
    private $metadataFieldsSource;

    /**
     * @var AddressMetadataHelper
     */
    private $addressMetadataHelper;

    /**
     * @param \Magento\Backend\Block\Template\Context $context
     * @param \Magento\Framework\Registry $registry
     * @param \Magento\Sales\Helper\Admin $adminHelper
     * @param AddressMetadataRepositoryInterface $orderAddressMetadataRepository
     * @param Json $serializer
     * @param CategorisedMetadataFields $metadataFieldsSource
     * @param AddressMetadataHelper $addressMetadataHelper
     * @param array $data
     */
    public function __construct(
        \Magento\Backend\Block\Template\Context $context,
        \Magento\Framework\Registry $registry,
        \Magento\Sales\Helper\Admin $adminHelper,
        AddressMetadataRepositoryInterface $orderAddressMetadataRepository,
        Json $serializer,
        CategorisedMetadataFields $metadataFieldsSource,
        AddressMetadataHelper $addressMetadataHelper,
        array $data = []
    ) {
        $this->orderAddressMetadataRepository = $orderAddressMetadataRepository;
        $this->serializer = $serializer;
        $this->metadataFieldsSource = $metadataFieldsSource;
        $this->addressMetadataHelper = $addressMetadataHelper;
        parent::__construct($context, $registry, $adminHelper, $data);
    }
    
    /**
     * Get the address from the parent block
     *
     * @return \Magento\Sales\Model\Order\Address|null
     * @throws \LogicException If address type cannot be determined
     */
    public function getAddress()
    {
        $order = $this->getOrder();
        if (!$order) {
            $this->_logger->debug('AddressMetadata: No order found');
            return null;
        }
        
        // Check if address_type is set as a data argument (used in print views)
        $addressType = $this->getData('address_type');
        if ($addressType === 'billing') {
            return $order->getBillingAddress();
        } elseif ($addressType === 'shipping') {
            return $order->getShippingAddress();
        }
        
        // Get block name and log it for debugging
        $blockName = $this->getNameInLayout();

        // More precise matching for the new layout structure
        if ($blockName === 'billing_address.metadata') {
            return $order->getBillingAddress();
        } elseif ($blockName === 'shipping_address.metadata') {
            return $order->getShippingAddress();
        }
        
        // Fallback to partial name matching
        if (strpos($blockName, 'billing') !== false) {
            return $order->getBillingAddress();
        } elseif (strpos($blockName, 'shipping') !== false) {
            return $order->getShippingAddress();
        }
        
        // Check parent containers
        $parentName = $this->getParentBlock() ? $this->getParentBlock()->getNameInLayout() : '';

        if (strpos($parentName, 'billing') !== false) {
            return $order->getBillingAddress();
        } elseif (strpos($parentName, 'shipping') !== false) {
            return $order->getShippingAddress();
        }
        
        // Unable to determine address type - fail rather than guess
        $this->_logger->error('AddressMetadata: Unable to determine address type from block name: ' . $blockName);
        return null;
    }

    /**
     * Get address metadata for a specific order address
     *
     * @param \Magento\Sales\Model\Order\Address|null $address
     * @return array
     */
    public function getAddressMetadata($address = null)
    {
        // Don't show metadata if capture is disabled
        if (!$this->addressMetadataHelper->isEnabled()) {
            return [];
        }
        
        if ($address === null) {
            $address = $this->getAddress();
        }
        
        if (!$address || !$address->getId()) {
            return [];
        }

        try {
            $metadata = $this->orderAddressMetadataRepository->getByParentId(
                (int)$address->getId(),
                AddressMetadataInterface::PARENT_TYPE_ORDER
            );
            
            $metadataJson = $metadata->getMetadata();

            if ($metadataJson) {
                $data = $this->serializer->unserialize($metadataJson);
                return $data;
            }
        } catch (NoSuchEntityException $e) {
            $this->_logger->debug('AddressMetadata: No metadata found for address ID ' . $address->getId() . ': ' . $e->getMessage());
        } catch (\Exception $e) {
            $this->_logger->debug('AddressMetadata: Error parsing metadata: ' . $e->getMessage());
        }

        return [];
    }

    /**
     * Get address metadata grouped by category
     *
     * @param \Magento\Sales\Model\Order\Address|null $address
     * @return array Grouped metadata with category labels
     */
    public function getGroupedAddressMetadata($address = null)
    {
        $metadata = $this->getAddressMetadata($address);
        
        if (empty($metadata)) {
            return [];
        }

        $fieldsByCategory = $this->metadataFieldsSource->getFieldsByCategory();
        $categories = $this->metadataFieldsSource->getCategories();
        
        $groupedMetadata = [];
        
        // Iterate through categories and organize metadata
        foreach ($fieldsByCategory as $categoryCode => $fields) {
            $categoryData = [];
            
            foreach ($fields as $fieldCode => $fieldLabel) {
                // Check if this field exists in the metadata
                if (isset($metadata[$fieldCode])) {
                    $categoryData[$fieldCode] = $metadata[$fieldCode];
                }
            }
            
            // Only include categories that have data
            if (!empty($categoryData)) {
                $groupedMetadata[$categoryCode] = [
                    'label' => $categories[$categoryCode],
                    'fields' => $categoryData
                ];
            }
        }
        
        return $groupedMetadata;
    }

    /**
     * Check if address is validated
     *
     * @param \Magento\Sales\Model\Order\Address|null $address
     * @return bool
     */
    public function isAddressValidated($address = null)
    {
        if ($address === null) {
            $address = $this->getAddress();
        }
        
        if (!$address || !$address->getId()) {
            return false;
        }

        try {
            $metadata = $this->orderAddressMetadataRepository->getByParentId(
                (int)$address->getId(),
                AddressMetadataInterface::PARENT_TYPE_ORDER
            );
            
            return $metadata->getIsValidated();
        } catch (NoSuchEntityException $e) {
            // No metadata found for this address
        } catch (\Exception $e) {
            // Error retrieving metadata
        }

        return false;
    }

    /**
     * Get field label from the metadata fields source
     *
     * @param string $key
     * @return string
     */
    public function getFieldLabel($key)
    {
        $allFields = $this->metadataFieldsSource->getAllFields();
        
        if (isset($allFields[$key])) {
            return (string)$allFields[$key];
        }
        
        // Fallback to formatted key if not found
        return $this->formatMetadataKey($key);
    }

    /**
     * Get field description from the metadata fields source
     *
     * @param string $key
     * @return string
     */
    public function getFieldDescription($key)
    {
        $descriptions = $this->metadataFieldsSource->getFieldDescriptions();
        
        if (isset($descriptions[$key])) {
            return (string)$descriptions[$key];
        }
        
        return '';
    }

    /**
     * Format metadata key for display (fallback)
     *
     * @param string $key
     * @return string
     */
    public function formatMetadataKey($key)
    {
        // Convert snake_case to Title Case with spaces
        return ucwords(str_replace('_', ' ', $key));
    }

    /**
     * Format metadata value for display
     *
     * @param mixed $value
     * @return string
     */
    public function formatMetadataValue($value)
    {
        if (is_bool($value)) {
            return $value ? __('Yes') : __('No');
        }
        
        if (is_array($value) || is_object($value)) {
            return json_encode($value);
        }
        
        return (string)$value;
    }
}
