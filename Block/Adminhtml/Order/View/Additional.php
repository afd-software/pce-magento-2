<?php

namespace Afd\Pce\Block\Adminhtml\Order\View;

use Magento\Quote\Api\Data\AddressInterface;

class Additional extends \Magento\Sales\Block\Adminhtml\Order\AbstractOrder
{

    // used for censation etc
    private $_addressInformation;

    private $_customer;

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



        $cus = $this->_customer
            ->setWebsiteId(null)
            ->loadByEmail($_order->getCustomerEmail());

        // $logger->info($cus->getId());

        $address = null;

        if ($addressType == 'billing') {
            $address = $_order->getBillingAddress();
        } elseif ($addressType == 'shipping') {
            $address = $_order->getShippingAddress();
        }

        if(!$address){
            return null;
        }
        return $cus->getAddressById($address->getCustomerAddressId());

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

}
