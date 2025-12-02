<?php
/**
 * AFD PCE Order Address Metadata Collection
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Model\ResourceModel\OrderAddressMetadata;

use Afd\Pce\Model\OrderAddressMetadata;
use Afd\Pce\Model\ResourceModel\OrderAddressMetadata as OrderAddressMetadataResource;
use Magento\Framework\Model\ResourceModel\Db\Collection\AbstractCollection;

/**
 * Class Collection
 * 
 * Collection for Order Address Metadata
 */
class Collection extends AbstractCollection
{
    /**
     * @var string
     */
    protected $_idFieldName = 'metadata_id';

    /**
     * Define resource model
     *
     * @return void
     */
    protected function _construct()
    {
        $this->_init(
            OrderAddressMetadata::class,
            OrderAddressMetadataResource::class
        );
    }
}
