/*global document*/

import google from 'google-maps';

new google.maps.Map(document.querySelector('.js-map'), {
    center: {
        lat: 51.8939035,
        lng: 4.5209467
    },
    zoom: 17
});