var jsdom = require('jsdom');

// window object for jQuery
global.window = jsdom.jsdom().defaultView;

// Gets around a really annoying "No Transport" error
// related to CORS
global.XMLHttpRequest = global.window.XMLHttpRequest;

// use jsdom window for jQuery
global.$ = global.jQuery = require('jquery')(global.window);
