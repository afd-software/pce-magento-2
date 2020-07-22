/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'jquery',
    'Magento_Checkout/js/view/form/element/email',
    'afdPce'
], function ($, Component) {
    'use strict';

    return Component.extend({

        defaults: {
            template: 'Afd_Pce/form/element/email'
        },

        /**
         * Initializes regular properties of instance.
         *
         * @returns {Object} Chainable.
         */
        initConfig: function () {
            this._super();

            return this;
        },

        afdInit: function (target) {
            if (afdOptions.magentoOptions.email.emailEnabled && afdOptions.magentoOptions.email.loggedOutCheckoutEnabled) {
                $(target)
                    .afd('email')
                    .siblings('.afd-error')
                    .text(afdOptions.magentoOptions.email.invalidMessage);
            }
        }
    });
});
