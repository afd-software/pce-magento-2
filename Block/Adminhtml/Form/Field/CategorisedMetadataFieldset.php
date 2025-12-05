<?php
/**
 * AFD PCE Categorised Metadata Fieldset Block
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Block\Adminhtml\Form\Field;

use Afd\Pce\Model\Config\Source\CategorisedMetadataFields;
use Magento\Config\Block\System\Config\Form\Field;
use Magento\Framework\Data\Form\Element\AbstractElement;
use Magento\Backend\Block\Template\Context;
use Magento\Framework\View\Asset\Repository as AssetRepository;

/**
 * Class CategorisedMetadataFieldset
 * 
 * This class creates a custom form field for the Magento admin interface that displays
 * address metadata fields in organised, collapsible categories. It improves the admin user
 * experience by:
 *
 * 1. Grouping related metadata fields into logical categories (e.g., Address, Business, Geographical)
 * 2. Providing tooltips with detailed descriptions for each field
 * 3. Supporting collapsible sections to manage screen space effectively
 *
 * The field renders as a series of checkboxes organised by category, with JavaScript to toggle
 * visibility of each category. When saved, the selected fields are stored as a JSON-serialized array
 * in the system configuration.
 *
 * This implementation follows Magento best practices by using separate template files for HTML,
 * CSS stylesheets, and JavaScript modules rather than embedding them directly in PHP.
 */
class CategorisedMetadataFieldset extends Field
{
    /**
     * @var CategorisedMetadataFields
     */
    private $categorisedFields;
    
    /**
     * @var AssetRepository
     */
    private $assetRepository;
    
    /**
     * Constructor
     *
     * @param Context $context
     * @param CategorisedMetadataFields $categorisedFields
     * @param AssetRepository $assetRepository
     * @param array $data
     */
    public function __construct(
        Context $context,
        CategorisedMetadataFields $categorisedFields,
        AssetRepository $assetRepository,
        array $data = []
    ) {
        $this->categorisedFields = $categorisedFields;
        $this->assetRepository = $assetRepository;
        parent::__construct($context, $data);
    }
    
    /**
     * Get categorised fields source model
     *
     * @return CategorisedMetadataFields
     */
    public function getCategorisedFields(): CategorisedMetadataFields
    {
        return $this->categorisedFields;
    }
    
    /**
     * Render element HTML
     *
     * @param AbstractElement $element
     * @return string
     */
    protected function _getElementHtml(AbstractElement $element)
    {
        // Add CSS and JS
        $this->addAssets();
        
        // Set element for use in template
        $this->setElement($element);
        
        // Render template
        return $this->_toHtml();
    }
    
    /**
     * Add CSS and JS assets
     *
     * @return void
     */
    private function addAssets(): void
    {
        if ($this->getRequest()->isAjax()) {
            return;
        }
        
        // For system config fields, we need to use a different approach
        // Only add the CSS link - the JS will be loaded via RequireJS in the template
        $html = '<link rel="stylesheet" type="text/css" media="all" href="' . 
            $this->assetRepository->getUrl('Afd_Pce::css/categorised_metadata_fieldset.css') . '" />';
        
        // Add to head section
        $this->setData('after_element_html', $html . ($this->getData('after_element_html') ?? ''));
    }
    
    /**
     * Get template file
     *
     * @return string
     */
    protected function _toHtml()
    {
        return $this->fetchView($this->getTemplateFile('Afd_Pce::system/config/categorised_metadata_fieldset.phtml'));
    }
    
    /**
     * Set element for use in template
     *
     * @param AbstractElement $element
     * @return void
     */
    public function setElement(AbstractElement $element)
    {
        $this->setData('element', $element);
    }
    
    /**
     * Get element for use in template
     *
     * @return AbstractElement
     */
    public function getElement()
    {
        return $this->getData('element');
    }
    
    /**
     * Get JavaScript configuration
     *
     * @return string
     */
    public function getJsConfig()
    {
        $element = $this->getElement();
        return json_encode([
            'fieldsetId' => $element->getHtmlId()
        ]);
    }
}
