/**
 * Initialize typeahead functionality for admin order create form
 */
define(['jquery', 'afdPce', 'Magento_Sales/order/create/form'], function ($) {
  'use strict'

  return function () {
    // Check if typeahead is enabled for admin order creation
    if (!afdOptions.magentoOptions.typeahead.adminCreateOrderEnabled) {
      return
    }

    const shippingTypeaheadContainer = $('#shipping-typeahead')
    const shippingTypeahead = shippingTypeaheadContainer.find(
      '#afd-shipping-typeahead'
    )
    const combineFirstLine =
      window.afdOptions.magentoOptions.typeahead.combineFirstLine

    // Function to show/hide region fields based on country selection
    function showHideRegion(e, country, $postcode) {
      const selectRegionCountries = ['US', 'CA', 'MX', 'CN', 'JP', 'IN', 'BR']
      const $container = $postcode.closest('fieldset')
      const $regionText = $container
        .find('[name$="[region]"]')
        .closest('.field')
      const $regionSelect = $container
        .find('[name$="[region_id]"]')
        .closest('.field')
      const $country = $container.find('[name$="[country_id]"]')

      if (selectRegionCountries.indexOf($country.val()) > -1) {
        $regionText.hide()
        $regionSelect.show()
      } else {
        $regionText.show()
        $regionSelect.hide()
      }
    }

    // Function to populate shipping address fields
    const populateShipping = function () {
      $('#order-shipping_address_fields .field-country_id')
        .detach()
        .insertAfter('#order-shipping_address_fields .field-company')
      shippingTypeaheadContainer
        .detach()
        .insertAfter('#order-shipping_address .field-country_id')
        .show()
      $(
        '#shipping-manual-input, #shipping-manual-input-search, #shipping-search-again'
      )
        .detach()
        .insertAfter('#shipping-typeahead')
      $('#order-shipping_address_company').attr(
        'data-afd-result',
        'Organisation'
      )
      $('#order-shipping_address_street0').attr(
        'data-afd-result',
        combineFirstLine ? 'Property,Street' : 'Property'
      )
      $('#order-shipping_address_street1').attr(
        'data-afd-result',
        combineFirstLine ? 'Locality' : 'Street'
      )
      if (!combineFirstLine) {
        $('#order-shipping_address_street1').attr('data-afd-result', 'Locality')
      }
      $('#order-shipping_address_city').attr('data-afd-result', 'Town')
      $('#order-shipping_address_postcode').attr('data-afd-result', 'Postcode')
      $('#order-shipping_address_region').attr(
        'data-afd-result',
        afdOptions.magentoOptions.typeahead.afdCounty
      )
      $('#order-shipping_address_region_id').attr(
        'data-afd-result',
        afdOptions.magentoOptions.typeahead.afdCounty
      )
      shippingTypeahead.afd('typeahead')
      $('.afd-manual-input-button').triggerHandler('click')
    }

    // Override the setShippingAsBilling method to handle typeahead initialization
    if (typeof window.order !== 'undefined') {
      window.order.setShippingAsBilling = function (flag) {
        let data
        const areasToLoad = [
          'billing_method',
          'shipping_address',
          'shipping_method',
          'totals',
          'giftmessage'
        ]
        this.disableShippingAddress(flag)
        data = this.serializeData(
          flag ? this.billingAddressContainer : this.shippingAddressContainer
        )
        data = data.toObject()
        data['shipping_as_billing'] = flag ? 1 : 0
        data['reset_shipping'] = 1
        // set customer_address_id to null for shipping address in order to treat it as new from backend
        // Checkbox(Same As Billing Address) uncheck event
        data['order[shipping_address][customer_address_id]'] = null
        this.loadArea(areasToLoad, true, data).done(function () {
          populateShipping()
        })
      }
    }

    // Initialize shipping address typeahead
    if ($('#order-shipping_address_fields').length) {
      populateShipping()

      $(document).on('afd:populateResultsComplete', function (e) {
        showHideRegion(e, null, $('#order-shipping_address_postcode'))
      })
    }

    // Initialize billing address typeahead
    afdOptions.typeahead.containerOnlyContainsControl = true
    afdOptions.typeahead.parentClass = 'admin__field'

    $('#order-billing_address_fields .field-country_id')
      .detach()
      .insertAfter('#order-billing_address_fields .field-company')
    $('#billing-typeahead')
      .detach()
      .insertAfter('#order-billing_address_fields .field-country_id')
      .show()
    $(
      '#billing-manual-input, #billing-manual-input-search, #billing-search-again'
    )
      .detach()
      .insertAfter('#billing-typeahead')
    $('#order-billing_address_company').attr('data-afd-result', 'Organisation')
    $('#order-billing_address_street0').attr(
      'data-afd-result',
      combineFirstLine ? 'Property,Street' : 'Property'
    )
    $('#order-billing_address_street1').attr(
      'data-afd-result',
      combineFirstLine ? 'Locality' : 'Street'
    )
    if (!combineFirstLine) {
      $('#order-billing_address_street2').attr('data-afd-result', 'Locality')
    }
    $('#order-billing_address_city').attr('data-afd-result', 'Town')
    $('#order-billing_address_postcode').attr('data-afd-result', 'Postcode')
    $('#order-billing_address_region').attr(
      'data-afd-result',
      afdOptions.magentoOptions.typeahead.afdCounty
    )
    $('#order-billing_address_region_id').attr(
      'data-afd-result',
      afdOptions.magentoOptions.typeahead.afdCounty
    )
    $('#afd-billing-typeahead').afd('typeahead')

    $(document).on('afd:populateRegionIDComplete', function (e) {
      const container = $(e.target).closest('.admin__page-section-item')
      showHideRegion(e, null, container)
    })

    // Handle crown dependency settings
    $(document).on('afd:pceRetrieveComplete', function (e, result) {
      const countryControl = $('#order-billing_address_country_id')

      // crown dependency setting
      if (afdOptions.magentoOptions.typeahead.crownCountries) {
        if (result.CountryISO === 'GBR') {
          switch (result.Country) {
            case 'Isle of Man':
              countryControl.val('IM')
              break
            case 'Jersey':
              countryControl.val('JE')
              break
            case 'Guernsey':
              countryControl.val('GG')
              break
            default:
              countryControl.val('GB')
          }
        }
      }
    })

    // Handle zip+4 formatting for US addresses
    $(document).on('afd:populateResultsComplete', function () {
      const billingAddressCountry = $('#order-billing_address_country_id').val()
      const shippingAddressCountry = $(
        '#order-shipping_address_country_id'
      ).val()
      if (
        !afdOptions.magentoOptions.typeahead.zipPlusFour &&
        billingAddressCountry === 'US'
      ) {
        const originalVal = $('#order-billing_address_postcode').val()
        $('#order-billing_address_postcode').val(originalVal.substr(0, 5))
      }

      if (
        !afdOptions.magentoOptions.typeahead.zipPlusFour &&
        shippingAddressCountry === 'US'
      ) {
        const originalVal = $('#order-shipping_address_postcode').val()
        $('#order-shipping_address_postcode').val(originalVal.substr(0, 5))
      }
      // console.log('hi')
      if (selectRegionCountries.indexOf(billingAddressCountry) > -1) {
        $('#order-billing_address_region').hide()
      } else {
        $('#order-billing_address_region_id').hide()
      }

      if (selectRegionCountries.indexOf(shippingAddressCountry) > -1) {
        $('#order-shipping_address_region').hide()
      } else {
        $('#order-shipping_address_region_id').hide()
      }
    })
  }
})
