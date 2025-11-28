<?php
/**
 * AFD PCE Customer Address Metadata Resource Model
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Model\ResourceModel;

use Magento\Framework\Model\ResourceModel\Db\AbstractDb;

/**
 * Class CustomerAddressMetadata
 * 
 * Resource Model for Customer Address Metadata
 */
class CustomerAddressMetadata extends AbstractDb
{
    /**
     * Initialize resource model
     *
     * @return void
     */
    protected function _construct()
    {
        $this->_init('afd_customer_address_meta', 'metadata_id');
    }
}
