<?php
/**
 * AFD PCE Order Address Metadata Repository
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Model;

use Afd\Pce\Api\AddressMetadataRepositoryInterface;
use Afd\Pce\Api\Data\AddressMetadataInterface;
use Afd\Pce\Model\ResourceModel\OrderAddressMetadata as OrderAddressMetadataResource;
use Afd\Pce\Model\ResourceModel\OrderAddressMetadata\CollectionFactory as OrderAddressMetadataCollectionFactory;
use Magento\Framework\Api\SearchCriteriaInterface;
use Magento\Framework\Api\SearchResultsInterface;
use Magento\Framework\Api\SearchResultsInterfaceFactory;
use Magento\Framework\Exception\CouldNotDeleteException;
use Magento\Framework\Exception\CouldNotSaveException;
use Magento\Framework\Exception\NoSuchEntityException;

/**
 * Class OrderAddressMetadataRepository
 * 
 * Repository for Order Address Metadata
 */
class OrderAddressMetadataRepository implements AddressMetadataRepositoryInterface
{
    /**
     * @var OrderAddressMetadataResource
     */
    private $resource;

    /**
     * @var OrderAddressMetadataFactory
     */
    private $orderAddressMetadataFactory;

    /**
     * @var OrderAddressMetadataCollectionFactory
     */
    private $collectionFactory;

    /**
     * @var SearchResultsInterfaceFactory
     */
    private $searchResultsFactory;

    /**
     * OrderAddressMetadataRepository constructor.
     *
     * @param OrderAddressMetadataResource $resource
     * @param OrderAddressMetadataFactory $orderAddressMetadataFactory
     * @param OrderAddressMetadataCollectionFactory $collectionFactory
     * @param SearchResultsInterfaceFactory $searchResultsFactory
     */
    public function __construct(
        OrderAddressMetadataResource $resource,
        OrderAddressMetadataFactory $orderAddressMetadataFactory,
        OrderAddressMetadataCollectionFactory $collectionFactory,
        SearchResultsInterfaceFactory $searchResultsFactory
    ) {
        $this->resource = $resource;
        $this->orderAddressMetadataFactory = $orderAddressMetadataFactory;
        $this->collectionFactory = $collectionFactory;
        $this->searchResultsFactory = $searchResultsFactory;
    }

    /**
     * Save address metadata
     *
     * @param AddressMetadataInterface $addressMetadata
     * @return AddressMetadataInterface
     * @throws CouldNotSaveException
     */
    public function save(AddressMetadataInterface $addressMetadata)
    {
        try {
            $this->resource->save($addressMetadata);
        } catch (\Exception $exception) {
            throw new CouldNotSaveException(__(
                'Could not save the address metadata: %1',
                $exception->getMessage()
            ));
        }
        return $addressMetadata;
    }

    /**
     * Get address metadata by ID
     *
     * @param int $metadataId
     * @return AddressMetadataInterface
     * @throws NoSuchEntityException
     */
    public function getById($metadataId)
    {
        $addressMetadata = $this->orderAddressMetadataFactory->create();
        $this->resource->load($addressMetadata, $metadataId);
        if (!$addressMetadata->getId()) {
            throw new NoSuchEntityException(__('Address metadata with id "%1" does not exist.', $metadataId));
        }
        return $addressMetadata;
    }

    /**
     * Get address metadata by parent ID (Order Address ID)
     *
     * @param int $parentId
     * @param string $type Type of parent (quote or order)
     * @return AddressMetadataInterface
     * @throws NoSuchEntityException
     */
    public function getByParentId($parentId, $type)
    {
        // Validate parent type
        if ($type !== AddressMetadataInterface::PARENT_TYPE_ORDER) {
            throw new NoSuchEntityException(__('Invalid parent type: %1', $type));
        }

        $collection = $this->collectionFactory->create();
        $collection->addFieldToFilter('parent_id', $parentId);
        
        // Add parent_type filter if the column exists in the table
        try {
            $collection->addFieldToFilter('parent_type', $type);
        } catch (\Exception $e) {
            // If the column doesn't exist, log the error but continue
            // This allows backward compatibility with older database schemas
        }
        
        $collection->setPageSize(1);

        $items = $collection->getItems();
        if (!$items) {
            throw new NoSuchEntityException(__('Address metadata for parent ID "%1" with type "%2" does not exist.', [$parentId, $type]));
        }

        return reset($items);
    }

    /**
     * Delete address metadata
     *
     * @param AddressMetadataInterface $addressMetadata
     * @return bool
     * @throws CouldNotDeleteException
     */
    public function delete(AddressMetadataInterface $addressMetadata)
    {
        try {
            $this->resource->delete($addressMetadata);
        } catch (\Exception $exception) {
            throw new CouldNotDeleteException(__(
                'Could not delete the address metadata: %1',
                $exception->getMessage()
            ));
        }
        return true;
    }

    /**
     * Delete address metadata by ID
     *
     * @param int $metadataId
     * @return bool
     * @throws CouldNotDeleteException
     * @throws NoSuchEntityException
     */
    public function deleteById($metadataId)
    {
        return $this->delete($this->getById($metadataId));
    }

    /**
     * Get list of address metadata
     *
     * @param SearchCriteriaInterface $searchCriteria
     * @return SearchResultsInterface
     */
    public function getList(SearchCriteriaInterface $searchCriteria)
    {
        $collection = $this->collectionFactory->create();
        
        // Add filters from search criteria
        foreach ($searchCriteria->getFilterGroups() as $filterGroup) {
            foreach ($filterGroup->getFilters() as $filter) {
                $condition = $filter->getConditionType() ?: 'eq';
                $collection->addFieldToFilter($filter->getField(), [$condition => $filter->getValue()]);
            }
        }
        
        // Add sort orders
        $sortOrders = $searchCriteria->getSortOrders();
        if ($sortOrders) {
            foreach ($sortOrders as $sortOrder) {
                $collection->addOrder(
                    $sortOrder->getField(),
                    ($sortOrder->getDirection() == SortOrder::SORT_ASC) ? 'ASC' : 'DESC'
                );
            }
        }
        
        // Add paging
        $collection->setCurPage($searchCriteria->getCurrentPage());
        $collection->setPageSize($searchCriteria->getPageSize());
        
        // Create search results
        $searchResults = $this->searchResultsFactory->create();
        $searchResults->setSearchCriteria($searchCriteria);
        $searchResults->setItems($collection->getItems());
        $searchResults->setTotalCount($collection->getSize());
        
        return $searchResults;
    }
}
