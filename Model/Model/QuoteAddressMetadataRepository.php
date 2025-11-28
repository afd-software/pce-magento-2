<?php
/**
 * AFD PCE Quote Address Metadata Repository
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Model;

use Afd\Pce\Api\AddressMetadataRepositoryInterface;
use Afd\Pce\Api\Data\AddressMetadataInterface;
use Afd\Pce\Model\ResourceModel\QuoteAddressMetadata as QuoteAddressMetadataResource;
use Afd\Pce\Model\ResourceModel\QuoteAddressMetadata\CollectionFactory as QuoteAddressMetadataCollectionFactory;
use Magento\Framework\Api\SearchCriteriaInterface;
use Magento\Framework\Api\SearchResultsInterface;
use Magento\Framework\Api\SearchResultsInterfaceFactory;
use Magento\Framework\Exception\CouldNotDeleteException;
use Magento\Framework\Exception\CouldNotSaveException;
use Magento\Framework\Exception\NoSuchEntityException;

/**
 * Class QuoteAddressMetadataRepository
 * 
 * Repository for Quote Address Metadata
 */
class QuoteAddressMetadataRepository implements AddressMetadataRepositoryInterface
{
    /**
     * @var QuoteAddressMetadataResource
     */
    private $resource;

    /**
     * @var QuoteAddressMetadataFactory
     */
    private $quoteAddressMetadataFactory;

    /**
     * @var QuoteAddressMetadataCollectionFactory
     */
    private $collectionFactory;

    /**
     * @var SearchResultsInterfaceFactory
     */
    private $searchResultsFactory;

    /**
     * QuoteAddressMetadataRepository constructor.
     *
     * @param QuoteAddressMetadataResource $resource
     * @param QuoteAddressMetadataFactory $quoteAddressMetadataFactory
     * @param QuoteAddressMetadataCollectionFactory $collectionFactory
     * @param SearchResultsInterfaceFactory $searchResultsFactory
     */
    public function __construct(
        QuoteAddressMetadataResource $resource,
        QuoteAddressMetadataFactory $quoteAddressMetadataFactory,
        QuoteAddressMetadataCollectionFactory $collectionFactory,
        SearchResultsInterfaceFactory $searchResultsFactory
    ) {
        $this->resource = $resource;
        $this->quoteAddressMetadataFactory = $quoteAddressMetadataFactory;
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
        $addressMetadata = $this->quoteAddressMetadataFactory->create();
        $this->resource->load($addressMetadata, $metadataId);
        if (!$addressMetadata->getId()) {
            throw new NoSuchEntityException(__('Address metadata with id "%1" does not exist.', $metadataId));
        }
        return $addressMetadata;
    }

    /**
     * Get address metadata by parent ID (Quote Address ID)
     *
     * @param int $parentId
     * @param string $type Type of parent (quote or order)
     * @return AddressMetadataInterface
     * @throws NoSuchEntityException
     */
    public function getByParentId($parentId, $type)
    {
        if ($type !== 'quote') {
            throw new NoSuchEntityException(__('Invalid parent type: %1', $type));
        }

        $collection = $this->collectionFactory->create();
        $collection->addFieldToFilter('parent_id', $parentId);
        $collection->setPageSize(1);

        $items = $collection->getItems();
        if (!$items) {
            throw new NoSuchEntityException(__('Address metadata for parent ID "%1" does not exist.', $parentId));
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
