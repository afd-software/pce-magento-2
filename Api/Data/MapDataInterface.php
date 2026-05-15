<?php
/**
 * AFD PCE Map Data Interface
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Api\Data;

/**
 * Interface MapDataInterface
 * 
 * Defines the contract for precision delivery map data storage
 */
interface MapDataInterface
{
    const MAP_DATA_ID = 'map_data_id';
    const PARENT_ID = 'parent_id';
    const ORIGINAL_LAT = 'original_lat';
    const ORIGINAL_LNG = 'original_lng';
    const SELECTED_LAT = 'selected_lat';
    const SELECTED_LNG = 'selected_lng';
    const DISTANCE_FROM_ADDRESS = 'distance_from_address';
    const URBAN_RURAL = 'urban_rural';
    const IS_ADJUSTED = 'is_adjusted';
    const DELIVERY_NOTES = 'delivery_notes';
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    const URBAN_RURAL_URBAN = 'urban';
    const URBAN_RURAL_RURAL = 'rural';

    /**
     * Get Map Data ID
     *
     * @return int|null
     */
    public function getMapDataId();

    /**
     * Set Map Data ID
     *
     * @param int $mapDataId
     * @return $this
     */
    public function setMapDataId($mapDataId);

    /**
     * Get Parent ID (Address ID)
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
     * Get Original Latitude from AFD
     *
     * @return string|null
     */
    public function getOriginalLat();

    /**
     * Set Original Latitude
     *
     * @param string $lat
     * @return $this
     */
    public function setOriginalLat($lat);

    /**
     * Get Original Longitude from AFD
     *
     * @return string|null
     */
    public function getOriginalLng();

    /**
     * Set Original Longitude
     *
     * @param string $lng
     * @return $this
     */
    public function setOriginalLng($lng);

    /**
     * Get User Selected Latitude
     *
     * @return string|null
     */
    public function getSelectedLat();

    /**
     * Set User Selected Latitude
     *
     * @param string $lat
     * @return $this
     */
    public function setSelectedLat($lat);

    /**
     * Get User Selected Longitude
     *
     * @return string|null
     */
    public function getSelectedLng();

    /**
     * Set User Selected Longitude
     *
     * @param string $lng
     * @return $this
     */
    public function setSelectedLng($lng);

    /**
     * Get Distance from Original Address in Meters
     *
     * @return float|null
     */
    public function getDistanceFromAddress();

    /**
     * Set Distance from Original Address
     *
     * @param float $distance
     * @return $this
     */
    public function setDistanceFromAddress($distance);

    /**
     * Get Urban/Rural Classification
     *
     * @return string|null
     */
    public function getUrbanRural();

    /**
     * Set Urban/Rural Classification
     *
     * @param string $urbanRural
     * @return $this
     */
    public function setUrbanRural($urbanRural);

    /**
     * Get Is Adjusted Flag
     *
     * @return bool
     */
    public function getIsAdjusted();

    /**
     * Set Is Adjusted Flag
     *
     * @param bool $isAdjusted
     * @return $this
     */
    public function setIsAdjusted($isAdjusted);

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

    /**
     * Get Delivery Notes
     *
     * @return string|null
     */
    public function getDeliveryNotes();

    /**
     * Set Delivery Notes
     *
     * @param string|null $deliveryNotes
     * @return $this
     */
    public function setDeliveryNotes($deliveryNotes);
}
