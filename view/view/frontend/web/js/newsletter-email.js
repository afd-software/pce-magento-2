/**
 * Newsletter email validation widget
 */
define([
  'jquery',
  'jquery-ui-modules/widget',
  'mage/validation',
  'afdPce'
], function ($) {
  'use strict'

  $.widget('mage.newsletterEmail', {
    options: {
      useDefaultCredentials: true,
      pceUrl: null,
      id: null,
      token: null,
      serial: null,
      password: null
    },

    /**
     * Create widget
     * @private
     */
    _create: function () {
      this._initAfdEmail()
    },

    /**
     * Build AFD email options from widget config and global options
     * @private
     * @returns {Object} Merged options object
     */
    _buildAfdEmailOptions: function () {
      const customOptions = {}

      if (!this.options.useDefaultCredentials) {
        if (this.options.id && this.options.token) {
          customOptions.pceUrl = this.options.pceUrl
          customOptions.id = this.options.id
          customOptions.token = this.options.token
          customOptions.serial = null
          customOptions.password = null
        } else if (this.options.serial && this.options.password) {
          customOptions.pceUrl = this.options.pceUrl
          customOptions.serial = this.options.serial
          customOptions.password = this.options.password
          customOptions.id = null
          customOptions.token = null
        }
      }

      // Merge global afdOptions with afdEmailOptions and custom options
      return {
        ...window.afdOptions,
        ...(window.afdEmailOptions || {}),
        ...customOptions
      }
    },

    /**
     * Initialize AFD email validation
     * @private
     */
    _initAfdEmail: function () {
      const $element = this.element
      const afdEmailOptions = this._buildAfdEmailOptions()

      // Initialize AFD email validation with merged options
      $element.afd('email', afdEmailOptions)

      // Add custom validator for AFD email validation AFTER initializing afd
      if ($.validator && !$.validator.methods.afdEmailCheck) {
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

      // Update validation attribute to include afdEmailCheck
      const currentValidation = $element.attr('data-validate')
      if (
        currentValidation &&
        currentValidation.indexOf('afdEmailCheck') === -1
      ) {
        const validation = currentValidation.replace(
          '}',
          ', "afdEmailCheck":true}'
        )
        $element.attr('data-validate', validation)
      }

      // Handle validation updates
      $element.on('afd:emailValidationUpdatedFocusOut', function (e, $el) {
        $el
          .data(
            'afd-email-valid',
            $el.data('email-is-afd-valid') && $el.data('email-syntax-valid')
          )
          .valid()
      })
    }
  })

  return $.mage.newsletterEmail
})
