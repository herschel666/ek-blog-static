
'use strict';

import eventie from './vendor/eventie/eventie';
import { publish, subscribe } from './vendor/vanilla-pubsub/PubSub';
import Lightbox from 'exports?Lightbox!./vendor/jsonlylightbox/js/lightbox';

let lightbox;
let elems;

const getElems = () => {
  const all = document.getElementsByTagName('a');
  const len = all.length;
  let i = 0;
  elems.length = 0;
  for ( ;  i< len; i += 1 ) {
    if ( all[i].getAttribute('rel') === 'lightbox' ) {
      elems.push(all[i]);
    }
  }
};

/** @param  {Boolean} [doBind] Default: true */
const toggleBinding = (doBind) => {
  const methd = doBind === false ? 'unbind' : 'bind';
  const len = elems.length;
  let i = 0;
  for ( ; i < len; i += 1 ) {
    eventie[methd](elems[i], 'click', openLightbox);
  }
};

function openLightbox(evnt) {
  typeof evnt.preventDefault === 'function' && evnt.preventDefault();
  lightbox.open(this.href);
  return false;
}

if ( window.matchMedia && matchMedia('screen and (min-width: 600px)').matches ) {
  lightbox = new Lightbox();
  elems = [];
  lightbox.load();
  getElems();
  toggleBinding();
  publish('ek.ajaxify.triggered', function () {
    toggleBinding(false);
  });
  subscribe('ek.ajaxify.inserted', [getElems, toggleBinding]);
}
