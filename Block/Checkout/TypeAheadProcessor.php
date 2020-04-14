<?php

namespace Afd\Pce\Block\Checkout;

class TypeAheadProcessor
{

    protected $_scopeConfig;
    public function __construct(\Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig)
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

        $billingConfiguration = &$jsLayout['components']['checkout']['children']['steps']['children']['billing-step']
        ['children']['payment']['children']['payments-list']['children'];

        //Checks if shipping step available.
        if (isset($shippingConfiguration)) {
            $shippingConfiguration = $this->processAddress(
                $shippingConfiguration,
                'shippingAddress',
                [
                    'checkoutProvider',
                    'checkout.steps.shipping-step.shippingAddress.shipping-address-fieldset.street',
                    'checkout.steps.shipping-step.shippingAddress.shipping-address-fieldset.city',
                    'checkout.steps.shipping-step.shippingAddress.shipping-address-fieldset.country_id'
                ]
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

                $billingForm['children']['form-fields']['children'] = $this->processAddress(
                    $billingForm['children']['form-fields']['children'],
                    $billingForm['dataScopePrefix'],
                    [
                        'checkoutProvider',
                        'checkout.steps.billing-step.payment.payments-list.' . $key . '.form-fields.street',
                        'checkout.steps.billing-step.payment.payments-list.' . $key . '.form-fields.city',
                        'checkout.steps.billing-step.payment.payments-list.' . $key . '.form-fields.country_id'
                    ]
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
                'component' => 'Afd_Pce/js/form/element/typeahead',
                'config' => [
                    'customScope' => $dataScope,
                    'template' => 'Afd_Pce/form/element/typeahead'
                ],
                'dataScope' => $dataScope . '.typeahead',
                'deps' => $deps,
                'label' => __('Search for Address'),
                'provider' => 'checkoutProvider',
                'visible' => true,
                'initialValue' => false,
                'sortOrder' => 70,
                'valueMap' => [
                    'true' => true,
                    'false' => false
                ]
            ];
            // Sets template for address fields - see view/frontend/web/template/form/element
            $addressFieldset['street']['children'][0]['config']['elementTmpl'] = 'Afd_Pce/form/element/property';
            $addressFieldset['street']['children'][1]['config']['elementTmpl'] = 'Afd_Pce/form/element/street';
            $addressFieldset['street']['children'][2]['config']['elementTmpl'] = 'Afd_Pce/form/element/locality';
            $addressFieldset['city']['config']['elementTmpl'] = 'Afd_Pce/form/element/city';
            $addressFieldset['company']['config']['elementTmpl'] = 'Afd_Pce/form/element/company';
            $addressFieldset['postcode']['config']['elementTmpl'] = 'Afd_Pce/form/element/postcode';

        }
        if($this->_scopeConfig->getValue('afd_phone/forms/checkout', \Magento\Store\Model\ScopeInterface::SCOPE_STORE) == 1) {
            $addressFieldset['telephone']['config']['elementTmpl'] = 'Afd_Pce/form/element/telephone';
        }


        $addressFieldset['country_id']['config']['sortOrder'] = 65;

        return $addressFieldset;
    }
}