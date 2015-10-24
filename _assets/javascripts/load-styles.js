
'use strict';

import { ajax } from 'nanoajax';
import loadCSS from 'imports?undefined=>{document:document}!fg-loadcss';

const STORAGE_PROP = 'ek-styles';
const url = window.STYLES_PATH;

try {
  ajax({
    url,
    method: 'HEAD'
  }, (code, resp, xhr) => {
    const lastModified = new Date(xhr.getResponseHeader('Last-Modified'));
    const cached = JSON.parse(localStorage.getItem(STORAGE_PROP) || '{}');
    if ( cached.lastModified && cached.lastModified >= lastModified ) {
      return insertStyles(cached.content);
    }
    ajax({url}, fetchFreshStyles);
  });
} catch (e) {
  loadStyles();
}

function loadStyles() {
  loadCSS(STYLES_PATH, null, null, () => {
    document.documentElement.className += ' is-content-ready';
  });
}

function insertStyles(content) {
  const elem = document.createElement('style');
  const ref = document.getElementsByTagName('script')[0];
  elem.rel = 'stylesheet';
  elem.type = 'text/css';
  elem.textContent = content;
  ref.parentNode.insertBefore(elem, ref);
  requestAnimationFrame(() => {
    document.documentElement.className += ' is-content-ready';
  });
}

function fetchFreshStyles(code, resp, xhr) {
  const toCache = {
    lastModified: (new Date(xhr.getResponseHeader('Last-Modified'))).getTime(),
    content: resp
  };
  localStorage.setItem(STORAGE_PROP, JSON.stringify(toCache));
  insertStyles(toCache.content);
}
