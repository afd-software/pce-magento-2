<?php
/**
 * AFD PCE Customer Address Map Data Management Interface
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Api;

interface CustomerAddressMapDataManagementInterface
{
    /**
     * Save customer address map data
     *
     * @param int $addressId
     * @param mixed $mapData
     * @return bool
     */
    public function save(int $addressId, $mapData): bool;
}
