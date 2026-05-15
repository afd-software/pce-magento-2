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
use Afd\Pce\Helper\PrecisionDelivery;
use Afd\Pce\Helper\CleanseOnSubmit;
use Afd\Pce\Model\CustomerAddressMapDataRepository;
use Afd\Pce\Model\CustomerAddressMetadataRepository;
use Magento\Checkout\Model\ConfigProviderInterface;
use Magento\Customer\Model\Session as CustomerSession;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\Exception\NoSuchEntityException;

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
     * @var PrecisionDelivery
     */
    protected $precisionDeliveryHelper;

    /**
     * @var CustomerSession
     */
    protected $customerSession;

    /**
     * @var CustomerAddressMapDataRepository
     */
    protected $customerAddressMapDataRepository;

    /**
     * @var CustomerAddressMetadataRepository
     */
    protected $customerAddressMetadataRepository;

    /**
     * @var CleanseOnSubmit
     */
    protected $cleanseOnSubmitHelper;

    /**
     * Constructor
     *
     * @param \Afd\Pce\Helper\Data $helperData
     * @param CategorisedMetadataFields $categorisedMetadataFields
     * @param ScopeConfigInterface $scopeConfig
     * @param PrecisionDelivery $precisionDeliveryHelper
     * @param CustomerSession $customerSession
     * @param CustomerAddressMapDataRepository $customerAddressMapDataRepository
     * @param CustomerAddressMetadataRepository $customerAddressMetadataRepository
     * @param CleanseOnSubmit $cleanseOnSubmitHelper
     */
    public function __construct(
        \Afd\Pce\Helper\Data $helperData,
        CategorisedMetadataFields $categorisedMetadataFields,
        ScopeConfigInterface $scopeConfig,
        PrecisionDelivery $precisionDeliveryHelper,
        CustomerSession $customerSession,
        CustomerAddressMapDataRepository $customerAddressMapDataRepository,
        CustomerAddressMetadataRepository $customerAddressMetadataRepository,
        CleanseOnSubmit $cleanseOnSubmitHelper
    ){
        $this->helperData = $helperData;
        $this->categorisedMetadataFields = $categorisedMetadataFields;
        $this->scopeConfig = $scopeConfig;
        $this->precisionDeliveryHelper = $precisionDeliveryHelper;
        $this->customerSession = $customerSession;
        $this->customerAddressMapDataRepository = $customerAddressMapDataRepository;
        $this->customerAddressMetadataRepository = $customerAddressMetadataRepository;
        $this->cleanseOnSubmitHelper = $cleanseOnSubmitHelper;
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
        
        // Add Precision Delivery configuration
        $config['afd']['precisionDelivery'] = $this->precisionDeliveryHelper->getConfigArray();
        
        // Add Cleanse on Submit configuration
        $config['afd']['cleanseOnSubmit'] = $this->cleanseOnSubmitHelper->getConfigArray();
        
        // Add customer address map data and metadata for logged-in customers
        $config['afd']['customerAddressMapData'] = $this->getCustomerAddressMapData();
        $config['afd']['customerAddressMetadata'] = $this->getCustomerAddressMetadata();
        
        return $config;
    }

    /**
     * Get map data for all customer addresses
     *
     * @return array
     */
    protected function getCustomerAddressMapData(): array
    {
        $mapData = [];
        
        if (!$this->customerSession->isLoggedIn()) {
            return $mapData;
        }

        try {
            $customer = $this->customerSession->getCustomer();
            $addresses = $customer->getAddresses();
            
            if (!$addresses) {
                return $mapData;
            }
            
            foreach ($addresses as $address) {
                $addressId = $address->getId();
                if (!$addressId) {
                    continue;
                }
                
                try {
                    $addressMapData = $this->customerAddressMapDataRepository->getByParentId((int)$addressId);
                    $mapData[$addressId] = [
                        'original_lat' => $addressMapData->getOriginalLat(),
                        'original_lng' => $addressMapData->getOriginalLng(),
                        'selected_lat' => $addressMapData->getSelectedLat(),
                        'selected_lng' => $addressMapData->getSelectedLng(),
                        'distance_from_address' => $addressMapData->getDistanceFromAddress(),
                        'urban_rural' => $addressMapData->getUrbanRural(),
                        'is_adjusted' => $addressMapData->getIsAdjusted(),
                        'delivery_notes' => $addressMapData->getDeliveryNotes()
                    ];
                } catch (NoSuchEntityException $e) {
                    // No map data for this address
                }
            }
        } catch (\Exception $e) {
            // Log error but don't break checkout
        }

        return $mapData;
    }

    /**
     * Get metadata for all customer addresses
     *
     * @return array
     */
    protected function getCustomerAddressMetadata(): array
    {
        $metadata = [];
        
        if (!$this->customerSession->isLoggedIn()) {
            return $metadata;
        }

        try {
            $customer = $this->customerSession->getCustomer();
            $addresses = $customer->getAddresses();
            
            if (!$addresses) {
                return $metadata;
            }
            
            foreach ($addresses as $address) {
                $addressId = $address->getId();
                if (!$addressId) {
                    continue;
                }
                
                try {
                    $addressMetadata = $this->customerAddressMetadataRepository->getByParentId((int)$addressId, 'customer');
                    $metadataJson = $addressMetadata->getMetadata();
                    if ($metadataJson) {
                        $metadata[$addressId] = json_decode($metadataJson, true);
                    }
                } catch (NoSuchEntityException $e) {
                    // No metadata for this address
                }
            }
        } catch (\Exception $e) {
            // Log error but don't break checkout
        }

        return $metadata;
    }
}