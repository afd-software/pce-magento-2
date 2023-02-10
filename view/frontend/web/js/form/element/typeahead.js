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
            imports: {
                countryOptions: '${ $.parentName }.country_id:indexedOptions',
                update: '${ $.parentName }.country_id:value'
            },
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

            //This function intialises the typeahead control once it has rendered


            // remove any country settings until a country field has loaded - otherwise jQuery module will throw an error
            afdOptions.country.customCountryControl = null;

            var $target = $(target);
            var $container = $target.closest('form');
            var countrySelector = '[name="country_id"]';
            var reverseGeocodeEnabled = window.checkoutConfig.afd.reverseGeocodeEnable === '1';

            function checkElementsLoaded() {
                if (
                    typeof $container.find(countrySelector).val() === 'undefined' ||
                    $container.find('[data-afd-result="Property"]').length < 1 ||
                    $container.find('[data-afd-result="Street"]').length < 1 ||
                    $container.find('[data-afd-result="Town"]').length < 1 ||
                    $container.find('[data-afd-result="Postcode"]').length < 1 ||
                    $container.find('[data-afd-control="typeahead"]').length < 1 ||
                    (reverseGeocodeEnabled && $container.find('.reverse-geocode-button').length < 1 )
                ) {
                    window.setTimeout(checkElementsLoaded, 100); /* this checks the flag every 100 milliseconds*/
                } else {
                    afdOptions.country.customCountryControl = countrySelector;
                    const $typeaheadControl = $(target).find('[data-afd-control="typeahead"]');
                    $typeaheadControl.afd('typeahead');
                    $container.find('.reverse-geocode-button').afd('reverseGeocodeButton')

                    const hideRegions = function(){
                        // not ideal
                        setTimeout(function(){
                            if(selectRegionCountries.indexOf($container.find(countrySelector).val()) > -1) {
                                console.log(1);
                                $container.find('[data-afd-result="TraditionalCounty"].input-text')
                                    .closest('.field')
                                    .hide()
                            } else{
                                $container.find('[data-afd-result="TraditionalCounty"].select')
                                    .closest('.field')
                                    .hide()
                            }
                        }, 10)
                    }

                    $(document).on('afd:pceRetrieveComplete', hideRegions)
                    $('.afd-manual-input-button').on('click', hideRegions)
                    $(document).on('afd:populateResultsComplete', function(e){
                        if(!afdOptions.magentoOptions.typeahead.zipPlusFour && $(afdOptions.country.customCountryControl).val() === 'US') {
                            const originalVal = $('[data-afd-result="Postcode"]').val()
                            $('[data-afd-result="Postcode"]').val(originalVal.substr(0,5))
                        }
                    });


                }
            }
            checkElementsLoaded();

            this.fieldReady({name: this.index, element: target});

        },

        update: function() {
            // console.log('updating')
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