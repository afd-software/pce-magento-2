<?php

namespace Afd\Pce\Model\Config\Source;

class County implements \Magento\Framework\Option\ArrayInterface
{

    public function toOptionArray()
    {
        return [
            ['value' => 'PostalCounty', 'label' => __('Postal County')],
            ['value' => 'AbbreviatedPostalCounty', 'label' => __('Abbreviated Postal County')],
            ['value' => 'OptionalCounty', 'label' => __('Optional County')],
            ['value' => 'AbbreviatedOptionalCounty', 'label' => __('Abbreviated Optional County')],
            ['value' => 'TraditionalCounty', 'label' => __('Traditional County')],
            ['value' => 'AdministrativeCounty', 'label' => __('Administrative County')]
        ];
    }
}