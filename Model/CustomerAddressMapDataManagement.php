<?php
/**
 * AFD PCE Customer Address Map Data Management
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Model;

use Afd\Pce\Api\CustomerAddressMapDataManagementInterface;
use Afd\Pce\Model\CustomerAddressMapDataFactory;
use Afd\Pce\Model\CustomerAddressMapDataRepository;
use Magento\Customer\Model\Session as CustomerSession;
use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\Exception\NoSuchEntityException;
use Psr\Log\LoggerInterface;

class CustomerAddressMapDataManagement implements CustomerAddressMapDataManagementInterface
{
    /**
     * @var CustomerAddressMapDataFactory
     */
    private $mapDataFactory;

    /**
     * @var CustomerAddressMapDataRepository
     */
    private $mapDataRepository;

    /**
     * @var CustomerSession
     */
    private $customerSession;

    /**
     * @var LoggerInterface
     */
    private $logger;

    /**
     * @param CustomerAddressMapDataFactory $mapDataFactory
     * @param CustomerAddressMapDataRepository $mapDataRepository
     * @param CustomerSession $customerSession
     * @param LoggerInterface $logger
     */
    public function __construct(
        CustomerAddressMapDataFactory $mapDataFactory,
        CustomerAddressMapDataRepository $mapDataRepository,
        CustomerSession $customerSession,
        LoggerInterface $logger
    ) {
        $this->mapDataFactory = $mapDataFactory;
        $this->mapDataRepository = $mapDataRepository;
        $this->customerSession = $customerSession;
        $this->logger = $logger;
    }

    /**
     * @inheritdoc
     */
    public function save(int $addressId, $mapData): bool
    {
        try {
            // Verify customer is logged in
            if (!$this->customerSession->isLoggedIn()) {
                throw new LocalizedException(__('Customer must be logged in to save map data.'));
            }

            // Verify the address belongs to the current customer
            $customer = $this->customerSession->getCustomer();
            $addresses = $customer->getAddresses();
            $addressBelongsToCustomer = false;
            
            foreach ($addresses as $address) {
                if ((int)$address->getId() === $addressId) {
                    $addressBelongsToCustomer = true;
                    break;
                }
            }

            if (!$addressBelongsToCustomer) {
                throw new LocalizedException(__('Address does not belong to the current customer.'));
            }

            // Convert mapData to array if it's an object
            if (is_object($mapData)) {
                $mapData = (array)$mapData;
            }

            // Check if map data already exists
            try {
                $existingMapData = $this->mapDataRepository->getByParentId($addressId);
                // Update existing
                $existingMapData->setOriginalLat($mapData['original_lat'] ?? null);
                $existingMapData->setOriginalLng($mapData['original_lng'] ?? null);
                $existingMapData->setSelectedLat($mapData['selected_lat'] ?? null);
                $existingMapData->setSelectedLng($mapData['selected_lng'] ?? null);
                $existingMapData->setDistanceFromAddress($mapData['distance_from_address'] ?? 0);
                $existingMapData->setUrbanRural($mapData['urban_rural'] ?? null);
                $existingMapData->setIsAdjusted($mapData['is_adjusted'] ?? false);
                $existingMapData->setDeliveryNotes($mapData['delivery_notes'] ?? null);
                
                $this->mapDataRepository->save($existingMapData);
            } catch (NoSuchEntityException $e) {
                // Create new
                $newMapData = $this->mapDataFactory->create();
                $newMapData->setParentId($addressId);
                $newMapData->setOriginalLat($mapData['original_lat'] ?? null);
                $newMapData->setOriginalLng($mapData['original_lng'] ?? null);
                $newMapData->setSelectedLat($mapData['selected_lat'] ?? null);
                $newMapData->setSelectedLng($mapData['selected_lng'] ?? null);
                $newMapData->setDistanceFromAddress($mapData['distance_from_address'] ?? 0);
                $newMapData->setUrbanRural($mapData['urban_rural'] ?? null);
                $newMapData->setIsAdjusted($mapData['is_adjusted'] ?? false);
                $newMapData->setDeliveryNotes($mapData['delivery_notes'] ?? null);
                
                $this->mapDataRepository->save($newMapData);
            }

            $this->logger->info('[AFD PCE] Saved map data for customer address ID: ' . $addressId);
            return true;
        } catch (\Exception $e) {
            $this->logger->error('[AFD PCE] Error saving customer address map data: ' . $e->getMessage());
            throw new LocalizedException(__('Failed to save map data: %1', $e->getMessage()));
        }
    }
}
