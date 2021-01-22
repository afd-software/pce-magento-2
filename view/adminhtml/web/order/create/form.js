/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

/* global AdminOrder */
define([
    'jquery',
    'Magento_Sales/order/create/scripts'
], function (jQuery) {
    'use strict';

    var $el = jQuery('#edit_form'),
        config,
        baseUrl,
        order,
        payment;

    if (!$el.length || !$el.data('order-config')) {
        return;
    }

    config = $el.data('order-config');
    baseUrl = $el.data('load-base-url');


    if (afdOptions.magentoOptions.phone.adminCreateOrderEnabled) {

        // overwrite the prototype of the before submit function to add the country code to the phone number
        AdminOrder.prototype._realSubmit = function () {
            var disableAndSave = function () {
                disableElements('save');
                jQuery('#edit_form').on('invalid-form.validate', function () {
                    enableElements('save');
                    jQuery('#edit_form').trigger('processStop');
                    jQuery('#edit_form').off('invalid-form.validate');
                });

                var shippingDialCode = jQuery('#order-shipping_address .iti__selected-dial-code').text();
                var billingDialCode = jQuery('#order-billing_address .iti__selected-dial-code').text();

                jQuery('#order-billing_address_telephone').val(billingDialCode + ' ' + jQuery('#order-billing_address_telephone').val());
                jQuery('#order-shipping_address_telephone').val(shippingDialCode + ' ' + jQuery('#order-shipping_address_telephone').val());

                jQuery('#edit_form').triggerHandler('save');

            }
            if (this.orderItemChanged) {
                var self = this;

                jQuery('#edit_form').trigger('processStop');

                confirm({
                    content: jQuery.mage.__('You have item changes'),
                    actions: {
                        confirm: function () {
                            jQuery('#edit_form').trigger('processStart');
                            disableAndSave();
                        },
                        cancel: function () {
                            self.itemsUpdate();
                        }
                    }
                });
            } else {
                disableAndSave();
            }
        }

    }

    order = new AdminOrder(config);
    order.setLoadBaseUrl(baseUrl);

    payment = {
        switchMethod: order.switchPaymentMethod.bind(order)
    };

    window.order = order;
    window.payment = payment;
});
