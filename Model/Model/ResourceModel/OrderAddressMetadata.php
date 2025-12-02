<?php
/**
 * AFD PCE Order Address Metadata Resource Model
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Model\ResourceModel;

use Magento\Framework\Model\ResourceModel\Db\AbstractDb;

/**
 * Class OrderAddressMetadata
 * 
 * Resource Model for Order Address Metadata
 */
class OrderAddressMetadata extends AbstractDb
{
    /**
     * Initialize resource model
     *
     * @return void
     */
    protected function _construct()
    {
        $this->_init('afd_order_address_meta', 'metadata_id');
    }
}
