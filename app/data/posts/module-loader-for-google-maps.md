# Google maps loader for SystemJS

## Introduction

When I wanted to use [Google Maps](https://developers.google.com/maps/documentation/javascript/3.exp/reference) in an es6 project, I ran into the problem that I didn't knew how to include the script.
This is because when you include the script (`https://maps.googleapis.com/maps/api/js`) it does not provide all the JavaScript directly, it creates a couple of new script tags that load other JavaScript files. When all these scripts are loaded a callback function is called that indicates that Google Maps is ready to use. The name of the callback function that is called can be set by defining it as a get parameter in the request for the initial script e.g. `https://maps.googleapis.com/maps/api/js?callback=foo`, when the script is ready, the function `foo` will be called.
Luckily it is possible to define custom loaders in es6. SystemJS supports all of these features and makes it easy to make custom loaders for specific scripts by creating plugins.


## The theory

The loader in es6 works like a pipeline. Each step in the process produces an output that is used by the next step in the pipeline. For each step a hook can be defined to override the default behavior.
The pipeline consists of the following steps:

- Normalize, get the normalized name of the resource.
- Locate, get the url of the file name to load.
- Fetch, load the content of the url.
- Translate, make any source modifications.
- Instantiate, determine its dependencies, and how to execute it.

Each step/hook can either return a result directly, or a promise for the result ([source: es6-module-loader/docs/loader-extensions.md](https://github.com/ModuleLoader/es6-module-loader/blob/master/docs/loader-extensions.md)).


## SystemJS plugin

To create a loader for Google Maps, we have to hook into the fetch step. Because when we fetch the url and the script is loaded, the dynamicly created script tags are not loaded. A promise must be returned that will resolve when the callback function is called by the Google Maps script.
When the fetching of the source is successful the `then` method of the returned promise is invoked and returns the string `module.exports = google`. The `module.exports = google` string is used as input for the next step, the `translate` step, in the loader pipeline. With this string we tell that the global `google`, that is available after loading the Google Maps api, will be exported using [CommonJS syntax](https://github.com/systemjs/systemjs/blob/master/docs/module-formats.md#module-format-detection).

The use of the plugin can be done in two ways:

- When configuring SystemJS.
    ```
    System.config({
      // locate the plugin via map configuration
      // (alternatively have it in the baseURL)
      map: {
        text: '/path/to/text-plugin.js'
      },
      // use meta configuration to reference which modules
      // should use the plugin loader
      meta: {
        'templates/*.html': {
          loader: 'text'
        }
      }
    });
    ```
- When importing a module
    `System.import('some/file.txt!text')`, the exclamation mark separates the url of the module and the loader.


## The result

I have created a [plugin](https://github.com/joppe/google-maps-loader) for SystemJS to load Google Maps, it is heavily inspired by the plugin from [Heinrich Filter](https://github.com/HeinrichFilter/systemjs-plugin-googlemaps/blob/master/googlemaps.js). I could have just used his script, but I wanted to know how it works :) so I wrote my own.

To use the plugin configure SystemJS.

```
System.config({
    baseURL: '../',

    transpiler: 'babel',

    map: {
        'google-maps-loader': 'dist/google-map-loader.js'
    },

    paths: {
        'google-maps': 'http://maps.googleapis.com/maps/api/js'
    },

    meta: {
        'google-maps': {
            build: false,
            loader: 'google-maps-loader'
        }
    }
});
```

And import in every script you like.
```
import google from 'google-maps';

new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
});
```


## Testing

When I wanted to test the code using [Karma](http://karma-runner.github.io/0.12/index.html) and [Jasmine](http://jasmine.github.io/), I ran into the problem that all files that need to be loaded, are loaded using XMLHttpRequest. Because the Google Maps script is hosted on an other domain, the callback function cannot be executed ([xss](https://en.wikipedia.org/wiki/Cross-site_scripting)). To enable using the callback function a `Access-Control-Allow-Origin *` header must be sent with the Google Maps script file.
Therefore I created a reverse proxy in nginx. I added the following snippet to the config of my localhost.

```
location /google-maps {
    proxy_pass http://maps.googleapis.com/maps/api;
    add_header Access-Control-Allow-Origin *;
}
```

Now the google maps api can be loaded by this url `http://localhost/google-maps/js` instead of `http://maps.googleapis.com/maps/api/js`.
The header is still needed, because the karma server is on localhost:9876 and therefore not the same domain as localhost:80.


## Demo

<div class="well">
    <div class="js-map" style="width: 100%; height: 500px;"></div>
</div>
<script type="text/javascript">
System.import('js/demo-google-maps-loader.js');
</script>

## References

### es6 module loader

- [https://github.com/ModuleLoader/es6-module-loader/blob/master/docs/loader-extensions.md](https://github.com/ModuleLoader/es6-module-loader/blob/master/docs/loader-extensions.md)
- [https://github.com/systemjs/systemjs/blob/master/docs/creating-plugins.md](https://github.com/systemjs/systemjs/blob/master/docs/creating-plugins.md)
- [https://github.com/systemjs/systemjs/issues/314](https://github.com/systemjs/systemjs/issues/314)

### Promises

- [http://www.html5rocks.com/en/tutorials/es6/promises/](http://www.html5rocks.com/en/tutorials/es6/promises/)
- [http://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html](http://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html)
