<?php
/**
 * AFD PCE Map Type Source Model
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Model\Config\Source;

use Magento\Framework\Data\OptionSourceInterface;

/**
 * Class MapType
 * 
 * Provides Google Maps map type options for admin configuration
 */
class MapType implements OptionSourceInterface
{
    const TYPE_ROADMAP = 'roadmap';
    const TYPE_SATELLITE = 'satellite';
    const TYPE_HYBRID = 'hybrid';
    const TYPE_TERRAIN = 'terrain';

    /**
     * Get options for map type dropdown
     *
     * @return array
     */
    public function toOptionArray(): array
    {
        return [
            ['value' => self::TYPE_ROADMAP, 'label' => __('Roadmap')],
            ['value' => self::TYPE_SATELLITE, 'label' => __('Satellite')],
            ['value' => self::TYPE_HYBRID, 'label' => __('Hybrid')],
            ['value' => self::TYPE_TERRAIN, 'label' => __('Terrain')],
        ];
    }

    /**
     * Get options as key-value pairs
     *
     * @return array
     */
    public function toArray(): array
    {
        return [
            self::TYPE_ROADMAP => __('Roadmap'),
            self::TYPE_SATELLITE => __('Satellite'),
            self::TYPE_HYBRID => __('Hybrid'),
            self::TYPE_TERRAIN => __('Terrain'),
        ];
    }
}
