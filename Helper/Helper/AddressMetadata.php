<?php
/**
 * AFD PCE Address Metadata Helper
 *
 * This helper class provides centralised access to address metadata configuration and functionality.
 * It handles all interactions with the system configuration for metadata settings and provides
 * utility methods for filtering API responses to extract only the configured metadata fields.
 *
 * @category    Afd
 * @package     Afd_Pce
 * @author      AFD Software
 */
declare(strict_types=1);

namespace Afd\Pce\Helper;

use Magento\Framework\App\Helper\AbstractHelper;
use Magento\Framework\App\Helper\Context;
use Magento\Store\Model\ScopeInterface;
use Psr\Log\LoggerInterface;

/**
 * Class AddressMetadata
 * 
 * This helper class manages address metadata configuration and processing in the AFD PCE module.
 * 
 * It provides methods to:
 * 1. Check if address metadata capture is enabled/disabled in the system configuration
 * 2. Retrieve the list of metadata fields that should be captured from the API response
 * 3. Determine where metadata should be displayed (admin, packing slip, etc.)
 * 4. Filter API responses to extract only the configured metadata fields
 * 
 * The class supports both legacy comma-separated configuration format and the new
 * JSON-serialized format used by the categorised metadata field UI component.
 * 
 * Usage examples:
 * - During address validation to determine which fields to extract from the API response
 * - In admin order view to check if metadata should be displayed
 * - In sales documents (packing slips) to determine if metadata should be included
 * 
 * This helper class works in conjunction with the various address metadata implementations
 * in the module:
 * 
 * 1. Model/Data/AddressMetadata.php - A lightweight DTO for API/service layer
 * 2. Model/CustomerAddressMetadata.php - Database model for customer address metadata
 * 3. Model/QuoteAddressMetadata.php - Database model for quote address metadata
 * 4. Model/OrderAddressMetadata.php - Database model for order address metadata
 * 
 * These classes all implement the same AddressMetadataInterface but serve different purposes:
 * - The Data model is for API/service layer data transfer
 * - The specific implementations are database models that handle persistence
 * 
 * They are parallel implementations of the same interface rather than extensions of a base class.
 */
class AddressMetadata extends AbstractHelper
{
    /**
     * Config paths
     */
    const XML_PATH_METADATA_ENABLED = 'afd_typeahead/metadata/enabled';
    const XML_PATH_METADATA_CAPTURE_FIELDS = 'afd_typeahead/metadata/capture_fields';
    const XML_PATH_METADATA_DISPLAY_ADMIN = 'afd_typeahead/metadata/display_in_admin';
    const XML_PATH_METADATA_DISPLAY_PACKINGSLIP = 'afd_typeahead/metadata/display_in_packingslip';
    
    /**
     * @var LoggerInterface
     */
    private $logger;
    
    /**
     * AddressMetadata constructor.
     *
     * @param Context $context
     * @param LoggerInterface $logger
     */
    public function __construct(
        Context $context,
        LoggerInterface $logger
    ) {
        parent::__construct($context);
        $this->logger = $logger;
    }
    
    /**
     * Log a message to the system log
     *
     * This method logs a message with the prefix '[AFD PCE Metadata]' to make it easily
     * identifiable in the system logs. It's used throughout the module for debugging
     * and tracing metadata processing.
     *
     * @param string $message The message to log
     * @return void
     */
    public function log(string $message): void
    {
        $this->logger->info('[AFD PCE Metadata] ' . $message);
    }

    /**
     * Check if address metadata capture is enabled in the system configuration
     *
     * This method checks the 'afd_typeahead/metadata/enabled' configuration setting to determine
     * if the address metadata capture functionality is enabled for the specified store.
     *
     * Example usage:
     * ```php
     * // In a controller or other class
     * $metadataHelper = $this->addressMetadataHelper;
     * if ($metadataHelper->isEnabled()) {
     *     // Process metadata fields
     * }
     * ```
     *
     * @param int|null $storeId The store ID to check the configuration for (null for current store)
     * @return bool True if metadata capture is enabled, false otherwise
     */
    public function isEnabled($storeId = null): bool
    {
        return (bool)$this->scopeConfig->getValue(
            self::XML_PATH_METADATA_ENABLED,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );
    }

    /**
     * Get metadata fields to capture from the system configuration
     *
     * This method retrieves the list of metadata fields that should be captured from the API response.
     * It supports both legacy comma-separated format and the new JSON-serialized format used by
     * the categorised metadata field UI component.
     *
     * The method handles multiple formats:
     * 1. JSON array/object (from the new categorised UI component)
     * 2. Comma-separated string (for backward compatibility)
     *
     * Example usage:
     * ```php
     * // In the address validation process
     * $fieldsToCapture = $this->addressMetadataHelper->getCaptureFields();
     * // Use the fields to filter the API response
     * ```
     *
     * @param int|null $storeId The store ID to get the configuration for (null for current store)
     * @return array List of metadata field names to capture
     */
    public function getCaptureFields($storeId = null): array
    {
        $fields = $this->scopeConfig->getValue(
            self::XML_PATH_METADATA_CAPTURE_FIELDS,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );
        
        // Handle empty or null values
        if (empty($fields)) {
            return [];
        }
        
        // Ensure we're working with a string
        if (!is_string($fields)) {
            return [];
        }
        
        // If it's a serialized array (from the new UI component)
        if ($fields[0] === '{' || $fields[0] === '[') {
            try {
                $decodedFields = json_decode($fields, true);
                if (json_last_error() !== JSON_ERROR_NONE) {
                    $this->log('JSON decode error: ' . json_last_error_msg());
                    return [];
                }
                
                if (is_array($decodedFields)) {
                    return $decodedFields;
                }
            } catch (\Exception $e) {
                $this->log('Exception decoding JSON capture fields: ' . $e->getMessage());
                // If JSON decode fails, fall back to comma-separated string handling
            }
        }
        
        // Handle as comma-separated string (for backward compatibility)
        $result = explode(',', $fields);
        return $result;
    }

