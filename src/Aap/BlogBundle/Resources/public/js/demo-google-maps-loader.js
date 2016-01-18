System.register(['google-maps'], function (_export) {
    /*global document*/

    'use strict';

    var google;
    return {
        setters: [function (_googleMaps) {
            google = _googleMaps['default'];
        }],
        execute: function () {

            new google.maps.Map(document.querySelector('.js-map'), {
                center: {
                    lat: 51.8939035,
                    lng: 4.5209467
                },
                zoom: 17
            });
        }
    };
});