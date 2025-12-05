<?php
/**
 * AFD PCE Order Address Metadata Model
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Model;

use Afd\Pce\Api\Data\AddressMetadataInterface;
use Magento\Framework\Model\AbstractModel;
use Magento\Framework\Serialize\Serializer\Json;

/**
 * Class OrderAddressMetadata
 * 
 * Model for Order Address Metadata
 * Using a JSON-based approach for flexible metadata storage
 */
class OrderAddressMetadata extends AbstractModel implements AddressMetadataInterface
{
    /**
     * @var Json
     */
    private $serializer;
    
    /**
     * @inheritdoc
     */
    protected function _construct()
    {
        $this->_init(ResourceModel\OrderAddressMetadata::class);
        $this->serializer = \Magento\Framework\App\ObjectManager::getInstance()->get(Json::class);
    }

    /**
     * Get ID
     *
     * @return int|null
     */
    public function getMetadataId()
    {
        return $this->getData(self::METADATA_ID);
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
     * Get Parent ID (Order Address ID)
     *
     * @return int|null
     */
    public function getParentId()
    {
        return $this->getData(self::PARENT_ID);
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
     * @return string|null JSON string containing all address metadata
     */
    public function getMetadata()
    {
        return $this->getData(self::METADATA);
    }

    /**
     * Set Metadata JSON
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
     * Retrieves a specific value from the metadata JSON by key
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
     * Sets a specific value in the metadata JSON by key
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
     * Sets multiple values in the metadata JSON
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
     * @return bool Whether the address has been validated
     */
    public function getIsValidated()
    {
        return (bool)$this->getData(self::IS_VALIDATED);
    }
    
    /**
     * Set Address Validated Flag
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
        return $this->getData(self::CREATED_AT);
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
        return $this->getData(self::UPDATED_AT);
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
