/**
 * Refer to LICENSE.txt distributed with the Temando Shipping module for notice of license
 */

var nonTemandoVersions = ['2.3.5-p1', '2.3.6', '2.4']

var overrideModule =
  'Temando_Shipping/js/view/checkout/shipping-information/address-renderer/shipping'

for (var i = 0; i < nonTemandoVersions.length; i++) {
  if (afdOptions.magentoOptions.version.indexOf(nonTemandoVersions[i]) > -1) {
    overrideModule =
      'Magento_Checkout/js/view/shipping-information/address-renderer/default'
  }
}

define([
  'underscore',
  overrideModule, //The component we are extending
  'Magento_Customer/js/customer-data'
], function (_, Component) {
  'use strict'

  return Component.extend({
    defaults: {
      template: 'Afd_Pce/shipping-information/address-renderer/default'
    },

    /** @inheritdoc */
    initialize: function () {
      this._super()
      return this
    }
  })
})
