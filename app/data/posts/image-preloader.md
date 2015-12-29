# An image preloader in es2015 syntax

Since Flash is dead I see that a lot of techniques that were common in Actionscript, are now used in JavaScript projects. One of those techniques is the preloading of images. 
The goal of preloading is to measure the dimensions and to be sure the image are directly available when you want to render them.

At the beginning of this year I started writing JavaScript in es2015 syntax (or es6/ES.next/harmony whatever you want to call it). I'm hooked, I really like the new features.
I use [babel](https://babeljs.io/) to transpile my es2015 to ecmascript 5 compatible code. For the module loader I use [systemjs](https://github.com/systemjs/systemjs).
When I'm writing JavaScript in es2015 syntax, I try to avoid using jQuery. Don't get me wrong, it's a library I love and that helped me to create a lot of projects, but it is not always needed. All modern browsers now have a compatible JavaScript API, therefore I like to write `document.querySelector('.foo')` instead of `$('.foo')` the same for listening to events.

So I decided to write an image preloader with es2015 syntax without using jQuery.
The end result can be found in this GitHub respository [https://github.com/joppe/image-preloader](https://github.com/joppe/image-preloader).


## Task runner

The hype is to use a task runner (grunt/gulp/etc) to do all sorts of tasks like transpile babel, compile sass or run postcss. I prefer using Makefiles. It is very easy to do and you don't have to learn how to configure a new tool (configuring tools that is something I almost hate as much as Drupal). Using a Makefile doesn't create a new abstraction level, you just label command line scripts.
The comand line to transpile babel is something like this `node_modules/babel/bin/babel.js src --stage 1 --out-dir dist --modules system`.
If you create a Makefile (**use the _TAB_ character instead of spaces!**) just do the following:
```
SHELL := /bin/bash

babel:
	node_modules/babel/bin/babel.js src --stage 1 --out-dir dist --modules system
```

Now you can use on the command line `make babel` to transpile all es2015 files that are located in `src` to the `dist` directory.

The Makefile I used for this project you can find on [github.com/joppe/image-preloader/blob/master/Makefile](https://github.com/joppe/image-preloader/blob/master/Makefile).


## Babel

Get babel with npm `npm install babel`. I always transpile es2015 before loading it in the browser by using a watcher `node_modules/babel/bin/babel.js src --watch --stage 1 --out-dir dist --modules system`. The advantage is that it loads faster, otherwise all the JavaScript has to be transpiled in the browser.


## The script

There are a few options to determine if a given image element is loaded.
The `complete` property of an image tells if the image is already loaded, the `load` event is already fired or the image was loaded from the browsers cache.
If the browser does not support the `complete` property then there is the possibility to check the `naturalWidth` property. If the `naturalWidth` property is defined, the browser knows it's size and therefore the image is loaded.

```
let isLoaded = false;

if (this.image.complete || (typeof this.image.naturalWidth !== 'undefined' && this.image.naturalWidth > 0)) {
    isLoaded = true;
}

return isLoaded;
```

## Demo

<div class="well">
    <p>
        <a href="javascript:void(null);" class="btn btn-primary js-start-preloading">Start preloading</a>
    </p>
    <div class="progress">
        <div class="progress-bar  js-progress" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
            <span class="sr-only"></span>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-6">
            <img src="http://lorempixel.com/400/200/sports/1/" style="width: 100%; height: auto;">
        </div>
        <div class="col-xs-6">
            <img src="http://lorempixel.com/400/200/sports/2/" style="width: 100%; height: auto;">
        </div>
        <div class="col-xs-6">
            <img src="http://lorempixel.com/400/200/sports/3/" style="width: 100%; height: auto;">
        </div>
        <div class="col-xs-6">
            <img src="http://lorempixel.com/400/200/sports/5/" style="width: 100%; height: auto;">
        </div>
    </div>
</div>
<script type="text/javascript">
System.import('js/demo-img-preloader.js');
</script>