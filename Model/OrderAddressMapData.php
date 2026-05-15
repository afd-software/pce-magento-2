<?php
/**
 * AFD PCE Order Address Map Data Model
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Model;

use Afd\Pce\Api\Data\MapDataInterface;
use Afd\Pce\Model\ResourceModel\OrderAddressMapData as ResourceModel;
use Magento\Framework\Model\AbstractModel;

/**
 * Class OrderAddressMapData
 */
class OrderAddressMapData extends AbstractModel implements MapDataInterface
{
    /**
     * @var string
     */
    protected $_eventPrefix = 'afd_order_address_map_data';

    /**
     * Initialize resource model
     *
     * @return void
     */
    protected function _construct()
    {
        $this->_init(ResourceModel::class);
    }

    /**
     * @inheritdoc
     */
    public function getMapDataId()
    {
        return $this->getData(self::MAP_DATA_ID);
    }

    /**
     * @inheritdoc
     */
    public function setMapDataId($mapDataId)
    {
        return $this->setData(self::MAP_DATA_ID, $mapDataId);
    }

    /**
     * @inheritdoc
     */
    public function getParentId()
    {
        return $this->getData(self::PARENT_ID);
    }

    /**
     * @inheritdoc
     */
    public function setParentId($parentId)
    {
        return $this->setData(self::PARENT_ID, $parentId);
    }

    /**
     * @inheritdoc
     */
    public function getOriginalLat()
    {
        return $this->getData(self::ORIGINAL_LAT);
    }

    /**
     * @inheritdoc
     */
    public function setOriginalLat($lat)
    {
        return $this->setData(self::ORIGINAL_LAT, $lat);
    }

    /**
     * @inheritdoc
     */
    public function getOriginalLng()
    {
        return $this->getData(self::ORIGINAL_LNG);
    }

    /**
     * @inheritdoc
     */
    public function setOriginalLng($lng)
    {
        return $this->setData(self::ORIGINAL_LNG, $lng);
    }

    /**
     * @inheritdoc
     */
    public function getSelectedLat()
    {
        return $this->getData(self::SELECTED_LAT);
    }

    /**
     * @inheritdoc
     */
    public function setSelectedLat($lat)
    {
        return $this->setData(self::SELECTED_LAT, $lat);
    }

    /**
     * @inheritdoc
     */
    public function getSelectedLng()
    {
        return $this->getData(self::SELECTED_LNG);
    }

    /**
     * @inheritdoc
     */
    public function setSelectedLng($lng)
    {
        return $this->setData(self::SELECTED_LNG, $lng);
    }

    /**
     * @inheritdoc
     */
    public function getDistanceFromAddress()
    {
        return $this->getData(self::DISTANCE_FROM_ADDRESS);
    }

    /**
     * @inheritdoc
     */
    public function setDistanceFromAddress($distance)
    {
        return $this->setData(self::DISTANCE_FROM_ADDRESS, $distance);
    }

    /**
     * @inheritdoc
     */
    public function getUrbanRural()
    {
        return $this->getData(self::URBAN_RURAL);
    }

    /**
     * @inheritdoc
     */
    public function setUrbanRural($urbanRural)
    {
        return $this->setData(self::URBAN_RURAL, $urbanRural);
    }

    /**
     * @inheritdoc
     */
    public function getIsAdjusted()
    {
        return (bool)$this->getData(self::IS_ADJUSTED);
    }

    /**
     * @inheritdoc
     */
    public function setIsAdjusted($isAdjusted)
    {
        return $this->setData(self::IS_ADJUSTED, (bool)$isAdjusted);
    }

    /**
     * @inheritdoc
     */
    public function getCreatedAt()
    {
        return $this->getData(self::CREATED_AT);
    }

    /**
     * @inheritdoc
     */
    public function setCreatedAt($createdAt)
    {
        return $this->setData(self::CREATED_AT, $createdAt);
    }

    /**
     * @inheritdoc
     */
    public function getUpdatedAt()
    {
        return $this->getData(self::UPDATED_AT);
    }

    /**
     * @inheritdoc
     */
    public function setUpdatedAt($updatedAt)
    {
        return $this->setData(self::UPDATED_AT, $updatedAt);
    }

    /**
     * @inheritdoc
     */
    public function getDeliveryNotes()
    {
        return $this->getData(self::DELIVERY_NOTES);
    }

    /**
     * @inheritdoc
     */
    public function setDeliveryNotes($deliveryNotes)
    {
        return $this->setData(self::DELIVERY_NOTES, $deliveryNotes);
    }
}
