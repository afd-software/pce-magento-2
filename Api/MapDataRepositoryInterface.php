<?php
/**
 * AFD PCE Map Data Repository Interface
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Api;

use Afd\Pce\Api\Data\MapDataInterface;
use Magento\Framework\Exception\CouldNotSaveException;
use Magento\Framework\Exception\NoSuchEntityException;
use Magento\Framework\Exception\CouldNotDeleteException;

/**
 * Interface MapDataRepositoryInterface
 */
interface MapDataRepositoryInterface
{
    /**
     * Save map data
     *
     * @param MapDataInterface $mapData
     * @return MapDataInterface
     * @throws CouldNotSaveException
     */
    public function save(MapDataInterface $mapData);

    /**
     * Get map data by ID
     *
     * @param int $mapDataId
     * @return MapDataInterface
     * @throws NoSuchEntityException
     */
    public function getById($mapDataId);

    /**
     * Get map data by parent address ID
     *
     * @param int $parentId
     * @return MapDataInterface
     * @throws NoSuchEntityException
     */
    public function getByParentId($parentId);

    /**
     * Delete map data
     *
     * @param MapDataInterface $mapData
     * @return bool
     * @throws CouldNotDeleteException
     */
    public function delete(MapDataInterface $mapData);

    /**
     * Delete map data by ID
     *
     * @param int $mapDataId
     * @return bool
     * @throws CouldNotDeleteException
     * @throws NoSuchEntityException
     */
    public function deleteById($mapDataId);
}
