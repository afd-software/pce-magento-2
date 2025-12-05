<?php
/**
 * AFD PCE Config Provider
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Model;

use Afd\Pce\Model\Config\Source\CategorisedMetadataFields;
use Magento\Checkout\Model\ConfigProviderInterface;
use Magento\Framework\App\Config\ScopeConfigInterface;

class ConfigProvider implements ConfigProviderInterface
{
    /**
     * @var \Afd\Pce\Helper\Data
     */
    protected $helperData;
    
    /**
     * @var CategorisedMetadataFields
     */
    protected $categorisedMetadataFields;
    
    /**
     * @var ScopeConfigInterface
     */
    protected $scopeConfig;
    
    /**
     * Constructor
     *
     * @param \Afd\Pce\Helper\Data $helperData
     * @param CategorisedMetadataFields $categorisedMetadataFields
     * @param ScopeConfigInterface $scopeConfig
     */
    public function __construct(
        \Afd\Pce\Helper\Data $helperData,
        CategorisedMetadataFields $categorisedMetadataFields,
        ScopeConfigInterface $scopeConfig
    ){
        $this->helperData = $helperData;
        $this->categorisedMetadataFields = $categorisedMetadataFields;
        $this->scopeConfig = $scopeConfig;
    }

    /**
     * Get checkout configuration
     *
     * @return array
     */
    public function getConfig()
    {
        $config = [];
        $config['afd']['placeholder'] = $this->helperData->getConfigValue('afd_typeahead/fields/placeholder');
        $config['afd']['enableManualEntryButton'] = $this->helperData->getConfigValue('afd_typeahead/fields/enableManualEntryButton');
        $config['afd']['manualEntryMarkup'] = $this->helperData->getConfigValue('afd_typeahead/fields/manualEntryMarkup');
        $config['afd']['manualEntrySearchMarkup'] = $this->helperData->getConfigValue('afd_typeahead/fields/manualEntrySearchMarkup');
        $config['afd']['manualEntryCss'] = $this->helperData->getConfigValue('afd_typeahead/fields/manualEntryCss');
        $config['afd']['enableSearchAgainButton'] = $this->helperData->getConfigValue('afd_typeahead/fields/enableSearchAgainButton');
        $config['afd']['searchAgainMarkup'] = $this->helperData->getConfigValue('afd_typeahead/fields/searchAgainMarkup');
        $config['afd']['searchAgainCss'] = $this->helperData->getConfigValue('afd_typeahead/fields/searchAgainCss');
        $config['afd']['reverseGeocodeEnable'] = $this->helperData->getConfigValue('afd_typeahead/reverseGeocode/enable');
        $config['afd']['reverseGeocodeMobileOnly'] = $this->helperData->getConfigValue('afd_typeahead/reverseGeocode/mobileOnly');
        $config['afd']['reverseGeocodeText'] = $this->helperData->getConfigValue('afd_typeahead/reverseGeocode/buttonText');
        
        // Add metadata fields configuration - explicitly cast to boolean
        $config['afd']['metadataEnabled'] = (bool)$this->scopeConfig->getValue('afd_typeahead/metadata/enabled');
        
        // Get the configured metadata fields
        $metadataFields = [];
        $selectedFields = $this->scopeConfig->getValue('afd_typeahead/metadata/capture_fields');
        
        // If no fields are explicitly configured but metadata is enabled, use default fields
        if (empty($selectedFields) && $config['afd']['metadataEnabled']) {
            // Default to longitude and latitude if nothing else is configured
            $metadataFields = ['longitude', 'latitude'];
        } else if ($selectedFields) {
            // The field can be stored in multiple formats depending on how it was saved:
            // 1. JSON array from older versions
            // 2. Comma-separated string from the template
            // 3. Array from direct form submission
            
            // First try to decode as JSON
            $jsonDecoded = false;
            try {
                $selectedFieldsArray = json_decode($selectedFields, true);
                if (is_array($selectedFieldsArray)) {
                    $jsonDecoded = true;
                    foreach ($selectedFieldsArray as $field) {
                        if (isset($field['value'])) {
                            $metadataFields[] = $field['value'];
                        } else if (is_string($field)) {
                            $metadataFields[] = $field;
                        }
                    }
                }
            } catch (\Exception $e) {
                // JSON parsing failed, continue to next format
            }
            
            // If JSON parsing failed or returned no fields, try comma-separated format
            if (!$jsonDecoded || empty($metadataFields)) {
                // The template saves values as a comma-separated string
                $metadataFields = explode(',', $selectedFields);
                
                // Clean up any empty values
                $metadataFields = array_filter($metadataFields, function($value) {
                    return !empty(trim($value));
                });
            }
            
            // If we still have no fields, use defaults
            if (empty($metadataFields)) {
                $metadataFields = ['longitude', 'latitude'];
            }
        }
        
        // Set metadataFields as a proper JSON array for the frontend
        
        // Set metadataFields as a proper JSON array for the frontend
        $config['afd']['metadataFields'] = $metadataFields;
        
        return $config;
    }
}