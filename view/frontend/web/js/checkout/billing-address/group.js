/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

/**
 * @api
 */
define([
    'Magento_Ui/js/form/components/group',
    'ko'
], function (Group, ko) {
    'use strict';

    return Group.extend({

        defaults: {
            exports: {
                fieldSetReady: '${ $.parentName }:fieldReady'
            }
        },
        resolvers: {},
        fieldSetReady: ko.observable(''),

        initialize: function (config) {
            this._super();
            this.name = config.name
            this.parentName = config.parentName
            return this;
        },

        fieldReady: function (field) {
            if (typeof this.resolvers[field.name] !== 'undefined' && this.name === field.parentName) {
                this.resolvers[field.name]({name: this.index, element: field.element});
            }
        },

        afterRender: function (el) {
            const fields = ['street[0]', 'street[1]']
            const promises = fields.map((name) => {
                return new Promise(resolve => {
                    this.resolvers[name] = resolve;
                })
            })

            // when all dependents have loaded
            Promise.all(promises).then(() => {
                this.fieldSetReady({name: this.index, element: el, parentName: this.parentName});
            });

        }

    });
});
