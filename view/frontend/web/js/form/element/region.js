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
    'uiRegistry'
], function (Region, utils, layout, registry) {
    'use strict';

    return Region.extend({

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
            console.log(this);
            var inputNode = {
                parent: '${ $.$data.parentName }',
                component: 'Magento_Ui/js/form/element/abstract',
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

    });
});
