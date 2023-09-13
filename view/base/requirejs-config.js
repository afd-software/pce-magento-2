var config = {
    paths: {
            'afdPce': 'Afd_Pce/js/afd.jquery.1.11.0.2.min',
            'afdPcePostRender': 'Afd_Pce/js/afd.post.render.jquery.1.11.0.2.min'
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