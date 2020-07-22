/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

/**
 * @api
 */
define([
    'Magento_Ui/js/form/element/abstract',
    'jquery',
    'afdPce'
], function (Element, $ ) {
    'use strict';

    return Element.extend({

        /**
         * Invokes initialize method of parent class,
         * contains initialization logic
         */
        initialize: function () {
            this._super();
            return this;
        },

        afdInit: function(target) {

            if(afdOptions.magentoOptions.phone.phoneEnabled && afdOptions.magentoOptions.phone.loggedOutCheckoutEnabled) {
                $(target)
                    .afd('phone')
                    .closest('div')
                    .siblings('.afd-error')
                    .find('span')
                    .text(afdOptions.magentoOptions.phone.invalidMessage);
            }
        }

    });
});
