<?php
namespace Afd\Pce\Plugin\Checkout;

use Magento\Checkout\Block\Checkout\LayoutProcessor;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Store\Model\ScopeInterface;

class AddressInformationProcessor
{
    /** @var ScopeConfigInterface */
    private $scopeConfig;

    public function __construct(ScopeConfigInterface $scopeConfig)
    {
        $this->scopeConfig = $scopeConfig;
    }

    /**
     * After plugin for LayoutProcessor::process()
     *
     * @param LayoutProcessor $subject
     * @param array           $jsLayout
     * @return array
     */
    public function afterProcess(LayoutProcessor $subject, array $jsLayout): array
    {
        $enabled = $this->scopeConfig->isSetFlag(
            'afd_typeahead/advanced/enableLegacyGeodeomographics',
            ScopeInterface::SCOPE_STORE
        );

        if ($enabled) {
            $jsLayout['components']['checkout']['children']
                ['sidebar']['children']['shipping-information']['children']
                ['ship-to']['rendererTemplates'] = [
                    'customer-address'     => [
                        'component' => 'Afd_Pce/js/view/checkout/shipping-information/address-renderer/shipping',
                    ],
                    'new-customer-address' => [
                        'component' => 'Afd_Pce/js/view/checkout/shipping-information/address-renderer/shipping',
                    ],
                ];
        } else {
            unset(
                $jsLayout['components']['checkout']['children']
                    ['sidebar']['children']['shipping-information']['children']
                    ['ship-to']['rendererTemplates']
            );
        }

        return $jsLayout;
    }
}
