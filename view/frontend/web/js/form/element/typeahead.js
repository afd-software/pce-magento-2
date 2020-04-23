define([
    'uiComponent',
    'jquery',
    'afdPce'
], function (Component, $) {
    'use strict';

    return Component.extend({

        afdInit: function (target) {

            //This function intialises the typeahead control once it has rendered

            // define the containers
            afdOptions.typeahead.containers = ['.form-shipping-address', '.billing-address-form'];
            // remove any country settings until a country field has loaded - otherwise jQuery module will throw an error
            afdOptions.country.customCountryControl = null;

            var $target = $(target);
            var $container = $target.closest('form');
            var countrySelector = '[name="country_id"]';

            function checkElementsLoaded() {
                if (
                    typeof $container.find(countrySelector).val() === 'undefined' ||
                    $container.find("[data-afd-result='Organisation']").length < 1 ||
                    $container.find("[data-afd-result='Property']").length < 1 ||
                    $container.find("[data-afd-result='Street']").length < 1 ||
                    $container.find("[data-afd-result='Town']").length < 1 ||
                    $container.find("[data-afd-result='Postcode']").length < 1 ||
                    $container.find("[data-afd-control='typeahead']").length < 1
                ) {
                    window.setTimeout(checkElementsLoaded, 100); /* this checks the flag every 100 milliseconds*/
                } else {
                    afdOptions.country.customCountryControl = countrySelector;
                    $(target).find('[data-afd-control="typeahead"]').afd('typeahead');
                }
            }
            checkElementsLoaded();

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