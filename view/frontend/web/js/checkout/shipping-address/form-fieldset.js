define([
    'uiComponent',
    'uiRegistry',
    'underscore',
    'jquery'
],function (Component, registry, _, $) {
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

        regionComponent: null,
        regionIDElement:null,
        countryComponent: null,

        initialize: function () {
            this._super();

            const promises = [];

            // creates an array of promises and populates an object with resolve functions
            for(let i = 0; i < this.fieldsToBeLoaded.length; i++) {
                const name = this.fieldsToBeLoaded[i];
                promises.push(new Promise(resolve => {
                    this.resolvers[name] = resolve;
                }));
            }

            // when all afd dependencies have been loaded
            Promise.all(promises).then((res) => {
                this.regionIDElement = res.find(element => element.name === 'region_id').element;
                const typeahead = res.find(element => element.name === 'afd_typeahead')
                this.initTypeahead(typeahead.element);
            });

            return this;
        },

        initTypeahead: function(typeaheadContainer) {

            const $typeahead = $(typeaheadContainer).find('[data-afd-control="typeahead"]');
            const $container = $typeahead.closest('form');
            const countrySelector = '[name="country_id"]';
            const $countryControl = $container.find(countrySelector)
            const initialCountry = $countryControl.val();

            afdOptions.typeahead.containers = ['.form-shipping-address', '.billing-address-form'];
            afdOptions.country.customCountryControl = countrySelector;

            // initialise controls
            $typeahead.afd('typeahead');
            $container.find('.reverse-geocode-button').afd('reverseGeocodeButton')

            // initially hide region fields that shouldn't be visible
            this.regionVisibility();

            // events
            $('.afd-manual-input-button').on('click', () => {
                this.regionVisibility();
            });

            $(document).on('afd:populateResultsComplete', (e) => {
                this.regionVisibility($container, $countryControl.val());

                //zip plus 4
                if(!afdOptions.magentoOptions.typeahead.zipPlusFour && $(afdOptions.country.customCountryControl).val() === 'US') {
                    const originalVal = $('[data-afd-result="Postcode"]').val();
                    $('[data-afd-result="Postcode"]').val(originalVal.substr(0,5));
                }
            });

            $(document).on('afd:countryChanged', (e, country) => {
                if(afdOptions.typeahead.beforeHideResults && afdOptions.typeahead.showForCountries.indexOf($container.find(countrySelector).val()) > -1) {
                    $container.find('[data-afd-result="TraditionalCounty"]')
                        .closest('.field')
                        .hide()
                } else {
                    this.regionVisibility($container, country);
                }
            });

            // $(document).on('afd:populateResultsComplete', showHideRegion);
        },

        // set by observable on children
        fieldReady: function(field) {
            if(typeof this.resolvers[field.name] !== 'undefined') {
                this.resolvers[field.name](field);
                if (field.name === 'region_id') {
                    this.regionComponent = field.koComponent
                } else if (field.name === 'country_id') {
                    this.countryComponent = field.koComponent
                }
            }
        },

        regionVisibility: function() {

            const valStore = $(this.regionIDElement).val();
           this.regionComponent.setOptions(this.regionComponent.options());
           this.regionComponent.visible.valueHasMutated(); // manually force an update of the select component
            $(this.regionIDElement).val(valStore);
            registry.get(this.regionComponent.customName, function (input) {
                input.visible.valueHasMutated(); //manually force an update of the input component
            });

        }

    });
});