/**
 * Refer to LICENSE.txt distributed with the Temando Shipping module for notice of license
 */

define([
    'underscore',
    'Temando_Shipping/js/view/checkout/shipping-information/address-renderer/shipping',  //The component we are extending
    'Magento_Customer/js/customer-data',
    'Temando_Shipping/js/model/collection-points',
    'Temando_Shipping/js/model/pickup-locations'
], function (_, Component, customerData, collectionPoints, pickupLocations) {
    'use strict';

    var countryData = customerData.get('directory-data');

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
