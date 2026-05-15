/**
 * AFD PCE Cleanse on Submit for Customer Address Forms
 *
 * Intercepts customer address form submission to validate and cleanse
 * addresses that haven't been validated via typeahead.
 */
define(['jquery', 'Magento_Ui/js/modal/modal'], function ($, modal) {
  'use strict'

  return function (config) {
    const cleanseConfig = config.cleanseOnSubmit

    if (
      !cleanseConfig ||
      !cleanseConfig.enabled ||
      !cleanseConfig.customerAccount
    ) {
      return
    }

    const $form = $('form.form-address-edit')
    if (!$form.length) {
      return
    }

    let isSubmitting = false
    let cleanseCompleted = false
    const formElement = $form[0]
    const originalSubmit = formElement.submit.bind(formElement)

    setupFieldChangeListeners()

    $(document).on('afd:pceRetrieveComplete', function () {
      setupFieldChangeListeners()
    })

    /**
     * Extract address from form fields
     */
    function extractAddressFromForm() {
      const street = []
      $form.find('[name^="street["]').each(function () {
        const val = $(this).val()
        if (val && val.trim()) {
          street.push(val.trim())
        }
      })

      return {
        street: street,
        city: $form.find('[name="city"]').val() || '',
        region: $form.find('[name="region"]').val() || '',
        postcode: $form.find('[name="postcode"]').val() || ''
      }
    }

    /**
     * Check if address has been validated via typeahead
     */
    function isAddressValidated() {
      const metadataField = $('#customer-address-metadata')
      if (!metadataField.length) {
        return false
      }

      try {
        const metadata = JSON.parse(metadataField.val())
        return metadata && metadata.is_validated === true
      } catch (e) {
        console.log(e)
        return false
      }
    }

    /**
     * Clear validated state when address fields are manually edited
     */
    function setupFieldChangeListeners() {
      const fieldsToWatch = [
        '[name^="street["]',
        '[name="city"]',
        '[name="postcode"]',
        '[name="region"]',
        '[name="region_id"]'
      ]

      fieldsToWatch.forEach(function (selector) {
        $form
          .find(selector)
          .one('input.afdvalidation change.afdvalidation', function () {
            const metadataField = $('#customer-address-metadata')
            if (!metadataField.length) return

            try {
              const metadata = JSON.parse(metadataField.val() || '{}')
              if (metadata.is_validated === true) {
                metadata.is_validated = false
                metadataField.val(JSON.stringify(metadata))
              }
            } catch (_e) {
              // ignore parse errors
            }
          })
      })
    }

    /**
     * Build Refiner API URL
     */
    function buildRefinerUrl(address) {
      const params = new URLSearchParams()
      params.append('format', 'json')

      if (cleanseConfig.authMethod === 'serial') {
        params.append('serial', cleanseConfig.serial)
        params.append('password', cleanseConfig.password)
      } else {
        params.append('id', cleanseConfig.id)
        params.append('token', cleanseConfig.token)
      }

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

      params.append(
        'fields',
        'Property@Street@Locality@Town@PostalCounty@Postcode'
      )

      return cleanseConfig.refinerUrl + '?' + params.toString()
    }

    /**
     * Call Refiner API
     */
    function cleanseAddress(address) {
      return new Promise(function (resolve, reject) {
        $.ajax({
          url: buildRefinerUrl(address),
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
    }

    /**
     * Format address for display
     */
    function formatAddressForDisplay(address) {
      const lines = []
      if (address.street && address.street.length > 0) {
        address.street.forEach(function (line) {
          if (line && line.trim()) {
            lines.push(line.trim())
          }
        })
      }
      if (address.city) lines.push(address.city)
      if (address.region) lines.push(address.region)
      if (address.postcode) lines.push(address.postcode)
      return lines.join('<br>')
    }

    /**
     * Format suggested address for display
     */
    function formatSuggestedAddressForDisplay(response) {
      const lines = []
      if (response.Property) lines.push(response.Property)
      if (response.Street) lines.push(response.Street)
      if (response.Locality) lines.push(response.Locality)
      if (response.Town) lines.push(response.Town)
      if (response.PostalCounty) lines.push(response.PostalCounty)
      if (response.Postcode) lines.push(response.Postcode)
      return lines.join('<br>')
    }

    /**
     * Apply cleansed address to form
     */
    function applyCleanedAddress(response) {
      const $street1 = $form.find('#street_1')
      const $street2 = $form.find('#street_2')
      const $city = $form.find('#city')
      const $region = $form.find('#region')
      const $postcode = $form.find('#zip')

      let streetLine1 = ''
      if (response.Property) {
        streetLine1 = response.Property
      }
      if (response.Street) {
        streetLine1 = streetLine1
          ? streetLine1 + ' ' + response.Street
          : response.Street
      }
      if (streetLine1) $street1.val(streetLine1)

      if (response.Locality && $street2.length) {
        $street2.val(response.Locality)
      }

      if (response.Town) $city.val(response.Town)
      if (response.PostalCounty) $region.val(response.PostalCounty)
      if (response.Postcode) $postcode.val(response.Postcode)
    }

    /**
     * Create modal content
     */
    function createModalContent(userAddress, suggestedAddress) {
      return (
        '<div class="afd-cleanse-modal">' +
        '<p class="afd-cleanse-message">' +
        cleanseConfig.modalMessage +
        '</p>' +
        '<div class="afd-cleanse-comparison">' +
        '<div class="afd-cleanse-address afd-cleanse-user-address">' +
        '<h4>' +
        cleanseConfig.yourAddressLabel +
        '</h4>' +
        '<div class="afd-cleanse-address-content">' +
        formatAddressForDisplay(userAddress) +
        '</div>' +
        '<button type="button" class="action secondary afd-cleanse-reject">' +
        cleanseConfig.rejectButtonText +
        '</button>' +
        '</div>' +
        '<div class="afd-cleanse-address afd-cleanse-suggested-address">' +
        '<h4>' +
        cleanseConfig.suggestedAddressLabel +
        '</h4>' +
        '<div class="afd-cleanse-address-content">' +
        formatSuggestedAddressForDisplay(suggestedAddress) +
        '</div>' +
        '<button type="button" class="action primary afd-cleanse-accept">' +
        cleanseConfig.acceptButtonText +
        '</button>' +
        '</div>' +
        '</div>' +
        '</div>'
      )
    }

    /**
     * Show cleanse modal
     */
    function showModal(userAddress, suggestedAddress) {
      return new Promise(function (resolve) {
        const $modalContent = $(
          '<div id="afd-cleanse-modal-content"></div>'
        ).html(createModalContent(userAddress, suggestedAddress))

        const modalOptions = {
          type: 'popup',
          responsive: true,
          innerScroll: true,
          title: cleanseConfig.modalTitle,
          modalClass: 'afd-cleanse-modal-wrapper',
          buttons: [],
          dismissible: false,
          clickableOverlay: false,
          closed: function () {
            $modalContent.remove()
          }
        }

        const modalInstance = modal(modalOptions, $modalContent)

        $modalContent.find('.afd-cleanse-accept').on('click', function () {
          modalInstance.closeModal()
          resolve(suggestedAddress)
        })

        $modalContent.find('.afd-cleanse-reject').on('click', function () {
          modalInstance.closeModal()
          resolve(null)
        })

        modalInstance.openModal()
      })
    }

    /**
     * Process cleanse
     */
    function processCleanse(address) {
      return cleanseAddress(address)
        .then(function (response) {
          if (
            response.ResultCode === 100 ||
            response.ResultCode === undefined
          ) {
            return null
          }

          if (response.ResultCode > 0 && response.Postcode) {
            return showModal(address, response)
          }

          // No valid suggestion found - continue silently
          return null
        })
        .catch(function (error) {
          console.error('[AFD PCE Cleanse] Error:', error)
          return null
        })
    }

    // Override native form.submit() to intercept Magento's addressValidation
    // which calls form.submit() directly, bypassing jQuery event handlers
    formElement.submit = function () {
      if (isSubmitting || cleanseCompleted) {
        cleanseCompleted = false
        originalSubmit()
        return
      }

      if (isAddressValidated()) {
        originalSubmit()
        return
      }

      isSubmitting = true

      const address = extractAddressFromForm()

      processCleanse(address).then(function (suggestedAddress) {
        if (suggestedAddress) {
          applyCleanedAddress(suggestedAddress)
        }

        cleanseCompleted = true
        isSubmitting = false
        originalSubmit()
      })
    }
  }
})
