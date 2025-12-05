<?php
/**
 * AFD PCE Quote Address Metadata Resource Model
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Model\ResourceModel;

use Magento\Framework\Model\ResourceModel\Db\AbstractDb;

/**
 * Class QuoteAddressMetadata
 * 
 * Resource Model for Quote Address Metadata
 */
class QuoteAddressMetadata extends AbstractDb
{
    /**
     * Initialize resource model
     *
     * @return void
     */
    protected function _construct()
    {
        $this->_init('afd_quote_address_meta', 'metadata_id');
    }
}
