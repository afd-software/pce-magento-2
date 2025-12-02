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

    initialize: function () {
      this._super()

      this.regionComponent = null
      this.regionIDElement = null
      this.countryComponent = null
      this.resolvers = {}
      this.promises = []

      const debugMode = window.checkoutConfig?.afdDebugMode || false
      if (debugMode) {
        console.log(
          '[AFD PCE Billing] form-fieldset initialize called for:',
          this.name
        )
      }

      // Create promises for each field
      for (let i = 0; i < this.fieldsToBeLoaded.length; i++) {
        const name = this.fieldsToBeLoaded[i]
        this.promises.push(
          new Promise((resolve) => {
            this.resolvers[name] = resolve
          })
        )
      }

      // When all fields are ready
      Promise.all(this.promises).then((res) => {
        if (debugMode) {
          console.log('[AFD PCE Billing] All fields ready for:', this.name)
        }

        if (!afdOptions.magentoOptions.typeahead.regionFieldRemoved) {
          const regionField = res.find(
            (element) => element.name === 'region_id'
          )
          if (regionField && regionField.element) {
            this.regionIDElement = regionField.element

            if (debugMode) {
              console.log(
                '[AFD PCE Billing] Set regionIDElement for:',
                this.name
              )
            }
          }
        }
      })

      // Watch for billing address changes to copy metadata from shipping when "same as shipping" is checked
      quote.billingAddress.subscribe((billingAddress) => {
        if (billingAddress) {
          const shippingAddress = quote.shippingAddress()

          // Check if "same as shipping" checkbox is checked
          const sameAsShipping =
            billingAddress.saveInAddressBook === null ||
            billingAddress.saveInAddressBook === 2

          if (sameAsShipping && shippingAddress) {
            // Copy metadata from shipping to billing (overwrite if exists)
            if (
              shippingAddress.extensionAttributes &&
              shippingAddress.extensionAttributes.afd_address_metadata
            ) {
              // Guard: Only copy if billing doesn't already have the same metadata
              const shippingMetadata =
                shippingAddress.extensionAttributes.afd_address_metadata
              const billingMetadata =
                billingAddress.extensionAttributes?.afd_address_metadata

              if (
                JSON.stringify(shippingMetadata) !==
                JSON.stringify(billingMetadata)
              ) {
                // Set metadata on BOTH camelCase and snake_case properties for API compatibility
                billingAddress.extensionAttributes =
                  billingAddress.extensionAttributes || {}
                billingAddress.extensionAttributes['afd_address_metadata'] =
                  shippingMetadata

                billingAddress['extension_attributes'] = {
                  ...(billingAddress['extension_attributes'] || {})
                }
                billingAddress['extension_attributes']['afd_address_metadata'] =
                  shippingMetadata

                console.log(
                  '[AFD PCE] Copied metadata from shipping to billing (same as shipping checked)'
                )
              }
            }
          }
        }
      })
    },

    /**
     * Wait for country field component to be fully ready
     * Returns a promise that resolves when country field is ready
     */
    waitForCountryReady: function () {
      const debugMode = window.checkoutConfig?.afdDebugMode || false

      if (debugMode) {
        console.log(
          '[AFD PCE Billing] waitForCountryReady called for parent:',
          this.name
        )
      }

      return new Promise((resolve) => {
        // If we already have the country component from fieldReady, check it's ready
        if (this.countryComponent) {
          if (debugMode) {
            console.log('[AFD PCE Billing] Country component already available')
          }
          resolve(this.countryComponent)
          return
        }

        // Otherwise wait for it to be registered
        const countryFieldName = this.name + '.country_id'

        if (debugMode) {
          console.log(
            '[AFD PCE Billing] Waiting for country field:',
            countryFieldName
          )
        }

        const checkCountry = () => {
          registry.get(countryFieldName, (countryComponent) => {
            // Country component is ready
            if (debugMode) {
              console.log(
                '[AFD PCE Billing] Country component found:',
                countryFieldName
              )
            }
            this.countryComponent = countryComponent
            resolve(countryComponent)
          })
        }

        // Try immediately
        checkCountry()
      })
    },

    initTypeahead: function (typeaheadContainer) {
      const debugMode = window.checkoutConfig?.afdDebugMode || false
      const $typeahead = $(typeaheadContainer).find(
        '[data-afd-control="typeahead"]'
      )

      // Check if this element has already been initialized
      if ($typeahead.data('afd-initialized')) {
        if (debugMode) {
          console.log(
            '[AFD PCE Billing] Typeahead already initialized, skipping'
          )
        }
        return
      }

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

      // Mark as initialized
      $typeahead.data('afd-initialized', true)

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
        console.log('hi')
        //zip plus 4
        if (
          !afdOptions.magentoOptions.typeahead.zipPlusFour &&
          $(afdOptions.country.customCountryControl).val() === 'US'
        ) {
          const originalVal = $('[data-afd-result="Postcode"]').val()
          $('[data-afd-result="Postcode"]').val(originalVal.substr(0, 5))
        }

        if (afdOptions.magentoOptions.typeahead.regionFieldRemoved) return

        console.log(this.regionIDElement)
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

      // $(document).on('afd:populateResultsComplete', showHideRegion);
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

      // Flatten nested metadata structures before processing
      const flattenedMetadata = this.flattenMetadata(metadata)

      if (debugMode) {
        console.log('[AFD PCE Billing] Flattened metadata:', flattenedMetadata)
      }

      const configuredFields = window.checkoutConfig?.afd?.metadataFields

      if (!configuredFields) {
        console.error('[AFD PCE] No metadata fields configured')
        return
      }

      const filteredMetadata = {}
      if (flattenedMetadata) {
        configuredFields.forEach((field) => {
          if (flattenedMetadata[field]) {
            filteredMetadata[field] = flattenedMetadata[field]
            if (debugMode) {
              console.log(
                `[AFD PCE Billing] Added field ${field}:`,
                flattenedMetadata[field]
              )
            }
          } else {
            if (debugMode) {
              console.log(
                `[AFD PCE Billing] Field ${field} not found in metadata`
              )
            }
          }
        })
      }

      const metadataJson = JSON.stringify(filteredMetadata)
      const metadataObject = {
        metadata: metadataJson,
        is_validated: true
      }

      metadataStore.set(metadataJson)

      const address = quote.billingAddress()

      if (!address) {
        return
      }

      address.extensionAttributes = address.extensionAttributes || {}
      address.extensionAttributes['afd_address_metadata'] = metadataObject

      address['extension_attributes'] = {
        ...(address['extension_attributes'] || {})
      }
      address['extension_attributes']['afd_address_metadata'] = metadataObject

      // Remove any existing listeners before adding new ones (in case of re-search)
      this.removeFieldChangeListeners()

      // Set up listeners AFTER a short delay to avoid triggering on AFD population
      setTimeout(() => {
        this.setupFieldChangeListeners(address)
      }, 500)
    },

    removeFieldChangeListeners: function () {
      const debugMode = window.checkoutConfig?.afdDebugMode || false
      const fieldsToWatch = [
        'billing-address-fieldset.street.0',
        'billing-address-fieldset.street.1',
        'billing-address-fieldset.street.2',
        'billing-address-fieldset.city',
        'billing-address-fieldset.postcode',
        'billing-address-fieldset.region',
        'billing-address-fieldset.region_id'
      ]

      fieldsToWatch.forEach((fieldName) => {
        const field = $('[name="' + fieldName + '"]')
        if (field.length) {
          field.off('input.afdvalidation change.afdvalidation')
        }
      })

      if (debugMode) {
        console.log('[AFD PCE Billing] Removed all field change listeners')
      }
    },

    setupFieldChangeListeners: function (address) {
      const self = this
      const debugMode = window.checkoutConfig?.afdDebugMode || false
      const fieldsToWatch = [
        'billing-address-fieldset.street.0',
        'billing-address-fieldset.street.1',
        'billing-address-fieldset.street.2',
        'billing-address-fieldset.city',
        'billing-address-fieldset.postcode',
        'billing-address-fieldset.region',
        'billing-address-fieldset.region_id'
      ]

      if (debugMode) {
        console.log('[AFD PCE Billing] Setting up field change listeners')
      }

      fieldsToWatch.forEach((fieldName) => {
        const field = $('[name="' + fieldName + '"]')
        if (field.length) {
          // Use namespaced events and 'one' to fire only once
          field.one('input.afdvalidation change.afdvalidation', function () {
            if (debugMode) {
              console.log(
                '[AFD PCE Billing] User manually edited field:',
                fieldName,
                '- invalidating metadata'
              )
            }
            if (
              address &&
              address.extensionAttributes &&
              address.extensionAttributes['afd_address_metadata']
            ) {
              // Only invalidate if it's currently true
              if (
                address.extensionAttributes['afd_address_metadata']
                  .is_validated === true
              ) {
                address.extensionAttributes[
                  'afd_address_metadata'
                ].is_validated = false
                address['extension_attributes'][
                  'afd_address_metadata'
                ].is_validated = false

                if (debugMode) {
                  console.log(
                    '[AFD PCE Billing] Metadata invalidated, is_validated set to false'
                  )
                }

                // Remove all listeners after invalidation
                self.removeFieldChangeListeners()
              }
            }
          })
        }
      })
    },

    /**
     * this function is called for every field that is a child of this component
     */
    fieldReady: function (field) {
      const debugMode = window.checkoutConfig?.afdDebugMode || false

      if (debugMode) {
        console.log(
          '[AFD PCE Billing] fieldReady called on:',
          this.name,
          'for field:',
          field.name,
          'from parent:',
          field.parentName
        )
      }

      // Only process fields that belong to this form instance
      if (field && field.parentName !== this.name) {
        if (debugMode) {
          console.log('[AFD PCE Billing] Ignoring field from different parent')
        }
        return
      }

      if (field && field.name && this.fieldsToBeLoaded.includes(field.name)) {
        if (field.name === 'region_id') {
          this.regionComponent = field.koComponent
        } else if (field.name === 'country_id') {
          this.countryComponent = field.koComponent
        }

        // Resolve the promise for this field
        if (typeof this.resolvers[field.name] !== 'undefined') {
          this.resolvers[field.name](field)
        }

        // Handle typeahead initialization separately
        if (field.name === 'afd_typeahead') {
          if (debugMode) {
            console.log(
              '[AFD PCE Billing] Typeahead field ready, initializing...'
            )
          }
          this.waitForCountryReady().then(() => {
            if (debugMode) {
              console.log(
                '[AFD PCE Billing] Country ready, initializing typeahead'
              )
            }
            this.initTypeahead(field.element)
          })
        }
      } else {
        if (debugMode) {
          console.log(
            '[AFD PCE Billing] Field not in fieldsToBeLoaded:',
            field?.name
          )
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
