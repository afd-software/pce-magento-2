var config = {
    paths: {
            'afdPce': 'Afd_Pce/js/afd.jquery.1.10.3',
            'afdPcePostRender': 'Afd_Pce/js/afd.post.render.jquery.1.10.3'
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