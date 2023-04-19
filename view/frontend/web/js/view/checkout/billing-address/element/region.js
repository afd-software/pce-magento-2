/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

/**
 * @api
 */
define([
    'Magento_Ui/js/form/element/region',
    'mageUtils',
    'uiLayout',
    'uiRegistry',
    'ko'
], function (Region, utils, layout, registry, ko) {
    'use strict';

    return Region.extend({

        defaults: {
            exports : {
                fieldReady: '${ $.parentName }:fieldReady'
            }
        },

        fieldReady: ko.observable(''),

        initialize: function () {

            this._super();

            if (this.customEntry) {
                registry.get(this.name, this.initInput.bind(this));
            }
            return this;
        },

        /**
         * Creates input from template, renders it via renderer.
         *
         * @returns {Object} Chainable.
         */
        initInput: function () {
            var inputNode = {
                parent: '${ $.$data.parentName }',
                component: 'Afd_Pce/js/view/checkout/billing-address/element/abstract',
                template: '${ $.$data.template }',
                elementTmpl:'Afd_Pce/form/element/region',
                provider: '${ $.$data.provider }',
                name: '${ $.$data.index }_input',
                dataScope: '${ $.$data.customEntry }',
                customScope: '${ $.$data.customScope }',
                sortOrder: {
                    after: '${ $.$data.name }'
                },
                displayArea: 'body',
                label: '${ $.$data.label }'
            };
            layout([utils.template(inputNode, this)]);

            return this;
        },

        afterRender: function(el) {
            // notify parent that field is rendered and let it know name
            this.fieldReady({name: this.index, element: el});
        }

    });
});
