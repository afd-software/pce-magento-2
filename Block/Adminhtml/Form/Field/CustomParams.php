<?php

namespace Afd\Pce\Block\Adminhtml\Form\Field;

use Magento\Config\Block\System\Config\Form\Field\FieldArray\AbstractFieldArray;
use Magento\Framework\DataObject;
use Magento\Framework\Exception\LocalizedException;

/**
 * Custom PCE Parameters Field Renderer
 */
class CustomParams extends AbstractFieldArray
{
    /**
     * Prepare rendering the new field by adding all the needed columns
     *
     * @return void
     */
    protected function _prepareToRender()
    {
        $this->addColumn('param_name', [
            'label' => __('Parameter Name'),
            'class' => 'required-entry'
        ]);
        
        $this->addColumn('param_value', [
            'label' => __('Parameter Value'),
            'class' => 'required-entry'
        ]);
        
        $this->_addAfter = false;
        $this->_addButtonLabel = __('Add Parameter');
    }
}
