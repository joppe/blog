System.register(['image-preloader/ImagePreloader.js'], function (_export) {
    'use strict';

    var ImagePreloader, startButton, images, _progress;

    return {
        setters: [function (_imagePreloaderImagePreloaderJs) {
            ImagePreloader = _imagePreloaderImagePreloaderJs.ImagePreloader;
        }],
        execute: function () {
            startButton = document.querySelector('.js-start-preloading');
            images = document.querySelectorAll('.well img');
            _progress = document.querySelector('.js-progress');

            startButton.addEventListener('click', function (event) {
                event.preventDefault();

                var preloader = new ImagePreloader(images);

                _progress.style.width = '0px';

                // Just a small delay to see that is starts from zero
                window.setTimeout(function () {
                    preloader.load({
                        progress: function progress(count, total) {
                            _progress.style.width = total / count * 100 + '%';
                        }
                    });
                }, 1000);
            });
        }
    };
});