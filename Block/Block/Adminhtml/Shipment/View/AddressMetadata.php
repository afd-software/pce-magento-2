<?php
/**
 * AFD PCE Shipment Address Metadata Block
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Block\Adminhtml\Shipment\View;

use Afd\Pce\Block\Adminhtml\Order\View\AddressMetadata as OrderAddressMetadata;

/**
 * Class AddressMetadata
 * 
 * Block for displaying address metadata in shipment print view
 * Extends the order metadata block to reuse all functionality
 */
class AddressMetadata extends OrderAddressMetadata
{
    /**
     * Get the order from the shipment
     *
     * @return \Magento\Sales\Model\Order|null
     */
    public function getOrder()
    {
        // Try to get shipment from registry
        $shipment = $this->_coreRegistry->registry('current_shipment');
        
        if ($shipment && $shipment->getOrder()) {
            return $shipment->getOrder();
        }
        
        // Fallback to parent implementation
        return parent::getOrder();
    }
}
