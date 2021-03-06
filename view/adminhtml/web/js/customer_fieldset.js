/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

/**
 * @api
 */
define([
    'jquery',
    'Magento_Ui/js/form/components/fieldset'
], function ($, Fieldset) {
    'use strict';

    return Fieldset.extend({


        /**
         * Extends instance with defaults. Invokes parent initialize method.
         * Calls initListeners and pushParams methods.
         */
        initialize: function () {
            return this._super();
        },

        afdInit() {

            require(['jquery', 'afdPce'], function ($) {

                // todo find out a solid way to know when fields have finished loading
                window.setTimeout(function () {

                    afdOptions.country.customCountryControl = '#customer-new-adddress [name="country_id"]';

                    if (afdOptions.magentoOptions.typeahead.adminEditCustomerEnabled) {

                        afdOptions.typeahead.containerOnlyContainsControl = true;
                        afdOptions.typeahead.parentClass = 'admin__field';

                        $('#customer-new-adddress [data-index="country_id"]').detach().insertAfter('#customer-new-adddress [data-index="middlename"]');
                        $('#afd-typeahead').detach().insertAfter('#customer-new-adddress [data-index="country_id"]').show();
                        $('#afd-manual-input, #afd-manual-input-search, #afd-search-again').detach().insertAfter('#afd-typeahead');
                        $('#customer-new-adddress [name="company"]').attr('data-afd-result', 'Organisation');
                        $('#customer-new-adddress [name="street[0]"]').attr('data-afd-result', 'Property');
                        $('#customer-new-adddress [name="street[1]"]').attr('data-afd-result', 'Street');
                        $('#customer-new-adddress [name="street[2]"]').attr('data-afd-result', 'Locality');
                        $('#customer-new-adddress [name="city"]').attr('data-afd-result', 'Town');
                        $('#customer-new-adddress [name="postcode"]').attr('data-afd-result', 'Postcode');
                        $('#afd-typeahead input').afd('typeahead');


                    }

                    if (afdOptions.magentoOptions.phone.adminEditCustomerEnabled) {

                        var $phone = $('#customer-new-adddress [data-index="telephone"] input');

                        $('#afd-phone-error').detach().insertAfter('#customer-new-adddress [data-index="telephone"]');
                        afdOptions.phone.countryControl = '#customer-new-adddress [data-index="country_id"]';
                        $phone
                            .attr('data-afd-additional-options', 'afdPhoneOptions')
                            .afd('phone');

                        $('#save > span').off('mousedown.afd').on('mousedown.afd', function (e) {
                            $phone.val($('.iti__selected-dial-code').text() + ' ' + $phone.val());
                            $phone.triggerHandler('change');
                        });

                    }


                }, 1000)
            });
        }
    })
});
