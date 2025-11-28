define(['uiComponent', 'uiRegistry', 'jquery', 'ko', 'afdPce'], function (
  Component,
  uiRegistry,
  $,
  ko
) {
  'use strict'

  return Component.extend({
    defaults: {
      skipValidation: true,
      exports: {
        typeaheadReady: '${ $.parentName }:typeaheadReady',
        fieldReady: '${ $.parentName }:fieldReady'
      }
    },

    fieldReady: ko.observable(''),

    initialize: function (config) {
      this._super()
      this.parentName = config.parentName
      return this
    },

    afdInit: function (target) {
      this.fieldReady({
        name: this.index,
        element: target,
        parentName: this.parentName
      })
    },

    checkBool: function (setting) {
      return window.checkoutConfig.afd[setting] === '1'
    },

    getConfig: function (setting) {
      if (window.checkoutConfig) {
        return window.checkoutConfig.afd[setting]
      }
    }
  })
})
