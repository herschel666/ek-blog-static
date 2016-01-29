
(function (EK_FOO) {

  'use strict';

  var STORAGE_PREFIX = 'ek-styles-';
  var STORAGE_PROP = STORAGE_PREFIX + EK_FOO.build;

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

  function fetchFreshStyles(code, resp) {
    Object.keys(localStorage).forEach(function (item) {
      if (item.indexOf(STORAGE_PREFIX) > -1) {
        localStorage.removeItem(item);
      }
    });
    localStorage.setItem(STORAGE_PROP, resp);
    insertStyles(resp);
  }

  if (localStorage[STORAGE_PROP] && !EK_FOO.isDev) {
    return insertStyles(localStorage[STORAGE_PROP]);
  }

  nanoajax.ajax(EK_FOO.mainCSS + '?' + EK_FOO.build, fetchFreshStyles);

})(window.EK_FOO);
