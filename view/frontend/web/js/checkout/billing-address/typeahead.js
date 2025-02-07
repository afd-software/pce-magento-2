define([
    'uiComponent',
    'uiRegistry',
    'jquery',
    'ko',
    'afdPce'
], function (Component,uiRegistry, $, ko) {
    'use strict';

    return Component.extend({

        defaults: {
            skipValidation: true,
            exports : {
                typeaheadReady: '${ $.parentName }:typeaheadReady',
                fieldReady: '${ $.parentName }:fieldReady'
            }
        },

        fieldReady: ko.observable(''),

        initialize: function () {
            this._super();
            return this;
        },

        afdInit: function (target) {
            this.fieldReady({name: this.index, element: target});
        },

        checkBool: function(setting) {
            return window.checkoutConfig.afd[setting] === "1";
        },

        getConfig: function(setting) {
            if(window.checkoutConfig) {
                return window.checkoutConfig.afd[setting];
            }
        }
    });
});