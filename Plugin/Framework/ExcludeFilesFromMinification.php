<?php

namespace Afd\Pce\Plugin\Framework;

use Magento\Framework\View\Asset\Minification;

/**
 * Plugin to exclude pre-minified AFD PCE JavaScript files from Magento's JShrink minification.
 *
 * JShrink has known issues with complex regex patterns (especially credit card validation patterns)
 * which can cause "invalid regular expression" errors during static content deployment.
 * These issues were fixed in JShrink 1.6.0 but Magento 2.4.5 is hard coded to use 1.4.
 *
 * @see https://github.com/tedious/JShrink/releases/tag/v1.6.0
 * @see https://github.com/magento/magento2/blob/2.4.5-p14/composer.json#L78
 * @see https://github.com/magento/magento2/blob/2.4.6-p12/composer.json#L89
 */

class ExcludeFilesFromMinification
{
    /**
     * Exclude AFD PCE JS files from minification
     *
     * @param Minification $subject
     * @param array $result
     * @param string $contentType
     * @return array
     */
    public function afterGetExcludes(
        Minification $subject,
        array $result,
        $contentType
    )
    {
        if ($contentType !== 'js') {
            return $result;
        }

        $result[] = 'Afd_Pce/js/afd.jquery';

        $result[] = 'Afd_Pce/js/afd.alpine';

        $result[] = 'Afd_Pce/js/country_utils';

        $result[] = 'Afd_Pce/js/customer_fieldset';

        $result[] = 'Afd_Pce/js/categorised_metadata_fieldset';

        return $result;
    }
}
