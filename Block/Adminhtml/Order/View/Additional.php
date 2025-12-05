<?php

namespace Afd\Pce\Block\Adminhtml\Order\View;

use Magento\Quote\Api\Data\AddressInterface;

class Additional extends \Magento\Sales\Block\Adminhtml\Order\AbstractOrder
{

    // used for censation etc
    private $_addressInformation;

    private $_customer;
    
    /**
     * Flag to determine if geodemographics should be shown
     * This is set via layout XML
     *
     * @var bool
     */
    private $afdShowGeoDemographics = true;

    public function __construct(
        \Magento\Backend\Block\Template\Context $context,
        \Magento\Framework\Registry $registry,
        AddressInterface $addressInformation,
        \Magento\Sales\Helper\Admin $adminHelper,
        \Magento\Customer\Model\Customer $customer,
        array $data = []
    )
    {
        $this->_addressInformation = $addressInformation;
        $this->_customer = $customer;
        parent::__construct($context, $registry, $adminHelper, $data);
    }

    public function loadOrderAddress($addressType)
    {

        // $writer = new \Zend\Log\Writer\Stream(BP . '/var/log/debug.log');
        // $logger = new \Zend\Log\Logger();
        // $logger->addWriter($writer);

        $_order = $this->getOrder();



        $customer = $this->_customer
            ->setWebsiteId(null)
            ->loadByEmail($_order->getCustomerEmail());

        // $logger->info($customer->getId());

        $address = null;

        if ($addressType == 'billing') {
            $address = $_order->getBillingAddress();
        } elseif ($addressType == 'shipping') {
            $address = $_order->getShippingAddress();
        }

        if(!$address){
            return null;
        }
        return $customer->getAddressById($address->getCustomerAddressId());

    }

    public function getGeodemographicFields($addressType)
    {

        // $writer = new \Zend\Log\Writer\Stream(BP . '/var/log/debug.log');
        // $logger = new \Zend\Log\Logger();
        // $logger->addWriter($writer);
        // $logger->info(print_r( ['Geodemoraphics'], true));

        $address = $this->loadOrderAddress($addressType);

        if(!$address){
            return [];
        }

        $customAttributes = $address->getCustomAttributes();

        $afdAttributes = [];

        // $logger->info($address->getLastName());

        // $logger->info(print_r($customAttributes, true));

        foreach ($customAttributes as $customAttribute) {
            if (substr($customAttribute->getAttributeCode(), 0, 4) == 'afd_') {
                array_push($afdAttributes, $customAttribute);
            }
        }


        return $afdAttributes;
    }

    public function convertAttributeCode($code) {

        $result = str_replace('_', '', ucwords($code, '_'));
        $result = substr($result,3);

        $pattern = '/(.*?[a-z]{1})([A-Z]{1}.*?)/';
        $replace = '${1} ${2}';

        $result = preg_replace($pattern, $replace, $result);

        return $result;

    }
    
    /**
     * Check if geodemographics section should be displayed
     *
     * @return bool
     */
    public function shouldShowGeoDemographics(): bool
    {
        // If afd_show_geodemographics is explicitly set to false by layout XML, don't show
        if ($this->hasData('afd_show_geodemographics') && $this->getData('afd_show_geodemographics') === false) {
            return false;
        }
        
        // Check if address metadata display is enabled in config
        $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
        $scopeConfig = $objectManager->get(\Magento\Framework\App\Config\ScopeConfigInterface::class);
        $isAddressMetadataEnabled = $scopeConfig->isSetFlag(
            'afd_typeahead/metadata/display_in_admin',
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );
        
        // If address metadata is enabled, don't show geodemographics
        if ($isAddressMetadataEnabled) {
            return false;
        }
        
        return true;
    }

    /**
     * Before rendering HTML, check if we should show this block
     *
     * @return string
     */
    protected function _toHtml()
    {
        if (!$this->shouldShowGeoDemographics()) {
            return '';
        }
        
        return parent::_toHtml();
    }
}
