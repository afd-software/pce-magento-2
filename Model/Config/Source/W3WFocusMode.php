<?php

namespace Afd\Pce\Model\Config\Source;

class W3WFocusMode implements \Magento\Framework\Option\ArrayInterface
{

    public function toOptionArray()
    {
        return [
            ['value' => '0', 'label' => __('Disabled')],
            ['value' => 'init', 'label' => __('Init')],
            ['value' => 'focus', 'label' => __('Focus')]
        ];
    }
}