<?php
/**
 * AFD PCE Address Metadata Interface
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Api\Data;

/**
 * Interface for AFD PCE Address Metadata
 * 
 * Defines the contract for additional address metadata captured from AFD PCE API
 * Using a JSON-based approach for flexible metadata storage
 */
interface AddressMetadataInterface
{
        /**
     * Constants for database column names
     */
    const METADATA_ID = 'metadata_id';
    const PARENT_ID = 'parent_id';
    const PARENT_TYPE = 'parent_type';
    const METADATA = 'metadata';
    const IS_VALIDATED = 'is_validated';
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
    
    /**
     * Constants for parent types
     */
    const PARENT_TYPE_QUOTE = 'quote';
    const PARENT_TYPE_ORDER = 'order';
    const PARENT_TYPE_CUSTOMER = 'customer';

    /**
     * Get ID
     *
     * @return int|null
     */
    public function getMetadataId();

    /**
     * Set ID
     *
     * @param int $metadataId
     * @return $this
     */
    public function setMetadataId($metadataId);

    /**
     * Get Parent ID (Quote Address ID or Order Address ID)
     *
     * @return int|null
     */
    public function getParentId();

    /**
     * Set Parent ID
     *
     * @param int $parentId
     * @return $this
     */
    public function setParentId($parentId);
    
    /**
     * Get Parent Type (quote, order, or customer)
     *
     * @return string|null
     */
    public function getParentType();

    /**
     * Set Parent Type
     *
     * @param string $parentType One of the PARENT_TYPE_* constants
     * @return $this
     */
    public function setParentType($parentType);

    /**
     * Get Metadata JSON
     *
     * @return string|null JSON string containing all address metadata
     */
    public function getMetadata();

    /**
     * Set Metadata JSON
     *
     * @param string $metadata JSON string containing all address metadata
     * @return $this
     */
    public function setMetadata($metadata);
    
    /**
     * Get Metadata Value
     * Retrieves a specific value from the metadata JSON by key
     *
     * @param string $key The metadata key to retrieve
     * @param mixed $default Default value if key doesn't exist
     * @return mixed The value for the given key or default if not found
     */
    public function getMetadataValue($key, $default = null);
    
    /**
     * Set Metadata Value
     * Sets a specific value in the metadata JSON by key
     *
     * @param string $key The metadata key to set
     * @param mixed $value The value to set
     * @return $this
     */
    public function setMetadataValue($key, $value);
    
    /**
     * Set Multiple Metadata Values
     * Sets multiple values in the metadata JSON
     *
     * @param array $values Associative array of key-value pairs to set
     * @return $this
     */
    public function setMetadataValues(array $values);
    
    /**
     * Get Address Validated Flag
     *
     * @return bool Whether the address has been validated
     */
    public function getIsValidated();
    
    /**
     * Set Address Validated Flag
     *
     * @param bool $isValidated Whether the address has been validated
     * @return $this
     */
    public function setIsValidated($isValidated);

    /**
     * Get Created At timestamp
     *
     * @return string|null
     */
    public function getCreatedAt();

    /**
     * Set Created At timestamp
     *
     * @param string $createdAt
     * @return $this
     */
    public function setCreatedAt($createdAt);

    /**
     * Get Updated At timestamp
     *
     * @return string|null
     */
    public function getUpdatedAt();

    /**
     * Set Updated At timestamp
     *
     * @param string $updatedAt
     * @return $this
     */
    public function setUpdatedAt($updatedAt);
}
