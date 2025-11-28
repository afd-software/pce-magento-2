<?php
/**
 * AFD PCE Address Metadata Data Model
 *
 * This data model class implements the AddressMetadataInterface and provides a lightweight
 * implementation for use in the service layer and API. It serves as a Data Transfer Object (DTO)
 * following Magento's service contract pattern.
 *
 * This class is NOT a base class for the specific implementations like CustomerAddressMetadata,
 * QuoteAddressMetadata, and OrderAddressMetadata. Instead, all these classes implement the same
 * AddressMetadataInterface but serve different purposes in the architecture:
 * - This class (Data/AddressMetadata) is for API/service layer data transfer
 * - The specific implementations are database models that handle persistence
 *
 * @category    Afd
 * @package     Afd_Pce
 * @author      AFD Software
 */
declare(strict_types=1);

namespace Afd\Pce\Model\Data;

use Afd\Pce\Api\Data\AddressMetadataInterface;
use Magento\Framework\Api\AbstractExtensibleObject;
use Magento\Framework\Serialize\Serializer\Json;

/**
 * Class AddressMetadata
 * 
 * This class implements the AddressMetadataInterface and provides a lightweight implementation
 * for use in the service layer and API. It extends AbstractExtensibleObject to follow Magento's
 * data object pattern for API/service contracts.
 * 
 * Key features:
 * 1. JSON-based flexible metadata storage - allows storing any field returned by the API
 * 2. Validation flag tracking - records whether an address has been validated
 * 3. Timestamp tracking - records when metadata was created and updated
 * 4. Convenient accessor methods - provides easy access to individual metadata fields
 * 
 * The JSON-based approach allows storing any field returned by the AFD PCE API without
 * requiring database schema changes when new fields are added to the API response.
 */
class AddressMetadata extends AbstractExtensibleObject implements AddressMetadataInterface
{
    /**
     * @var Json
     */
    private $serializer;
    
    /**
     * AddressMetadata constructor.
     *
     * @param \Magento\Framework\Api\ExtensionAttributesFactory $extensionFactory
     * @param \Magento\Framework\Api\AttributeValueFactory $attributeValueFactory
     * @param Json $serializer
     * @param array $data
     */
    public function __construct(
        \Magento\Framework\Api\ExtensionAttributesFactory $extensionFactory,
        \Magento\Framework\Api\AttributeValueFactory $attributeValueFactory,
        Json $serializer,
        array $data = []
    ) {
        $this->serializer = $serializer;
        parent::__construct($extensionFactory, $attributeValueFactory, $data);
    }
    
    /**
     * Get ID
     *
     * @return int|null
     */
    public function getMetadataId()
    {
        return $this->_get(self::METADATA_ID);
    }

    /**
     * Set ID
     *
     * @param int $metadataId
     * @return $this
     */
    public function setMetadataId($metadataId)
    {
        return $this->setData(self::METADATA_ID, $metadataId);
    }

    /**
     * Get Parent ID (Quote Address ID or Order Address ID)
     *
     * @return int|null
     */
    public function getParentId()
    {
        return $this->_get(self::PARENT_ID);
    }

    /**
     * Set Parent ID
     *
     * @param int $parentId
     * @return $this
     */
    public function setParentId($parentId)
    {
        return $this->setData(self::PARENT_ID, $parentId);
    }
    
    /**
     * Get Parent Type (quote, order, or customer)
     *
     * @return string|null
     */
    public function getParentType()
    {
        return $this->getData(self::PARENT_TYPE);
    }

    /**
     * Set Parent Type
     *
     * @param string $parentType One of the PARENT_TYPE_* constants
     * @return $this
     */
    public function setParentType($parentType)
    {
        return $this->setData(self::PARENT_TYPE, $parentType);
    }
    
    /**
     * Get Metadata JSON
     * 
     * Retrieves the raw JSON string containing all address metadata fields.
     * This is the serialized representation of all metadata fields stored for this address.
     * 
     * Example usage:
     * ```php
     * // In a repository or service class
     * $metadataJson = $addressMetadata->getMetadata();
     * // This could be used for direct storage or debugging
     * ```
     *
     * @return string|null JSON string containing all address metadata
     */
    public function getMetadata()
    {
        return $this->_get(self::METADATA);
    }

    /**
     * Set Metadata JSON
     * 
     * Sets the raw JSON string containing all address metadata fields.
     * This method is typically used when loading data from the database or
     * when setting metadata in bulk from an API response.
     * 
     * Example usage:
     * ```php
     * // In a repository or service class
     * $metadataJson = json_encode($apiResponseData);
     * $addressMetadata->setMetadata($metadataJson);
     * ```
     *
     * @param string $metadata JSON string containing all address metadata
     * @return $this
     */
    public function setMetadata($metadata)
    {
        return $this->setData(self::METADATA, $metadata);
    }
    
