/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
  'jquery',
  'Magento_Checkout/js/view/form/element/email',
  'mage/validation',
  'afdPce',
  'domReady!'
], function ($, Component) {
  'use strict'

  return Component.extend({
    defaults: {
      // Always use base Magento template - we add AFD via JavaScript only
      template: 'Magento_Checkout/form/element/email',
      afdInitialized: false
    },

    /**
     * Override emailHasChanged to add AFD email validation.
     *
     * IMPORTANT: We override emailHasChanged (not afterRender) because:
     * 1. The Magento base template uses "afterRender: emailHasChanged" binding
     * 2. emailHasChanged is called both on render AND when email value changes
     * 3. The parent's emailHasChanged handles:
     *    - Checking if email exists in system (shows password field if account exists)
     *    - Email validation logic
     *    - Password field visibility
     * 4. By overriding this method, we hook into the same lifecycle as Magento
     *    and ensure AFD validation runs at the right time
     *
     * This approach maintains compatibility with:
     * - Magento 2.4.7 and 2.4.8 base checkout
     * - PaymentServicesPaypal module (which uses a mixin on the base component)
     */
    emailHasChanged: function () {
      // Call parent's emailHasChanged first (handles password field visibility, etc.)
      this._super()

      // Initialize AFD email validation only once (on first call)
      if (!this.afdInitialized) {
        this.initAfdEmail()
        this.afdInitialized = true
      }
    },

    /**
     * Initialize AFD email validation
     */
    initAfdEmail: function () {
      // Only initialize AFD if enabled
      if (
        !window.afdOptions ||
        !window.afdOptions.magentoOptions ||
        !window.afdOptions.magentoOptions.email ||
        !window.afdOptions.magentoOptions.email.emailEnabled ||
        !window.afdOptions.magentoOptions.email.loggedOutCheckoutEnabled
      ) {
        return
      }

      const $element = $('#customer-email')

      // Initialize afdEmailOptions if not already set
      if (!window.afdEmailOptions) {
        window.afdEmailOptions = {}
      }

      // Add custom validator for AFD email check
      if (!$.validator.methods.afdEmailCheck) {
        $.validator.addMethod(
          'afdEmailCheck',
          function (value, element) {
            const isValid = $(element).data('afd-email-valid')
            // If validation hasn't completed yet, consider it valid to prevent blocking
            return isValid !== false
          },
          window.afdOptions.email.invalidEmailMessage
        )
      }

      // Add afdEmailCheck validation rule using jQuery validation API
      // This ensures the rule is properly registered with the validator
      if ($element.length && $element.rules) {
        $element.rules('add', {
          afdEmailCheck: true
        })
      }

      // Listen for AFD email validation events
      $element.on('afd:emailValidationUpdatedFocusOut', function (e, $el) {
        $el
          .data(
            'afd-email-valid',
            $el.data('email-is-afd-valid') && $el.data('email-syntax-valid')
          )
          .valid()
      })

      // Initialize AFD email validation, passing options directly
      $element.afd('email', { ...window.afdOptions, ...window.afdEmailOptions })
    }
  })
})
