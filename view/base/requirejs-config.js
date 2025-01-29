var config = {
    paths: {
        'afdPce': 'Afd_Pce/js/afd.jquery.1.11.3.min',
        'afdPcePostRender': 'Afd_Pce/js/afd.post.render.jquery.1.11.3.min',
        'afdAlpine': 'Afd_Pce/js/afd.alpine.js'
    },
    shim: {
        'afdPce': {
            deps: ['jquery']
        },
        'afdPcePostRender': {
            deps: ['jquery']
        }
    }
};