<?php

namespace Afd\Pce\Model;

use Magento\Checkout\Model\ConfigProviderInterface;

class ConfigProvider implements ConfigProviderInterface
{

    protected \Afd\Pce\Helper\Data $helperData;

    public function __construct(
        \Afd\Pce\Helper\Data $helperData
    )
    {
        $this->helperData = $helperData;
    }


    public function getConfig()
    {
        $config = [];
        $config['afd']['placeholder'] = $this->helperData->getConfigValue('afd_typeahead/fields/placeholder');
        $config['afd']['enableManualEntryButton'] = $this->helperData->getConfigValue('afd_typeahead/fields/enableManualEntryButton');
        $config['afd']['manualEntryMarkup'] = $this->helperData->getConfigValue('afd_typeahead/fields/manualEntryMarkup');
        $config['afd']['manualEntrySearchMarkup'] = $this->helperData->getConfigValue('afd_typeahead/fields/manualEntrySearchMarkup');
        $config['afd']['manualEntryCss'] = $this->helperData->getConfigValue('afd_typeahead/fields/manualEntryCss');
        $config['afd']['enableSearchAgainButton'] = $this->helperData->getConfigValue('afd_typeahead/fields/enableSearchAgainButton');
        $config['afd']['searchAgainMarkup'] = $this->helperData->getConfigValue('afd_typeahead/fields/searchAgainMarkup');
        $config['afd']['searchAgainCss'] = $this->helperData->getConfigValue('afd_typeahead/fields/searchAgainCss');
        $config['afd']['reverseGeocodeEnable'] = $this->helperData->getConfigValue('afd_typeahead/reverseGeocode/enable');
        $config['afd']['reverseGeocodeMobileOnly'] = $this->helperData->getConfigValue('afd_typeahead/reverseGeocode/mobileOnly');
        $config['afd']['reverseGeocodeText'] = $this->helperData->getConfigValue('afd_typeahead/reverseGeocode/buttonText');
        return $config;
    }
}