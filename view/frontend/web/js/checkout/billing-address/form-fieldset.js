define([
    'uiComponent',
    'uiRegistry',
    'jquery'
],function (Component, registry, $) {
    'use strict';

    //  extends base UIComponent /vendor/magento/module-ui/view/base/web/js/lib/core/collection

    return Component.extend({

        defaults: {
            exports : {
                afdReady: '${ $.parentName }:afdReady'
            },
            imports: {
                typeahead: '${$.name}.afd_typeahead:index'
            }
        },

        resolvers: {},
        fieldsToBeLoaded: [
            'afd_typeahead',
            'postcode',
            'street',
            'city',
            'country_id',
            'region',
            'region_id'
        ],


        initialize: function () {
            this._super();

            const promises = [];

            for(let i = 0; i < this.fieldsToBeLoaded.length; i++) {
                const name = this.fieldsToBeLoaded[i];
                promises.push(new Promise(resolve => {
                    this.resolvers[name] = resolve;
                }));
            }

            // when all afd dependencies have been loaded
            Promise.all(promises).then((res) => {
                const typeahead = res.find(element => element.name === 'afd_typeahead')
                this.initTypeahead(typeahead.element);
            });

            return this;
        },

        initTypeahead: function(typeaheadContainer) {

            // define the containers
            afdOptions.typeahead.containers = ['.form-shipping-address', '.billing-address-form'];

            let $typeahead = $(typeaheadContainer).find('[data-afd-control="typeahead"]');

            let $container = $typeahead.closest('form');
            let countrySelector = '[name="country_id"]';

            afdOptions.country.customCountryControl = countrySelector;

            // initialise controls
            $typeahead.afd('typeahead');
            $container.find('.reverse-geocode-button').afd('reverseGeocodeButton')

            // initially hide region fields that shouldn't be visible
            if(afdOptions.typeahead.beforeHideResults && afdOptions.typeahead.showForCountries.indexOf($container.find(countrySelector).val()) > -1) {
                $container.find('[data-afd-result="TraditionalCounty"]')
                    .closest('.field')
                    .hide()
            } else {
                this.hideRegions($container, $container.find(countrySelector).val());
            }

            // events
            $('.afd-manual-input-button').on('click', () => {
                this.hideRegions($container, $container.find(countrySelector).val())
            });

            $(document).on('afd:populateResultsComplete', (e) => {
                this.hideRegions($container, $container.find(countrySelector).val());

                //zip plus 4
                if(!afdOptions.magentoOptions.typeahead.zipPlusFour && $(afdOptions.country.customCountryControl).val() === 'US') {
                    const originalVal = $('[data-afd-result="TraditionalCounty"]').val();
                    $('[data-afd-result="Postcode"]').val(originalVal.substr(0,5));
                }
            });

            $(document).on('afd:countryChanged', (e, country) => {
                if(afdOptions.typeahead.beforeHideResults && afdOptions.typeahead.showForCountries.indexOf($container.find(countrySelector).val()) > -1) {
                    $container.find('[data-afd-result="TraditionalCounty"]')
                        .closest('.field')
                        .hide()
                } else {
                    this.hideRegions($container, $container.find(countrySelector).val());
                }
            });
        },

        // set by observable on children
        fieldReady: function(field) {
            if(typeof this.resolvers[field.name] !== 'undefined') {
                this.resolvers[field.name](field);
            }
        },

        hideRegions: function($container, country) {

            $container.find('[data-afd-result="TraditionalCounty"]').closest('.field').show();
            if(selectRegionCountries.indexOf(country) > -1) {
                $container.find('[data-afd-result="TraditionalCounty"].input-text')
                    .closest('.field')
                    .hide()
            } else {
                $container.find('[data-afd-result="TraditionalCounty"].select')
                    .closest('.field')
                    .hide()
            }
            $('input[data-afd-result="TraditionalCounty"]').keyup();
            $('select[data-afd-result="TraditionalCounty"]').change();
        }

    });
});