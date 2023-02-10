<?php

namespace Afd\Pce\Block\Checkout;

class TypeAheadProcessor
{

    protected $_scopeConfig;
    public function __construct(
        \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig
    )
    {
        $this->_scopeConfig = $scopeConfig;
    }

    /**
     * Checkout LayoutProcessor after process plugin.
     *
     * @param \Magento\Checkout\Block\Checkout\LayoutProcessor $processor
     * @param array $jsLayout
     * @return array
     */
    public function afterProcess(\Magento\Checkout\Block\Checkout\LayoutProcessor $processor, $jsLayout)
    {
        $shippingConfiguration = &$jsLayout['components']['checkout']['children']['steps']['children']['shipping-step']
        ['children']['shippingAddress']['children']['shipping-address-fieldset']['children'];

        // set the parent of the individual form fields
        $jsLayout['components']['checkout']['children']['steps']['children']['shipping-step']
        ['children']['shippingAddress']['children']['shipping-address-fieldset']['component'] = 'Afd_Pce/js/view/checkout/shipping-address/form-fieldset';

        $billingFormType =
            $this->_scopeConfig->getValue('checkout/options/display_billing_address_on', \Magento\Store\Model\ScopeInterface::SCOPE_STORE) == 0
                ? 'payments-list' : 'afterMethods';
        $billingConfiguration = &$jsLayout['components']['checkout']['children']['steps']['children']['billing-step']
        ['children']['payment']['children'][$billingFormType]['children'];

        //Checks if shipping step available.
        if (isset($shippingConfiguration)) {
            $shippingConfiguration = $this->processAddress(
                $shippingConfiguration,
                'shippingAddress',
                ['checkoutProvider']
            );
        }

        //Checks if billing step available.
        if (isset($billingConfiguration)) {
            //Iterate over billing forms.
            foreach ($billingConfiguration as $key => &$billingForm) {
                //Exclude not billing forms
                if (!strpos($key, '-form')) {
                    continue;
                }
                $billingForm['children']['form-fields']['component'] = 'Afd_Pce/js/view/checkout/shipping-address/form-fieldset';
                $billingForm['children']['form-fields']['children'] = $this->processAddress(
                    $billingForm['children']['form-fields']['children'],
                    $billingForm['dataScopePrefix'],
                    ['checkoutProvider']
                );
            }
        }

        return $jsLayout;
    }

    /**
     * Process provided address
     *
     * @param $addressFieldset - Address fieldset config.
     * @param $dataScope - data scope
     * @param $deps - list of dependencies
     * @return array
     */
    private function processAddress($addressFieldset, $dataScope, $deps)
    {

        if($this->_scopeConfig->getValue('afd_typeahead/forms/checkout', \Magento\Store\Model\ScopeInterface::SCOPE_STORE) == 1) {
            //Creates typeahead field.
            $addressFieldset['afd_typeahead'] = [
                'component' => 'Afd_Pce/js/view/checkout/shipping-address/element/typeahead',
                'config' => [
                    'customScope' => $dataScope,
                    'template' => 'Afd_Pce/form/element/typeahead'
                ],
                'dataScope' => $dataScope . '.typeahead',
                'deps' => $deps,
                'label' => __('Search for Address'),
                'provider' => 'checkoutProvider',
                'visible' => true,
                'sortOrder' => 70
            ];

            // Sets template for address fields - see view/frontend/web/template/form/element
            $addressFieldset['street']['config']['template'] = 'Afd_Pce/form/element/group';
            $addressFieldset['street']['children'][0]['config']['elementTmpl'] = 'Afd_Pce/form/element/property';
            $addressFieldset['street']['children'][1]['config']['elementTmpl'] = 'Afd_Pce/form/element/street';
            $addressFieldset['street']['children'][2]['config']['elementTmpl'] = 'Afd_Pce/form/element/locality';
            $addressFieldset['city']['config']['elementTmpl'] = 'Afd_Pce/form/element/city';
            $addressFieldset['company']['config']['elementTmpl'] = 'Afd_Pce/form/element/company';
            $addressFieldset['postcode']['config']['elementTmpl'] = 'Afd_Pce/form/element/postcode';
            $addressFieldset['region_id']['config']['elementTmpl'] = 'Afd_Pce/form/element/region-id';

            // sets component for address fields
            $addressFieldset['street']['component'] = 'Afd_Pce/js/view/checkout/shipping-address/element/group';
            $addressFieldset['street']['children'][0]['component'] = 'Afd_Pce/js/view/checkout/shipping-address/element/abstract';
            $addressFieldset['street']['children'][1]['component'] = 'Afd_Pce/js/view/checkout/shipping-address/element/abstract';
            $addressFieldset['city']['component'] = 'Afd_Pce/js/view/checkout/shipping-address/element/abstract';
            $addressFieldset['postcode']['component'] = 'Afd_Pce/js/view/checkout/shipping-address/element/postcode';
            $addressFieldset['region_id']['component'] = 'Afd_Pce/js/form/element/region';

            // set country component
            $addressFieldset['country_id']['component'] = 'Afd_Pce/js/view/checkout/shipping-address/element/select';
            $addressFieldset['country_id']['config']['template'] = 'Afd_Pce/form/element/field';

        }
        if($this->_scopeConfig->getValue('afd_phone/forms/checkout', \Magento\Store\Model\ScopeInterface::SCOPE_STORE) == 1) {
            $addressFieldset['telephone']['component'] = 'Afd_Pce/js/form/element/telephone';
            $addressFieldset['telephone']['config']['elementTmpl'] = 'Afd_Pce/form/element/telephone';
        }

        $addressFieldset['country_id']['config']['sortOrder'] = 65;

        return $addressFieldset;
    }
}