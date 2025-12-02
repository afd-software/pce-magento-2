// eslint-disable-next-line
var config = {
  map: {
    '*': {
      changeEmailPassword: 'Afd_Pce/js/change-email-password',
      afdCountryUtils: 'Afd_Pce/js/country_utils',
      addressMetadata: 'Afd_Pce/js/customer/address/metadata',
      addressMetadataTest: 'Afd_Pce/js/customer/address/test-events'
    }
  },
  config: {
    mixins: {
      'Magento_Checkout/js/action/set-shipping-information': {
        'Afd_Pce/js/action/set-shipping-information-mixin': true
      },
      'Magento_Checkout/js/action/place-order': {
        'Afd_Pce/js/action/place-order-mixin': true
      },
      'Magento_Checkout/js/view/shipping-address/list': {
        'Afd_Pce/js/view/checkout/shipping/address-list-mixin': true
      }
    }
  }
}