    /**
     * Check if metadata should be displayed in admin order view
     *
     * This method checks the 'afd_typeahead/metadata/display_in_admin' configuration setting to determine
     * if the captured address metadata should be displayed in the admin order view interface.
     *
     * Example usage:
     * ```php
     * // In an admin order view block or template
     * if ($this->addressMetadataHelper->isDisplayInAdmin()) {
     *     // Render metadata fields in the admin interface
     * }
     * ```
     *
     * @param int|null $storeId The store ID to check the configuration for (null for current store)
     * @return bool True if metadata should be displayed in admin, false otherwise
     */
    public function isDisplayInAdmin($storeId = null): bool
    {
        return (bool)$this->scopeConfig->getValue(
            self::XML_PATH_METADATA_DISPLAY_ADMIN,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );
    }

    /**
     * Check if metadata should be displayed in packing slip
     *
     * This method checks the 'afd_typeahead/metadata/display_in_packingslip' configuration setting to determine
     * if the captured address metadata should be included in packing slip documents.
     *
     * Example usage:
     * ```php
     * // In a packing slip PDF renderer or template
     * if ($this->addressMetadataHelper->isDisplayInPackingSlip()) {
     *     // Include metadata fields in the packing slip
     * }
     * ```
     *
     * @param int|null $storeId The store ID to check the configuration for (null for current store)
     * @return bool True if metadata should be displayed in packing slip, false otherwise
     */
    public function isDisplayInPackingSlip($storeId = null): bool
    {
        return (bool)$this->scopeConfig->getValue(
            self::XML_PATH_METADATA_DISPLAY_PACKINGSLIP,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );
    }

    /**
     * Recursively flatten nested array structures using underscore notation
     *
     * This method converts nested JSON structures from the AFD PCE API into a flat array
     * using underscore notation for the keys. This allows nested data like:
     * 
     * EPC.Residential.CurrentEnergyRating -> EPC_Residential_CurrentEnergyRating
     * PropertyAttributes.NumKids -> PropertyAttributes_NumKids
     *
     * @param array $data The nested array to flatten
     * @param string $prefix The current key prefix (used for recursion)
     * @return array Flattened array with underscore notation keys
     */
    private function flattenArray(array $data, string $prefix = ''): array
    {
        $result = [];
        
        foreach ($data as $key => $value) {
            // Build the flattened key using underscore notation
            $newKey = $prefix === '' ? $key : $prefix . '_' . $key;
            
            if (is_array($value) && !empty($value)) {
                // If the value is an array, recursively flatten it
                $result = array_merge($result, $this->flattenArray($value, $newKey));
            } else {
                // If the value is not an array, add it to the result
                $result[$newKey] = $value;
            }
        }
        
        return $result;
    }

    /**
     * Filter API response to extract only the configured metadata fields
     *
     * This method processes the raw API response and extracts only the metadata fields that have been
     * configured to be captured in the system configuration. It handles both the legacy 'All Fields' option
     * (using the '*' wildcard) and the new specific field selection approach.
     *
     * The method now flattens nested structures before filtering, converting nested API responses like:
     * EPC.Residential.CurrentEnergyRating -> EPC_Residential_CurrentEnergyRating
     * PropertyAttributes.NumKids -> PropertyAttributes_NumKids
     *
     * This is a key integration point between the API response and the metadata storage system.
     * It's typically called during address validation after receiving the API response.
     *
     * Example usage:
     * ```php
     * // In the address validation service
     * $apiResponse = $this->apiClient->validateAddress($address);
     * $metadataToStore = $this->addressMetadataHelper->filterApiResponse($apiResponse);
     * 
     * // Then store the filtered metadata with the address
     * $this->addressMetadataRepository->saveAddressMetadata($addressId, $metadataToStore);
     * ```
     *
     * @param array $apiResponse The raw API response containing all available metadata fields
     * @param int|null $storeId The store ID to get the configuration for (null for current store)
     * @return array Filtered array containing only the configured metadata fields with flattened keys
     */
    public function filterApiResponse(array $apiResponse, $storeId = null): array
    {
        if (!$this->isEnabled($storeId)) {
            return [];
        }

        $captureFields = $this->getCaptureFields($storeId);
        if (empty($captureFields) || empty($apiResponse)) {
            return [];
        }

        // First, flatten the nested API response structure
        $flattenedResponse = $this->flattenArray($apiResponse);
        
        $this->log('Flattened API response keys: ' . implode(', ', array_keys($flattenedResponse)));

        // If "All Fields" is selected or if the wildcard is present, return all flattened fields
        if (in_array('*', $captureFields)) {
            return $flattenedResponse;
        }
        
        $fieldList = [];
        foreach ($captureFields as $field) {
            if (is_array($field) && isset($field['value'])) {
                $fieldList[] = $field['value'];
            } else {
                // Handle backward compatibility with simple string values
                $fieldList[] = $field;
            }
        }
        
        // If we have a list of fields, filter the flattened API response
        if (!empty($fieldList)) {
            $filteredResponse = array_intersect_key($flattenedResponse, array_flip($fieldList));
            $this->log('Filtered response contains ' . count($filteredResponse) . ' fields: ' . implode(', ', array_keys($filteredResponse)));
            return $filteredResponse;
        }
        
        return $flattenedResponse;
    }
}
