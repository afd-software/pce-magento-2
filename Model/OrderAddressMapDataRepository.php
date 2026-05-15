<?php
/**
 * AFD PCE Order Address Map Data Repository
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Model;

use Afd\Pce\Api\Data\MapDataInterface;
use Afd\Pce\Api\MapDataRepositoryInterface;
use Afd\Pce\Model\ResourceModel\OrderAddressMapData as ResourceModel;
use Magento\Framework\Exception\CouldNotDeleteException;
use Magento\Framework\Exception\CouldNotSaveException;
use Magento\Framework\Exception\NoSuchEntityException;

/**
 * Class OrderAddressMapDataRepository
 */
class OrderAddressMapDataRepository implements MapDataRepositoryInterface
{
    /**
     * @var ResourceModel
     */
    private $resource;

    /**
     * @var OrderAddressMapDataFactory
     */
    private $mapDataFactory;

    /**
     * Constructor
     *
     * @param ResourceModel $resource
     * @param OrderAddressMapDataFactory $mapDataFactory
     */
    public function __construct(
        ResourceModel $resource,
        OrderAddressMapDataFactory $mapDataFactory
    ) {
        $this->resource = $resource;
        $this->mapDataFactory = $mapDataFactory;
    }

    /**
     * @inheritdoc
     */
    public function save(MapDataInterface $mapData)
    {
        try {
            $this->resource->save($mapData);
        } catch (\Exception $exception) {
            throw new CouldNotSaveException(__(
                'Could not save the map data: %1',
                $exception->getMessage()
            ));
        }
        return $mapData;
    }

    /**
     * @inheritdoc
     */
    public function getById($mapDataId)
    {
        $mapData = $this->mapDataFactory->create();
        $this->resource->load($mapData, $mapDataId);
        if (!$mapData->getMapDataId()) {
            throw new NoSuchEntityException(__('Map data with ID "%1" does not exist.', $mapDataId));
        }
        return $mapData;
    }

    /**
     * @inheritdoc
     */
    public function getByParentId($parentId)
    {
        $mapData = $this->mapDataFactory->create();
        $this->resource->loadByParentId($mapData, $parentId);
        if (!$mapData->getMapDataId()) {
            throw new NoSuchEntityException(__('Map data for address ID "%1" does not exist.', $parentId));
        }
        return $mapData;
    }

    /**
     * @inheritdoc
     */
    public function delete(MapDataInterface $mapData)
    {
        try {
            $this->resource->delete($mapData);
        } catch (\Exception $exception) {
            throw new CouldNotDeleteException(__(
                'Could not delete the map data: %1',
                $exception->getMessage()
            ));
        }
        return true;
    }

    /**
     * @inheritdoc
     */
    public function deleteById($mapDataId)
    {
        return $this->delete($this->getById($mapDataId));
    }
}
