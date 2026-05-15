/**
 * AFD PCE Place Order Mixin
 *
 * Attaches metadata to billing addresses before order placement:
 * - For new addresses: Retrieves from metadataStore
 * - For saved addresses: Loads from customerAddressMetadata config
 * - Handles cleanse on submit for unvalidated billing addresses
 */
define([
  'jquery',
  'mage/utils/wrapper',
  'Magento_Checkout/js/model/quote',
  'Afd_Pce/js/checkout/metadata-store',
  'Afd_Pce/js/checkout/billing-metadata-store',
  'Afd_Pce/js/checkout/cleanse-on-submit'
], function (
  $,
  wrapper,
  quote,
  metadataStore,
  billingMetadataStore,
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
   * Compare two addresses by postcode to detect same-address scenario.
   * Street comparison is intentionally omitted as billing/shipping address objects
   * may represent the same address with different street array structures.
   */
  function addressesMatch(a, b) {
    if (!a || !b) return false
    const aPostcode = (a.postcode || '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '')
    const bPostcode = (b.postcode || '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '')
    return aPostcode !== '' && aPostcode === bPostcode
  }

  /**
   * Extract address object from billing address for cleanse API
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
   * Apply cleansed address to billing address
   */
  function applyCleanedAddress(address, cleanedAddress) {
    if (cleanedAddress.street) {
      address.street = cleanedAddress.street
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

    // Update the billing form fields
    const billingForm = $(
      '.billing-address-form, .payment-method._active .billing-address-form'
    )
    if (billingForm.length) {
      if (cleanedAddress.street && cleanedAddress.street[0]) {
        billingForm.find('[name="street[0]"]').val(cleanedAddress.street[0])
      }
      if (cleanedAddress.street && cleanedAddress.street[1]) {
        billingForm.find('[name="street[1]"]').val(cleanedAddress.street[1])
      }
      if (cleanedAddress.city) {
        billingForm.find('[name="city"]').val(cleanedAddress.city)
      }
      if (cleanedAddress.region) {
        billingForm.find('[name="region"]').val(cleanedAddress.region)
      }
      if (cleanedAddress.postcode) {
        billingForm.find('[name="postcode"]').val(cleanedAddress.postcode)
      }
    }

    return address
  }

  return function (placeOrderAction) {
    return wrapper.wrap(
      placeOrderAction,
      (originalAction, paymentData, messageContainer) => {
        const debugMode = window.checkoutConfig?.afdDebugMode
        const billingAddress = quote.billingAddress && quote.billingAddress()

        // Initialize cleanse on submit
        initCleanseOnSubmit()

        if (!billingAddress) {
          return originalAction(paymentData, messageContainer)
        }

        let metadataObject = null
        let isValidated = false

        const hasExtensionMetadata =
          billingAddress.extensionAttributes &&
          billingAddress.extensionAttributes.afd_address_metadata

        if (hasExtensionMetadata) {
          const existingMetadata =
            billingAddress.extensionAttributes.afd_address_metadata
          isValidated = existingMetadata.is_validated || false
          metadataObject = existingMetadata
        } else if (billingMetadataStore.get()) {
          const storedMetadata = billingMetadataStore.get()
          isValidated = storedMetadata.is_validated || false
          metadataObject = storedMetadata
          if (debugMode) {
            console.log(
              '[AFD PCE] Billing address metadata recovered from billingMetadataStore:',
              storedMetadata
            )
          }
        } else {
          // Fallback: if billing address matches shipping address and shipping was validated,
          // use shipping metadata. This handles the case where the user enters the same
          // address in billing as shipping (without using the billing typeahead).
          const shippingAddress =
            quote.shippingAddress && quote.shippingAddress()
          const shippingStoreRaw = metadataStore.get()
          if (debugMode) {
            console.log(
              '[AFD PCE] Billing address fallback check - billing:',
              billingAddress
            )
            console.log(
              '[AFD PCE] Billing address fallback check - shipping:',
              shippingAddress
            )
            console.log(
              '[AFD PCE] Billing address fallback check - shippingStoreRaw:',
              shippingStoreRaw
            )
            console.log(
              '[AFD PCE] Billing address fallback check - addressesMatch:',
              addressesMatch(billingAddress, shippingAddress)
            )
          }
          if (
            shippingAddress &&
            shippingStoreRaw &&
            shippingStoreRaw !== '{}' &&
            addressesMatch(billingAddress, shippingAddress)
          ) {
            try {
              const shippingStored = JSON.parse(shippingStoreRaw)
              if (shippingStored.is_validated) {
                isValidated = true
                metadataObject = {
                  metadata: shippingStored.metadata || '{}',
                  is_validated: true
                }
                if (debugMode) {
                  console.log(
                    '[AFD PCE] Billing address matches validated shipping address, using shipping metadata'
                  )
                }
              }
            } catch (_e) {
              // ignore parse errors
            }
          }
        }

        if (
          !isValidated &&
          !metadataObject &&
          billingAddress.customerAddressId
        ) {
          const customerAddressMetadata =
            window.checkoutConfig?.customerAddressMetadata
          if (
            customerAddressMetadata &&
            customerAddressMetadata[billingAddress.customerAddressId]
          ) {
            const metadata =
              customerAddressMetadata[billingAddress.customerAddressId]
            isValidated = metadata.is_validated || false
            metadataObject = {
              metadata: metadata.metadata || '{}',
              is_validated: isValidated
            }
          }
        }

        // Check if cleanse on submit should be triggered for billing
        if (
          !isValidated &&
          cleanseOnSubmit.isEnabledForBilling() &&
          !billingAddress.customerAddressId
        ) {
          if (debugMode) {
            console.log(
              '[AFD PCE] Billing address not validated, triggering cleanse on submit'
            )
          }

          // Extract address for cleanse API
          const addressForCleanse = extractAddressForCleanse(billingAddress)

          // Process cleanse and return a promise
          return cleanseOnSubmit
            .processCleanse(addressForCleanse)
            .then(function (cleanedAddress) {
              // Determine the metadata to use for this request
              let finalMetadata = metadataObject

              if (cleanedAddress) {
                // User accepted the suggested address
                if (debugMode) {
                  console.log(
                    '[AFD PCE] User accepted cleansed billing address:',
                    cleanedAddress
                  )
                }

                // Apply the cleaned address
                applyCleanedAddress(billingAddress, cleanedAddress)

                // Create or update metadata to mark as validated
                finalMetadata = {
                  metadata: metadataObject ? metadataObject.metadata : '{}',
                  is_validated: true
                }
                if (metadataObject && metadataObject.map_data) {
                  finalMetadata.map_data = metadataObject.map_data
                }
              } else {
                if (debugMode) {
                  console.log(
                    '[AFD PCE] User kept original billing address or no suggestion available'
                  )
                }
              }

              // Continue with the original action after cleanse
              return proceedWithPlaceOrder(
                originalAction,
                paymentData,
                messageContainer,
                billingAddress,
                finalMetadata,
                debugMode
              )
            })
            .catch(function (error) {
              console.error('[AFD PCE] Billing cleanse error:', error)
              // On error, continue with original address
              return proceedWithPlaceOrder(
                originalAction,
                paymentData,
                messageContainer,
                billingAddress,
                metadataObject,
                debugMode
              )
            })
        }

        if (
          billingAddress.customerAddressId &&
          !hasExtensionMetadata &&
          !metadataObject
        ) {
          const customerAddressMetadata =
            window.checkoutConfig?.customerAddressMetadata
          if (
            customerAddressMetadata &&
            customerAddressMetadata[billingAddress.customerAddressId]
          ) {
            const metadata =
              customerAddressMetadata[billingAddress.customerAddressId]

            metadataObject = {
              metadata: metadata.metadata || '{}',
              is_validated: metadata.is_validated || false
            }
            if (debugMode) {
              console.log(
                '[AFD PCE] Place Order: Loaded metadata for saved billing address'
              )
            }
          }
        }

        // Proceed with place order
        return proceedWithPlaceOrder(
          originalAction,
          paymentData,
          messageContainer,
          billingAddress,
          metadataObject,
          debugMode
        )
      }
    )
  }

  /**
   * Helper function to proceed with place order and metadata attachment
   */
  function proceedWithPlaceOrder(
    originalAction,
    paymentData,
    messageContainer,
    billingAddress,
    metadataObject,
    debugMode
  ) {
    // Send metadata via the appropriate mechanism based on Magento version
    if (metadataObject) {
      /**
       * LEGACY SUPPORT (can be removed when 2.4.5 and 2.4.6 are EOL):
       * - Magento 2.4.5 and 2.4.6 require HTTP headers instead of extension attributes
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
              ' - sending billing metadata via extension attributes'
          )
        }

        billingAddress.extensionAttributes =
          billingAddress.extensionAttributes || {}
        billingAddress.extensionAttributes.afd_address_metadata = metadataObject

        billingAddress['extension_attributes'] =
          billingAddress['extension_attributes'] || {}
        billingAddress['extension_attributes'].afd_address_metadata =
          metadataObject
      } else {
        /**
         * LEGACY SUPPORT for Magento 2.4.5 and 2.4.6 (can be removed when EOL)
         *
         * Send metadata via HTTP header instead of extension attributes.
         * Uses ajaxPrefilter to attach the header only to the payment-information request.
         */
        if (debugMode) {
          console.log(
            '[AFD PCE] Magento ' +
              magentoVersion +
              ' - using HTTP header for billing metadata'
          )
        }

        const metadataHeader = JSON.stringify(metadataObject)
        let prefilterActive = true

        const prefilterHandler = function (options, originalOptions, jqXHR) {
          // Exclude customer-data and other non-checkout endpoints
          if (options.url.indexOf('customer/section/load') > -1) {
            return
          }

          // Only apply header to payment-information endpoint
          if (
            prefilterActive &&
            options.url.indexOf('payment-information') > -1
          ) {
            jqXHR.setRequestHeader('X-AFD-Address-Metadata', metadataHeader)
            prefilterActive = false
            if (debugMode) {
              console.log(
                '[AFD PCE] Applied X-AFD-Address-Metadata header to payment request'
              )
            }
          }
        }

        $.ajaxPrefilter(prefilterHandler)

        // Safety timeout to prevent interference with other requests
        setTimeout(function () {
          prefilterActive = false
          if (debugMode) {
            console.log('[AFD PCE] Deactivated payment metadata prefilter')
          }
        }, 2000)
      }
    }

    return originalAction(paymentData, messageContainer)
  }
})
