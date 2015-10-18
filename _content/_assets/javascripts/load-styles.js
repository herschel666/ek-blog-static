
"use strict";

var STORAGE_PROP = 'ek-styles';
var STYLES_PATH = '/_assets/styles/main.css';

try {
  nanoajax.ajax({
    url: STYLES_PATH,
    method: 'HEAD'
  }, function (code, resp, xhr) {
    var lastModified = new Date(xhr.getResponseHeader('Last-Modified')),
        cached = JSON.parse(localStorage.getItem(STORAGE_PROP) || '{}');
    if ( cached.lastModified && cached.lastModified >= lastModified ) {
      return insertStyles(cached.content);
    }
    nanoajax.ajax(STYLES_PATH, fetchFreshStyles);
  });
} catch (e) {
  loadStyles();
}

function loadStyles() {
  loadCSS(STYLES_PATH, null, null, function () {
    document.documentElement.className += ' is-content-ready';
  });
}

function insertStyles(content) {
  var elem = document.createElement('style'),
      ref = document.getElementsByTagName('script')[0];
  elem.rel = 'stylesheet';
  elem.type = 'text/css';
  elem.textContent = content;
  ref.parentNode.insertBefore(elem, ref);
  requestAnimationFrame(function () {
    document.documentElement.className += ' is-content-ready';
  });
}

function fetchFreshStyles(code, resp, xhr) {
  var toCache = {
    lastModified: (new Date(xhr.getResponseHeader('Last-Modified'))).getTime(),
    content: resp
  };
  localStorage.setItem(STORAGE_PROP, JSON.stringify(toCache));
  insertStyles(toCache.content);
}