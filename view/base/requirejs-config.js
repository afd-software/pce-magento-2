// eslint-disable-next-line
var config = {
  paths: {
    afdPce: 'Afd_Pce/js/afd.jquery.1.12.0',
    afdPcePostRender: 'Afd_Pce/js/afd.post.render.jquery.1.11.0.2',
    afdCountry: 'Afd_Pce/js/afd.country.1.0.0',
    afdCountryUtils: 'Afd_Pce/js/country_utils'
  },
  shim: {
    afdPce: {
      deps: ['jquery']
    },
    afdPcePostRender: {
      deps: ['jquery']
    },
    afdCountry: {
      exports: 'afdCountry'
    }
  }
}
