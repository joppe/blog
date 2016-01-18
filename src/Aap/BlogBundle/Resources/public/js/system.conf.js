/*global System*/

System.config({
    baseURL: '/bundles/aapblog/',

    transpiler: 'babel',

    map: {
        'google-maps-loader': 'vendor/google-maps-loader/dist/google-maps-loader.js'
    },

    paths: {
        'image-preloader/*': 'vendor/image-preloader/dist/image-preloader/*',
        'google-maps': 'http://maps.googleapis.com/maps/api/js'
    },

    meta: {
        'google-maps': {
            build: false,
            loader: 'google-maps-loader'
        }
    }
});