/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

/**
 * @api
 */
define(['jquery', 'Magento_Ui/js/form/components/fieldset'], function (
  $,
  Fieldset
) {
  'use strict'

  return Fieldset.extend({
    /**
     * Extends instance with defaults. Invokes parent initialize method.
     * Calls initListeners and pushParams methods.
     */
    initialize: function () {
      return this._super()
    },

    afdInit: function () {
      require(['jquery', 'afdPce', 'afdCountry', 'afdCountryUtils'], function (
        $,
        afdPce,
        afdCountry,
        afdCountryUtils
      ) {
        // todo find out a solid way to know when fields have finished loading
        window.setTimeout(async function () {
          const countryControlSelector =
            '#customer-new-adddress [name="country_id"]'
          const countryControl = $(countryControlSelector)
          afdOptions.country.customCountryControl = countryControlSelector

          const defaultCountry =
            afdOptions.magentoOptions.typeahead.defaultCountry || 'GB'

          // Initialize advanced country control if enabled
          if (afdOptions.magentoOptions.typeahead.useAdvancedCountryControl) {
            await afdCountryUtils.initCountryControl(countryControlSelector)
            const countryInput = document.querySelector('afd-country-input')
            if (countryInput) {
              countryInput.value = defaultCountry
            }
          }

          if (afdOptions.magentoOptions.typeahead.adminEditCustomerEnabled) {
            afdOptions.typeahead.containerOnlyContainsControl = true
            afdOptions.typeahead.parentClass = 'admin__field'

            const combineFirstLine =
              afdOptions.magentoOptions.typeahead.combineFirstLine
            $('#customer-new-adddress [data-index="country_id"]')
              .detach()
              .insertAfter('#customer-new-adddress [data-index="middlename"]')

            // Update country value through UI Registry (Knockout)
            require(['uiRegistry'], function (registry) {
              registry.async(
                'customer_address_form.customer_address_form.general.country_id'
              )(function (countryComponent) {
                const currentValue = countryComponent.value()

                if (!currentValue || currentValue === '') {
                  countryComponent.value(defaultCountry)
                }
              })
            })
            $('#afd-typeahead')
              .detach()
              .insertAfter('#customer-new-adddress [data-index="country_id"]')
              .show()
            $('#afd-manual-input, #afd-manual-input-search, #afd-search-again')
              .detach()
              .insertAfter('#afd-typeahead')
            $('#customer-new-adddress [name="company"]').attr(
              'data-afd-result',
              'Organisation'
            )
            $('#customer-new-adddress [name="street[0]"]').attr(
              'data-afd-result',
              combineFirstLine ? 'Property,Street' : 'Property'
            )
            $('#customer-new-adddress [name="street[1]"]').attr(
              'data-afd-result',
              combineFirstLine ? 'Locality' : 'Street'
            )
            !combineFirstLine &&
              $('#customer-new-adddress [name="street[2]"]').attr(
                'data-afd-result',
                'Locality'
              )
            $('#customer-new-adddress [name="city"]').attr(
              'data-afd-result',
              'Town'
            )
            $('#customer-new-adddress [name="postcode"]').attr(
              'data-afd-result',
              'Postcode'
            )
            $('#customer-new-adddress [name="region"]').attr(
              'data-afd-result',
              afdOptions.magentoOptions.typeahead.afdCounty
            )
            $('#customer-new-adddress [name="region_id"]').attr(
              'data-afd-result',
              afdOptions.magentoOptions.typeahead.afdCounty
            )
            window.setTimeout(function () {
              $('#afd-typeahead input').afd('typeahead')
            }, 200)

            $(document).on('afd:populateResultsComplete', (e) => {
              showHideRegion(e, null, $('#customer-new-adddress'))
            })

            $(document).on('afd:pceRetrieveComplete', function (e, result) {
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
          }

          if (afdOptions.magentoOptions.phone.adminEditCustomerEnabled) {
            var $phone = $(
              '#customer-new-adddress [data-index="telephone"] input'
            )

            $('#afd-phone-error')
              .detach()
              .insertAfter('#customer-new-adddress [data-index="telephone"]')
            afdOptions.phone.countryControl =
              '#customer-new-adddress [data-index="country_id"]'
            $phone
              .attr('data-afd-additional-options', 'afdPhoneOptions')
              .afd('phone')

            $('#save > span')
              .off('mousedown.afd')
              .on('mousedown.afd', function () {
                $phone.val(
                  $('.iti__selected-dial-code').text() + ' ' + $phone.val()
                )
                $phone.triggerHandler('change')
              })
          }

          if (afdOptions.magentoOptions.typeahead.customCountryCredentials) {
            let overriddenCountries = []

            if (
              afdOptions.magentoOptions.typeahead.customCountryCredentialsUK
            ) {
              overriddenCountries.push('GB')
              $(document).on('afd:countryChanged', function (e, country) {
                window.setTimeout(function () {
                  if (country === 'GB') {
                    window.afdOptions.id =
                      afdOptions.magentoOptions.typeahead.customCountryCredentialsUKID
                    window.afdOptions.token =
                      afdOptions.magentoOptions.typeahead.customCountryCredentialsUKToken
                    $('[data-afd-control="typeahead"]').afd('typeahead')
                  }
                }, 500)
              })
            }

            if (
              afdOptions.magentoOptions.typeahead.customCountryCredentialsIE
            ) {
              overriddenCountries.push('IE')
              $(document).on('afd:countryChanged', function (e, country) {
                window.setTimeout(function () {
                  if (country === 'IE') {
                    window.afdOptions.id =
                      afdOptions.magentoOptions.typeahead.customCountryCredentialsIEID
                    window.afdOptions.token =
                      afdOptions.magentoOptions.typeahead.customCountryCredentialsIEToken
                    $('[data-afd-control="typeahead"]').afd('typeahead')
                  }
                }, 500)
              })
            }

            if (
              afdOptions.magentoOptions.typeahead.customCountryCredentialsUS
            ) {
              overriddenCountries.push('US')
              $(document).on('afd:countryChanged', function (e, country) {
                window.setTimeout(function () {
                  if (country === 'US') {
                    window.afdOptions.id =
                      afdOptions.magentoOptions.typeahead.customCountryCredentialsUSID
                    window.afdOptions.token =
                      afdOptions.magentoOptions.typeahead.customCountryCredentialsUSToken
                    $('[data-afd-control="typeahead"]').afd('typeahead')
                  }
                }, 500)
              })
            }

            $(document).on('afd:countryChanged', function (e, country) {
              window.setTimeout(function () {
                if (overriddenCountries.indexOf(country) < 0) {
                  window.afdOptions.id =
                    afdOptions.magentoOptions.typeahead.customCountryDefaultID
                  window.afdOptions.token =
                    afdOptions.magentoOptions.typeahead.customCountryDefaultToken
                  $('[data-afd-control="typeahead"]').afd('typeahead')
                }
              }, 500)
            })
          }
        }, 1000)
      })
    }
  })
})
