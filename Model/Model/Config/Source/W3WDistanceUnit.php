<?php

namespace Afd\Pce\Model\Config\Source;

class W3WDistanceUnit implements \Magento\Framework\Option\ArrayInterface
{

    public function toOptionArray()
    {
        return [
            ['value' => 'm', 'label' => __('Miles')],
            ['value' => 'km', 'label' => __('KM')]
        ];
    }
}