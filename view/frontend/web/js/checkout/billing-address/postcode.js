/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

/**
 * @api
 */
define([
    'Magento_Ui/js/form/element/post-code',
    'ko'
], function (Postcode, ko) {
    'use strict';

    return Postcode.extend({

        defaults: {
            exports: {
                fieldReady: '${ $.parentName }:fieldReady'
            }
        },

        fieldReady: ko.observable(''),

        initialize: function (config) {
            this._super();

            this.parentName = config.parentName;

            return this;
        },

        afterRender: function (el) {
            // notify parent that field is rendered and let it know name
            this.fieldReady({name: this.index, element: el, parentName: this.parentName});
        }

    });
});
