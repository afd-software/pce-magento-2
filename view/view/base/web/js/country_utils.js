/**
 * Utility functions for the advanced country control
 */
define(['jquery'], ($) => {
  'use strict'

  // Create a module object to allow self-referencing
  const module = {
    // Cache for preferred countries to prevent duplicate API calls
    _preferredCountriesCache: null,
    /**
     * Initialize the advanced country control with preferred countries
     * @param {string} selector - The selector for the country dropdown
     * @returns {Promise} - Promise that resolves when initialization is complete
     */
    initCountryControl: async (selector) => {
      try {
        // Check if advanced country control is enabled
        if (!afdOptions.magentoOptions.typeahead.useAdvancedCountryControl) {
          return
        }

        // Check if we should fetch preferred countries
        if (afdOptions.magentoOptions.typeahead.usePreferredCountries) {
          const preferredCountries = await module.fetchPreferredCountries()
          module.initAdvancedCountryControl(selector, preferredCountries)
        } else {
          module.initAdvancedCountryControl(selector)
        }
      } catch (error) {
        console.error(error)
        // Fall back to standard initialization without preferred countries
        module.initAdvancedCountryControl(selector)
      }
    },

    /**
     * Initialize the advanced country control
     * @param {string} selector - The selector for the country dropdown
     * @param {Array} preferredCountries - Optional array of preferred countries to prioritize
     */
    initAdvancedCountryControl: (selector, preferredCountries) => {
      const $countrySelect = $(selector)

      if (!$countrySelect.length) {
        return
      }

      // Check if a country input already exists
      let $countryInput = $('#' + $countrySelect.attr('id') + '_afd')

      // If the country input doesn't exist, create it
      if (!$countryInput.length) {
        // Create the country input element
        $countryInput = $('<afd-country-input></afd-country-input>')
        $countryInput.attr('id', $countrySelect.attr('id') + '_afd')

        // Insert the country input before the original select
        $countrySelect.before($countryInput)

        // Hide the original select but keep it in the DOM
        $countrySelect.css('display', 'none')
      }

      // Get countries from the select options
      let countries = []
      $countrySelect.find('option').each(function () {
        const value = $(this).val()
        const text = $(this).text()

        if (value && value.length === 2) {
          countries.push({
            name: text,
            iso2: value,
            iso3: value // We don't have ISO3 codes from Magento, so use ISO2
          })
        }
      })

      // Reorder countries if preferred countries are provided
      if (preferredCountries && preferredCountries.length) {
        countries = module.reorderCountriesWithPreferred(
          countries,
          preferredCountries
        )
      }

      // Configure the country control
      $countryInput[0].options = {
        countries: countries,
        defaultCountry: $countrySelect.val() || 'GB',
        loadCountriesImmediately: false,
        fallbackToDefaultCountries: false
      }

      // Handle country change event
      $countryInput.on('change', function (event) {
        const selectedCountry = event.target.value
        // Update the original select and trigger change event
        $countrySelect.val(selectedCountry).trigger('change')
      })

      // Update the advanced country control when the original select changes
      $countrySelect.on('change', function () {
        const selectedCountry = $(this).val()
        if ($countryInput[0].value !== selectedCountry) {
          // Find the country in the countries array
          const country = countries.find(
            (country) => country.iso2 === selectedCountry
          )
          if (country) {
            // Update the country input without triggering change event
            $countryInput[0].value = selectedCountry
          }
        }
      })
    },

    /**
     * Fetch preferred countries from PCE
     * @returns {Promise} - Promise that resolves with an array of preferred countries
     */
    fetchPreferredCountries: async () => {
      // Return cached preferred countries if available
      if (module._preferredCountriesCache !== null) {
        return module._preferredCountriesCache
      }

      try {
        // Get the base URL from afdOptions
        const baseUrl = afdOptions.pceUrl || ''

        if (!baseUrl) {
          console.error('PCE URL not found in afdOptions')
          throw new Error('PCE URL not found in afdOptions')
        }

        // Get the preferred countries count from the configuration (default to 5 if not set)
        const preferredCount =
          afdOptions.magentoOptions.typeahead.preferredCountriesCount || 5

        // Construct the API URL with query parameters
        let apiUrl = `${baseUrl}?data=list&task=ListCountryInfo&fields=list&format=json&preferredCountries=${preferredCount}`

        // Add authentication parameters based on the authentication method
        if (afdOptions.id && afdOptions.token) {
          apiUrl += `&id=${encodeURIComponent(afdOptions.id)}&token=${encodeURIComponent(afdOptions.token)}`
        } else if (afdOptions.serial && afdOptions.password) {
          apiUrl += `&serial=${encodeURIComponent(afdOptions.serial)}&password=${encodeURIComponent(afdOptions.password)}`
        } else {
          console.error('No authentication credentials found in afdOptions')
          throw new Error('No authentication credentials found in afdOptions')
        }

        // Make the API request using fetch
        const response = await fetch(apiUrl)

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }

        const data = await response.json()

        if (data && data.Result === '1' && Array.isArray(data.Item)) {
          // Filter out preferred countries
          const preferredCountries = data.Item.filter(
            (country) => country.PreferredCountry === true
          ).map((country) => ({
            name: country.name,
            iso2: country.iso2,
            iso3: country.iso
          }))

          // Cache the preferred countries for future use
          module._preferredCountriesCache = preferredCountries
          return preferredCountries
        } else {
          throw new Error('Invalid response format or error in response')
        }
      } catch (error) {
        console.error(error)
        throw error
      }
    },

    /**
     * Reorder countries based on preferred countries
     * @param {Array} countries - Original list of countries
     * @param {Array} preferredCountries - List of preferred countries
     * @returns {Array} - Reordered list of countries
     */
    reorderCountriesWithPreferred: (countries, preferredCountries) => {
      if (!preferredCountries || !preferredCountries.length) {
        return countries
      }

      // Create a new array with preferred countries first, followed by the rest
      const preferredIso2Codes = preferredCountries.map(
        (country) => country.iso2
      )

      // Split countries into preferred and non-preferred
      const nonPreferredCountries = countries.filter(
        (country) => !preferredIso2Codes.includes(country.iso2)
      )

      // Create a new array with preferred countries in the specified order, followed by the rest
      const orderedCountries = []

      // Add preferred countries first (in the order they were returned from the API)
      preferredCountries.forEach((preferred) => {
        // Find the matching country from the original list to preserve the original name
        const match = countries.find(
          (country) => country.iso2 === preferred.iso2
        )
        if (match) {
          orderedCountries.push(match)
        }
      })

      // Add the rest of the countries
      nonPreferredCountries.forEach((country) => {
        orderedCountries.push(country)
      })

      return orderedCountries
    }
  }

  return module
})
