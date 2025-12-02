/**
 * Initialize advanced country control for admin order edit address form
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

    // Wait for the form to be loaded
    const initCountryControl = () => {
      const $countrySelect = $('[name="country_id"]')

      if (!$countrySelect.length) {
        window.setTimeout(initCountryControl, 100)
        return
      }

      // Move country field to be above typeahead and street address
      const $suffixField = $('.field-suffix')
      const $lastNameField = $('.field-lastname')
      const $countryField = $countrySelect.closest('.field')

      if (!$suffixField.length) {
        $countryField.detach().insertAfter($lastNameField)
      } else {
        $countryField.detach().insertAfter($suffixField)
      }

      // Initialize country control
      afdCountryUtils.initCountryControl('[name="country_id"]')
    }

    // Initialize when DOM is ready
    initCountryControl()
  }
})
