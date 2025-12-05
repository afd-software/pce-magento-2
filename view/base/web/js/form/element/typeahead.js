define(['uiComponent', 'jquery', 'afdPce'], function (Component, $) {
  'use strict'

  return Component.extend({
    afdInit: function () {
      var identifiers = ['Property', 'Street', 'Locality']

      function f() {
        if (
          !window.afd.ready.company ||
          !window.afd.ready.postcode ||
          !window.afd.ready.city ||
          $("[data-index='street']").length < 1
        ) {
          setTimeout(f, 1000)
        } else {
          afdOptions.typeahead.parentClass = 'admin__field'
          $("[data-index='street']")
            .find('.admin__field')
            .each(function (index) {
              $(this).find('input').attr('data-afd-result', identifiers[index])
            })
        }
      }
      f()
    },

    checkBool: function (setting) {
      return window.checkoutConfig.afd[setting] === '1'
    },

    getConfig: function (setting) {
      if (window.checkoutConfig) {
        return window.checkoutConfig.afd[setting]
      } else {
        var options = {
          enableManualEntryButton: '1',
          enableSearchAgainButton: '1',
          manualEntryCss:
            '.afd-manual-input-button, .afd-manual-input-search-button{margin-left: 30px; padding-top: 8px; cursor: pointer; color: #1979c3;}.afd-manual-input-button{ padding-left: 11px;}',
          manualEntryMarkup: 'Manually enter address',
          manualEntrySearchMarkup: 'Search for address',
          placeholder: 'Start typing your address',
          searchAgainCss:
            '.afd-search-again{margin-left: 30px; padding-top: 8px;cursor: pointer;color: #1979c3;}',
          searchAgainMarkup: 'Search again'
        }
        return options[setting]
      }
    }
  })
})
