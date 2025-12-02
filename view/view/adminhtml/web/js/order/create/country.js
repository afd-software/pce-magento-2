/**
 * Initialize advanced country control for admin order create form
 */
define(['jquery', 'afdCountry', 'afdCountryUtils'], function (
  $,
  afdCountry,
  afdCountryUtils
) {
  'use strict'

  return function () {
    // Check if advanced country control is enabled
    if (!afdOptions.magentoOptions.typeahead.useAdvancedCountryControl) {
      return
    }

    // Add CSS for the country control
    const style = document.createElement('style')
    style.textContent =
      '\n' +
      '            /* Styles for the AFD Country Control */\n' +
      '            afd-country-input {\n' +
      '                width: 100%;\n' +
      '                display: block;\n' +
      '                margin-bottom: 8px;\n' +
      '            }\n' +
      '\n' +
      "            /* Match Magento's admin form field styling */\n" +
      '            afd-country-input .afd-country-input {\n' +
      '                height: 33px;\n' +
      '                padding: 4px 9px;\n' +
      '                border: 1px solid #adadad;\n' +
      '                border-radius: 1px;\n' +
      '                font-size: 14px;\n' +
      '                background-color: #fff;\n' +
      '            }\n' +
      '\n' +
      "            /* Style the dropdown to match Magento's */\n" +
      '            afd-country-list {\n' +
      '                border: 1px solid #adadad;\n' +
      '                border-radius: 1px;\n' +
      '                box-shadow: 0 3px 3px rgba(0,0,0,0.15);\n' +
      '                z-index: 1000;\n' +
      '            }\n' +
      '        '
    document.head.appendChild(style)

    // Initialize billing address country control
    afdCountryUtils.initCountryControl('#order-billing_address_country_id')

    // Initialize shipping address country control
    afdCountryUtils.initCountryControl('#order-shipping_address_country_id')

    // Override the setShippingAsBilling method to reinitialize country control
    if (
      typeof window.order !== 'undefined' &&
      window.order.setShippingAsBilling
    ) {
      const originalSetShippingAsBilling = window.order.setShippingAsBilling

      window.order.setShippingAsBilling = function (flag) {
        originalSetShippingAsBilling.call(this, flag)

        // After the original method completes and areas are loaded, initialize the country control
        setTimeout(function () {
          afdCountryUtils.initCountryControl(
            '#order-shipping_address_country_id'
          )
        }, 500)
      }
    }
  }
})
