/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

/**
 * @api
 */
define([
    'Magento_Ui/js/form/element/abstract',
    'jquery',
    'Magento_Checkout/js/model/quote',
    'afdPce'
], function (Element, $, quote ) {
    'use strict';

    return Element.extend({

        /**
         * Invokes initialize method of parent class,
         * contains initialization logic
         */
        initialize: function () {
            this._super();
            return this;
        },

        afdInit: function(target) {

            if(afdOptions.magentoOptions.phone.phoneEnabled && afdOptions.magentoOptions.phone.loggedOutCheckoutEnabled) {

                // todo fix this
                if (typeof window.intlTelInputUtils === 'undefined') {
                    window.intlTelInputGlobals.loadUtils('https://cdn.afd.co.uk/plugins/shared/utils.js')
                        .then(function(){
                            var pn = $('#telephone').val();
                            $('#telephone')
                            $(target)
                                .addClass('afd-padding-fix')
                                .afd('phone')
                                .closest('div')
                                .siblings('.afd-error')
                                .find('span')
                                .text(afdOptions.magentoOptions.phone.invalidMessage)
                                .val(pn);
                        });
                } else {
                    var pn = $('#telephone').val();
                    $('#telephone')
                    $(target)
                        .addClass('afd-padding-fix')
                        .afd('phone')
                        .closest('div')
                        .siblings('.afd-error')
                        .find('span')
                        .text(afdOptions.magentoOptions.phone.invalidMessage)
                        .val(pn);

                }
                // todo got to be a better way to do this
                $(document).on('afd:phoneValidationStarted', function() {
                    $('.action-save-address, .action-update').on('mousedown', function() {
                        mousedownHandler();
                    })
                });

                function mousedownHandler() {
                    $('.iti').each(function(){
                        var $input = $(this).find('.input-text');
                        var dailCode = $(this).find('.iti__selected-dial-code').text();
                        if ($input.val().substring(0, dailCode.length) !== dailCode ) {
                            $input.val(dailCode + ' ' + $input.val());
                            $input.triggerHandler('change');
                        }
                    })
                }


            }
        }

    });
});
