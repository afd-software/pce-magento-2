<?php

namespace Afd\Pce\Block;


class Invitation extends \Magento\Invitation\Block\Form
{

    public function __construct(
        \Magento\Framework\View\Element\Template\Context $context,
        \Afd\Pce\Helper\Data $helperData,
        \Magento\Invitation\Model\Config $config,
        array $data = []
    )
    {
        $this->helperData = $helperData;
        return parent::__construct($context, $config, $data);
    }

    public function getConfig($code){
        return $this->helperData->getConfigValue('afd_' . $code);
    }


}