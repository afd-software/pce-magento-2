/**
 * Hyva-compatible country utilities (no RequireJS)
 * Standalone version for advanced country control
 */
;(function (window) {
  'use strict'

  const afdCountryUtilsHyva = {
    // Cache for preferred countries
    _preferredCountriesCache: null,

    /**
     * Initialize the advanced country control
     * @param {string} selector - The selector for the country dropdown
     * @returns {Promise}
     */
    initCountryControl: async function (selector) {
      try {
        // Check if advanced country control is enabled
        if (
          !window.afdOptions ||
          !window.afdOptions.magentoOptions ||
          !window.afdOptions.magentoOptions.typeahead ||
          !window.afdOptions.magentoOptions.typeahead.useAdvancedCountryControl
        ) {
          return
        }

        // Check if we should fetch preferred countries
        if (window.afdOptions.magentoOptions.typeahead.usePreferredCountries) {
          const preferredCountries = await this.fetchPreferredCountries()
          this.initAdvancedCountryControl(selector, preferredCountries)
        } else {
          this.initAdvancedCountryControl(selector)
        }
      } catch (error) {
        console.error('Error initializing advanced country control:', error)
        // Fall back to standard initialization
        this.initAdvancedCountryControl(selector)
      }
    },

    /**
     * Initialize the advanced country control
     * @param {string} selector - The selector for the country dropdown
     * @param {Array} preferredCountries - Optional array of preferred countries
     */
    initAdvancedCountryControl: function (selector, preferredCountries) {
      const countrySelect = document.querySelector(selector)

      if (!countrySelect) {
        console.error('Country select not found:', selector)
        return
      }

      // Check if already initialized
      const existingInput = document.getElementById(countrySelect.id + '_afd')
      if (existingInput) {
        console.log('Advanced country control already initialized')
        return
      }

      // Get countries from the select options
      let countries = []
      Array.from(countrySelect.options).forEach((option) => {
        const value = option.value
        const text = option.text

        if (value && value.length === 2) {
          countries.push({
            name: text,
            iso2: value,
            iso3: value
          })
        }
      })

      // Reorder countries if preferred countries provided
      if (preferredCountries && preferredCountries.length) {
        countries = this.reorderCountriesWithPreferred(
          countries,
          preferredCountries
        )
      }

      // Create the country input element
      const countryInput = document.createElement('afd-country-input')
      countryInput.id = countrySelect.id + '_afd'

      // Configure the country control
      countryInput.options = {
        countries: countries,
        defaultCountry: countrySelect.value || 'GB',
        loadCountriesImmediately: false,
        fallbackToDefaultCountries: false
      }

      // Insert before the original select
      countrySelect.parentNode.insertBefore(countryInput, countrySelect)

      // Hide the original select
      countrySelect.style.display = 'none'

      // Handle country change event
      countryInput.addEventListener('change', (event) => {
        const selectedCountry = event.target.value
        // Update the original select and trigger change event
        countrySelect.value = selectedCountry
        countrySelect.dispatchEvent(new Event('change', { bubbles: true }))
      })

      // Update the advanced country control when the original select changes
      countrySelect.addEventListener('change', () => {
        const selectedCountry = countrySelect.value
        if (countryInput.value !== selectedCountry) {
          countryInput.value = selectedCountry
        }
      })

      console.log('Advanced country control initialized for Hyva')
    },

    /**
     * Fetch preferred countries from PCE
     * @returns {Promise<Array>}
     */
    fetchPreferredCountries: async function () {
      // Return cached if available
      if (this._preferredCountriesCache !== null) {
        return this._preferredCountriesCache
      }

      try {
        const baseUrl = window.afdOptions.pceUrl || ''

        if (!baseUrl) {
          throw new Error('PCE URL not found')
        }

        const preferredCount =
          window.afdOptions.magentoOptions.typeahead.preferredCountriesCount ||
          5

        let apiUrl = `${baseUrl}?data=list&task=ListCountryInfo&fields=list&format=json&preferredCountries=${preferredCount}`

        // Add authentication
        if (window.afdOptions.id && window.afdOptions.token) {
          apiUrl += `&id=${encodeURIComponent(window.afdOptions.id)}&token=${encodeURIComponent(window.afdOptions.token)}`
        } else if (window.afdOptions.serial && window.afdOptions.password) {
          apiUrl += `&serial=${encodeURIComponent(window.afdOptions.serial)}&password=${encodeURIComponent(window.afdOptions.password)}`
        } else {
          throw new Error('No authentication credentials found')
        }

        const response = await fetch(apiUrl)

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`)
        }

        const data = await response.json()

        if (data && data.Result === '1' && Array.isArray(data.Item)) {
          const preferredCountries = data.Item.filter(
            (country) => country.PreferredCountry === true
          ).map((country) => ({
            name: country.name,
            iso2: country.iso2,
            iso3: country.iso
          }))

          this._preferredCountriesCache = preferredCountries
          return preferredCountries
        } else {
          throw new Error('Invalid response format')
        }
      } catch (error) {
        console.error('Error fetching preferred countries:', error)
        throw error
      }
    },

    /**
     * Reorder countries based on preferred countries
     * @param {Array} countries - Original list
     * @param {Array} preferredCountries - Preferred list
     * @returns {Array}
     */
    reorderCountriesWithPreferred: function (countries, preferredCountries) {
      if (!preferredCountries || !preferredCountries.length) {
        return countries
      }

      const preferredIso2Codes = preferredCountries.map((c) => c.iso2)
      const nonPreferred = countries.filter(
        (c) => !preferredIso2Codes.includes(c.iso2)
      )
      const ordered = []

      // Add preferred countries first
      preferredCountries.forEach((preferred) => {
        const match = countries.find((c) => c.iso2 === preferred.iso2)
        if (match) {
          ordered.push(match)
        }
      })

      // Add the rest
      nonPreferred.forEach((country) => {
        ordered.push(country)
      })

      return ordered
    }
  }

  // Expose globally
  window.afdCountryUtilsHyva = afdCountryUtilsHyva
})(window)
