/**
 * AFD PCE Shipping Information Mixin
 *
 * This mixin intercepts the shipping information save process to ensure metadata is included
 * in the API request to the server
 */
define([
  'jquery',
  'mage/utils/wrapper',
  'Magento_Checkout/js/model/quote'
], function ($, wrapper) {
  'use strict'

  return function (shippingProcessor) {
    // Override the saveShippingInformation method to include metadata
    shippingProcessor.saveShippingInformation = wrapper.wrap(
      shippingProcessor.saveShippingInformation,
      function (originalMethod, addressInformation) {
        // Get the metadata from the hidden field
        var metadataField = $('#shipping-metadata')
        var metadataJson = null

        if (metadataField.length && metadataField.val()) {
          try {
            metadataJson = metadataField.val()

            // Make sure extension_attributes exists
            if (!addressInformation.extension_attributes) {
              addressInformation.extension_attributes = {}
            }

            // Add metadata to extension_attributes
            addressInformation.extension_attributes.metadata = metadataJson
            addressInformation.extension_attributes.afd_address_metadata =
              metadataJson

            // Also add to shipping_address.extension_attributes
            if (!addressInformation.shipping_address.extension_attributes) {
              addressInformation.shipping_address.extension_attributes = {}
            }
            addressInformation.shipping_address.extension_attributes.metadata =
              metadataJson
            addressInformation.shipping_address.extension_attributes.afd_address_metadata =
              metadataJson
          } catch (e) {
            console.error(
              '[AFD PCE] Error processing metadata for shipping information:',
              e
            )
          }
        }

        // Call the original method with the modified addressInformation
        return originalMethod(addressInformation)
      }
    )

    // Also override the getData method to ensure metadata is included
    if (shippingProcessor.getData) {
      shippingProcessor.getData = wrapper.wrap(
        shippingProcessor.getData,
        function (originalMethod) {
          var result = originalMethod()

          // Get the metadata from the hidden field
          var metadataField = $('#shipping-metadata')

          if (metadataField.length && metadataField.val()) {
            try {
              var metadataJson = metadataField.val()

              // Make sure extension_attributes exists
              if (!result.addressInformation.extension_attributes) {
                result.addressInformation.extension_attributes = {}
              }

              // Add metadata to extension_attributes
              result.addressInformation.extension_attributes.metadata =
                metadataJson
              result.addressInformation.extension_attributes.afd_address_metadata =
                metadataJson
            } catch (e) {
              console.error(
                '[AFD PCE] Error adding metadata to getData result:',
                e
              )
            }
          }

          return result
        }
      )
    }

    return shippingProcessor
  }
})
