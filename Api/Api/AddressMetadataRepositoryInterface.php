<?php
/**
 * AFD PCE Address Metadata Repository Interface
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Api;

use Afd\Pce\Api\Data\AddressMetadataInterface;
use Magento\Framework\Api\SearchCriteriaInterface;
use Magento\Framework\Api\SearchResultsInterface;
use Magento\Framework\Exception\CouldNotDeleteException;
use Magento\Framework\Exception\CouldNotSaveException;
use Magento\Framework\Exception\NoSuchEntityException;

/**
 * Interface for AFD PCE Address Metadata Repository
 */
interface AddressMetadataRepositoryInterface
{
    /**
     * Save address metadata
     *
     * @param AddressMetadataInterface $addressMetadata
     * @return AddressMetadataInterface
     * @throws CouldNotSaveException
     */
    public function save(AddressMetadataInterface $addressMetadata);

    /**
     * Get address metadata by ID
     *
     * @param int $metadataId
     * @return AddressMetadataInterface
     * @throws NoSuchEntityException
     */
    public function getById($metadataId);

    /**
     * Get address metadata by parent ID (Quote Address ID or Order Address ID)
     *
     * @param int $parentId
     * @param string $type Type of parent (quote or order)
     * @return AddressMetadataInterface
     * @throws NoSuchEntityException
     */
    public function getByParentId($parentId, $type);

    /**
     * Delete address metadata
     *
     * @param AddressMetadataInterface $addressMetadata
     * @return bool
     * @throws CouldNotDeleteException
     */
    public function delete(AddressMetadataInterface $addressMetadata);

    /**
     * Delete address metadata by ID
     *
     * @param int $metadataId
     * @return bool
     * @throws CouldNotDeleteException
     * @throws NoSuchEntityException
     */
    public function deleteById($metadataId);

    /**
     * Get list of address metadata
     *
     * @param SearchCriteriaInterface $searchCriteria
     * @return SearchResultsInterface
     */
    public function getList(SearchCriteriaInterface $searchCriteria);
}
