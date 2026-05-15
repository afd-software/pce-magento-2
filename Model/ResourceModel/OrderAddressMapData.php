<?php
/**
 * AFD PCE Order Address Map Data Resource Model
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Model\ResourceModel;

use Magento\Framework\Model\ResourceModel\Db\AbstractDb;

/**
 * Class OrderAddressMapData
 */
class OrderAddressMapData extends AbstractDb
{
    /**
     * @var string
     */
    protected $_eventPrefix = 'afd_order_address_map_data_resource';

    /**
     * Initialize resource model
     *
     * @return void
     */
    protected function _construct()
    {
        $this->_init('afd_order_address_map_data', 'map_data_id');
    }

    /**
     * Load map data by parent address ID
     *
     * @param \Afd\Pce\Model\OrderAddressMapData $object
     * @param int $parentId
     * @return $this
     */
    public function loadByParentId($object, $parentId)
    {
        $connection = $this->getConnection();
        $select = $connection->select()
            ->from($this->getMainTable())
            ->where('parent_id = ?', $parentId);
        
        $data = $connection->fetchRow($select);
        
        if ($data) {
            $object->setData($data);
        }
        
        return $this;
    }
}
