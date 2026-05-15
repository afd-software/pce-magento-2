define([
  'jquery',
  'uiComponent',
  'ko',
  'Afd_Pce/js/checkout/metadata-store'
], function ($, Component, ko, metadataStore) {
  'use strict'

  return Component.extend({
    defaults: {
      template: 'Afd_Pce/checkout/precision-delivery-map',
      visible: ko.observable(false),
      mapLoaded: ko.observable(false),
      config: null,
      originalLat: null,
      originalLng: null,
      selectedLat: ko.observable(null),
      selectedLng: ko.observable(null),
      distanceFromAddress: ko.observable(0),
      urbanRural: ko.observable('urban'),
      isAdjusted: ko.observable(false),
      warningVisible: ko.observable(false),
      warningConfirmed: ko.observable(false),
      deliveryNotes: ko.observable('')
    },

    map: null,
    marker: null,
    googleMapsLoaded: false,

    initialize: function () {
      this._super()

      this.config = window.checkoutConfig?.afd?.precisionDelivery || {}

      if (!this.config.enabled) {
        return this
      }

      this.loadGoogleMapsApi()

      // Sync delivery notes changes to metadata store
      this.deliveryNotes.subscribe(() => {
        if (this.visible()) {
          this.updateMapData()
        }
      })

      return this
    },

    loadGoogleMapsApi: function () {
      const self = this

      if (window.google && window.google.maps) {
        self.googleMapsLoaded = true
        self.mapLoaded(true)
        return
      }

      if (!this.config.apiKey) {
        console.error('[AFD PCE] Google Maps API key not configured')
        return
      }

      // Check if script is already being loaded
      if (window.afdGoogleMapsLoading) {
        window.afdGoogleMapsCallbacks = window.afdGoogleMapsCallbacks || []
        window.afdGoogleMapsCallbacks.push(function () {
          self.googleMapsLoaded = true
          self.mapLoaded(true)
        })
        return
      }

      window.afdGoogleMapsLoading = true
      window.afdGoogleMapsCallbacks = []

      // Create callback function
      window.afdInitGoogleMaps = function () {
        self.googleMapsLoaded = true
        self.mapLoaded(true)

        // Call any queued callbacks
        if (window.afdGoogleMapsCallbacks) {
          window.afdGoogleMapsCallbacks.forEach(function (cb) {
            cb()
          })
        }
        window.afdGoogleMapsLoading = false
      }

      // Load Google Maps script
      const script = document.createElement('script')
      script.src =
        'https://maps.googleapis.com/maps/api/js?key=' +
        this.config.apiKey +
        '&libraries=geometry&callback=afdInitGoogleMaps'
      script.async = true
      script.defer = true
      document.head.appendChild(script)
    },

    showMap: function (lat, lng, urbanRuralCode) {
      const self = this

      if (!this.config.enabled) {
        return
      }

      this.originalLat = lat
      this.originalLng = lng
      this.selectedLat(lat)
      this.selectedLng(lng)
      this.distanceFromAddress(0)
      this.isAdjusted(false)
      this.warningConfirmed(false)

      // Determine urban/rural from PCE response
      if (urbanRuralCode) {
        const code = urbanRuralCode.toString().toLowerCase()
        this.urbanRural(code.includes('rural') ? 'rural' : 'urban')
      }

      this.visible(true)

      // Wait for Google Maps to load
      if (!this.googleMapsLoaded) {
        const checkLoaded = setInterval(function () {
          if (self.googleMapsLoaded) {
            clearInterval(checkLoaded)
            self.initializeMap()
          }
        }, 100)
      } else {
        this.initializeMap()
      }
    },

    initializeMap: function () {
      const self = this
      const mapContainer = document.getElementById(this.getMapContainerId())

      if (!mapContainer) {
        console.error('[AFD PCE] Map container not found')
        return
      }

      const lat = parseFloat(this.originalLat)
      const lng = parseFloat(this.originalLng)

      if (isNaN(lat) || isNaN(lng)) {
        console.error(
          '[AFD PCE] Invalid coordinates:',
          this.originalLat,
          this.originalLng
        )
        return
      }

      const center = { lat: lat, lng: lng }

      // Map options - locked down to only zoom and pan
      const mapOptions = {
        center: center,
        zoom: this.config.defaultZoom || 17,
        mapTypeId: this.config.defaultMapType || 'roadmap',
        disableDefaultUI: true,
        zoomControl: true,
        scrollwheel: true,
        draggable: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        rotateControl: false
      }

      // Create or update map
      if (!this.map) {
        this.map = new google.maps.Map(mapContainer, mapOptions)
      } else {
        this.map.setCenter(center)
        this.map.setZoom(mapOptions.zoom)
      }

      // Marker options
      const markerOptions = {
        position: center,
        map: this.map,
        draggable: true,
        title: 'Delivery Location'
      }

      // Custom marker icon if configured
      if (this.config.pointerImageUrl) {
        markerOptions.icon = {
          url: this.config.pointerImageUrl,
          scaledSize: new google.maps.Size(32, 32)
        }
      }

      // Create or update marker
      if (this.marker) {
        this.marker.setPosition(center)
        this.marker.setMap(this.map)
      } else {
        this.marker = new google.maps.Marker(markerOptions)

        // Handle marker drag end
        this.marker.addListener('dragend', function () {
          self.onMarkerDragEnd()
        })
      }

      // Also allow clicking on map to move marker
      this.map.addListener('click', function (event) {
        self.marker.setPosition(event.latLng)
        self.onMarkerDragEnd()
      })

      // Store initial map data so it's saved even if user doesn't move the pin
      this.updateMapData()
    },

    onMarkerDragEnd: function () {
      const position = this.marker.getPosition()
      const newLat = position.lat().toFixed(7)
      const newLng = position.lng().toFixed(7)

      this.selectedLat(newLat)
      this.selectedLng(newLng)

      // Calculate distance from original position
      if (this.config.enableDistance) {
        const distance = this.calculateDistance(
          parseFloat(this.originalLat),
          parseFloat(this.originalLng),
          parseFloat(newLat),
          parseFloat(newLng)
        )
        this.distanceFromAddress(Math.round(distance))
        this.isAdjusted(distance > 1) // Consider adjusted if moved more than 1 meter
      }

      // Update the map data in metadata store
      this.updateMapData()
    },

    calculateDistance: function (lat1, lng1, lat2, lng2) {
      // Use Google Maps geometry library if available
      if (window.google && window.google.maps && window.google.maps.geometry) {
        const point1 = new google.maps.LatLng(lat1, lng1)
        const point2 = new google.maps.LatLng(lat2, lng2)
        return google.maps.geometry.spherical.computeDistanceBetween(
          point1,
          point2
        )
      }

      // Fallback: Haversine formula
      const R = 6371000 // Earth's radius in meters
      const dLat = this.toRad(lat2 - lat1)
      const dLng = this.toRad(lng2 - lng1)
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.toRad(lat1)) *
          Math.cos(this.toRad(lat2)) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      return R * c
    },

    toRad: function (deg) {
      return deg * (Math.PI / 180)
    },

    updateMapData: function () {
      const debugMode = window.checkoutConfig?.afdDebugMode || false
      const deliveryNotesValue = this.deliveryNotes()

      if (debugMode) {
        console.log(
          '[AFD PCE] updateMapData called, deliveryNotes value:',
          deliveryNotesValue
        )
      }

      const mapData = {
        original_lat: this.originalLat,
        original_lng: this.originalLng,
        selected_lat: this.selectedLat(),
        selected_lng: this.selectedLng(),
        distance_from_address: this.distanceFromAddress(),
        urban_rural: this.urbanRural(),
        is_adjusted: this.isAdjusted(),
        delivery_notes: deliveryNotesValue || ''
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
        console.log('[AFD PCE] Updated map data:', mapData)
        console.log(
          '[AFD PCE] Metadata store now contains:',
          metadataStore.get()
        )
      }
    },

    getMapData: function () {
      return {
        original_lat: this.originalLat,
        original_lng: this.originalLng,
        selected_lat: this.selectedLat(),
        selected_lng: this.selectedLng(),
        distance_from_address: this.distanceFromAddress(),
        urban_rural: this.urbanRural(),
        is_adjusted: this.isAdjusted(),
        delivery_notes: this.deliveryNotes() || ''
      }
    },

    hideMap: function () {
      this.visible(false)
    },

    getMapContainerId: function () {
      return 'afd-precision-delivery-map-' + this.uid
    },

    getInstructionText: function () {
      return (
        this.config.instructionText ||
        'To specify a delivery location please click on the map and drag the pointer to the exact location you would like the parcel to be delivered to.'
      )
    },

    getDeliveryNotesPlaceholder: function () {
      return (
        this.config.deliveryNotesPlaceholder ||
        'Any specific delivery information?'
      )
    },

    validateDistance: function () {
      if (
        !this.config.enableDistanceWarning ||
        !this.config.triggerWarningStorefront
      ) {
        return true
      }

      if (this.warningConfirmed()) {
        return true
      }

      const distance = this.distanceFromAddress()
      const threshold =
        this.urbanRural() === 'rural'
          ? this.config.warningThresholdRural
          : this.config.warningThresholdUrban

      if (distance > threshold) {
        this.warningVisible(true)
        return false
      }

      return true
    },

    getWarningMessage: function () {
      const message =
        this.config.warningMessage ||
        'The distance selected on the map from the original search location is {distance}m, are you sure this is the correct delivery location?'
      return message.replace('{distance}', this.distanceFromAddress())
    },

    confirmWarning: function () {
      this.warningConfirmed(true)
      this.warningVisible(false)
    },

    cancelWarning: function () {
      this.warningVisible(false)
      // Reset marker to original position
      if (this.marker && this.originalLat && this.originalLng) {
        const originalPosition = new google.maps.LatLng(
          parseFloat(this.originalLat),
          parseFloat(this.originalLng)
        )
        this.marker.setPosition(originalPosition)
        this.selectedLat(this.originalLat)
        this.selectedLng(this.originalLng)
        this.distanceFromAddress(0)
        this.isAdjusted(false)
        this.updateMapData()
      }
    },

    setFromSavedAddress: function (mapData) {
      if (!mapData) {
        return
      }

      // If we have saved map data, use it
      if (mapData.selected_lat && mapData.selected_lng) {
        this.showMap(
          mapData.original_lat || mapData.selected_lat,
          mapData.original_lng || mapData.selected_lng,
          mapData.urban_rural
        )

        // If the selected position differs from original, update marker
        if (
          mapData.selected_lat !== mapData.original_lat ||
          mapData.selected_lng !== mapData.original_lng
        ) {
          const self = this
          setTimeout(function () {
            if (self.marker) {
              const selectedPosition = new google.maps.LatLng(
                parseFloat(mapData.selected_lat),
                parseFloat(mapData.selected_lng)
              )
              self.marker.setPosition(selectedPosition)
              self.selectedLat(mapData.selected_lat)
              self.selectedLng(mapData.selected_lng)
              self.distanceFromAddress(mapData.distance_from_address || 0)
              self.isAdjusted(mapData.is_adjusted || false)
              self.updateMapData()
            }
          }, 500)
        }
      }
    },

    setFromMetadata: function (lat, lng, urbanRuralCode) {
      // Use lat/lng from metadata if no map data exists
      if (lat && lng) {
        this.showMap(lat, lng, urbanRuralCode)
      }
    }
  })
})
