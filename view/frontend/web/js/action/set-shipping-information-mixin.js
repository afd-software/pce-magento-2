/**
 * AFD PCE Shipping Address Mixin
 *
 * This mixin extends the shipping address component to include metadata in the shipping address payload
 * and handles cleanse on submit functionality for unvalidated addresses
 */
define([
  'jquery',
  'mage/utils/wrapper',
  'Magento_Checkout/js/model/quote',
  'Magento_Checkout/js/action/select-billing-address',
  'Afd_Pce/js/checkout/metadata-store',
  'Afd_Pce/js/checkout/cleanse-on-submit'
], function (
  $,
  wrapper,
  quote,
  selectBillingAddress,
  metadataStore,
  cleanseOnSubmit
) {
  'use strict'

  // Initialize cleanse on submit with config
  let cleanseInitialized = false

  function initCleanseOnSubmit() {
    if (!cleanseInitialized && window.checkoutConfig?.afd?.cleanseOnSubmit) {
      cleanseOnSubmit.init(window.checkoutConfig.afd.cleanseOnSubmit)
      cleanseInitialized = true
    }
  }

  /**
   * Extract address object from quote for cleanse API
   */
  function extractAddressForCleanse(address) {
    return {
      street: address.street || [],
      city: address.city || '',
      region: address.region || '',
      postcode: address.postcode || ''
    }
  }

  /**
   * Apply cleansed address to quote and form fields
   */
  function applyCleanedAddress(address, cleanedAddress, debugMode) {
    if (debugMode) {
      console.log('[AFD PCE] Applying cleaned address:', cleanedAddress)
      console.log('[AFD PCE] To address object:', address)
    }

    // Update the address object directly
    if (cleanedAddress.street) {
      address.street = cleanedAddress.street.slice() // Clone array
    }
    if (cleanedAddress.city) {
      address.city = cleanedAddress.city
    }
    if (cleanedAddress.region) {
      address.region = cleanedAddress.region
    }
    if (cleanedAddress.postcode) {
      address.postcode = cleanedAddress.postcode
    }

    // Also update the form fields for visual feedback
    const $shippingForm = $('#co-shipping-form, .form-shipping-address')

    if (cleanedAddress.street && cleanedAddress.street[0]) {
      const $street0 = $shippingForm.find('[name="street[0]"]')
      if ($street0.length) {
        $street0
          .val(cleanedAddress.street[0])
          .trigger('change')
          .trigger('input')
      }
    }
    if (cleanedAddress.street && cleanedAddress.street[1]) {
      const $street1 = $shippingForm.find('[name="street[1]"]')
      if ($street1.length) {
        $street1
          .val(cleanedAddress.street[1])
          .trigger('change')
          .trigger('input')
      }
    } else if (cleanedAddress.street) {
      // Clear street[1] if not provided
      const $street1 = $shippingForm.find('[name="street[1]"]')
      if ($street1.length) {
        $street1.val('').trigger('change').trigger('input')
      }
    }
    if (cleanedAddress.city) {
      const $city = $shippingForm.find('[name="city"]')
      if ($city.length) {
        $city.val(cleanedAddress.city).trigger('change').trigger('input')
      }
    }
    if (cleanedAddress.region) {
      const $region = $shippingForm.find('[name="region"]')
      if ($region.length) {
        $region.val(cleanedAddress.region).trigger('change').trigger('input')
      }
    }
    if (cleanedAddress.postcode) {
      const $postcode = $shippingForm.find('[name="postcode"]')
      if ($postcode.length) {
        $postcode
          .val(cleanedAddress.postcode)
          .trigger('change')
          .trigger('input')
      }
    }

    if (debugMode) {
      console.log('[AFD PCE] Address after update:', address)
    }

    return address
  }

  /**
   * Forward result from action to deferred, with optional post-processing
   */
  function forwardResult(result, deferred, postProcess) {
    if (result && typeof result.done === 'function') {
      result
        .done(function (response) {
          if (postProcess) {
            postProcess(response)
          }
          deferred.resolve(response)
        })
        .fail(function (error) {
          deferred.reject(error)
        })
    } else if (result && typeof result.then === 'function') {
      result
        .then(function (response) {
          if (postProcess) {
            postProcess(response)
          }
          deferred.resolve(response)
        })
        .catch(function (error) {
          deferred.reject(error)
        })
    } else {
      if (postProcess) {
        postProcess(result)
      }
      deferred.resolve(result)
    }
  }

  return function (originalAction) {
    // Use arrow function with rest parameters - cleaner than 'arguments'
    return wrapper.wrap(originalAction, (proceed, ...args) => {
      const debugMode = window.checkoutConfig?.afdDebugMode

      if (debugMode) {
        console.log('[AFD PCE] set-shipping-information-mixin triggered')
      }

      // Initialize cleanse on submit
      initCleanseOnSubmit()

      const address = quote.shippingAddress && quote.shippingAddress()
      if (!address) {
        if (debugMode) {
          console.log('[AFD PCE] No shipping address found')
        }
        return proceed(...args)
      }

      const storedData = metadataStore.get()
      if (debugMode) {
        console.log('[AFD PCE] Retrieved from metadataStore:', storedData)
      }

      // If metadataStore is empty and address has a customerAddressId,
      // it means a saved address was selected but has no metadata
      if ((!storedData || storedData === '{}') && address.customerAddressId) {
        if (debugMode) {
          console.log(
            '[AFD PCE] Saved customer address selected with no metadata in store - will not send metadata'
          )
        }
        // Don't add empty metadata, just proceed
        return proceed(...args)
      }

      // Parse the stored data which contains {metadata: "...", is_validated: true/false, map_data: {...}}
      let metadataObject
      let isValidated = false
      try {
        const parsedData = JSON.parse(storedData)
        // Ensure metadata is a string (JSON), not an object
        let metadataString = parsedData.metadata || '{}'
        if (typeof metadataString === 'object') {
          metadataString = JSON.stringify(metadataString)
        }
        isValidated = parsedData.is_validated || false
        metadataObject = {
          metadata: metadataString,
          is_validated: isValidated
        }

        // Include map_data if present (Precision Delivery feature)
        if (parsedData.map_data) {
          metadataObject.map_data = parsedData.map_data
          if (debugMode) {
            console.log(
              '[AFD PCE] Including map_data in metadata:',
              parsedData.map_data
            )
          }
        }
      } catch (e) {
        console.error('[AFD PCE] Error parsing metadata store:', e)
        metadataObject = {
          metadata: '{}',
          is_validated: false
        }
        isValidated = false
      }

      if (debugMode) {
        console.log('[AFD PCE] Created metadataObject:', metadataObject)
        console.log('[AFD PCE] Address is_validated:', isValidated)
      }

      // Check if cleanse on submit should be triggered
      if (
        !isValidated &&
        cleanseOnSubmit.isEnabledForShipping() &&
        !address.customerAddressId
      ) {
        if (debugMode) {
          console.log(
            '[AFD PCE] Address not validated, triggering cleanse on submit'
          )
        }

        // Extract address for cleanse API
        const addressForCleanse = extractAddressForCleanse(address)

        // Create a jQuery Deferred to maintain compatibility with Magento's expected interface
        const deferred = $.Deferred()

        // Process cleanse
        cleanseOnSubmit
          .processCleanse(addressForCleanse)
          .then(function (cleanedAddress) {
            if (cleanedAddress) {
              // User accepted the suggested address
              if (debugMode) {
                console.log(
                  '[AFD PCE] User accepted cleansed address:',
                  cleanedAddress
                )
              }

              // Get fresh reference to the current shipping address from quote
              const currentAddress = quote.shippingAddress()

              // Apply the cleaned address to the current quote address
              applyCleanedAddress(currentAddress, cleanedAddress, debugMode)

              // Force update the quote shipping address observable by creating a new object
              // This ensures Knockout detects the change
              const updatedAddress = Object.assign({}, currentAddress)
              quote.shippingAddress(updatedAddress)

              // Update metadata to mark as validated
              metadataObject.is_validated = true

              // Update the metadata store
              const updatedStoreData = {
                metadata: metadataObject.metadata,
                is_validated: true
              }
              if (metadataObject.map_data) {
                updatedStoreData.map_data = metadataObject.map_data
              }
              metadataStore.set(JSON.stringify(updatedStoreData))

              // Store the cleansed address for post-processing
              const cleansedAddressForQuote = cleanedAddress

              // Continue with the updated address
              const result = proceedWithMetadata(
                proceed,
                args,
                updatedAddress,
                metadataObject,
                debugMode
              )

              // Forward the result to our deferred, updating quote after success
              forwardResult(result, deferred, function () {
                // After successful save, ensure quote has the cleansed address
                // This is important for the billing step to show correct address
                const shippingAddr = quote.shippingAddress()

                if (shippingAddr && cleansedAddressForQuote) {
                  // Update shipping address properties
                  if (cleansedAddressForQuote.street) {
                    shippingAddr.street = cleansedAddressForQuote.street.slice()
                  }
                  if (cleansedAddressForQuote.city) {
                    shippingAddr.city = cleansedAddressForQuote.city
                  }
                  if (cleansedAddressForQuote.region) {
                    shippingAddr.region = cleansedAddressForQuote.region
                  }
                  if (cleansedAddressForQuote.postcode) {
                    shippingAddr.postcode = cleansedAddressForQuote.postcode
                  }

                  // Update quote observable
                  quote.shippingAddress(shippingAddr)

                  // Re-select billing address from updated shipping address
                  // This ensures billing step shows the correct cleansed address
                  if (
                    shippingAddr.canUseForBilling &&
                    shippingAddr.canUseForBilling()
                  ) {
                    selectBillingAddress(shippingAddr)
                  }
                }
              })
            } else {
              if (debugMode) {
                console.log(
                  '[AFD PCE] User kept original address or no suggestion available'
                )
              }

              // Continue with the original action
              const result = proceedWithMetadata(
                proceed,
                args,
                address,
                metadataObject,
                debugMode
              )
              forwardResult(result, deferred)
            }
          })
          .catch(function (error) {
            console.error('[AFD PCE] Cleanse error:', error)
            // On error, continue with original address
            const result = proceedWithMetadata(
              proceed,
              args,
              address,
              metadataObject,
              debugMode
            )
            forwardResult(result, deferred)
          })

        return deferred
      }

      // If already validated or cleanse not enabled, proceed normally
      return proceedWithMetadata(
        proceed,
        args,
        address,
        metadataObject,
        debugMode
      )
    })
  }

  /**
   * Helper function to proceed with metadata attachment
   */
  function proceedWithMetadata(
    proceed,
    args,
    address,
    metadataObject,
    debugMode
  ) {
    if (debugMode) {
      console.log('[AFD PCE] Proceeding with metadata:', metadataObject)
    }

    /**
     * Version-specific handling for extension attributes
     *
     * LEGACY SUPPORT (can be removed when 2.4.5 and 2.4.6 are EOL):
     * - Magento 2.4.5 and 2.4.6 have bugs with extension attributes on addresses:
     *   1. Response serialization corrupts totals.items structure
     *   2. CheckoutStaging's array_diff() cannot handle AddressExtension objects
     * - Solution: Use HTTP headers instead of extension attributes for these versions
     * - Magento 2.4.7+ works correctly with extension attributes
     */
    const magentoVersion = window.checkoutConfig?.magentoVersion || '2.4.7'
    const versionParts = magentoVersion.split('.').map(Number)
    const majorVersion = versionParts[0]
    const minorVersion = versionParts[1]
    const patchVersion = versionParts[2]

    // Use extension attributes only for Magento 2.4.7+
    const shouldSendExtensionAttribute =
      majorVersion > 2 ||
      (majorVersion === 2 && minorVersion > 4) ||
      (majorVersion === 2 && minorVersion === 4 && patchVersion >= 7)

    if (shouldSendExtensionAttribute) {
      if (debugMode) {
        console.log(
          '[AFD PCE] Magento ' +
            magentoVersion +
            ' detected - using extension attributes'
        )
      }

      address.extensionAttributes = address.extensionAttributes || {}
      address.extensionAttributes['afd_address_metadata'] = metadataObject

      address['extension_attributes'] = {
        ...(address['extension_attributes'] || {})
      }
      address['extension_attributes']['afd_address_metadata'] = metadataObject

      quote.shippingAddress(address)
    } else {
      /**
       * LEGACY SUPPORT for Magento 2.4.5, 2.4.6, and 2.4.8 (can be removed when EOL)
       *
       * Send metadata via HTTP header instead of extension attributes.
       * Uses ajaxPrefilter to attach the header and modify request data.
       */
      if (debugMode) {
        console.log(
          '[AFD PCE] Magento ' +
            magentoVersion +
            ' - using HTTP header for metadata'
        )
      }

      const metadataHeader = JSON.stringify(metadataObject)
      let prefilterActive = true

      // Store the updated address for use in the prefilter
      const updatedAddressData = {
        street: address.street,
        city: address.city,
        region: address.region,
        postcode: address.postcode
      }

      const prefilterHandler = function (options, originalOptions, jqXHR) {
        // Exclude customer-data and other non-checkout endpoints
        if (options.url.indexOf('customer/section/load') > -1) {
          return
        }

        // Only apply to shipping-information endpoint
        if (
          prefilterActive &&
          options.url.indexOf('shipping-information') > -1
        ) {
          jqXHR.setRequestHeader('X-AFD-Address-Metadata', metadataHeader)

          // Also modify the request data to use the updated address
          if (options.data && typeof options.data === 'string') {
            try {
              const requestData = JSON.parse(options.data)
              if (
                requestData.addressInformation &&
                requestData.addressInformation.shipping_address
              ) {
                const shippingAddr =
                  requestData.addressInformation.shipping_address
                if (updatedAddressData.street) {
                  shippingAddr.street = updatedAddressData.street
                }
                if (updatedAddressData.city) {
                  shippingAddr.city = updatedAddressData.city
                }
                if (updatedAddressData.region) {
                  shippingAddr.region = updatedAddressData.region
                }
                if (updatedAddressData.postcode) {
                  shippingAddr.postcode = updatedAddressData.postcode
                }
                options.data = JSON.stringify(requestData)
                if (debugMode) {
                  console.log(
                    '[AFD PCE] Modified shipping request data with cleansed address'
                  )
                }
              }
            } catch (e) {
              console.error('[AFD PCE] Error modifying request data:', e)
            }
          }

          prefilterActive = false
          if (debugMode) {
            console.log(
              '[AFD PCE] Applied X-AFD-Address-Metadata header to shipping request'
            )
          }
        }
      }

      $.ajaxPrefilter(prefilterHandler)

      // Safety timeout to prevent interference with other requests
      setTimeout(function () {
        prefilterActive = false
        if (debugMode) {
          console.log('[AFD PCE] Deactivated shipping metadata prefilter')
        }
      }, 2000)
    }

    if (debugMode) {
      console.log('[AFD PCE] Final address object:', address)
      console.log(
        '[AFD PCE] Extension attributes:',
        address.extensionAttributes
      )
    }

    return proceed(...args)
  }
})
