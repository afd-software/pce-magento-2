define(['jquery', 'domReady!'], function ($) {
  'use strict'

  return function () {
    // Toggle category visibility
    $('.categorised-metadata-fields .category-header').on('click', function () {
      var category = $(this).data('category')
      var fieldsContainer = $('#category-' + category)
      var toggleIcon = $(this).find('.category-toggle')

      if (fieldsContainer.is(':visible')) {
        fieldsContainer.hide()
        toggleIcon.text('+')
      } else {
        fieldsContainer.show()
        toggleIcon.text('-')
      }
    })

    // Auto-expand categories that have selected fields
    function autoExpandSelectedCategories() {
      $('.categorised-metadata-fields .metadata-category').each(function () {
        var category = $(this).find('.category-header').data('category')
        var fieldsContainer = $('#category-' + category)
        var toggleIcon = $(this).find('.category-toggle')
        var hasSelectedFields =
          fieldsContainer.find('input[type="checkbox"]:checked').length > 0

        if (hasSelectedFields) {
          fieldsContainer.show()
          toggleIcon.text('-')
        }
      })
    }

    // Initialize tooltips - using the nested structure
    $('.field-info').hover(
      function () {
        $(this).find('.field-tooltip').show()
      },
      function () {
        $(this).find('.field-tooltip').hide()
      }
    )

    // Check if we need to hide the metadata fields based on the enabled setting
    function checkEnabledStatus() {
      // Find the enabled field using the proper Magento admin selector
      var enabledField = $(
        'select[name="groups[metadata][fields][enabled][value]"]'
      )
      var metadataFieldset = $('.categorised-metadata-fields').closest('.field')

      if (enabledField.length && enabledField.val() === '0') {
        metadataFieldset.hide()
      } else {
        metadataFieldset.show()
      }
    }

    // Initial check
    checkEnabledStatus()

    // Auto-expand categories with selected fields on page load
    autoExpandSelectedCategories()

    // Listen for changes to the enabled field
    $(document).on(
      'change',
      'select[name="groups[metadata][fields][enabled][value]"]',
      function () {
        checkEnabledStatus()
      }
    )
  }
})
