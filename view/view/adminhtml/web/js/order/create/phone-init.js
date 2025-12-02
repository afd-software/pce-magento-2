define(['jquery'], function ($) {
  'use strict'

  return function () {
    const loadUtils = function () {
      initPhoneErrors()
      initPhoneFields()
    }

    const initPhoneErrors = function () {
      $('#afd-shipping-phone-error')
        .detach()
        .insertAfter('[name="order[shipping_address][telephone]"]')
      $('#afd-billing-phone-error')
        .detach()
        .insertAfter('[name="order[billing_address][telephone]"]')
    }

    const initPhoneFields = function () {
      // Shipping phone
      afdOptions.phone.countryControl = '#order-shipping_address_country_id'
      initPhoneAdminOrder($('[name="order[shipping_address][telephone]"]'))

      // Billing phone
      afdOptions.phone.countryControl = '#order-billing_address_country_id'
      initPhoneAdminOrder($('[name="order[billing_address][telephone]"]'))
    }

    const initPhoneAdminOrder = function (el) {
      el.addClass('afd-padding-fix')
        .attr('data-afd-additional-options', 'afdPhoneOptions')
        .afd('phone')
    }

    // Initialize if phone validation is enabled
    if (afdOptions.magentoOptions.phone.adminCreateOrderEnabled) {
      loadUtils()
    }
  }
})
