/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

/**
 * @api
 */
define(['Magento_Ui/js/form/components/group', 'ko'], function (Group, ko) {
  'use strict'

  return Group.extend({
    defaults: {
      exports: {
        fieldSetReady: '${ $.parentName }:fieldReady'
      }
    },

    resolvers: {},
    fieldSetReady: ko.observable(''),

    initialize: function () {
      this._super()
      return this
    },

    fieldReady: function (field) {
      if (typeof this.resolvers[field.name] !== 'undefined') {
        this.resolvers[field.name]({ name: this.index, element: field.element })
      }
    },

    afterRender: function (el) {
      const fields = ['street[0]', 'street[1]']
      const promises = []
      for (let i = 0; i < fields.length; i++) {
        const name = fields[i]
        promises.push(
          new Promise((resolve) => {
            this.resolvers[name] = resolve
          })
        )
      }

      // when all dependents have loaded
      Promise.all(promises).then(() => {
        this.fieldSetReady({ name: this.index, element: el })
      })
    }
  })
})
