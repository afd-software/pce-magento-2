/**
 * AFD PCE Place Order Mixin
 *
 * Attaches metadata to billing addresses before order placement:
 * - For new addresses: Retrieves from metadataStore
 * - For saved addresses: Loads from customerAddressMetadata config
 */
define([
  'jquery',
  'mage/utils/wrapper',
  'Magento_Checkout/js/model/quote',
  'Afd_Pce/js/checkout/metadata-store'
], function ($, wrapper, quote, metadataStore) {
  'use strict'

  return function (placeOrderAction) {
    return wrapper.wrap(
      placeOrderAction,
      (originalAction, paymentData, messageContainer) => {
        const debugMode = window.checkoutConfig?.afdDebugMode
        const billingAddress = quote.billingAddress && quote.billingAddress()

        if (!billingAddress) {
          return originalAction(paymentData, messageContainer)
        }

        const hasMetadata =
          billingAddress.extensionAttributes &&
          billingAddress.extensionAttributes.afd_address_metadata

        // Determine metadata to send
        let metadataObject = null

        if (!hasMetadata) {
          const storedMetadata = metadataStore.get()
          if (storedMetadata && storedMetadata !== '{}') {
            try {
              const parsedData = JSON.parse(storedMetadata)
              metadataObject = {
                metadata: parsedData.metadata || '{}',
                is_validated: parsedData.is_validated || false
              }
              metadataStore.clear()
              if (debugMode) {
                console.log(
                  '[AFD PCE] Place Order: Found metadata in store for billing address'
                )
              }
            } catch (e) {
              console.error(
                '[AFD PCE] Error parsing billing metadata from store:',
                e
              )
            }
          }
        }

        if (
          billingAddress.customerAddressId &&
          !hasMetadata &&
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

        // Send metadata via the appropriate mechanism based on Magento version
        if (metadataObject) {
          /**
           * LEGACY SUPPORT (can be removed when 2.4.5 and 2.4.6 are EOL):
           * - Magento 2.4.5 and 2.4.6 require HTTP headers instead of extension attributes
           * - Magento 2.4.7+ works correctly with extension attributes
           */
          const magentoVersion =
            window.checkoutConfig?.magentoVersion || '2.4.7'
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
            billingAddress.extensionAttributes.afd_address_metadata =
              metadataObject

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

            const prefilterHandler = function (
              options,
              originalOptions,
              jqXHR
            ) {
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
    )
  }
})
