var config = {
    paths: {
        'afdPce': "Afd_Pce/js/afd.jquery.1.8.4",
        'afdPceTypeahead': "Afd_Pce/js/afd.typeahead.jquery",
        'afdPcePostRender': "Afd_Pce/js/afd.post.render.jquery.1.8.4"
    },
    shim: {
        'afdPce': {
            deps: ['jquery']
        },
        'afdPceTypeahead': {
            deps: ['jquery']
        },
        'afdPcePostRender': {
            deps: ['jquery']
        }
    }
};