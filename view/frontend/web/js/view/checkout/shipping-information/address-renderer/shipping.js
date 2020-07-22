/**
 * Refer to LICENSE.txt distributed with the Temando Shipping module for notice of license
 */

var overrideModule = afdOptions.magentoOptions.version === '2.3.5-p1'
    ? 'Magento_Checkout/js/view/shipping-information/address-renderer/default'
    : 'Temando_Shipping/js/view/checkout/shipping-information/address-renderer/shipping';

define([
    'underscore',
    overrideModule,  //The component we are extending
    'Magento_Customer/js/customer-data'
], function (_, Component) {
    'use strict';

    return Component.extend({
        defaults: {
            template: 'Afd_Pce/shipping-information/address-renderer/default'
        },

        /** @inheritdoc */
        initialize: function () {
            this._super();
            return this;
        }

    });
});
