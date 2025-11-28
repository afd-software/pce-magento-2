/**
 * AFD PCE Shipping Save Processor Mixin
 *
 * This mixin directly modifies the payload before it's sent to the server
 * to ensure metadata is included in the API request
 */
define(['jquery', 'mage/utils/wrapper'], function ($, wrapper) {
  'use strict'

  return function (processor) {
    // If the processor doesn't have a request method, return it unchanged
    if (!processor.request) {
      return processor
    }

    // Override the request method to intercept the payload
    processor.request = wrapper.wrap(
      processor.request,
      function (originalMethod, payload) {
        // Get the metadata from the hidden field
        var metadataField = $('#shipping-metadata')

        if (metadataField.length && metadataField.val()) {
          try {
            var metadataJson = metadataField.val()

            // Ensure extension_attributes exists
            if (!payload.addressInformation.extension_attributes) {
              payload.addressInformation.extension_attributes = {}
            }

            // Add metadata to extension_attributes
            payload.addressInformation.extension_attributes.metadata =
              metadataJson
            payload.addressInformation.extension_attributes.afd_address_metadata =
              metadataJson
          } catch (e) {
            console.error('[AFD PCE] Error adding metadata to payload:', e)
          }
        }

        // Call the original method with the modified payload
        return originalMethod(payload)
      }
    )

    return processor
  }
})
