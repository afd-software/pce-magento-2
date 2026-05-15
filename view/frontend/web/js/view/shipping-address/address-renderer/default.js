/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
  'jquery',
  'ko',
  'Magento_Checkout/js/view/shipping-address/address-renderer/default', // original component extended by afd
  'Magento_Checkout/js/action/select-shipping-address',
  'Magento_Checkout/js/model/quote',
  'Magento_Checkout/js/model/shipping-address/form-popup-state',
  'Magento_Checkout/js/checkout-data',
  'Magento_Customer/js/customer-data',
  'Afd_Pce/js/checkout/metadata-store'
], function (
  $,
  ko,
  Component,
  selectShippingAddressAction,
  quote,
  formPopUpState,
  checkoutData,
  customerData,
  metadataStore
) {
  'use strict'

  var countryData = customerData.get('directory-data')

  return Component.extend({
    defaults: {
      template: 'Afd_Pce/shipping-address/address-renderer/default'
    },

    /** @inheritdoc */
    initObservable: function () {
      this._super()
      this.isSelected = ko.computed(function () {
        var isSelected = false,
          shippingAddress = quote.shippingAddress()

        if (shippingAddress) {
          isSelected = shippingAddress.getKey() == this.address().getKey()
        }

        return isSelected
      }, this)

      return this
    },

    /**
     * @param {String} countryId
     * @return {String}
     */
    getCountryName: function (countryId) {
      return countryData()[countryId] != undefined
        ? countryData()[countryId].name
        : ''
    },

    /** Set selected customer shipping address  */
    selectAddress: function () {
      selectShippingAddressAction(this.address())
      checkoutData.setSelectedShippingAddress(this.address().getKey())
    },

    /**
     * Edit address.
     */
    editAddress: function () {
      formPopUpState.isVisible(true)
      this.showPopup()
    },

    /**
     * Show popup.
     */
    showPopup: function () {
      $('[data-open-modal="opc-new-shipping-address"]').trigger('click')
    },

    /**
     * Check if precision delivery is enabled
     * @return {Boolean}
     */
    isPrecisionDeliveryEnabled: function () {
      var config = window.checkoutConfig?.afd?.precisionDelivery
      return config && config.enabled
    },

    /**
     * Get map data for this address
     * @return {Object|null}
     */
    getMapData: function () {
      var address = this.address()
      var addressId = address.customerAddressId

      if (addressId) {
        // Saved address - check checkout config
        var mapDataStore =
          window.checkoutConfig?.afd?.customerAddressMapData || {}
        return mapDataStore[addressId] || null
      }

      // New address (no customerAddressId) - check metadataStore
      var storedData = metadataStore.get()
      if (storedData && storedData !== '{}') {
        try {
          var parsed = JSON.parse(storedData)
          if (parsed.map_data) {
            return parsed.map_data
          }
        } catch (_e) {
          // Ignore parse errors
        }
      }

      return null
    },

    /**
     * Get metadata lat/lng for this address (fallback)
     * @return {Object|null}
     */
    getMetadataLatLng: function () {
      var address = this.address()
      var addressId = address.customerAddressId
      var metadata = null

      if (addressId) {
        // Saved address - check checkout config
        var configMetadataStore =
          window.checkoutConfig?.afd?.customerAddressMetadata || {}
        metadata = configMetadataStore[addressId]
      } else {
        // New address - check metadataStore for metadata
        var storedData = metadataStore.get()
        if (storedData && storedData !== '{}') {
          try {
            var parsed = JSON.parse(storedData)
            if (parsed.metadata) {
              metadata =
                typeof parsed.metadata === 'string'
                  ? JSON.parse(parsed.metadata)
                  : parsed.metadata
            }
          } catch (_e) {
            // Ignore parse errors
          }
        }
      }

      if (!metadata) {
        return null
      }

      // Parse metadata if it's a string
      if (typeof metadata === 'string') {
        try {
          metadata = JSON.parse(metadata)
        } catch (e) {
          console.log(e)
          return null
        }
      }

      // Look for Latitude/Longitude in metadata
      var lat = metadata.Latitude || metadata.latitude
      var lng = metadata.Longitude || metadata.longitude

      if (lat && lng) {
        return { lat: lat, lng: lng }
      }

      return null
    },

    /**
     * Check if address has precision delivery data
     * @return {Boolean}
     */
    hasPrecisionDeliveryData: function () {
      return this.getMapData() !== null || this.getMetadataLatLng() !== null
    },

    /**
     * Get static map URL for this address
     * @return {String|null}
     */
    getStaticMapUrl: function () {
      if (!this.isPrecisionDeliveryEnabled()) {
        return null
      }

      var config = window.checkoutConfig?.afd?.precisionDelivery
      var mapData = this.getMapData()
      var lat, lng

      if (mapData) {
        // Use selected coordinates from map data
        lat = mapData.selected_lat || mapData.original_lat
        lng = mapData.selected_lng || mapData.original_lng
      } else {
        // Fallback to metadata lat/lng
        var metadataLatLng = this.getMetadataLatLng()
        if (metadataLatLng) {
          lat = metadataLatLng.lat
          lng = metadataLatLng.lng
        }
      }

      if (!lat || !lng) {
        return null
      }

      // Build static map URL
      var apiKey = config.apiKey
      var zoom = config.defaultZoom || 17
      var mapType = config.defaultMapType || 'roadmap'
      var width = 200
      var height = 150

      var url =
        'https://maps.googleapis.com/maps/api/staticmap?' +
        'center=' +
        lat +
        ',' +
        lng +
        '&zoom=' +
        zoom +
        '&size=' +
        width +
        'x' +
        height +
        '&maptype=' +
        mapType +
        '&markers=color:red%7C' +
        lat +
        ',' +
        lng +
        '&key=' +
        apiKey

      return url
    },

    /**
     * Get delivery notes for this address
     * @return {String|null}
     */
    getDeliveryNotes: function () {
      var mapData = this.getMapData()
      return mapData ? mapData.delivery_notes : null
    },

    /**
     * Open precision delivery modal to add/edit delivery data
     */
    openPrecisionDeliveryModal: function () {
      var address = this.address()
      var config = window.checkoutConfig?.afd?.precisionDelivery

      if (!config || !config.enabled) {
        return
      }

      // Build address string for geocoding
      var addressString = this.buildAddressString(address)

      // Create and show modal
      this.showPrecisionDeliveryModal(address, addressString, config)
    },

    /**
     * Build address string from address object
     * @param {Object} address
     * @return {String}
     */
    buildAddressString: function (address) {
      var parts = []

      if (address.street && address.street.length) {
        parts = parts.concat(
          address.street.filter(function (s) {
            return s
          })
        )
      }
      if (address.city) {
        parts.push(address.city)
      }
      if (address.postcode) {
        parts.push(address.postcode)
      }
      if (address.countryId) {
        parts.push(address.countryId)
      }

      return parts.join(', ')
    },

    /**
     * Show precision delivery modal
     * @param {Object} address
     * @param {String} addressString
     * @param {Object} config
     */
    showPrecisionDeliveryModal: function (address, addressString, config) {
      var self = this
      var modalId = 'afd-precision-delivery-modal-' + address.customerAddressId
      var $existingModal = $('#' + modalId)

      // Remove existing modal if any
      if ($existingModal.length) {
        $existingModal.remove()
      }

      // Create modal HTML
      var modalHtml = this.createPrecisionDeliveryModalHtml(modalId, config)
      $('body').append(modalHtml)

      var $modal = $('#' + modalId)

      // Initialize modal
      $modal.modal({
        modalClass: 'afd-precision-delivery-modal-wrapper',
        buttons: []
      })

      // Open modal
      $modal.modal('openModal')

      // Geocode the address using AFD/PCE
      this.geocodeAddress(
        addressString,
        config,
        function (lat, lng, urbanRuralCode) {
          if (lat && lng) {
            self.initModalMap(
              modalId,
              lat,
              lng,
              urbanRuralCode,
              config,
              address
            )
          } else {
            // Show error message
            $('#' + modalId + ' .afd-precision-modal-loading').html(
              '<p class="error">' +
                $.mage.__('Could not geocode address. Please try again.') +
                '</p>'
            )
          }
        }
      )
    },

    /**
     * Create precision delivery modal HTML
     * @param {String} modalId
     * @param {Object} config
     * @return {String}
     */
    createPrecisionDeliveryModalHtml: function (modalId, config) {
      var deliveryNotesHtml = config.enableDeliveryNotes
        ? '<div class="afd-precision-delivery-notes">' +
          '<label class="label" for="' +
          modalId +
          '-notes">' +
          $.mage.__('Delivery Instructions') +
          '</label>' +
          '<textarea id="' +
          modalId +
          '-notes" ' +
          'class="input-text afd-delivery-notes-input" ' +
          'placeholder="' +
          (config.deliveryNotesPlaceholder ||
            $.mage.__('Any specific delivery information?')) +
          '" ' +
          'rows="3" maxlength="500"></textarea>' +
          '</div>'
        : ''

      return (
        '<div id="' +
        modalId +
        '" class="afd-precision-delivery-modal" style="display:none;">' +
        '<div class="afd-precision-modal-header">' +
        '<h3>' +
        $.mage.__('Set Precise Delivery Location') +
        '</h3>' +
        '<p class="afd-precision-modal-instructions">' +
        (config.instructionText ||
          $.mage.__(
            'Click on the map to set your precise delivery location.'
          )) +
        '</p>' +
        '</div>' +
        '<div class="afd-precision-modal-loading">' +
        '<p>' +
        $.mage.__('Loading map...') +
        '</p>' +
        '</div>' +
        '<div class="afd-precision-modal-map-container" style="display:none;">' +
        '<div id="' +
        modalId +
        '-map" class="afd-precision-delivery-map" style="width:100%;height:300px;"></div>' +
        deliveryNotesHtml +
        '<div class="afd-precision-modal-actions">' +
        '<button type="button" class="action secondary afd-precision-cancel">' +
        $.mage.__('Cancel') +
        '</button>' +
        '<button type="button" class="action primary afd-precision-save">' +
        $.mage.__('Save Location') +
        '</button>' +
        '</div>' +
        '</div>' +
        '</div>'
      )
    },

    /**
     * Geocode address using AFD/PCE API
     * @param {String} addressString
     * @param {Object} config
     * @param {Function} callback
     */
    geocodeAddress: function (addressString, config, callback) {
      // Use Google Maps Geocoding API as fallback
      if (window.google && window.google.maps && window.google.maps.Geocoder) {
        var geocoder = new google.maps.Geocoder()
        geocoder.geocode(
          { address: addressString },
          function (results, status) {
            if (status === 'OK' && results[0]) {
              var location = results[0].geometry.location
              callback(location.lat(), location.lng(), null)
            } else {
              callback(null, null, null)
            }
          }
        )
      } else {
        // Load Google Maps API first
        this.loadGoogleMapsApi(config.apiKey, function () {
          var geocoder = new google.maps.Geocoder()
          geocoder.geocode(
            { address: addressString },
            function (results, status) {
              if (status === 'OK' && results[0]) {
                var location = results[0].geometry.location
                callback(location.lat(), location.lng(), null)
              } else {
                callback(null, null, null)
              }
            }
          )
        })
      }
    },

    /**
     * Load Google Maps API
     * @param {String} apiKey
     * @param {Function} callback
     */
    loadGoogleMapsApi: function (apiKey, callback) {
      if (window.google && window.google.maps) {
        callback()
        return
      }

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

      var script = document.createElement('script')
      script.src =
        'https://maps.googleapis.com/maps/api/js?key=' +
        apiKey +
        '&libraries=geometry&callback=afdInitGoogleMaps'
      script.async = true
      script.defer = true
      document.head.appendChild(script)
    },

    /**
     * Initialize map in modal
     * @param {String} modalId
     * @param {Number} lat
     * @param {Number} lng
     * @param {String} urbanRuralCode
     * @param {Object} config
     * @param {Object} address
     */
    initModalMap: function (
      modalId,
      lat,
      lng,
      urbanRuralCode,
      config,
      address
    ) {
      var self = this
      var $modal = $('#' + modalId)
      var mapContainerId = modalId + '-map'

      // Hide loading, show map container
      $modal.find('.afd-precision-modal-loading').hide()
      $modal.find('.afd-precision-modal-map-container').show()

      var mapContainer = document.getElementById(mapContainerId)
      if (!mapContainer) {
        return
      }

      var center = { lat: parseFloat(lat), lng: parseFloat(lng) }

      var mapOptions = {
        center: center,
        zoom: config.defaultZoom || 17,
        mapTypeId: config.defaultMapType || 'roadmap',
        disableDefaultUI: true,
        zoomControl: true,
        scrollwheel: true,
        draggable: true
      }

      var map = new google.maps.Map(mapContainer, mapOptions)

      var markerOptions = {
        position: center,
        map: map,
        draggable: true,
        title: $.mage.__('Delivery Location')
      }

      if (config.pointerImageUrl) {
        markerOptions.icon = {
          url: config.pointerImageUrl,
          scaledSize: new google.maps.Size(32, 32)
        }
      }

      var marker = new google.maps.Marker(markerOptions)

      // Store original position
      var originalLat = lat
      var originalLng = lng
      var selectedLat = lat
      var selectedLng = lng

      // Handle marker drag
      marker.addListener('dragend', function () {
        var pos = marker.getPosition()
        selectedLat = pos.lat()
        selectedLng = pos.lng()
      })

      // Handle map click
      map.addListener('click', function (event) {
        marker.setPosition(event.latLng)
        selectedLat = event.latLng.lat()
        selectedLng = event.latLng.lng()
      })

      // Bind cancel button
      $modal
        .find('.afd-precision-cancel')
        .off('click')
        .on('click', function () {
          $modal.modal('closeModal')
        })

      // Bind save button
      $modal
        .find('.afd-precision-save')
        .off('click')
        .on('click', function () {
          var deliveryNotes =
            $modal.find('.afd-delivery-notes-input').val() || ''
          var distance = 0

          if (window.google && window.google.maps.geometry) {
            var original = new google.maps.LatLng(
              parseFloat(originalLat),
              parseFloat(originalLng)
            )
            var selected = new google.maps.LatLng(
              parseFloat(selectedLat),
              parseFloat(selectedLng)
            )
            distance = google.maps.geometry.spherical.computeDistanceBetween(
              original,
              selected
            )
          }

          var mapData = {
            original_lat: originalLat,
            original_lng: originalLng,
            selected_lat: selectedLat,
            selected_lng: selectedLng,
            distance_from_address: Math.round(distance),
            urban_rural: urbanRuralCode || 'urban',
            is_adjusted: distance > 1,
            delivery_notes: deliveryNotes
          }

          self.savePrecisionDeliveryData(
            address.customerAddressId,
            mapData,
            function (success) {
              if (success) {
                $modal.modal('closeModal')
                // Reload checkout to refresh address display
                location.reload()
              } else {
                alert(
                  $.mage.__(
                    'Failed to save delivery location. Please try again.'
                  )
                )
              }
            }
          )
        })
    },

    /**
     * Save precision delivery data via AJAX
     * @param {Number} addressId
     * @param {Object} mapData
     * @param {Function} callback
     */
    savePrecisionDeliveryData: function (addressId, mapData, callback) {
      $.ajax({
        url: '/rest/V1/afd-pce/customer-address-map-data',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          addressId: addressId,
          mapData: mapData
        }),
        success: function () {
          callback(true)
        },
        error: function (xhr, status, error) {
          console.error(
            '[AFD PCE] Error saving precision delivery data:',
            error
          )
          callback(false)
        }
      })
    }
  })
})
