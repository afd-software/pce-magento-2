<?php

namespace Afd\Pce\Model\Config\Source;

class Authentication implements \Magento\Framework\Data\OptionSourceInterface
{

    public function toOptionArray()
    {
        return [
            ['value' => 'id', 'label' => __('ID/Token')],
            ['value' => 'serial', 'label' => __('Serial/Password')]
        ];
    }
}