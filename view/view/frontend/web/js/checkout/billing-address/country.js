/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

/**
 * @api
 */
define([
  'Magento_Ui/js/form/element/country',
  'ko',
  'jquery',
  'afdCountry',
  'afdCountryUtils'
], function (Country, ko, $, afdCountry, afdCountryUtils) {
  'use strict'

  return Country.extend({
    defaults: {
      exports: {
        fieldReady: '${ $.parentName }:fieldReady'
      }
    },

    fieldReady: ko.observable(''),

    initialize: function (config) {
      this._super()
      this.parentName = config.parentName
      return this
    },

    /**
     * After render callback
     *
     * @param {HTMLElement} element - The select element
     */
    afterRender: async function (element) {
      // Check if advanced country control is enabled
      if (!afdOptions.magentoOptions.typeahead.useAdvancedCountryControl) {
        return
      }

      // Find the afd-country-input element
      const countryInput = element.querySelector('afd-country-input')

      if (countryInput) {
        // Get countries from the options
        const countries = []
        this.options().forEach((option) => {
          const value = option.value
          const text = option.label

          if (value && value.length === 2) {
            countries.push({
              name: text,
              iso2: value,
              iso3: value // We don't have ISO3 codes from Magento, so use ISO2
            })
          }
        })

        // Check if we should use preferred countries
        if (afdOptions.magentoOptions.typeahead.usePreferredCountries) {
          try {
            // Fetch preferred countries
            const preferredCountries =
              await afdCountryUtils.fetchPreferredCountries()

            // Reorder countries based on preferred countries
            const orderedCountries =
              afdCountryUtils.reorderCountriesWithPreferred(
                countries,
                preferredCountries
              )

            // Configure the country control with preferred countries
            countryInput.options = {
              countries: orderedCountries,
              defaultCountry: this.value() || 'GB',
              loadCountriesImmediately: false,
              fallbackToDefaultCountries: false
            }
          } catch (error) {
            console.error('Error fetching preferred countries:', error)
            // Fall back to standard initialization without preferred countries
            countryInput.options = {
              countries: countries,
              defaultCountry: this.value() || 'GB',
              loadCountriesImmediately: false,
              fallbackToDefaultCountries: false
            }
          }
        } else {
          // Configure the country control without preferred countries
          countryInput.options = {
            countries: countries,
            defaultCountry: this.value() || 'GB',
            loadCountriesImmediately: false,
            fallbackToDefaultCountries: false
          }
        }
      }

      // Notify parent that field is rendered
      this.fieldReady({
        name: this.index,
        element: element,
        koComponent: this,
        parentName: this.parentName
      })
    }
  })
})
