var config = {
    paths: {
            'afdPce': 'Afd_Pce/js/afd.jquery.1.10.2',
            'afdPcePostRender': 'Afd_Pce/js/afd.post.render.jquery.1.10.2'
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