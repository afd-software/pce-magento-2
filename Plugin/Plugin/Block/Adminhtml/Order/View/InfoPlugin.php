<?php
/**
 * AFD PCE Order View Info Plugin
 *
 * PURPOSE:
 * This plugin adds a visual indicator to order addresses in the Magento admin panel
 * to show when an address has been validated by AFD during checkout.
 *
 * WHAT IT DOES:
 * - Intercepts the formatted address display in admin order view
 * - Checks if the address has associated metadata with is_validated = true
 * - Appends "Address Validated by AFD" message in green below the address
 *
 * WHERE IT APPEARS:
 * - Admin: Sales > Orders > View Order
 * - Shows on both shipping and billing address blocks
 *
 * VISUAL RESULT:
 * John Smith
 * 123 Main Street
 * London, SW1A 1AA
 * United Kingdom
 * 
 * Address Validated by AFD  ← Added by this plugin (green text)
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Plugin\Block\Adminhtml\Order\View;

use Afd\Pce\Api\AddressMetadataRepositoryInterface;
use Magento\Framework\Exception\NoSuchEntityException;
use Magento\Framework\Serialize\Serializer\Json;
use Magento\Sales\Block\Adminhtml\Order\View\Info as Subject;
use Magento\Sales\Api\Data\OrderAddressInterface;

/**
 * Plugin for Magento\Sales\Block\Adminhtml\Order\View\Info
 */
class InfoPlugin
{
    /**
     * @var AddressMetadataRepositoryInterface
     */
    private $addressMetadataRepository;

    /**
     * @var Json
     */
    private $jsonSerializer;

    /**
     * @param AddressMetadataRepositoryInterface $addressMetadataRepository
     * @param Json $jsonSerializer
     */
    public function __construct(
        AddressMetadataRepositoryInterface $addressMetadataRepository,
        Json $jsonSerializer
    ) {
        $this->addressMetadataRepository = $addressMetadataRepository;
        $this->jsonSerializer = $jsonSerializer;
    }

    /**
     * After get formatted address - adds validation indicator
     *
     * This method runs after the order address is formatted for display in the admin panel.
     * It checks if the address was validated during checkout and adds a visual indicator.
     *
     * @param Subject $subject The Info block
     * @param string $result The formatted address HTML
     * @param OrderAddressInterface $address The order address being formatted
     * @return string The formatted address with validation indicator appended (if validated)
     */
    public function afterGetFormattedAddress(Subject $subject, string $result, $address): string
    {
        if (!$address) {
            return $result;
        }

        try {
            // Load metadata for this order address
            $addressMetadata = $this->addressMetadataRepository->getByParentId((int)$address->getId(), 'order');

            // If address was validated during checkout, add visual indicator
            if ($addressMetadata && $addressMetadata->getIsValidated()) {
                $validationHtml = '<p style="color: #03A29A; padding-top: 16px">Address Validated by AFD</p>';
                $result =  $result . $validationHtml;
            }
        } catch (NoSuchEntityException $e) {
            // No metadata found - address was not validated, do nothing
        }

        return $result;
    }
}
