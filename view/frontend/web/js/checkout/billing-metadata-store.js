define([], function () {
  'use strict'
  let value = null

  return {
    set(data) {
      value = data
    },
    get() {
      return value
    },
    clear() {
      value = null
    }
  }
})
