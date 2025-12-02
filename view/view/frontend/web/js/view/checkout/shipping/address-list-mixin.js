/**
 * AFD PCE Address List Mixin
 *
 * This mixin populates the metadata store when a saved customer address is selected
 */
define([
  'jquery',
  'Afd_Pce/js/checkout/metadata-store',
  'Magento_Checkout/js/model/quote'
], function ($, metadataStore, quote) {
  'use strict'

  return function (Component) {
    return Component.extend({
      /**
       * Initialize - check if an address is already selected and load its metadata
       */
      initialize: function () {
        const result = this._super()

        const debugMode = window.checkoutConfig?.afdDebugMode

        // Check if there's already a selected address on page load
        const selectedAddress = quote.shippingAddress()
        if (debugMode) {
          console.log(
            '[AFD PCE Address List] Initialize - shipping address:',
            selectedAddress
          )
          console.log(
            '[AFD PCE Address List] Initialize - customerAddressId:',
            selectedAddress?.customerAddressId
          )
        }

        if (selectedAddress && selectedAddress.customerAddressId) {
          if (debugMode) {
            console.log(
              '[AFD PCE Address List] Address already selected on page load, loading metadata'
            )
          }
          this.loadMetadataForAddress(selectedAddress)
        }

        // Subscribe to shipping address changes to update metadata when address is changed
        // Arrow function preserves 'this' context - no need for 'const self = this'
        quote.shippingAddress.subscribe((newAddress) => {
          if (debugMode) {
            console.log(
              '[AFD PCE Address List] Shipping address changed:',
              newAddress
            )
          }
          if (newAddress && newAddress.customerAddressId) {
            this.loadMetadataForAddress(newAddress)
          }
        })

        return result
      },

      /**
       * Override selectAddress to populate metadata when saved address is selected
       */
      selectAddress: function (address) {
        const result = this._super(address)

        const debugMode = window.checkoutConfig?.afdDebugMode
        if (debugMode) {
          console.log('[AFD PCE Address List] Address selected:', address)
        }

        this.loadMetadataForAddress(address)

        return result
      },

      /**
       * Load metadata for a given address
       */
      loadMetadataForAddress: function (address) {
        if (!address) {
          return
        }

        // Get the address ID
        const addressId = address.customerAddressId
        const debugMode = window.checkoutConfig?.afdDebugMode

        if (debugMode) {
          console.log(
            '[AFD PCE Address List] loadMetadataForAddress called for address ID:',
            addressId
          )
          console.log('[AFD PCE Address List] Full address object:', address)
        }

        // Check if we have metadata for this address in checkout config
        const customerAddressMetadata =
          window.checkoutConfig?.customerAddressMetadata

        if (debugMode) {
          console.log(
            '[AFD PCE Address List] Customer address metadata config:',
            customerAddressMetadata
          )
        }

        if (customerAddressMetadata && customerAddressMetadata[addressId]) {
          const metadata = customerAddressMetadata[addressId]
          if (debugMode) {
            console.log(
              '[AFD PCE Address List] Found metadata for address ID ' +
                addressId +
                ':',
              metadata
            )
          }

          // Populate the metadata store so the mixin can use it
          const metadataForStore = {
            metadata: metadata.metadata || '{}',
            is_validated: metadata.is_validated || false
          }

          metadataStore.set(JSON.stringify(metadataForStore))
          if (debugMode) {
            console.log(
              '[AFD PCE Address List] Populated metadataStore:',
              metadataStore.get()
            )
          }

          // Set metadata on shipping address extension attributes
          // This is used by:
          // 1. set-shipping-information-mixin to send to backend
          // 2. Potential fallback for billing if same as shipping (guest checkout)
          const shippingAddress = quote.shippingAddress()
          if (shippingAddress) {
            shippingAddress.extensionAttributes =
              shippingAddress.extensionAttributes || {}
            shippingAddress.extensionAttributes['afd_address_metadata'] =
              metadataForStore
            shippingAddress['extension_attributes'] =
              shippingAddress['extension_attributes'] || {}
            shippingAddress['extension_attributes']['afd_address_metadata'] =
              metadataForStore
            quote.shippingAddress(shippingAddress)
            if (debugMode) {
              console.log(
                '[AFD PCE Address List] Set metadata on shipping address extension attributes'
              )
            }
          }
        } else {
          if (debugMode) {
            console.log(
              '[AFD PCE Address List] No metadata found for address ID ' +
                addressId
            )
          }
          // Clear metadata store for addresses without metadata
          metadataStore.set('{}')
        }
      }
    })
  }
})