    /**
     * Get Metadata Value
     * 
     * Retrieves a specific value from the metadata JSON by key. This method handles
     * the JSON deserialization internally and provides a convenient way to access
     * individual metadata fields without having to deal with the JSON structure directly.
     * 
     * If the key doesn't exist or if there's an error deserializing the JSON,
     * the provided default value is returned.
     * 
     * Example usage:
     * ```php
     * // In a block or template
     * $buildingType = $addressMetadata->getMetadataValue('building_type', 'Unknown');
     * $residentialIndicator = $addressMetadata->getMetadataValue('residential', false);
     * ```
     *
     * @param string $key The metadata key to retrieve
     * @param mixed $default Default value if key doesn't exist
     * @return mixed The value for the given key or default if not found
     */
    public function getMetadataValue($key, $default = null)
    {
        $metadata = $this->getMetadata();
        if (!$metadata) {
            return $default;
        }
        
        try {
            $data = $this->serializer->unserialize($metadata);
            return $data[$key] ?? $default;
        } catch (\Exception $e) {
            return $default;
        }
    }
    
    /**
     * Set Metadata Value
     * 
     * Sets a specific value in the metadata JSON by key. This method handles
     * the JSON serialization internally and provides a convenient way to update
     * individual metadata fields without having to deal with the JSON structure directly.
     * 
     * The method preserves all existing metadata values and only updates the specified key.
     * 
     * Example usage:
     * ```php
     * // In a service class
     * $addressMetadata->setMetadataValue('delivery_point_suffix', '01');
     * $addressMetadata->setMetadataValue('is_business', true);
     * ```
     *
     * @param string $key The metadata key to set
     * @param mixed $value The value to set
     * @return $this
     */
    public function setMetadataValue($key, $value)
    {
        $metadata = $this->getMetadata();
        $data = [];
        
        if ($metadata) {
            try {
                $data = $this->serializer->unserialize($metadata);
            } catch (\Exception $e) {
                $data = [];
            }
        }
        
        $data[$key] = $value;
        return $this->setMetadata($this->serializer->serialize($data));
    }
    
    /**
     * Set Multiple Metadata Values
     * 
     * Sets multiple values in the metadata JSON in a single operation. This is more
     * efficient than calling setMetadataValue() multiple times when you need to update
     * several metadata fields at once.
     * 
     * The method preserves all existing metadata values and only updates the specified keys.
     * 
     * Example usage:
     * ```php
     * // In a service class processing API response
     * $metadataValues = [
     *     'building_type' => 'Residential',
     *     'delivery_point_suffix' => '01',
     *     'is_business' => false,
     *     'thoroughfare_type' => 'Street'
     * ];
     * $addressMetadata->setMetadataValues($metadataValues);
     * ```
     *
     * @param array $values Associative array of key-value pairs to set
     * @return $this
     */
    public function setMetadataValues(array $values)
    {
        $metadata = $this->getMetadata();
        $data = [];
        
        if ($metadata) {
            try {
                $data = $this->serializer->unserialize($metadata);
            } catch (\Exception $e) {
                $data = [];
            }
        }
        
        foreach ($values as $key => $value) {
            $data[$key] = $value;
        }
        
        return $this->setMetadata($this->serializer->serialize($data));
    }
    
    /**
     * Get Address Validated Flag
     * 
     * Retrieves the flag indicating whether this address has been validated through
     * the AFD PCE API. This flag is used to determine if the address metadata is
     * reliable and can be used for business decisions.
     * 
     * Example usage:
     * ```php
     * // In a checkout or order processing flow
     * if ($addressMetadata->getIsValidated()) {
     *     // Use the metadata for shipping decisions
     * } else {
     *     // Consider re-validating the address
     * }
     * ```
     *
     * @return bool Whether the address has been validated
     */
    public function getIsValidated()
    {
        return (bool)$this->_get(self::IS_VALIDATED);
    }
    
    /**
     * Set Address Validated Flag
     * 
     * Sets the flag indicating whether this address has been validated through
     * the AFD PCE API. This flag should be set to true when an address has been
     * successfully validated, and false if validation failed or hasn't been attempted.
     * 
     * Example usage:
     * ```php
     * // In an address validation service
     * $validationResult = $this->apiClient->validateAddress($address);
     * $addressMetadata->setIsValidated($validationResult->isValid());
     * ```
     *
     * @param bool $isValidated Whether the address has been validated
     * @return $this
     */
    public function setIsValidated($isValidated)
    {
        return $this->setData(self::IS_VALIDATED, (bool)$isValidated);
    }

    /**
     * Get Created At timestamp
     *
     * @return string|null
     */
    public function getCreatedAt()
    {
        return $this->_get(self::CREATED_AT);
    }

    /**
     * Set Created At timestamp
     *
     * @param string $createdAt
     * @return $this
     */
    public function setCreatedAt($createdAt)
    {
        return $this->setData(self::CREATED_AT, $createdAt);
    }

    /**
     * Get Updated At timestamp
     *
     * @return string|null
     */
    public function getUpdatedAt()
    {
        return $this->_get(self::UPDATED_AT);
    }

    /**
     * Set Updated At timestamp
     *
     * @param string $updatedAt
     * @return $this
     */
    public function setUpdatedAt($updatedAt)
    {
        return $this->setData(self::UPDATED_AT, $updatedAt);
    }
}
