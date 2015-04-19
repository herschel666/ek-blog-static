
(function () {

  "use strict";

  var lightbox,
      elems;

  if ( !window.matchMedia || !matchMedia('screen and (min-width: 600px)').matches ) {
    return;
  }

  lightbox = new Lightbox();
  elems = [];

  function getElems() {
    var all = document.getElementsByTagName('a'),
        len = all.length,
        i = 0;
    elems.length = 0;
    for ( ;  i< len; i += 1 ) {
      if ( all[i].getAttribute('rel') === 'lightbox' ) {
        elems.push(all[i]);
      }
    }
  }

  /** @param  {Boolean} [doBind] Default: true */
  function toggleBinding(doBind) {
    var methd = doBind === false ? 'unbind' : 'bind',
        i = 0,
        len = elems.length;
    for ( ; i < len; i += 1 ) {
      eventie[methd](elems[i], 'click', openLightbox);
    }
  }

  function openLightbox(evnt) {
    evnt.preventDefault && evnt.preventDefault();
    lightbox.open(this.href);
    return false;
  }

  lightbox.load();
  getElems();
  toggleBinding();
  PubSub.publish('ek.ajaxify.triggered', function () {
    toggleBinding(false);
  });
  PubSub.subscribe('ek.ajaxify.inserted', [getElems, toggleBinding]);

})();
