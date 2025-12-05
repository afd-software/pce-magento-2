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
  'Magento_Checkout/js/model/quote',
  'uiRegistry',
  'afdPce'
], function (Element, $, quote, registry) {
  'use strict'

  return Element.extend({
    /**
     * Invokes initialize method of parent class,
     * contains initialization logic
     */
    initialize: function () {
      this._super()
      return this
    },

    afdInit: function (target) {
      if (
        afdOptions.magentoOptions.phone.phoneEnabled &&
        afdOptions.magentoOptions.phone.loggedOutCheckoutEnabled
      ) {
        // Wait for country field to be ready before initializing phone
        this.waitForCountryField().then(() => {
          this.initPhoneField(target)
        })
      }
    },

    /**
     * Wait for country field component to be registered
     * Returns a promise that resolves when country field is ready
     */
    waitForCountryField: function () {
      return new Promise((resolve) => {
        // Try to get the country field component
        const countryFieldName = this.parentName + '.country_id'

        registry.get(countryFieldName, function (countryComponent) {
          // Country component is ready
          resolve(countryComponent)
        })
      })
    },

    /**
     * Initialize the phone field with AFD controls
     */
    initPhoneField: function (target) {
      const phoneNumber = $('#telephone').val()
      $(target)
        .addClass('afd-padding-fix')
        .afd('phone')
        .closest('div')
        .siblings('.afd-error')
        .find('span')
        .text(afdOptions.magentoOptions.phone.invalidMessage)
        .val(phoneNumber)

      // Prepend dial code on form submission
      const prependDialCode = () => {
        $('.iti').each(function () {
          const $input = $(this).find('.input-text')
          const dialCode = $(this)
            .find('.iti__selected-dial-code')
            .text()
            .trim()
          let currentVal = $input.val().trim()

          // Only prepend if the number doesn't already start with + and we have a dial code
          if (currentVal && dialCode && currentVal.substring(0, 1) !== '+') {
            // Remove dial code if it's already at the start (without +)
            const dialCodeWithoutPlus = dialCode.substring(1) // Remove the + from dial code
            if (currentVal.indexOf(dialCodeWithoutPlus) === 0) {
              currentVal = currentVal
                .substring(dialCodeWithoutPlus.length)
                .trim()
            }
            // Set the full international number
            $input.val(dialCode + ' ' + currentVal)
            $input.triggerHandler('change')
          }
        })
      }

      // Attach to mousedown to ensure this runs before click handlers
      $(document).on(
        'mousedown',
        '.action-save-address, .action-update, button[data-role="opc-continue"]',
        prependDialCode
      )
      $(document).on('afd:phoneValidationStarted', () => {
        $(document).on(
          'mousedown',
          '.action-save-address, .action-update, button[data-role="opc-continue"]',
          prependDialCode
        )
      })
    }
  })
})
