define(['jquery', 'Magento_Sales/order/create/form'], function () {
  'use strict'

  /**
   * Initialize the order form account fields binding
   *
   * @param {Object} config - Configuration object
   * @param {String} config.accountFieldsId - ID of the account fields container
   */
  return function (config) {
    // The 'order' object is globally defined in Magento_Sales/order/create/form
    // eslint-disable-next-line no-undef
    if (typeof order !== 'undefined' && order.accountFieldsBind) {
      // eslint-disable-next-line no-undef
      order.accountFieldsBind(document.getElementById(config.accountFieldsId))
    } else {
      console.warn('Order object or accountFieldsBind method not available')
    }
  }
})
