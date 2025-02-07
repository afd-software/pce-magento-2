/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

/**
 * @api
 */
define([
    'Magento_Ui/js/form/element/abstract',
    'ko'
], function (Abstract, ko) {
    'use strict';

    return Abstract.extend({

        defaults: {
            exports: {
                fieldReady: '${ $.parentName }:fieldReady'
            }
        },

        fieldReady: ko.observable(''),

        initialize: function () {
            this._super();
            return this;
        },

        getAddressField: function () {
            console.log(window.afdOptions.magentoOptions.typeahead)
            const {combineFirstLine} = window.afdOptions.magentoOptions.typeahead
            console.log(combineFirstLine)
            const addressIndex = parseInt(this.inputName.substring(this.inputName.length - 2, this.inputName.length - 1))
            console.log(addressIndex)
            if (combineFirstLine) {
                if (addressIndex === 0) {
                    return 'Property,Street'
                }
                if (addressIndex === 1) {
                    return 'Locality'
                }
                return ''
            } else {
                if (addressIndex === 0) {
                    return 'Property'
                }
                if (addressIndex === 1) {
                    return 'Street'
                }
                if (addressIndex === 2) {
                    return 'Locality'
                }
                return ''
            }

        },

        afterRender: function (el) {
            // notify parent that field is rendered and let it know name
            this.fieldReady({name: this.inputName, element: el});
        }

    });
});
