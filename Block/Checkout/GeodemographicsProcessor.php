<?php

namespace Afd\Pce\Block\Checkout;

class GeodemographicsProcessor
{

    protected $_scopeConfig;
    public function __construct(\Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig)
    {
        $this->_scopeConfig = $scopeConfig;
    }

    /**
     * Checkout LayoutProcessor after process plugin.
     *
     * @param \Magento\CustomerCustomAttributes\Block\Checkout\LayoutProcessor $processor
     * @param array $jsLayout
     * @return array
     */
    public function afterProcess(\Magento\CustomerCustomAttributes\Block\Checkout\LayoutProcessor $processor, $jsLayout)
    {

        $shippingAddressFieldset = &$jsLayout['components']['checkout']['children']['steps']['children']['shipping-step']
        ['children']['shippingAddress']['children']['shipping-address-fieldset']['children'];

        $billingAddressFieldset = &$jsLayout['components']['checkout']['children']['steps']['children']['billing-step']
        ['children']['payment']['children']['payments-list']['children'];

        $writer = new \Zend\Log\Writer\Stream(BP . '/var/log/debug.log');
        $logger = new \Zend\Log\Logger();
        $logger->addWriter($writer);

        // $logger->info(print_r($jsLayout['components']['checkout']['children']['steps']['children']['billing-step']
        // ['children'], true));

        // handle shipping address layout
        foreach($shippingAddressFieldset as $key => $field) {

            if($key == "afd_typeahead") {
                continue;
            }

            if(substr($key,0,4) == "afd_") {

                $field["component"] = 'Afd_Pce/js/form/element/geodemographics';

                $field["config"]["template"] = 'Afd_Pce/form/element/geodemographics';
                // $field['visible'] = false;

                $jsLayout['components']['checkout']['children']['steps']['children']['shipping-step']
                ['children']['shippingAddress']['children']['shipping-address-fieldset']['children'][$key] = $field;

            }

        }

        // handle billing address layout
        // each payment type has its own address form renderer so we need to loop over all of them
        // $logger->info(print_r($billingAddressFieldset['checkmo-form']['children']['form-fields']['children'], true));
        foreach ($billingAddressFieldset as $mainkey => $value) {


            if(isset($value['children']['form-fields'])) {

                // hide the custom fields on the billing address form
                foreach($value['children']['form-fields']['children'] as $key => $field) {

                    if($key == "afd_typeahead") {
                        continue;
                    }

                    if(substr($key,0,4) == "afd_") {

                        $field["component"] = 'Afd_Pce/js/form/element/geodemographics';

                        $field["config"]["template"] = 'Afd_Pce/form/element/geodemographics';
                        // $field['visible'] = false;

                        $jsLayout['components']['checkout']['children']['steps']['children']['billing-step']
                        ['children']['payment']['children']['payments-list']['children'][$mainkey]['children']['form-fields']['children'][$key] = $field;

                        // hide the custom fields on the billing address lists
                        $jsLayout['components']['checkout']['children']['steps']['children']['billing-step']
                        ['children']['payment']['children']['payments-list']['children'][$mainkey]['component'] = 'Afd_Pce/js/view/billing-address';

                    }

                }



            }




        }


        return $jsLayout;
    }

}