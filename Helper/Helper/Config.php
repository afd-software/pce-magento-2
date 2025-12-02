<?php
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
declare(strict_types=1);

namespace Afd\Pce\Helper;

use Magento\Framework\App\Helper\AbstractHelper;
use Magento\Framework\App\Helper\Context;
use Magento\Store\Model\ScopeInterface;

class Config extends AbstractHelper
{
    /**
     * @param Context $context
     */
    public function __construct(
        Context $context
    ) {
        parent::__construct($context);
    }

    /**
     * Check if geodemographics should be hidden based on address metadata config
     *
     * @return bool
     */
    public function shouldHideGeoDemographics(): bool
    {
        // If address metadata display is enabled, return false to hide geodemographics
        $isAddressMetadataEnabled = $this->scopeConfig->isSetFlag(
            'afd_typeahead/metadata/display_in_admin',
            ScopeInterface::SCOPE_STORE
        );
        
        return $isAddressMetadataEnabled;
    }
}
