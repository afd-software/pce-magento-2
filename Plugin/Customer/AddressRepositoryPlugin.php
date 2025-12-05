<?php
/**
 * AFD PCE Customer Address Repository Plugin
 *
 * This plugin attaches metadata to customer addresses whenever they're loaded or saved.
 * It ensures that when you view a customer's saved address, all the additional AFD PCE
 * information is available, such as whether the address has been validated.
 *
 * @category    Afd
 * @package     Afd_Pce
 * @author      AFD Software
 */
declare(strict_types=1);

namespace Afd\Pce\Plugin\Customer;

use Afd\Pce\Model\CustomerAddressMetadataRepository;
use Magento\Customer\Api\AddressRepositoryInterface;
use Magento\Customer\Api\Data\AddressInterface;
use Magento\Customer\Api\Data\AddressExtensionFactory;
use Magento\Framework\Exception\NoSuchEntityException;

/**
 * Plugin to load customer address metadata as extension attributes
 * 
 * This plugin ensures that address metadata is available whenever a customer address is
 * loaded or saved. It attaches the metadata to the address as extension attributes,
 * making it accessible throughout the Magento system.
 * 
 * Technical Details:
 * - Intercepts: AddressRepositoryInterface::getById and AddressRepositoryInterface::save
 * - Type: After plugin
 * - Purpose: Loads metadata when customer addresses are accessed
 * - Data Flow: Customer address metadata table → Extension attributes
 * 
 * Real-World Example:
 * When a customer views their saved addresses in "My Account," this plugin ensures that
 * any previously validated addresses display their complete metadata and validation status,
 * which can be used to show validation indicators or additional address details.
 */
class AddressRepositoryPlugin
{
    /**
     * @var CustomerAddressMetadataRepository
     */
    private $customerAddressMetadataRepository;

    /**
     * @var AddressExtensionFactory
     */
    private $addressExtensionFactory;

    /**
     * AddressRepositoryPlugin constructor.
     *
     * @param CustomerAddressMetadataRepository $customerAddressMetadataRepository
     * @param AddressExtensionFactory $addressExtensionFactory
     */
    public function __construct(
        CustomerAddressMetadataRepository $customerAddressMetadataRepository,
        AddressExtensionFactory $addressExtensionFactory
    ) {
        $this->customerAddressMetadataRepository = $customerAddressMetadataRepository;
        $this->addressExtensionFactory = $addressExtensionFactory;
    }

    /**
     * After get customer address by ID
     * Load metadata and set as extension attributes
     *
     * @param AddressRepositoryInterface $subject
     * @param AddressInterface $result
     * @return AddressInterface
     */
    public function afterGetById(
        AddressRepositoryInterface $subject,
        AddressInterface $result
    ) {
        return $this->loadAddressMetadata($result);
    }

    /**
     * After save customer address
     * Load metadata and set as extension attributes
     *
     * @param AddressRepositoryInterface $subject
     * @param AddressInterface $result
     * @return AddressInterface
     */
    public function afterSave(
        AddressRepositoryInterface $subject,
        AddressInterface $result
    ) {
        return $this->loadAddressMetadata($result);
    }

    /**
     * Load address metadata and set as extension attributes
     *
     * @param AddressInterface $address
     * @return AddressInterface
     */
    private function loadAddressMetadata(AddressInterface $address)
    {
        if (!$address->getId()) {
            return $address;
        }

        try {
            $addressMetadata = $this->customerAddressMetadataRepository->getByParentId(
                (int)$address->getId(),
                'customer'
            );

            $extensionAttributes = $address->getExtensionAttributes();
            if ($extensionAttributes === null) {
                $extensionAttributes = $this->addressExtensionFactory->create();
            }

            $extensionAttributes->setAfdAddressMetadata($addressMetadata);
            $extensionAttributes->setAfdAddressValidated($addressMetadata->getIsValidated());
            $address->setExtensionAttributes($extensionAttributes);
        } catch (NoSuchEntityException $e) {
            // No metadata exists for this address, so nothing to set
        } catch (\Exception $e) {
            // Log error but don't interrupt the process
        }

        return $address;
    }
}
