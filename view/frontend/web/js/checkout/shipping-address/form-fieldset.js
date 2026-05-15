define([
  'uiComponent',
  'uiRegistry',
  'underscore',
  'jquery',
  'ko',
  'Magento_Checkout/js/model/quote',
  'Afd_Pce/js/checkout/metadata-store'
], function (Component, registry, _, $, ko, quote, metadataStore) {
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
    precisionDeliveryMap: null,

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

          // Initialize Precision Delivery map if enabled and we have coordinates
          this.initPrecisionDeliveryMap(data)
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

      $(document).on('click', '.afd-search-again', () => {
        $('#afd-precision-delivery-map-shipping-container').hide()
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
      const $shippingForm = $('.form-shipping-address')
      if ($shippingForm.length) {
        $shippingForm
          .find('input, select')
          .off('input.afdvalidation change.afdvalidation')
      }
    },

    setupFieldChangeListeners: function () {
      const self = this
      const fieldsToWatch = [
        'street[0]',
        'street[1]',
        'street[2]',
        'city',
        'postcode',
        'region',
        'region_id'
      ]

      const $shippingForm = $('.form-shipping-address')
      if (!$shippingForm.length) {
        return
      }

      fieldsToWatch.forEach((fieldName) => {
        const field = $shippingForm.find('[name="' + fieldName + '"]')
        if (field.length) {
          field.one('input.afdvalidation change.afdvalidation', function () {
            const currentMetadata = metadataStore.get()
            if (currentMetadata && currentMetadata !== '{}') {
              try {
                const metadataObj = JSON.parse(currentMetadata)
                if (metadataObj.is_validated === true) {
                  metadataObj.is_validated = false
                  metadataStore.set(JSON.stringify(metadataObj))
                  self.removeFieldChangeListeners()
                }
              } catch (e) {
                console.log(e)
                // Ignore parse errors
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
      if (afdOptions.magentoOptions.typeahead.regionFieldRemoved) return
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
    },

    initPrecisionDeliveryMap: function (metadata) {
      const precisionDeliveryConfig =
        window.checkoutConfig?.afd?.precisionDelivery
      const debugMode = window.checkoutConfig?.afdDebugMode || false

      if (!precisionDeliveryConfig || !precisionDeliveryConfig.enabled) {
        if (debugMode) {
          console.log('[AFD PCE] Precision Delivery is not enabled')
        }
        return
      }

      // Get coordinates from metadata
      const flattenedMetadata = this.flattenMetadata(metadata)
      const lat = flattenedMetadata.Latitude || flattenedMetadata.latitude
      const lng = flattenedMetadata.Longitude || flattenedMetadata.longitude
      const urbanRuralCode =
        flattenedMetadata.UrbanRuralCode ||
        flattenedMetadata.UrbanRuralName ||
        ''

      if (!lat || !lng) {
        if (debugMode) {
          console.log(
            '[AFD PCE] No coordinates found in metadata for Precision Delivery'
          )
        }
        return
      }

      if (debugMode) {
        console.log('[AFD PCE] Initializing Precision Delivery map with:', {
          lat,
          lng,
          urbanRuralCode
        })
      }

      // Create map container if it doesn't exist
      const mapContainerId = 'afd-precision-delivery-map-shipping'
      let $mapContainer = $('#' + mapContainerId)

      if (!$mapContainer.length) {
        const mapHtml = this.createPrecisionDeliveryMapHtml(
          mapContainerId,
          precisionDeliveryConfig
        )
        // Insert after the typeahead field
        $('[data-afd-control="typeahead"]').closest('.field').after(mapHtml)
        $mapContainer = $('#' + mapContainerId)
      } else {
        $('#' + mapContainerId + '-container').show()
      }

      // Initialize or update the map
      this.initGoogleMap(
        mapContainerId,
        lat,
        lng,
        urbanRuralCode,
        precisionDeliveryConfig
      )
    },

    createPrecisionDeliveryMapHtml: function (containerId, config) {
      const deliveryNotesHtml = config.enableDeliveryNotes
        ? `
          <div class="afd-precision-delivery-notes">
            <label class="label" for="${containerId}-delivery-notes">Delivery Instructions</label>
            <textarea id="${containerId}-delivery-notes" 
                      class="input-text afd-delivery-notes-input"
                      placeholder="${config.deliveryNotesPlaceholder || 'Any specific delivery information?'}"
                      rows="3"
                      maxlength="500"></textarea>
          </div>
      `
        : ''

      return `
        <div class="afd-precision-delivery-container field" id="${containerId}-container">
          <div class="afd-precision-delivery-header">
            <h4 class="afd-precision-delivery-title">Precision Delivery</h4>
            <p class="afd-precision-delivery-instructions">${config.instructionText || 'To specify a delivery location please click on the map and drag the pointer to the exact location you would like the parcel to be delivered to.'}</p>
          </div>
          <div class="afd-precision-delivery-map-wrapper">
            <div id="${containerId}" class="afd-precision-delivery-map" style="width: 100%; height: 300px;"></div>
          </div>
          ${deliveryNotesHtml}
          <div class="afd-precision-delivery-warning-overlay" style="display: none;">
            <div class="afd-precision-delivery-warning-modal">
              <div class="afd-precision-delivery-warning-content">
                <h4>Distance Warning</h4>
                <p class="warning-message"></p>
              </div>
              <div class="afd-precision-delivery-warning-actions">
                <button type="button" class="action secondary reset-location">Reset Location</button>
                <button type="button" class="action primary confirm-location">Confirm Location</button>
              </div>
            </div>
          </div>
        </div>
      `
    },

    initGoogleMap: function (containerId, lat, lng, urbanRuralCode, config) {
      const self = this

      // Store original coordinates
      this.originalLat = lat
      this.originalLng = lng
      this.urbanRural = this.mapUrbanRuralCode(urbanRuralCode)
      this.warningConfirmed = false

      // Load Google Maps API if not already loaded
      if (!window.google || !window.google.maps) {
        this.loadGoogleMapsApi(config.apiKey, function () {
          self.createMap(containerId, lat, lng, config)
        })
      } else {
        this.createMap(containerId, lat, lng, config)
      }
    },

    loadGoogleMapsApi: function (apiKey, callback) {
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

    createMap: function (containerId, lat, lng, config) {
      const self = this
      const debugMode = window.checkoutConfig?.afdDebugMode || false
      const mapContainer = document.getElementById(containerId)

      if (!mapContainer) {
        console.error('[AFD PCE] Map container not found:', containerId)
        return
      }

      const latNum = parseFloat(lat)
      const lngNum = parseFloat(lng)

      if (isNaN(latNum) || isNaN(lngNum)) {
        console.error('[AFD PCE] Invalid coordinates:', lat, lng)
        return
      }

      const center = { lat: latNum, lng: lngNum }

      const mapOptions = {
        center: center,
        zoom: config.defaultZoom || 17,
        mapTypeId: config.defaultMapType || 'roadmap',
        disableDefaultUI: true,
        zoomControl: true,
        scrollwheel: true,
        draggable: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      }

      // Create map
      this.map = new google.maps.Map(mapContainer, mapOptions)

      // Marker options
      const markerOptions = {
        position: center,
        map: this.map,
        draggable: true,
        title: 'Delivery Location'
      }

      // Custom marker icon
      if (config.pointerImageUrl) {
        markerOptions.icon = {
          url: config.pointerImageUrl,
          scaledSize: new google.maps.Size(32, 32)
        }
      }

      // Create marker
      this.marker = new google.maps.Marker(markerOptions)

      // Handle marker drag
      this.marker.addListener('dragend', function () {
        self.onMarkerMoved(config)
      })

      // Handle map click
      this.map.addListener('click', function (event) {
        self.marker.setPosition(event.latLng)
        self.onMarkerMoved(config)
      })

      // Store initial map data so it's saved even if user doesn't move the pin
      this.updateMapDataInStore(lat, lng, 0, false)

      // Bind delivery notes change event
      this.bindDeliveryNotesChange()

      if (debugMode) {
        console.log('[AFD PCE] Precision Delivery map initialized')
      }
    },

    onMarkerMoved: function (config) {
      const position = this.marker.getPosition()
      const newLat = position.lat().toFixed(7)
      const newLng = position.lng().toFixed(7)

      // Calculate distance using Google's geometry library or fallback to Haversine
      let distance = 0
      const origLat = parseFloat(this.originalLat)
      const origLng = parseFloat(this.originalLng)
      const selLat = parseFloat(newLat)
      const selLng = parseFloat(newLng)

      if (window.google && window.google.maps && window.google.maps.geometry) {
        const original = new google.maps.LatLng(origLat, origLng)
        const selected = new google.maps.LatLng(selLat, selLng)
        distance = google.maps.geometry.spherical.computeDistanceBetween(
          original,
          selected
        )
      } else {
        // Fallback: Haversine formula for distance in meters
        distance = this.calculateHaversineDistance(
          origLat,
          origLng,
          selLat,
          selLng
        )
      }

      const isAdjusted = distance > 1

      // Check for warning threshold
      if (
        config.enableDistanceWarning &&
        config.triggerWarningStorefront &&
        !this.warningConfirmed
      ) {
        const threshold =
          this.urbanRural === 'rural'
            ? config.warningThresholdRural
            : config.warningThresholdUrban

        if (distance > threshold) {
          this.showDistanceWarning(config, distance, newLat, newLng)
          return
        }
      }

      // Update metadata store with map data
      this.updateMapDataInStore(newLat, newLng, distance, isAdjusted)
    },

    showDistanceWarning: function (config, distance, newLat, newLng) {
      const self = this
      const $container = $('#afd-precision-delivery-map-shipping-container')
      const $overlay = $container.find(
        '.afd-precision-delivery-warning-overlay'
      )
      const $message = $overlay.find('.warning-message')

      const warningMessage = (
        config.warningMessage ||
        'The distance selected on the map from the original search location is {distance}m, are you sure this is the correct delivery location?'
      ).replace('{distance}', Math.round(distance))

      $message.text(warningMessage)
      $overlay.show()

      // Bind button handlers
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
          self.updateMapDataInStore(newLat, newLng, distance, true)
        })
    },

    resetMarkerPosition: function () {
      if (this.marker && this.originalLat && this.originalLng) {
        const originalPosition = new google.maps.LatLng(
          parseFloat(this.originalLat),
          parseFloat(this.originalLng)
        )
        this.marker.setPosition(originalPosition)
        this.updateMapDataInStore(this.originalLat, this.originalLng, 0, false)
      }
    },

    updateMapDataInStore: function (
      selectedLat,
      selectedLng,
      distance,
      isAdjusted
    ) {
      const debugMode = window.checkoutConfig?.afdDebugMode || false

      // Get delivery notes from textarea if it exists
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

      // Get current metadata and add map_data
      const currentMetadata = metadataStore.get()
      let metadataObj = {}

      if (currentMetadata && currentMetadata !== '{}') {
        try {
          metadataObj = JSON.parse(currentMetadata)
        } catch (e) {
          console.error('[AFD PCE] Error parsing metadata:', e)
        }
      }

      metadataObj.map_data = mapData
      metadataStore.set(JSON.stringify(metadataObj))

      if (debugMode) {
        console.log('[AFD PCE] Updated map data in store:', mapData)
      }
    },

    // Bind delivery notes change event to update metadata
    bindDeliveryNotesChange: function () {
      const self = this
      $(document).on('change keyup', '.afd-delivery-notes-input', function () {
        // Re-update map data with new delivery notes
        if (self.marker) {
          const position = self.marker.getPosition()
          const lat = position.lat().toFixed(7)
          const lng = position.lng().toFixed(7)

          let distance = 0
          const origLat = parseFloat(self.originalLat)
          const origLng = parseFloat(self.originalLng)
          const selLat = parseFloat(lat)
          const selLng = parseFloat(lng)

          if (
            window.google &&
            window.google.maps &&
            window.google.maps.geometry
          ) {
            const original = new google.maps.LatLng(origLat, origLng)
            const selected = new google.maps.LatLng(selLat, selLng)
            distance = google.maps.geometry.spherical.computeDistanceBetween(
              original,
              selected
            )
          } else {
            distance = self.calculateHaversineDistance(
              origLat,
              origLng,
              selLat,
              selLng
            )
          }

          self.updateMapDataInStore(lat, lng, distance, distance > 1)
        }
      })
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
