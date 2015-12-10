import {ImagePreloader} from 'image-preloader/ImagePreloader.js';

let startButton = document.querySelector('.js-start-preloading'),
    images = document.querySelectorAll('.well img'),
    progress = document.querySelector('.js-progress');

startButton.addEventListener('click', (event) => {
    event.preventDefault();

    let preloader = new ImagePreloader(images);

    progress.style.width = '0px';

    // Just a small delay to see that is starts from zero
    window.setTimeout(() => {
        preloader.load({
            progress(count, total) {
                progress.style.width = ((total / count) * 100) + '%';
            }
        });
    }, 1000);
});
