/**
 * AFD PCE Shipping Address Mixin
 *
 * This mixin extends the shipping address component to include metadata in the shipping address payload
 */
define([
  'jquery',
  'mage/utils/wrapper',
  'Magento_Checkout/js/model/quote',
  'Afd_Pce/js/checkout/metadata-store'
], function ($, wrapper, quote, metadataStore) {
  'use strict'

  return function (originalAction) {
    // Use arrow function with rest parameters - cleaner than 'arguments'
    return wrapper.wrap(originalAction, (proceed, ...args) => {
      const debugMode = window.checkoutConfig?.afdDebugMode

      if (debugMode) {
        console.log('[AFD PCE] set-shipping-information-mixin triggered')
      }

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

      // Parse the stored data which contains {metadata: "...", is_validated: true/false}
      let metadataObject
      try {
        const parsedData = JSON.parse(storedData)
        // Ensure metadata is a string (JSON), not an object
        let metadataString = parsedData.metadata || '{}'
        if (typeof metadataString === 'object') {
          metadataString = JSON.stringify(metadataString)
        }
        metadataObject = {
          metadata: metadataString,
          is_validated: parsedData.is_validated || false
        }
      } catch (e) {
        console.error('[AFD PCE] Error parsing metadata store:', e)
        metadataObject = {
          metadata: '{}',
          is_validated: false
        }
      }

      if (debugMode) {
        console.log('[AFD PCE] Created metadataObject:', metadataObject)
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
         * LEGACY SUPPORT for Magento 2.4.5 and 2.4.6 (can be removed when EOL)
         *
         * Send metadata via HTTP header instead of extension attributes.
         * Uses ajaxPrefilter to attach the header only to the shipping-information request.
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

        const prefilterHandler = function (options, originalOptions, jqXHR) {
          // Exclude customer-data and other non-checkout endpoints
          if (options.url.indexOf('customer/section/load') > -1) {
            return
          }

          // Only apply header to shipping-information endpoint
          if (
            prefilterActive &&
            options.url.indexOf('shipping-information') > -1
          ) {
            jqXHR.setRequestHeader('X-AFD-Address-Metadata', metadataHeader)
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
    })
  }
})
