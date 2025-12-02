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
        // config for shipping address, later we will set the components and templates for each field in this form
        $shippingConfiguration = &$jsLayout['components']['checkout']['children']['steps']['children']['shipping-step']
        ['children']['shippingAddress']['children']['shipping-address-fieldset']['children'];

        // set the parent shipping component of the individual form fields
        $jsLayout['components']['checkout']['children']['steps']['children']['shipping-step']
        ['children']['shippingAddress']['children']['shipping-address-fieldset']['component'] = 'Afd_Pce/js/checkout/shipping-address/form-fieldset';

        // there are two types of billing address forms each with their own path to the form config,
        // which one is used is set in magento admin 'Stores -> Configuration -> Sales -> Checkout -> Display Billing Address On
        $billingFormType =
            $this->_scopeConfig->getValue('checkout/options/display_billing_address_on', \Magento\Store\Model\ScopeInterface::SCOPE_STORE) == 0
                ? 'payments-list' : 'afterMethods';
        // config for billing address same as shipping above
        $billingConfiguration = &$jsLayout['components']['checkout']['children']['steps']['children']['billing-step']
        ['children']['payment']['children'][$billingFormType]['children'];

        //Checks if shipping step available.
        if (isset($shippingConfiguration)) {
            // invoke processAddress function that sets the templates and components for shipping fields
            $shippingConfiguration = $this->processAddress($shippingConfiguration,'shipping-address');
        }

        //Checks if billing step available.
        if (isset($billingConfiguration)) {
            //Iterate over billing forms.
            foreach ($billingConfiguration as $key => &$billingForm) {
                //Exclude not billing forms
                if (!strpos($key, '-form')) {
                    continue;
                }

                // set the parent shipping component of the individual form fields
                $billingForm['children']['form-fields']['component'] = 'Afd_Pce/js/checkout/billing-address/form-fieldset';

                // invoke processAddress function that sets the templates and components for shipping fields
                $billingForm['children']['form-fields']['children'] = $this->processAddress(
                    $billingForm['children']['form-fields']['children'], 'billing-address');
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
    private function processAddress($addressFieldset, $addressType)
    {

        if($this->_scopeConfig->getValue('afd_typeahead/forms/checkout', \Magento\Store\Model\ScopeInterface::SCOPE_STORE) == 1) {
            //Creates typeahead field.
            $addressFieldset['afd_typeahead'] = [
                'component' => 'Afd_Pce/js/checkout/' . $addressType . '/typeahead',
                'config' => [
                    'template' => 'Afd_Pce/checkout/address/typeahead'
                ],
                'label' => __('Search for Address'),
                'provider' => 'checkoutProvider',
                'visible' => true,
                'sortOrder' => 70
            ];

            // Sets template for address fields - see view/frontend/web/template/form/element
            $addressFieldset['street']['config']['template'] = 'Afd_Pce/checkout/address/group';
            $addressFieldset['street']['children'][0]['config']['elementTmpl'] = 'Afd_Pce/checkout/address/street';
            $addressFieldset['street']['children'][1]['config']['elementTmpl'] = 'Afd_Pce/checkout/address/street';
            if (isset($addressFieldset['street']['children'][2])) {
                $addressFieldset['street']['children'][2]['config']['elementTmpl'] = 'Afd_Pce/checkout/address/street';
            }
            $addressFieldset['city']['config']['elementTmpl'] = 'Afd_Pce/checkout/address/city';
            $addressFieldset['company']['config']['elementTmpl'] = 'Afd_Pce/checkout/address/company';
            $addressFieldset['postcode']['config']['elementTmpl'] = 'Afd_Pce/checkout/address/postcode';
            $addressFieldset['region_id']['config']['elementTmpl'] = 'Afd_Pce/checkout/address/region-id';

            // sets component for address fields
            $addressFieldset['street']['component'] = 'Afd_Pce/js/checkout/' . $addressType . '/group';
            $addressFieldset['street']['children'][0]['component'] = 'Afd_Pce/js/checkout/' . $addressType . '/abstract';
            $addressFieldset['street']['children'][1]['component'] = 'Afd_Pce/js/checkout/' . $addressType . '/abstract';
            if (isset($addressFieldset['street']['children'][2])) {
                $addressFieldset['street']['children'][2]['component'] = 'Afd_Pce/js/checkout/' . $addressType . '/abstract';
            }
            $addressFieldset['city']['component'] = 'Afd_Pce/js/checkout/' . $addressType . '/abstract';
            $addressFieldset['postcode']['component'] = 'Afd_Pce/js/checkout/' . $addressType . '/postcode';
            $addressFieldset['region_id']['component'] = 'Afd_Pce/js/checkout/' . $addressType . '/region';

            // set country component
            if ($this->_scopeConfig->getValue('afd_typeahead/countries/useAdvancedCountryControl', \Magento\Store\Model\ScopeInterface::SCOPE_STORE) == 1) {
                // Use advanced country control
                $addressFieldset['country_id']['component'] = 'Afd_Pce/js/checkout/' . $addressType . '/country';
                $addressFieldset['country_id']['config']['template'] = 'Afd_Pce/checkout/address/country';
            } else {
                // Use default select component
                $addressFieldset['country_id']['component'] = 'Afd_Pce/js/checkout/' . $addressType . '/select';
                $addressFieldset['country_id']['config']['template'] = 'Afd_Pce/checkout/address/field';
            }

        }
        if($this->_scopeConfig->getValue('afd_phone/forms/checkout', \Magento\Store\Model\ScopeInterface::SCOPE_STORE) == 1) {
            $addressFieldset['telephone']['component'] = 'Afd_Pce/js/checkout/' . $addressType . '/telephone';
            $addressFieldset['telephone']['config']['elementTmpl'] = 'Afd_Pce/checkout/address/telephone';
        }

        if($this->_scopeConfig->getValue('afd_typeahead/fields/countryAboveStreet', \Magento\Store\Model\ScopeInterface::SCOPE_STORE) == 1) {
            $addressFieldset['country_id']['config']['sortOrder'] = 65;
        }
        return $addressFieldset;
    }
}