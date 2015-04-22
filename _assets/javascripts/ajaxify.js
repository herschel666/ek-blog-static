
(function (ersGuderJunge) {

  "use strict";

  var FEED_PATH,
      MAIN_CONTENT_ID,
      MAIN_TITLE_ID;

  var cache,
      root,
      slice;

  if ( !ersGuderJunge ) {
    return;
  }

  FEED_PATH = 'feed.xml';
  MAIN_CONTENT_ID = 'main-content';
  MAIN_TITLE_ID = 'main-title';

  root = document.documentElement;
  slice = Array.prototype.slice;
  cache = {};
  cache[location.pathname] = root.innerHTML;

  document.addEventListener('click', function (evnt) {
    if ( !/^a$/i.test(evnt.target.nodeName) ||
      evnt.target.href.indexOf(location.host) === -1 ||
      evnt.target.href.indexOf(FEED_PATH) > -1 ) {
      return;
    }
    evnt.preventDefault();
    PubSub.publish('ek.ajaxify.triggered');
    onLinkClick.call(evnt.target);
  });

  window.addEventListener('popstate', function (evnt) {
    if ( evnt.state ) {
      removeContentReadyClass();
      setTimeout(insertContent.bind(null, evnt.state), 200);
    }
  }, false);

  function insertContent(obj) {
    document.title = obj.title;
    document.getElementById(MAIN_TITLE_ID).textContent = obj.headline;
    document.getElementById(MAIN_CONTENT_ID).innerHTML = obj.content;
    requestAnimationFrame(function () {
      root.className += ' is-content-ready';
      PubSub.publish('ek.ajaxify.inserted');
    });
  }

  function removeContentReadyClass() {
    root.className = root.className.replace(/\b\s?is-content-ready\b/i, '');
  }

  function onLinkClick() {
    var that = this;
    window.scrollTo(0, 0);
    requestAnimationFrame(function () {
      removeContentReadyClass();
      document.getElementById(MAIN_TITLE_ID).textContent = '';
      fetchPage(that.pathname, function (response) {
        var dp = new DOMParser(),
            frag = dp.parseFromString(response, 'text/html'),
            state = {
              title: frag.title.trim(),
              headline: frag.getElementById(MAIN_TITLE_ID).textContent.trim(),
              content: frag.getElementById(MAIN_CONTENT_ID).innerHTML.trim()
            };
        history.pushState(state, state.title, that.pathname);
        requestAnimationFrame(insertContent.bind(null, state));
      });
    });
    return false;
  }

  function fetchPage(path, cb) {
    if ( cache[path] ) {
      return setTimeout(cb.bind(null, cache[path]), 180);
    }
    nanoajax.ajax(path, function (code, response, xhr) {
      if ( !/^(text\/html)$/i.test(xhr.getResponseHeader('Content-type')) ) {
        location.href = path;
        return;
      }
      cache[path] = response;
      cb(response);
    });
  }

})('pushState' in history);
