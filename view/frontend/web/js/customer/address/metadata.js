define(['jquery', 'uiComponent'], ($, Component) => {
  'use strict'

  return Component.extend({
    defaults: {
      captureFields: [],
      precisionDeliveryConfig: null,
      isEditingExistingAddress: false,
      existingMapData: null,
      existingMetadataLatLng: null,
      addressId: null
    },

    // Precision Delivery map properties
    map: null,
    marker: null,
    originalLat: null,
    originalLng: null,
    urbanRural: 'urban',
    warningConfirmed: false,

    /**
     * Initialize component
     */
    initialize: function (config) {
      this._super()

      // Set config values
      if (config) {
        if (config.captureFields) this.captureFields = config.captureFields
        if (config.precisionDeliveryConfig)
          this.precisionDeliveryConfig = config.precisionDeliveryConfig
        if (config.isEditingExistingAddress !== undefined)
          this.isEditingExistingAddress = config.isEditingExistingAddress
        if (config.existingMapData)
          this.existingMapData = config.existingMapData
        if (config.existingMetadataLatLng)
          this.existingMetadataLatLng = config.existingMetadataLatLng
        if (config.addressId) this.addressId = config.addressId
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

      // Initialize precision delivery for existing addresses
      this.initExistingAddressPrecisionDelivery()

      // Before form submit, sync delivery notes into the hidden field
      var self = this
      $('form#form-validate, form.form-address-edit').on('submit', function () {
        self.syncDeliveryNotesBeforeSubmit()
      })
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
    bindPceEvents: function () {
      const self = this

      // Hide precision delivery map when user clicks search again
      $(document).on('click', '.afd-search-again', () => {
        $('#afd-precision-delivery-map-customer-container').hide()
      })

      // Listen for PCE retrieve complete event
      $(document).on('afd:pceRetrieveComplete', (event, data) => {
        if (data) {
          // Extract metadata from the PCE event data
          const metadata = data.metadata || data
          self.updateMetadata(metadata)
          self.initPrecisionDeliveryMap(metadata)

          // Mark address as validated
          const metadataField = $('#customer-address-metadata')
          if (metadataField.length) {
            try {
              const current = JSON.parse(metadataField.val() || '{}')
              current.is_validated = true
              metadataField.val(JSON.stringify(current))
            } catch (_e) {
              // ignore parse errors
            }
          }
        }
      })
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

      // First, normalize field names for matching
      const normalizedMetadata = {}
      Object.keys(metadata).forEach((key) => {
        const normalizedKey = this.normalizeFieldName(key)
        normalizedMetadata[normalizedKey] = {
          value: metadata[key],
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
    },

    /**
     * Find the insertion point for the map — after all address fields
     */
    findMapInsertionPoint: function () {
      const $fieldsets = $(
        'form#form-validate fieldset.fieldset, form.form-address-edit fieldset.fieldset'
      )
      if ($fieldsets.length > 1)
        return { $el: $fieldsets.last(), mode: 'append' }
      if ($fieldsets.length === 1)
        return { $el: $fieldsets.first(), mode: 'append' }
      return { $el: $('#address-metadata-container'), mode: 'before' }
    },

    /**
     * Initialize precision delivery for existing addresses
     */
    initExistingAddressPrecisionDelivery: function () {
      if (
        !this.precisionDeliveryConfig ||
        !this.precisionDeliveryConfig.enabled
      ) {
        return
      }

      if (!this.isEditingExistingAddress) {
        return
      }

      const mapContainerId = 'afd-precision-delivery-map-customer'

      // Case 1: Has existing map data
      if (this.existingMapData) {
        const lat =
          this.existingMapData.selected_lat || this.existingMapData.original_lat
        const lng =
          this.existingMapData.selected_lng || this.existingMapData.original_lng
        const ur = this.existingMapData.urban_rural || 'urban'
        const deliveryNotes = this.existingMapData.delivery_notes || ''

        if (lat && lng) {
          this.originalLat = this.existingMapData.original_lat
          this.originalLng = this.existingMapData.original_lng
          this.urbanRural = this.mapUrbanRuralCode(ur)
          this.warningConfirmed = false

          this.createAndShowMap(mapContainerId, lat, lng, deliveryNotes)

          // Populate the hidden field with existing map data so it's included in form submission
          const distance = this.existingMapData.distance_from_address || 0
          const isAdjusted = this.existingMapData.is_adjusted || false
          this.updateMapDataInMetadata(
            this.existingMapData.selected_lat || lat,
            this.existingMapData.selected_lng || lng,
            distance,
            isAdjusted
          )
          return
        }
      }

      // Case 2: Has metadata lat/lng but no map data
      if (this.existingMetadataLatLng) {
        const lat2 = this.existingMetadataLatLng.lat
        const lng2 = this.existingMetadataLatLng.lng
        const ur2 = this.existingMetadataLatLng.urban_rural || 'urban'

        if (lat2 && lng2) {
          this.originalLat = lat2
          this.originalLng = lng2
          this.urbanRural = this.mapUrbanRuralCode(ur2)
          this.warningConfirmed = false

          this.createAndShowMap(mapContainerId, lat2, lng2, '')

          // Populate the hidden field with initial map data so it's included in form submission
          this.updateMapDataInMetadata(lat2, lng2, 0, false)
          return
        }
      }
    },

    /**
     * Create and show the precision delivery map
     */
    createAndShowMap: function (mapContainerId, lat, lng, deliveryNotes) {
      let $mapContainer = $('#' + mapContainerId + '-container')

      if (!$mapContainer.length) {
        const mapHtml = this.createPrecisionDeliveryMapHtml(mapContainerId)
        const target = this.findMapInsertionPoint()
        if (target && target.$el && target.$el.length) {
          if (target.mode === 'append') {
            target.$el.append(mapHtml)
          } else {
            target.$el.before(mapHtml)
          }
        } else {
          $('#address-metadata-container').before(mapHtml)
        }
      } else {
        $mapContainer.show()
      }

      if (deliveryNotes) {
        $('#' + mapContainerId + '-delivery-notes').val(deliveryNotes)
      }

      this.initGoogleMap(mapContainerId, lat, lng)
    },

    /**
     * Flatten nested metadata structures
     */
    flattenMetadata: function (data, prefix) {
      prefix = prefix || ''
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
            const nested = this.flattenMetadata(value, newKey)
            for (const nk in nested) {
              if (Object.prototype.hasOwnProperty.call(nested, nk)) {
                result[nk] = nested[nk]
              }
            }
          } else {
            result[newKey] = value
          }
        }
      }

      return result
    },

    /**
     * Initialize Precision Delivery map from PCE event
     */
    initPrecisionDeliveryMap: function (metadata) {
      if (
        !this.precisionDeliveryConfig ||
        !this.precisionDeliveryConfig.enabled
      ) {
        return
      }

      const flattenedMetadata = this.flattenMetadata(metadata)
      const lat = flattenedMetadata.Latitude || flattenedMetadata.latitude
      const lng = flattenedMetadata.Longitude || flattenedMetadata.longitude
      const urbanRuralCode =
        flattenedMetadata.UrbanRuralCode ||
        flattenedMetadata.UrbanRuralName ||
        ''

      if (!lat || !lng) {
        return
      }

      this.originalLat = lat
      this.originalLng = lng
      this.urbanRural = this.mapUrbanRuralCode(urbanRuralCode)
      this.warningConfirmed = false

      // Remove any existing add button
      $('#afd-precision-delivery-add-btn-container').remove()

      const mapContainerId = 'afd-precision-delivery-map-customer'
      let $mapContainer = $('#' + mapContainerId)

      if (!$mapContainer.length) {
        const mapHtml = this.createPrecisionDeliveryMapHtml(mapContainerId)
        const target = this.findMapInsertionPoint()
        if (target && target.$el && target.$el.length) {
          if (target.mode === 'append') {
            target.$el.append(mapHtml)
          } else {
            target.$el.before(mapHtml)
          }
        } else {
          $('#address-metadata-container').before(mapHtml)
        }
      }

      $('#' + mapContainerId + '-container').show()

      this.initGoogleMap(mapContainerId, lat, lng)

      // Populate the hidden field so map data is included even if the pin isn't moved
      this.updateMapDataInMetadata(lat, lng, 0, false)
    },

    /**
     * Create Precision Delivery map HTML
     */
    createPrecisionDeliveryMapHtml: function (containerId) {
      const pdConfig = this.precisionDeliveryConfig
      let deliveryNotesHtml = ''

      if (pdConfig.enableDeliveryNotes) {
        deliveryNotesHtml =
          '<div class="afd-precision-delivery-notes">' +
          '<label class="label" for="' +
          containerId +
          '-delivery-notes">Delivery Instructions</label>' +
          '<textarea id="' +
          containerId +
          '-delivery-notes" ' +
          'class="input-text afd-delivery-notes-input" ' +
          'placeholder="' +
          (pdConfig.deliveryNotesPlaceholder ||
            'Any specific delivery information?') +
          '" ' +
          'rows="3" maxlength="500"></textarea></div>'
      }

      return (
        '<div class="afd-precision-delivery-container field" id="' +
        containerId +
        '-container">' +
        '<div class="afd-precision-delivery-header">' +
        '<h4 class="afd-precision-delivery-title">Precision Delivery</h4>' +
        '<p class="afd-precision-delivery-instructions">' +
        (pdConfig.instructionText ||
          'To specify a delivery location please click on the map and drag the pointer to the exact location you would like the parcel to be delivered to.') +
        '</p>' +
        '</div>' +
        '<div class="afd-precision-delivery-map-wrapper">' +
        '<div id="' +
        containerId +
        '" class="afd-precision-delivery-map" style="width: 100%; height: 300px;"></div>' +
        '</div>' +
        deliveryNotesHtml +
        '<div class="afd-precision-delivery-warning-overlay" style="display: none;">' +
        '<div class="afd-precision-delivery-warning-modal">' +
        '<div class="afd-precision-delivery-warning-content">' +
        '<h4>Distance Warning</h4>' +
        '<p class="warning-message"></p>' +
        '</div>' +
        '<div class="afd-precision-delivery-warning-actions">' +
        '<button type="button" class="action secondary reset-location">Reset Location</button>' +
        '<button type="button" class="action primary confirm-location">Confirm Location</button>' +
        '</div></div></div></div>'
      )
    },

    /**
     * Initialize Google Map
     */
    initGoogleMap: function (containerId, lat, lng) {
      const self = this

      if (!window.google || !window.google.maps) {
        this.loadGoogleMapsApi(function () {
          self.createMap(containerId, lat, lng)
        })
      } else {
        this.createMap(containerId, lat, lng)
      }
    },

    /**
     * Load Google Maps API
     */
    loadGoogleMapsApi: function (callback) {
      const apiKey = this.precisionDeliveryConfig.apiKey

      if (window.afdGoogleMapsLoading) {
        window.afdGoogleMapsCallbacks = window.afdGoogleMapsCallbacks || []
        window.afdGoogleMapsCallbacks.push(callback)
        return
      }

      window.afdGoogleMapsLoading = true
      window.afdGoogleMapsCallbacks = [callback]

      window.afdInitGoogleMaps = function () {
        window.afdGoogleMapsLoading = false
        window.afdGoogleMapsCallbacks.forEach(function (cb) {
          cb()
        })
        window.afdGoogleMapsCallbacks = []
      }

      const script = document.createElement('script')
      script.src =
        'https://maps.googleapis.com/maps/api/js?key=' +
        apiKey +
        '&libraries=geometry&callback=afdInitGoogleMaps'
      script.async = true
      script.defer = true
      document.head.appendChild(script)
    },

    /**
     * Create the Google Map
     */
    createMap: function (containerId, lat, lng) {
      const self = this
      const pdConfig = this.precisionDeliveryConfig
      const mapContainer = document.getElementById(containerId)

      if (!mapContainer) {
        return
      }

      const latNum = parseFloat(lat)
      const lngNum = parseFloat(lng)

      if (isNaN(latNum) || isNaN(lngNum)) {
        return
      }

      const center = { lat: latNum, lng: lngNum }

      const mapOptions = {
        center: center,
        zoom: pdConfig.defaultZoom || 17,
        mapTypeId: pdConfig.defaultMapType || 'roadmap',
        disableDefaultUI: true,
        zoomControl: true,
        scrollwheel: true,
        draggable: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      }

      this.map = new google.maps.Map(mapContainer, mapOptions)

      const markerOptions = {
        position: center,
        map: this.map,
        draggable: true,
        title: 'Delivery Location'
      }

      if (pdConfig.pointerImageUrl) {
        markerOptions.icon = {
          url: pdConfig.pointerImageUrl,
          scaledSize: new google.maps.Size(32, 32)
        }
      }

      this.marker = new google.maps.Marker(markerOptions)

      this.marker.addListener('dragend', function () {
        self.onMarkerMoved()
      })

      this.map.addListener('click', function (event) {
        self.marker.setPosition(event.latLng)
        self.onMarkerMoved()
      })

      // Listen for delivery notes changes so the hidden field stays in sync
      // even when the marker hasn't been moved
      var $notesInput = $('#' + containerId + '-delivery-notes')
      if ($notesInput.length) {
        $notesInput.on('input', function () {
          var position = self.marker.getPosition()
          if (!position) {
            return
          }
          // Read current map_data from hidden field to preserve distance/isAdjusted
          var currentMapData = {}
          try {
            var fieldVal = $('#customer-address-metadata').val()
            if (fieldVal) {
              var parsed = JSON.parse(fieldVal)
              currentMapData = parsed.map_data || {}
            }
          } catch (_e) {
            // ignore parse errors
          }
          self.updateMapDataInMetadata(
            position.lat().toFixed(7),
            position.lng().toFixed(7),
            currentMapData.distance_from_address || 0,
            currentMapData.is_adjusted || false
          )
        })
      }
    },

    /**
     * Handle marker movement
     */
    onMarkerMoved: function () {
      const pdConfig = this.precisionDeliveryConfig
      const position = this.marker.getPosition()
      const newLat = position.lat().toFixed(7)
      const newLng = position.lng().toFixed(7)

      const origLat = parseFloat(this.originalLat)
      const origLng = parseFloat(this.originalLng)
      const selLat = parseFloat(newLat)
      const selLng = parseFloat(newLng)

      let distance = 0
      if (window.google && window.google.maps && window.google.maps.geometry) {
        const original = new google.maps.LatLng(origLat, origLng)
        const selected = new google.maps.LatLng(selLat, selLng)
        distance = google.maps.geometry.spherical.computeDistanceBetween(
          original,
          selected
        )
      } else {
        // Fallback: Haversine formula
        distance = this.calculateHaversineDistance(
          origLat,
          origLng,
          selLat,
          selLng
        )
      }

      const isAdjusted = distance > 1

      if (
        pdConfig.enableDistanceWarning &&
        pdConfig.triggerWarningStorefront &&
        !this.warningConfirmed
      ) {
        const threshold =
          this.urbanRural === 'rural'
            ? pdConfig.warningThresholdRural
            : pdConfig.warningThresholdUrban

        if (distance > threshold) {
          this.showDistanceWarning(distance, newLat, newLng)
          return
        }
      }

      this.updateMapDataInMetadata(newLat, newLng, distance, isAdjusted)
    },

    /**
     * Show distance warning modal
     */
    showDistanceWarning: function (distance, newLat, newLng) {
      const self = this
      const pdConfig = this.precisionDeliveryConfig
      const $container = $('#afd-precision-delivery-map-customer-container')
      const $overlay = $container.find(
        '.afd-precision-delivery-warning-overlay'
      )
      const $message = $overlay.find('.warning-message')

      const warningMessage = (
        pdConfig.warningMessage ||
        'The distance selected on the map from the original search location is {distance}m, are you sure this is the correct delivery location?'
      ).replace('{distance}', Math.round(distance))

      $message.text(warningMessage)
      $overlay.show()

      $overlay
        .find('.reset-location')
        .off('click')
        .on('click', function () {
          self.resetMarkerPosition()
          $overlay.hide()
        })

      $overlay
        .find('.confirm-location')
        .off('click')
        .on('click', function () {
          self.warningConfirmed = true
          $overlay.hide()
          self.updateMapDataInMetadata(newLat, newLng, distance, true)
        })
    },

    /**
     * Reset marker to original position
     */
    resetMarkerPosition: function () {
      if (this.marker && this.originalLat && this.originalLng) {
        const originalPosition = new google.maps.LatLng(
          parseFloat(this.originalLat),
          parseFloat(this.originalLng)
        )
        this.marker.setPosition(originalPosition)
        this.updateMapDataInMetadata(
          this.originalLat,
          this.originalLng,
          0,
          false
        )
      }
    },

    /**
     * Update map data in the metadata hidden field
     */
    updateMapDataInMetadata: function (
      selectedLat,
      selectedLng,
      distance,
      isAdjusted
    ) {
      const deliveryNotesInput = document.querySelector(
        '.afd-delivery-notes-input'
      )
      const deliveryNotes = deliveryNotesInput ? deliveryNotesInput.value : ''

      const mapData = {
        original_lat: this.originalLat,
        original_lng: this.originalLng,
        selected_lat: selectedLat,
        selected_lng: selectedLng,
        distance_from_address: Math.round(distance),
        urban_rural: this.urbanRural,
        is_adjusted: isAdjusted,
        delivery_notes: deliveryNotes
      }

      const $field = $('#customer-address-metadata')
      let currentMetadata = {}

      try {
        if ($field.val()) {
          currentMetadata = JSON.parse($field.val())
        }
      } catch (e) {
        console.error('[AFD PCE] Error parsing metadata:', e)
      }

      currentMetadata.map_data = mapData
      $field.val(JSON.stringify(currentMetadata))
    },

    /**
     * Sync delivery notes from the textarea into the hidden metadata field
     * Called on form submit to ensure the latest value is always captured
     */
    syncDeliveryNotesBeforeSubmit: function () {
      var deliveryNotesInput = document.querySelector(
        '.afd-delivery-notes-input'
      )
      if (!deliveryNotesInput) {
        return
      }

      var $field = $('#customer-address-metadata')
      if (!$field.length || !$field.val()) {
        return
      }

      try {
        var currentMetadata = JSON.parse($field.val())
        if (currentMetadata.map_data) {
          currentMetadata.map_data.delivery_notes =
            deliveryNotesInput.value || ''
          $field.val(JSON.stringify(currentMetadata))
        }
      } catch (_e) {
        // ignore parse errors
      }
    },

    /**
     * Rural codes are: D1, D2, E1, E2, F1, F2, S6, S7, S8
     * All other codes default to 'urban'
     *
     * @param {string} code - The UrbanRuralCode from AFD API
     * @return {string} 'rural' or 'urban'
     */
    mapUrbanRuralCode: function (code) {
      if (!code) return 'urban'

      const ruralCodes = ['D1', 'D2', 'E1', 'E2', 'F1', 'F2', 'S6', 'S7', 'S8']
      const normalizedCode = code.toString().toUpperCase().trim()

      return ruralCodes.includes(normalizedCode) ? 'rural' : 'urban'
    },

    /**
     * Calculate distance between two points using Haversine formula
     * Fallback when Google geometry library isn't available
     *
     * @param {number} lat1
     * @param {number} lng1
     * @param {number} lat2
     * @param {number} lng2
     * @return {number} Distance in meters
     */
    calculateHaversineDistance: function (lat1, lng1, lat2, lng2) {
      const R = 6371000 // Earth's radius in meters
      const dLat = ((lat2 - lat1) * Math.PI) / 180
      const dLng = ((lng2 - lng1) * Math.PI) / 180
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      return R * c
    }
  })
})
