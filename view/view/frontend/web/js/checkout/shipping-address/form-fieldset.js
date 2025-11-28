define([
  'uiComponent',
  'uiRegistry',
  'underscore',
  'jquery',
  'Magento_Checkout/js/model/quote',
  'Afd_Pce/js/checkout/metadata-store'
], function (Component, registry, _, $, quote, metadataStore) {
  'use strict'
  //  extends base UIComponent /vendor/magento/module-ui/view/base/web/js/lib/core/collection

  return Component.extend({
    defaults: {
      exports: {
        afdReady: '${ $.parentName }:afdReady'
      },
      imports: {
        typeahead: '${$.name}.afd_typeahead:index',
        source: 'checkoutProvider'
      }
    },

    resolvers: {},
    fieldsToBeLoaded: [
      'afd_typeahead',
      'postcode',
      'street',
      'city',
      'country_id',
      ...(afdOptions.magentoOptions.typeahead.regionFieldRemoved
        ? []
        : ['region', 'region_id'])
    ],

    regionComponent: null,
    regionIDElement: null,
    countryComponent: null,

    initialize: function () {
      this._super()

      const promises = []

      // creates an array of promises and populates an object with resolve functions
      for (let i = 0; i < this.fieldsToBeLoaded.length; i++) {
        const name = this.fieldsToBeLoaded[i]
        promises.push(
          new Promise((resolve) => {
            this.resolvers[name] = resolve
          })
        )
      }

      // when all afd dependencies have been loaded
      Promise.all(promises).then((res) => {
        if (!afdOptions.magentoOptions.typeahead.regionFieldRemoved) {
          this.regionIDElement = res.find(
            (element) => element.name === 'region_id'
          ).element
        }
        const typeahead = res.find(
          (element) => element.name === 'afd_typeahead'
        )
        this.initTypeahead(typeahead.element)
      })
    },
    initTypeahead: function (typeaheadContainer) {
      const $typeahead = $(typeaheadContainer).find(
        '[data-afd-control="typeahead"]'
      )
      const $container = $typeahead.closest('form')
      const countrySelector = '[name="country_id"]'

      afdOptions.typeahead.containers = [
        '.form-shipping-address',
        '.billing-address-form'
      ]
      afdOptions.country.customCountryControl = countrySelector

      // initialise controls
      $typeahead.afd('typeahead')
      $container.find('.reverse-geocode-button').afd('reverseGeocodeButton')

      // Bind metadata event listener
      $typeahead.on('afd:pceRetrieveComplete', (event, data) => {
        // Only process the event if it contains a valid data object.
        // Do not process 'clear' events where data is null, to prevent overwriting.
        if (data) {
          this.processMetadata(data)
        }
      })

      // initially hide region fields that shouldn't be visible
      this.regionVisibility()

      // events
      $('.afd-manual-input-button').on('click', () => {
        this.regionVisibility(false)
      })

      if (afdOptions.magentoOptions.typeahead.regionFieldRemoved) return
      // initially hide region fields that shouldn't be visible
      this.regionVisibility()

      // events
      $('.afd-manual-input-button').on('click', () => {
        this.regionVisibility(false)
      })

      $(document).on('afd:populateResultsComplete', () => {
        //zip plus 4
        if (
          !afdOptions.magentoOptions.typeahead.zipPlusFour &&
          $(afdOptions.country.customCountryControl).val() === 'US'
        ) {
          const originalVal = $('[data-afd-result="Postcode"]').val()
          $('[data-afd-result="Postcode"]').val(originalVal.substr(0, 5))
        }

        if (afdOptions.magentoOptions.typeahead.regionFieldRemoved) return

        this.regionVisibility(false)
        $(this.regionIDElement).change()
      })

      $(document).on('afd:countryChanged', (e, country) => {
        if (afdOptions.magentoOptions.typeahead.regionFieldRemoved) return
        if (
          afdOptions.typeahead.beforeHideResults &&
          afdOptions.typeahead.showForCountries.indexOf(
            $container.find(countrySelector).val()
          ) > -1
        ) {
          $container
            .find('[data-afd-result="TraditionalCounty"]')
            .closest('.field')
            .hide()
        } else {
          this.regionVisibility($container, country)
        }
      })
    },

    /**
     * Recursively flatten nested array structures using underscore notation
     * Converts nested structures like EPC.Residential.CurrentEnergyRating to EPC_Residential_CurrentEnergyRating
     */
    flattenMetadata: function (data, prefix = '') {
      const result = {}

      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const value = data[key]
          const newKey = prefix === '' ? key : prefix + '_' + key

          if (
            value !== null &&
            typeof value === 'object' &&
            !Array.isArray(value)
          ) {
            // If the value is an object, recursively flatten it
            Object.assign(result, this.flattenMetadata(value, newKey))
          } else {
            // If the value is not an object, add it to the result
            result[newKey] = value
          }
        }
      }

      return result
    },

    processMetadata: function (metadata) {
      const debugMode = window.checkoutConfig?.afdDebugMode || false

      if (debugMode) {
        console.log('[AFD PCE] processMetadata called with:', metadata)
      }

      // Flatten nested metadata structures before processing
      const flattenedMetadata = this.flattenMetadata(metadata)

      if (debugMode) {
        console.log('[AFD PCE] Flattened metadata:', flattenedMetadata)
      }

      const configuredFields = window.checkoutConfig?.afd?.metadataFields

      if (debugMode) {
        console.log('[AFD PCE] Configured fields:', configuredFields)
      }

      if (!configuredFields) {
        console.error('[AFD PCE] No metadata fields configured!')
        throw new Error('No metadata fields configured')
      }

      const filteredMetadata = {}
      // Only populate filteredMetadata if the metadata object actually exists.
      if (flattenedMetadata) {
        configuredFields.forEach((field) => {
          if (flattenedMetadata[field]) {
            filteredMetadata[field] = flattenedMetadata[field]
            if (debugMode) {
              console.log(
                `[AFD PCE] Added field ${field}:`,
                flattenedMetadata[field]
              )
            }
          } else {
            if (debugMode) {
              console.log(`[AFD PCE] Field ${field} not found in metadata`)
            }
          }
        })
      }

      const json = JSON.stringify(filteredMetadata)

      if (debugMode) {
        console.log('[AFD PCE] Final JSON to store:', json)
      }

      // Store both metadata JSON and is_validated flag separately
      const metadataWithValidation = {
        metadata: json,
        is_validated: true
      }

      metadataStore.set(JSON.stringify(metadataWithValidation))

      if (debugMode) {
        console.log(
          '[AFD PCE] Stored in metadataStore with is_validated:',
          metadataStore.get()
        )
      }

      // Remove any existing listeners before adding new ones (in case of re-search)
      this.removeFieldChangeListeners()

      // Set up listeners AFTER a short delay to avoid triggering on AFD population
      setTimeout(() => {
        this.setupFieldChangeListeners()
      }, 500)
    },

    removeFieldChangeListeners: function () {
      const debugMode = window.checkoutConfig?.afdDebugMode || false
      const fieldsToWatch = [
        'street[0]',
        'street[1]',
        'street[2]',
        'city',
        'postcode',
        'region',
        'region_id'
      ]

      fieldsToWatch.forEach((fieldName) => {
        const field = $('[name="' + fieldName + '"]')
        if (field.length) {
          field.off('input.afdvalidation change.afdvalidation')
        }
      })

      if (debugMode) {
        console.log('[AFD PCE] Removed all field change listeners')
      }
    },

    setupFieldChangeListeners: function () {
      const self = this
      const debugMode = window.checkoutConfig?.afdDebugMode || false
      const fieldsToWatch = [
        'street[0]',
        'street[1]',
        'street[2]',
        'city',
        'postcode',
        'region',
        'region_id'
      ]

      if (debugMode) {
        console.log('[AFD PCE] Setting up field change listeners')
      }

      fieldsToWatch.forEach((fieldName) => {
        const field = $('[name="' + fieldName + '"]')
        if (field.length) {
          // Use namespaced events and 'one' to fire only once
          field.one('input.afdvalidation change.afdvalidation', function () {
            if (debugMode) {
              console.log(
                '[AFD PCE] User manually edited field:',
                fieldName,
                '- invalidating metadata'
              )
            }
            const currentMetadata = metadataStore.get()
            if (currentMetadata && currentMetadata !== '{}') {
              try {
                const metadataObj = JSON.parse(currentMetadata)
                if (metadataObj.is_validated === true) {
                  metadataObj.is_validated = false
                  metadataStore.set(JSON.stringify(metadataObj))

                  if (debugMode) {
                    console.log(
                      '[AFD PCE] Metadata invalidated, new value:',
                      metadataStore.get()
                    )
                  }

                  // Remove all listeners after invalidation
                  self.removeFieldChangeListeners()
                }
              } catch (e) {
                console.error('[AFD PCE] Error invalidating metadata:', e)
              }
            }
          })
        }
      })
    },

    beforeSave: function () {},

    /**
     * this function is called for every field that is a child of this component
     */
    fieldReady: function (field) {
      if (typeof this.resolvers[field.name] !== 'undefined') {
        this.resolvers[field.name](field)
        if (field.name === 'region_id') {
          this.regionComponent = field.koComponent
        } else if (field.name === 'country_id') {
          this.countryComponent = field.koComponent
        }
      }
    },

    regionVisibility: function (isInitial = true) {
      const valStore = $(this.regionIDElement).val()
      this.regionComponent.setOptions(this.regionComponent.options())
      this.regionComponent.visible.valueHasMutated() // manually force an update of the select component
      $(this.regionIDElement).val(valStore)
      registry.get(this.regionComponent.customName, function (input) {
        input.visible.valueHasMutated() //manually force an update of the input component
      })

      if (isInitial) {
        if (afdOptions.typeahead.beforeHideResults) {
          $('[data-afd-result="PostalCounty"]').closest('.field').hide()
          $(this.regionIDElement).closest('.field').hide()
        }
      }
    }
  })
})
