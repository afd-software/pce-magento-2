var config = {
    paths: {
            'afdPce': 'Afd_Pce/js/afd.jquery.1.10.1',
            'afdPcePostRender': 'Afd_Pce/js/afd.post.render.jquery.1.10.1'
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