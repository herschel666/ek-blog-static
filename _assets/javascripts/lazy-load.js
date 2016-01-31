
'use strict';

import { bind } from './vendor/eventie/eventie';
import { subscribe } from './vendor/vanilla-pubsub/PubSub';

let elems = [];

const lazyLoad = () => {
  let i = elems.length - 1;
  const winHeight = window.innerHeight || document.documentElement.clientHeight;
  const yOffset = window.pageYOffset;
  while ( i >= 0 ) {
    if ( elems[i].parentNode.offsetTop < (winHeight + yOffset) ) {
      let elem = document.createElement('p');
      elem.innerHTML = `<img src="${elems[i].getAttribute('data-src')}" ` +
        `alt="${elems[i].getAttribute('data-alt')}">`;
      elems[i].parentNode.replaceChild(elem, elems[i]);
      elems.splice(i, 1);
    }
    i -= 1;
  }
  return lazyLoad;
};

const getElems = () => {
  const allElems = document.getElementsByTagName('noscript');
  const len = allElems.length;
  let i = 0;
  elems.length = 0; // Resetting the array
  for ( ; i < len; i += 1 ) {
    if ( allElems[i].getAttribute('data-src') ) {
      elems.push(allElems[i]);
    }
  }
  setTimeout(() => window.scrollTo(0, 1), 400);
};

getElems();
bind(window, 'scroll', lazyLoad());
subscribe('ek.ajaxify.inserted', getElems);
