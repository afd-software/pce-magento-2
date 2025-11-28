<?php

namespace Afd\Pce\Model\Config\Source;

class W3WMode implements \Magento\Framework\Option\ArrayInterface
{

    public function toOptionArray()
    {
        return [
            ['value' => '0', 'label' => __('Exact')],
            ['value' => '1', 'label' => __('Choices')]
        ];
    }
}