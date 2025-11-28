<?php
namespace Afd\Pce\Block\Adminhtml;

use Magento\Backend\Block\Template;
use Magento\Backend\Block\Template\Context;
use Afd\Pce\Helper\Data as HelperData;

class Css extends Template
{
    protected $helperData;

    public function __construct(
        Context    $context,
        HelperData $helperData,
        array $data = []
    ){
        parent::__construct($context, $data);
        $this->helperData = $helperData;
        $this->page = $data['page'];
    }

    protected function _prepareLayout()
    {
        parent::_prepareLayout();

        if($this->helperData->getConfigValue("afd_typeahead/forms/{$this->page}")) {
            $this->pageConfig->addPageAsset('Afd_Pce::css/jquery.typeahead.afd.css');
            $this->pageConfig->addPageAsset('Afd_Pce::css/afd.styles.css');
            $this->pageConfig->addPageAsset('Afd_Pce::css/jquery.spinner.afd.css');
        }
        if($this->helperData->getConfigValue("afd_phone/forms/{$this->page}")) {
            $this->pageConfig->addPageAsset('Afd_Pce::css/jquery.phone.afd.css');
            $this->pageConfig->addPageAsset('Afd_Pce::css/afd.styles.css');
            $this->pageConfig->addPageAsset('Afd_Pce::css/jquery.spinner.afd.css');
        }
        return $this;
    }
}
