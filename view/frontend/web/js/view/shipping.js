/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'jquery',
    'Magento_Checkout/js/view/shipping',
    'ko'
], function (
    $, Shipping, ko
) {
    'use strict';

    return Shipping.extend({

        defaults: {
            template: 'Afd_Pce/shipping',
            shippingFormTemplate: 'Magento_Checkout/shipping-address/form',
            shippingMethodListTemplate: 'Magento_Checkout/shipping-address/shipping-method-list',
            shippingMethodItemTemplate: 'Magento_Checkout/shipping-address/shipping-method-item'
        },
        /**
         * @return {exports}
         */

        afdReady: ko.observable(false),

        initialize: function () {
            this._super();
        },

        afdInit: function(el) {

            const $target = $(el);
            var $container = $target.find('form');

            $(el).on('mousedown', function() {
                $('.iti').each(function(){
                    var $input = $(this).find('.input-text');
                    var dailCode = $(this).find('.iti__selected-dial-code').text();
                    if ($input.val().substring(0, dailCode.length) !== dailCode ) {
                        $input.val(dailCode + ' ' + $input.val());
                        $input.triggerHandler('change');
                    }
                })
            })
        }



    });
});
