<?php
/**
 * AFD PCE Debug Config Helper
 *
 * Helper class to check if debug logging is enabled
 */
declare(strict_types=1);

namespace Afd\Pce\Helper;

use Magento\Framework\App\Helper\AbstractHelper;
use Magento\Framework\App\Helper\Context;
use Magento\Store\Model\ScopeInterface;

class DebugConfig extends AbstractHelper
{
    const XML_PATH_DEBUG_MODE = 'afd_typeahead/advanced/debug_mode';

    /**
     * Check if debug mode is enabled
     *
     * @return bool
     */
    public function isDebugEnabled(): bool
    {
        return (bool)$this->scopeConfig->getValue(
            self::XML_PATH_DEBUG_MODE,
            ScopeInterface::SCOPE_STORE
        );
    }
}
