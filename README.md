<img alt="AFD Software" src="http://www.afd.co.uk/img/200/logo.png" align="left">

# Magento 2 Integration

## Introduction

The AFD PCE Magento module harnesses the power of our powerful "Postcode Evolution" engine and makes it available in the world's most popular eCommerce platform.

## Key Features

* Streamline address entry at checkout with typeahead address searching.
* Enhanced email address validation using AFD Software's [email validation service](http://www.afd.co.uk/email).
* Phone number validation and masking using AFD Software's [phone number validation service](https://www.afd.co.uk/phone).
* Expanded address data collection such as geolocation, geodemographics and deprivation indexes that can be used to segment and analyse customer data.
* Seamless integration with our lightning fast Postcode Evolution API.
* Clear the clutter on the checkout page by only showing address fields that are relevant to the user.

If you require AFD functionality to work in a different way or on a different page, we would love to hear from you and tailor the integration so it fits your requirements.

## Get Started

To get started with AFD Software's Magento integration you will need authentication credentials.  If you don't yet have authentication credentials contact our sales team on +44 (0)1624 811 711 or email us at [postcode@afd.co.uk](mailto:postcode@afd.co.uk).

* Install the module via composer `composer require afd/module-pce`
* 

## Typeahead

<img src="https://www.afd.co.uk/img/480/integrations/magento-typeahead.png" align="right">

Typeahead address searching makes inputting addresses a much more pleasent experience for the customer and ensures that the data that is collected is accurate - essential for ecommerce.

Typeahead is available on the following forms:

* Checkout - Shipping and Billing
* My Account - Address Management

Our Magento typeahead plugin comes equipped with these great features:

* Easy and accurate address entry using these data sets:
  * UK addresses via [PAF](http://www.afd.co.uk/data-sets/paf/)
  * Republic of Ireland Addresses via [Eircode](http://www.afd.co.uk/data-sets/eircode/)
  * Rest of world via [WorldAddress](http://www.afd.co.uk/products/worldaddress/)
* Restructure address forms to optimise for address searching with the following options:
  * Enable searching for only a specifc set of countries or all countries
  * Hide address fields until search is complete and continue to hide any blank fields
  * Move country field to the top of the address form
  * Manual input option in case user wants to input manually or addrsss could not be found
  * Hide search field after address retrieve is complete
  * Hide region field for countries that do not require region as part of their address (e.g. UK)
* Consise searching:
  * Highlight the segment of the results that match the serach string
  * Set the number of search results shown

## Email Address Validation

<img src="https://www.afd.co.uk/img/360/integrations/magento-email.png" align="right">

AFD Software's [email validation](http://www.afd.co.uk/email/) service can not only check whether or not the syntax of an email address is valid, but also if it is a genuine live email address.  

After an email address is entered into an email address control, as soon as the control loses focus our plugin will first check the syntax of the email address is correct, if the syntax is valid a request will be sent to the AFD servers to check whether or not the email address is real.  If at either point the result is invalid then the form control will become invalid and an error message will be displayed.

This functionality is available on the following forms:
  
* Checkout - Logged Out
* Create New Account
* My Account - Change email address
* Contact Us
* Newsletter Signup
  
Email validation is a valuable merchants tool for merchants as it helps prevent typos in email addresses forms and help prevent fraud.

Our module comes equipped with the following customisation options:
  
* Enable and disable functionality individually for each form
* Customise error message that is shown when an email address is invalid

## Phone Number Validation

<img src="https://www.afd.co.uk/img/360/integrations/magento-phone.png" align="right">

AFD Software's [phone number validation](http://www.afd.co.uk/phone/) service can not only check whether or not the format of a phone number is valid, but also if it is a genuine active phone number.

When a phone number is entered into a phone number form control, once the control loses focus, the AFD Magento module will first check whether or not the format of the phone number is correct.  If the format is correct then a request will be sent to AFD's server to check whether or not the phone number is real.  If at either point the result is that the phone number is not valid, the form field will be marked as invalid and an error message will be displayed.

Additionally the field will mask the phone number so that it is displayed in the standard format for that country.  For example, UK phone number `01624811711` will be reformatted to `01624 811 711`.

This functionality is available on the following forms:

* Checkout - Shipping and Billing
* My Acount - Address Management
* Contact Us

Our module comes equipped with the following customisation options:
  
* Enable and disable functionality individually for each form
* Customise error message that is shown when a phone number is invalid
* Set a default country that will be assumed if no international dialing code is entered

## Additional Information

*This feature is only available to merchants that use Magento Enterprise Edition*

When using typeahead searching on the frontend it is possible to capture additional information associated with the captured address.  This additional information includes:

* All standard [AFD Postcode Plus](http://www.afd.co.uk/comparison/) data
* AFD Software's [Censation](http://www.afd.co.uk/data-sets/censation/) geodemographic data set
* Occupancy Information
* Multiple Deprivation Indexes

The data collected is assigned to Magento native "Custom Customer Address Attributes" and so can then be used for filtering and segmenting customers to help analysis and marketing.

The screenshot below is an example of how the data is displayed on the order page in the admin panel.

<img src="https://www.afd.co.uk/img/1080/integrations/magento-censation.png">
