define([], function () {
  'use strict'
  let value = '{}'

  return {
    set(data) {
      // accept object or string; always store a JSON string
      value = typeof data === 'string' ? data : JSON.stringify(data || {})
    },
    get() {
      return value || '{}'
    },
    clear() {
      value = '{}'
    }
  }
})
