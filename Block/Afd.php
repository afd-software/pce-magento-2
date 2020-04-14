<?php

namespace Afd\Pce\Block;



class Afd extends \Magento\Framework\View\Element\Template
{

    protected $helperData;

    public function __construct(
        \Magento\Framework\View\Element\Template\Context $context,
        \Afd\Pce\Helper\Data $helperData
    ){
        $this->helperData = $helperData;
        return parent::__construct($context);
    }

    public function getConfig($code){
        return $this->helperData->getConfigValue('afd_' . $code);
    }

    public function getValidateEmailAction()
    {
        return $this->getUrl('email/index/index', ['_secure' => true]);
    }

}