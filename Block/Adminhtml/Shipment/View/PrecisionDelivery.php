<?php
/**
 * AFD PCE Shipment Precision Delivery Block
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Block\Adminhtml\Shipment\View;

use Afd\Pce\Block\Adminhtml\Order\View\PrecisionDelivery as OrderPrecisionDelivery;

/**
 * Class PrecisionDelivery
 * 
 * Block for displaying precision delivery map data in shipment/packing slip view
 * Extends the order precision delivery block to reuse all functionality
 */
class PrecisionDelivery extends OrderPrecisionDelivery
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

    /**
     * Check if static map should be displayed in shipment view
     * Override parent to use shipment-specific config
     *
     * @return bool
     */
    public function isStaticMapEnabled(): bool
    {
        return $this->precisionDeliveryHelper->isDisplayStaticMapShipmentEnabled();
    }
}
