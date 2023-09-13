<?php

namespace Afd\Pce\Block;


class Subscribe extends \Magento\Newsletter\Block\Subscribe
{

    public function __construct(
        \Magento\Framework\View\Element\Template\Context $context,
        \Afd\Pce\Helper\Data $helperData
    )
    {
        $this->helperData = $helperData;
        return parent::__construct($context);
    }

    public function getConfig($code){
        return $this->helperData->getConfigValue($code);
    }


}