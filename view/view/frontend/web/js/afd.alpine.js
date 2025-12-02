/**
 * AFD Alpine.js directives for Hyva theme integration
 */

// Alpine.js directive for advanced country control
document.addEventListener('alpine:init', () => {
  Alpine.directive('afd-country', (el, _expression, { cleanup }) => {
    // Check if advanced country control is enabled
    if (
      !window.afdOptions ||
      !window.afdOptions.magentoOptions ||
      !window.afdOptions.magentoOptions.typeahead ||
      !window.afdOptions.magentoOptions.typeahead.useAdvancedCountryControl
    ) {
      return
    }

    // Initialize the advanced country control
    const initCountryControl = async () => {
      try {
        // Wait for RequireJS to load the necessary modules
        require(['jquery', 'afdCountry', 'afdCountryUtils'], function (
          $,
          afdCountry,
          afdCountryUtils
        ) {
          // Initialize the country control
          afdCountryUtils.initCountryControl(`#${el.id}`)
        })
      } catch (error) {
        console.error('Error initializing advanced country control:', error)
      }
    }

    // Initialize after a short delay to ensure the DOM is ready
    setTimeout(initCountryControl, 100)

    // Cleanup function
    cleanup(() => {
      // Remove any event listeners or cleanup if needed
    })
  })
})
