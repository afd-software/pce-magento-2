/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

/**
 * @api
 */
define([
    'Magento_Ui/js/form/element/select',
    'ko'
], function (Abstract, ko) {
    'use strict';

    return Abstract.extend({

        defaults: {
            exports : {
                fieldReady: '${ $.parentName }:fieldReady'
            }
        },

        fieldReady: ko.observable(''),

        initialize: function () {
            this._super();
            return this;
        },

        afterRender: function(el) {
            // notify parent that field is rendered and let it know name
            this.fieldReady({name: this.index, element: el});
        }

    });
});
