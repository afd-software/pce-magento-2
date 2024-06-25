define([
    'uiComponent',
    'uiRegistry',
    'underscore',
    'jquery'
], function (Component, registry, _, $) {
    'use strict';

    //  extends base UIComponent /vendor/magento/module-ui/view/base/web/js/lib/core/collection

    return Component.extend({

        defaults: {
            imports: {
                typeahead: '${$.name}.afd_typeahead:index'
            }
        },

        resolvers: null,
        fieldsToBeLoaded: null,
        regionComponent: null,
        regionIDElement: null,
        countryComponent: null,

        initialize: function (config) {
            this._super();

            this.parentName = config.name;

            this.resolvers = {}
            this.fieldsToBeLoaded = [
                'afd_typeahead',
                'postcode',
                'street',
                'city',
                'country_id',
                'region',
                'region_id'
            ]

            const promises = this.fieldsToBeLoaded.map(name => {
                return new Promise(resolve => {
                    this.resolvers[name] = resolve;
                });
            });


            // when all afd dependencies have been loaded
            Promise.all(promises).then((res) => {
                this.handleDependenciesLoaded(res);
            });

            return this;
        },

        handleDependenciesLoaded: function (res) {
            this.regionIDElement = res.find(element => element.name === 'region_id').element;
            const typeahead = res.find(element => element.name === 'afd_typeahead');
            this.initTypeahead(typeahead.element);
        },

        initTypeahead: function (typeaheadContainer) {

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
            this.regionVisibility();

            // events
            $('.afd-manual-input-button').on('click', () => {
                this.regionVisibility();
            });

            $(document).on('afd:populateResultsComplete', (e) => {
                this.regionVisibility();

                //zip plus 4
                if (!afdOptions.magentoOptions.typeahead.zipPlusFour && $(afdOptions.country.customCountryControl).val() === 'US') {
                    const originalVal = $('[data-afd-result="TraditionalCounty"]').val();
                    $('[data-afd-result="Postcode"]').val(originalVal.substr(0, 5));
                }
            });

            $(document).on('afd:countryChanged', (e, country) => {
                if (afdOptions.typeahead.beforeHideResults && afdOptions.typeahead.showForCountries.indexOf($container.find(countrySelector).val()) > -1) {
                    $container.find('[data-afd-result="TraditionalCounty"]')
                        .closest('.field')
                        .hide()
                } else {
                    this.hideRegions($container, $container.find(countrySelector).val());
                }
            });
        },


        // set by observable on children
        fieldReady: function (field) {
            if (typeof this.resolvers[field.name] !== 'undefined' && this.name === field.parentName) {
                this.resolvers[field.name](field);
                if (field.name === 'region_id') {
                    this.regionComponent = field.koComponent
                } else if (field.name === 'country_id') {
                    this.countryComponent = field.koComponent
                }
            }

        },

        regionVisibility: function () {

            const valStore = $(this.regionIDElement).val();
            this.regionComponent.setOptions(this.regionComponent.options());
            this.regionComponent.visible.valueHasMutated(); // manually force an update of the select component
            $(this.regionIDElement).val(valStore);
            registry.get(this.regionComponent.customName, function (input) {
                input.visible.valueHasMutated(); //manually force an update of the input component
            });
            // need to still manually hide if beforeHideResults is set
            if (afdOptions.typeahead.beforeHideResults) {
                $(this.regionComponent).closest('.field').css('display', 'none')
                $(this.regionIDElement).closest('.field').css('display', 'none')
            }
        }

    });
});