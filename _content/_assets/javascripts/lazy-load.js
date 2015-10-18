
(function (elems) {

  "use strict";

  var elems;

  function lazyLoad() {
    var i = elems.length - 1,
        winHeight = window.innerHeight || document.documentElement.clientHeight,
        yOffset = window.pageYOffset,
        elem;
    while ( i >= 0 ) {
      if ( elems[i].parentNode.offsetTop < (winHeight + yOffset) ) {
        elem = document.createElement('p');
        elem.innerHTML = '<img src="' + elems[i].getAttribute('data-src') + '" ' +
          'alt="' + elems[i].getAttribute('data-alt') + '">';
        elems[i].parentNode.replaceChild(elem, elems[i]);
        elems.splice(i, 1);
      }
      i -= 1;
    }
    return lazyLoad;
  }

  function getElems() {
    var allElems = document.getElementsByTagName('noscript'),
        len = allElems.length,
        i = 0
    elems = [];
    for ( ; i < len; i += 1 ) {
      if ( allElems[i].getAttribute('data-src') ) {
        elems.push(allElems[i]);
      }
    }
    setTimeout(function () {
      window.scrollTo(0, 1);
    }, 400);
  }

  getElems();
  eventie.bind(window, 'scroll', lazyLoad());
  PubSub.subscribe('ek.ajaxify.inserted', getElems);

})();
