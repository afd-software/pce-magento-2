/**
 * AFD PCE Cleanse on Submit Module
 *
 * Provides address cleansing functionality when submitting forms with unvalidated addresses.
 * Shows a modal with side-by-side comparison of user's address vs suggested address.
 */
define(['jquery', 'Magento_Ui/js/modal/modal'], function ($, modal) {
  'use strict'

  return {
    config: null,
    currentModal: null,

    /**
     * Initialize the cleanse on submit module
     *
     * @param {Object} config - Configuration from checkoutConfig.afd.cleanseOnSubmit
     */
    init: function (config) {
      this.config = config
    },

    /**
     * Check if cleanse on submit is enabled
     *
     * @returns {boolean}
     */
    isEnabled: function () {
      return this.config && this.config.enabled
    },

    /**
     * Check if enabled for checkout shipping
     *
     * @returns {boolean}
     */
    isEnabledForShipping: function () {
      return this.isEnabled() && this.config.checkoutShipping
    },

    /**
     * Check if enabled for checkout billing
     *
     * @returns {boolean}
     */
    isEnabledForBilling: function () {
      return this.isEnabled() && this.config.checkoutBilling
    },

    /**
     * Check if enabled for customer account
     *
     * @returns {boolean}
     */
    isEnabledForCustomerAccount: function () {
      return this.isEnabled() && this.config.customerAccount
    },

    /**
     * Build the Refiner API URL with address parameters
     *
     * @param {Object} address - Address object with street, city, postcode, etc.
     * @returns {string}
     */
    buildRefinerUrl: function (address) {
      const config = this.config
      const params = new URLSearchParams()

      params.append('format', 'json')

      // Add authentication
      if (config.authMethod === 'serial') {
        params.append('serial', config.serial)
        params.append('password', config.password)
      } else {
        params.append('id', config.id)
        params.append('token', config.token)
      }

      // Add address fields
      let addressIndex = 1
      if (address.street && address.street.length > 0) {
        address.street.forEach(function (line) {
          if (line && line.trim()) {
            params.append('address' + addressIndex, line.trim())
            addressIndex++
          }
        })
      }

      if (address.city) {
        params.append('address' + addressIndex, address.city)
        addressIndex++
      }

      if (address.region) {
        params.append('address' + addressIndex, address.region)
        addressIndex++
      }

      if (address.postcode) {
        params.append('address' + addressIndex, address.postcode)
      }

      // Specify fields to return
      params.append(
        'fields',
        'Property@Street@Locality@Town@PostalCounty@Postcode'
      )

      return config.refinerUrl + '?' + params.toString()
    },

    /**
     * Call the Refiner API to cleanse an address
     *
     * @param {Object} address - Address object
     * @returns {Promise<Object>} - Promise resolving to API response
     */
    cleanseAddress: function (address) {
      const url = this.buildRefinerUrl(address)

      return new Promise(function (resolve, reject) {
        $.ajax({
          url: url,
          type: 'GET',
          dataType: 'json',
          success: function (response) {
            resolve(response)
          },
          error: function (xhr, status, error) {
            console.error('[AFD PCE Cleanse] API error:', error)
            reject(error)
          }
        })
      })
    },

    /**
     * Format address object for display
     *
     * @param {Object} address - Address object
     * @returns {string} - Formatted address HTML
     */
    formatAddressForDisplay: function (address) {
      const lines = []

      if (address.street && address.street.length > 0) {
        address.street.forEach(function (line) {
          if (line && line.trim()) {
            lines.push(line.trim())
          }
        })
      }

      if (address.city) {
        lines.push(address.city)
      }

      if (address.region) {
        lines.push(address.region)
      }

      if (address.postcode) {
        lines.push(address.postcode)
      }

      return lines.join('<br>')
    },

    /**
     * Format API response address for display
     *
     * @param {Object} response - API response object
     * @returns {string} - Formatted address HTML
     */
    formatSuggestedAddressForDisplay: function (response) {
      const lines = []

      if (response.Property) {
        lines.push(response.Property)
      }

      if (response.Street) {
        lines.push(response.Street)
      }

      if (response.Locality) {
        lines.push(response.Locality)
      }

      if (response.Town) {
        lines.push(response.Town)
      }

      if (response.PostalCounty) {
        lines.push(response.PostalCounty)
      }

      if (response.Postcode) {
        lines.push(response.Postcode)
      }

      return lines.join('<br>')
    },

    /**
     * Convert API response to address object format
     *
     * @param {Object} response - API response
     * @returns {Object} - Address object
     */
    convertResponseToAddress: function (response) {
      const street = []

      if (response.Property) {
        street.push(response.Property)
      }

      if (response.Street) {
        if (street.length > 0) {
          street[0] = street[0] + ' ' + response.Street
        } else {
          street.push(response.Street)
        }
      }

      if (response.Locality) {
        street.push(response.Locality)
      }

      return {
        street: street,
        city: response.Town || '',
        region: response.PostalCounty || '',
        postcode: response.Postcode || ''
      }
    },

    /**
     * Create the modal HTML content
     *
     * @param {Object} userAddress - User's entered address
     * @param {Object} suggestedAddress - Suggested address from API
     * @returns {string} - Modal HTML content
     */
    createModalContent: function (userAddress, suggestedAddress) {
      const config = this.config

      return (
        '<div class="afd-cleanse-modal">' +
        '<p class="afd-cleanse-message">' +
        config.modalMessage +
        '</p>' +
        '<div class="afd-cleanse-comparison">' +
        '<div class="afd-cleanse-address afd-cleanse-user-address">' +
        '<h4>' +
        config.yourAddressLabel +
        '</h4>' +
        '<div class="afd-cleanse-address-content">' +
        this.formatAddressForDisplay(userAddress) +
        '</div>' +
        '<button type="button" class="action secondary afd-cleanse-reject">' +
        config.rejectButtonText +
        '</button>' +
        '</div>' +
        '<div class="afd-cleanse-address afd-cleanse-suggested-address">' +
        '<h4>' +
        config.suggestedAddressLabel +
        '</h4>' +
        '<div class="afd-cleanse-address-content">' +
        this.formatSuggestedAddressForDisplay(suggestedAddress) +
        '</div>' +
        '<button type="button" class="action primary afd-cleanse-accept">' +
        config.acceptButtonText +
        '</button>' +
        '</div>' +
        '</div>' +
        '</div>'
      )
    },

    /**
     * Show the cleanse modal with side-by-side comparison
     *
     * @param {Object} userAddress - User's entered address
     * @param {Object} suggestedAddress - Suggested address from API
     * @returns {Promise<Object|null>} - Promise resolving to selected address or null if rejected
     */
    showModal: function (userAddress, suggestedAddress) {
      const self = this
      const config = this.config

      return new Promise(function (resolve) {
        const $modalContent = $(
          '<div id="afd-cleanse-modal-content"></div>'
        ).html(self.createModalContent(userAddress, suggestedAddress))

        const modalOptions = {
          type: 'popup',
          responsive: true,
          innerScroll: true,
          title: config.modalTitle,
          modalClass: 'afd-cleanse-modal-wrapper',
          buttons: [],
          dismissible: false,
          clickableOverlay: false,
          closed: function () {
            $modalContent.remove()
          }
        }

        const modalInstance = modal(modalOptions, $modalContent)
        self.currentModal = modalInstance

        // Bind button events
        $modalContent.find('.afd-cleanse-accept').on('click', function () {
          modalInstance.closeModal()
          resolve(self.convertResponseToAddress(suggestedAddress))
        })

        $modalContent.find('.afd-cleanse-reject').on('click', function () {
          modalInstance.closeModal()
          resolve(null)
        })

        modalInstance.openModal()
      })
    },

    /**
     * Process cleanse for an address
     * Returns the selected address (suggested or original) or null to continue with original
     *
     * @param {Object} address - Address object to cleanse
     * @returns {Promise<Object|null>} - Promise resolving to address to use
     */
    processCleanse: function (address) {
      const self = this

      return this.cleanseAddress(address)
        .then(function (response) {
          // Check if we got a valid suggestion
          // ResultCode 100 means exact match (no changes needed)
          // ResultCode > 0 means we have a suggestion
          if (
            response.ResultCode === 100 ||
            response.ResultCode === undefined
          ) {
            // Address is already valid, no modal needed
            return null
          }

          if (response.ResultCode > 0 && response.Postcode) {
            // We have a suggestion, show the modal
            return self.showModal(address, response)
          }

          // No valid suggestion found - continue silently
          return null
        })
        .catch(function (error) {
          console.error('[AFD PCE Cleanse] Error processing cleanse:', error)
          // On error, allow user to continue
          return null
        })
    }
  }
})
