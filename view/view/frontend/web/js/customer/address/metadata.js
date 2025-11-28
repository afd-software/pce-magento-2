define(['jquery', 'uiComponent'], ($, Component) => {
  'use strict'

  return Component.extend({
    defaults: {
      captureFields: []
    },

    /**
     * Initialize component
     */
    initialize: function (config) {
      this._super()

      // Set capture fields from config
      if (config && config.captureFields) {
        this.captureFields = config.captureFields
      }

      // Check if the hidden metadata field exists
      const metadataField = $('#customer-address-metadata')
      if (!metadataField.length) {
        // Create the hidden field if it doesn't exist
        $('#address-metadata-container').append(
          '<input type="hidden" id="customer-address-metadata" name="customer-address-metadata" value="{}" />'
        )
      }

      // Ensure metadata_enabled field exists
      const metadataEnabledField = $('#metadata_enabled')
      if (!metadataEnabledField.length) {
        $('#address-metadata-container').append(
          '<input type="hidden" id="metadata_enabled" name="metadata_enabled" value="1" />'
        )
      }

      // Listen for PCE events
      this.bindPceEvents()
    },

    /**
     * Convert camelCase to snake_case
     *
     * @param {String} camelCase
     * @return {String}
     */
    camelToSnake: function (camelCase) {
      return camelCase
        .replace(/([A-Z])/g, function ($1) {
          return '_' + $1.toLowerCase()
        })
        .replace(/^_/, '') // Remove leading underscore if present
    },

    /**
     * Normalize field name for comparison
     * Handles both camelCase and snake_case formats
     *
     * @param {String} fieldName
     * @return {String}
     */
    normalizeFieldName: function (fieldName) {
      // Convert to lowercase
      const normalized = fieldName.toLowerCase()

      // Remove all underscores and spaces
      return normalized.replace(/[_\s]/g, '')
    },

    /**
     * Bind to PCE events to capture metadata
     */
    bindPceEvents() {
      const self = this

      // Listen for PCE retrieve complete event
      $(document).on('afd:pceRetrieveComplete', (event, data) => {
        if (data) {
          // Extract metadata from the PCE event data
          // The PCE event contains metadata in the 'metadata' property
          const metadata = data.metadata || data
          self.updateMetadata(metadata)
        }
      })
    },

    /**
     * Recursively flatten nested array structures using underscore notation
     * Converts nested structures like EPC.Residential.CurrentEnergyRating to EPC_Residential_CurrentEnergyRating
     *
     * @param {Object} data
     * @param {String} prefix
     * @returns {Object}
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

    /**
     * Filter metadata to only include configured capture fields
     * Handles case differences between snake_case config and PascalCase/camelCase API response
     *
     * @param {Object} metadata
     * @returns {Object}
     */
    filterMetadata(metadata) {
      // If no capture fields configured or empty array, return empty object
      if (!this.captureFields || !this.captureFields.length) {
        return {}
      }

      // First, flatten nested metadata structures
      const flattenedMetadata = this.flattenMetadata(metadata)

      // Then normalize field names for matching
      const normalizedMetadata = {}
      Object.keys(flattenedMetadata).forEach((key) => {
        const normalizedKey = this.normalizeFieldName(key)
        normalizedMetadata[normalizedKey] = {
          value: flattenedMetadata[key],
          originalKey: key
        }
      })

      // Filter metadata to only include configured capture fields
      const filteredMetadata = {}

      this.captureFields.forEach((field) => {
        const normalizedFieldName = this.normalizeFieldName(field)

        // Check if the field exists in the normalized metadata
        if (
          Object.prototype.hasOwnProperty.call(
            normalizedMetadata,
            normalizedFieldName
          )
        ) {
          // Use the snake_case version of the field name
          const snakeKey = field
          filteredMetadata[snakeKey] =
            normalizedMetadata[normalizedFieldName].value
        } else {
          // Try fuzzy matching for common field name variations
          Object.keys(normalizedMetadata).forEach((key) => {
            // Check if the normalized field name is contained within the key
            // or if the key is contained within the normalized field name
            if (
              key.indexOf(normalizedFieldName) !== -1 ||
              normalizedFieldName.indexOf(key) !== -1
            ) {
              filteredMetadata[field] = normalizedMetadata[key].value
            }
          })
        }
      })

      return filteredMetadata
    },

    /**
     * Update the metadata hidden field with new metadata
     *
     * @param {Object} metadata
     */
    updateMetadata(metadata) {
      if (!metadata || typeof metadata !== 'object') {
        return
      }

      // Find the metadata field
      const metadataField = $('#customer-address-metadata')
      if (!metadataField.length) {
        // Create it if it doesn't exist
        $('#address-metadata-container').append(
          '<input type="hidden" id="customer-address-metadata" name="customer-address-metadata" value="{}" />'
        )
      }

      let currentMetadata = {}

      // Try to parse current metadata
      try {
        if (metadataField.val()) {
          currentMetadata = JSON.parse(metadataField.val())
        }
      } catch (e) {
        console.error('[AFD PCE] Error parsing existing metadata:', e)
      }

      // Filter the incoming metadata based on configured capture fields
      // This will handle case differences between snake_case config and PascalCase API response
      const filteredMetadata = this.filterMetadata(metadata)

      // Merge with current metadata
      const updatedMetadata = { ...currentMetadata, ...filteredMetadata }

      // Update the hidden field
      const jsonValue = JSON.stringify(updatedMetadata)
      metadataField.val(jsonValue)
    }
  })
})
