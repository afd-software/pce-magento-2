define([
    'uiComponent',
    'jquery',
    'afdPce'
], function (Component, $) {
    'use strict';

    return Component.extend({

        caller: function () {

            $(document).trigger('initAfd');

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