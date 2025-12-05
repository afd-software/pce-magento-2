<?php
/**
 * AFD PCE Quote Address Metadata Collection
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Model\ResourceModel\QuoteAddressMetadata;

use Afd\Pce\Model\QuoteAddressMetadata;
use Afd\Pce\Model\ResourceModel\QuoteAddressMetadata as QuoteAddressMetadataResource;
use Magento\Framework\Model\ResourceModel\Db\Collection\AbstractCollection;

/**
 * Class Collection
 * 
 * Collection for Quote Address Metadata
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
            QuoteAddressMetadata::class,
            QuoteAddressMetadataResource::class
        );
    }
}
