<?php
/**
 * AFD PCE Customer Address Metadata Repository
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Model;

use Afd\Pce\Api\AddressMetadataRepositoryInterface;
use Afd\Pce\Api\Data\AddressMetadataInterface;
use Afd\Pce\Model\ResourceModel\CustomerAddressMetadata as CustomerAddressMetadataResource;
use Afd\Pce\Model\ResourceModel\CustomerAddressMetadata\CollectionFactory as CustomerAddressMetadataCollectionFactory;
use Magento\Framework\Api\SearchCriteriaInterface;
use Magento\Framework\Api\SearchResultsInterface;
use Magento\Framework\Api\SearchResultsInterfaceFactory;
use Magento\Framework\Exception\CouldNotDeleteException;
use Magento\Framework\Exception\CouldNotSaveException;
use Magento\Framework\Exception\NoSuchEntityException;

/**
 * Class CustomerAddressMetadataRepository
 * 
 * Repository for Customer Address Metadata
 */
class CustomerAddressMetadataRepository implements AddressMetadataRepositoryInterface
{
    /**
     * @var CustomerAddressMetadataResource
     */
    private $resource;

    /**
     * @var CustomerAddressMetadataFactory
     */
    private $customerAddressMetadataFactory;

    /**
     * @var CustomerAddressMetadataCollectionFactory
     */
    private $collectionFactory;

    /**
     * @var SearchResultsInterfaceFactory
     */
    private $searchResultsFactory;

    /**
     * CustomerAddressMetadataRepository constructor.
     *
     * @param CustomerAddressMetadataResource $resource
     * @param CustomerAddressMetadataFactory $customerAddressMetadataFactory
     * @param CustomerAddressMetadataCollectionFactory $collectionFactory
     * @param SearchResultsInterfaceFactory $searchResultsFactory
     */
    public function __construct(
        CustomerAddressMetadataResource $resource,
        CustomerAddressMetadataFactory $customerAddressMetadataFactory,
        CustomerAddressMetadataCollectionFactory $collectionFactory,
        SearchResultsInterfaceFactory $searchResultsFactory
    ) {
        $this->resource = $resource;
        $this->customerAddressMetadataFactory = $customerAddressMetadataFactory;
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
        $addressMetadata = $this->customerAddressMetadataFactory->create();
        // populates the model with data from the database
        $this->resource->load($addressMetadata, $metadataId);
        if (!$addressMetadata->getId()) {
            throw new NoSuchEntityException(__('Customer address metadata with ID "%1" does not exist.', $metadataId));
        }
        return $addressMetadata;
    }

    /**
     * Get address metadata by parent ID (Customer Address ID)
     *
     * @param int $parentId
     * @param string $type Type of parent (quote, order, or customer)
     * @return AddressMetadataInterface
     * @throws NoSuchEntityException
     */
    public function getByParentId($parentId, $type)
    {
        if ($type !== 'customer') {
            throw new NoSuchEntityException(__('Invalid type "%1" for customer address metadata.', $type));
        }
        
        $collection = $this->collectionFactory->create();
        $collection->addFieldToFilter('parent_id', $parentId);
        $collection->setPageSize(1);
        
        $items = $collection->getItems();
        if (empty($items)) {
            throw new NoSuchEntityException(__('Customer address metadata with parent ID "%1" does not exist.', $parentId));
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
        
        foreach ($searchCriteria->getFilterGroups() as $filterGroup) {
            foreach ($filterGroup->getFilters() as $filter) {
                $condition = $filter->getConditionType() ?: 'eq';
                $collection->addFieldToFilter($filter->getField(), [$condition => $filter->getValue()]);
            }
        }
        
        $searchResults = $this->searchResultsFactory->create();
        $searchResults->setSearchCriteria($searchCriteria);
        $searchResults->setItems($collection->getItems());
        $searchResults->setTotalCount($collection->getSize());
        
        return $searchResults;
    }
}
