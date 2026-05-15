<?php
/**
 * AFD PCE Checkout Success Precision Delivery Block
 *
 * @category    Afd
 * @package     Afd_Pce
 */
declare(strict_types=1);

namespace Afd\Pce\Block\Checkout\Success;

use Afd\Pce\Helper\PrecisionDelivery as PrecisionDeliveryHelper;
use Afd\Pce\Model\OrderAddressMapDataRepository;
use Magento\Checkout\Model\Session as CheckoutSession;
use Magento\Directory\Model\CountryFactory;
use Magento\Framework\Exception\NoSuchEntityException;
use Magento\Framework\View\Element\Template;
use Magento\Framework\View\Element\Template\Context;

class PrecisionDelivery extends Template
{
    /**
     * @var CheckoutSession
     */
    private $checkoutSession;

    /**
     * @var OrderAddressMapDataRepository
     */
    private $orderAddressMapDataRepository;

    /**
     * @var PrecisionDeliveryHelper
     */
    private $precisionDeliveryHelper;

    /**
     * @var CountryFactory
     */
    private $countryFactory;

    /**
     * @var \Afd\Pce\Api\Data\MapDataInterface|null|false
     */
    private $mapData = false;

    public function __construct(
        Context $context,
        CheckoutSession $checkoutSession,
        OrderAddressMapDataRepository $orderAddressMapDataRepository,
        PrecisionDeliveryHelper $precisionDeliveryHelper,
        CountryFactory $countryFactory,
        array $data = []
    ) {
        $this->checkoutSession = $checkoutSession;
        $this->orderAddressMapDataRepository = $orderAddressMapDataRepository;
        $this->precisionDeliveryHelper = $precisionDeliveryHelper;
        $this->countryFactory = $countryFactory;
        parent::__construct($context, $data);
    }

    public function isEnabled(): bool
    {
        return $this->precisionDeliveryHelper->isEnabled()
            && $this->precisionDeliveryHelper->isDisplayOnSuccessPageEnabled();
    }

    public function getOrder(): \Magento\Sales\Model\Order
    {
        return $this->checkoutSession->getLastRealOrder();
    }

    public function getShippingAddress(): ?\Magento\Sales\Model\Order\Address
    {
        return $this->getOrder()->getShippingAddress();
    }

    public function getMapData(): ?\Afd\Pce\Api\Data\MapDataInterface
    {
        if ($this->mapData !== false) {
            return $this->mapData;
        }

        $address = $this->getShippingAddress();
        if (!$address || !$address->getId()) {
            $this->mapData = null;
            return null;
        }

        try {
            $this->mapData = $this->orderAddressMapDataRepository->getByParentId((int)$address->getId());
        } catch (NoSuchEntityException $e) {
            $this->mapData = null;
        }

        return $this->mapData;
    }

    public function hasMapData(): bool
    {
        return $this->getMapData() !== null;
    }

    public function getSelectedLat(): ?string
    {
        $mapData = $this->getMapData();
        return $mapData ? $mapData->getSelectedLat() : null;
    }

    public function getSelectedLng(): ?string
    {
        $mapData = $this->getMapData();
        return $mapData ? $mapData->getSelectedLng() : null;
    }

    public function getStaticMapUrl(int $width = 480, int $height = 300): ?string
    {
        $lat = $this->getSelectedLat();
        $lng = $this->getSelectedLng();

        if (!$lat || !$lng) {
            return null;
        }

        return $this->precisionDeliveryHelper->getStaticMapUrl($lat, $lng, $width, $height);
    }

    public function getDeliveryNotes(): ?string
    {
        $mapData = $this->getMapData();
        return $mapData ? $mapData->getDeliveryNotes() : null;
    }

    public function hasDeliveryNotes(): bool
    {
        return !empty($this->getDeliveryNotes());
    }

    /**
     * Returns the shipping address as an ordered array of non-empty lines.
     *
     * @return string[]
     */
    public function getAddressLines(): array
    {
        $address = $this->getShippingAddress();
        if (!$address) {
            return [];
        }

        $countryName = $this->countryFactory->create()
            ->loadByCode($address->getCountryId())
            ->getName();

        return array_values(array_filter([
            implode(', ', array_filter($address->getStreet() ?? [])),
            $address->getCity(),
            $address->getRegion(),
            $address->getPostcode(),
            $countryName ?: $address->getCountryId(),
            $address->getTelephone(),
        ]));
    }
}
