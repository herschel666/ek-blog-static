
'use strict';

import { bind } from './vendor/eventie/eventie';

const doc = document;

let disqusLoaded = false;
let initialLoad = true;

window.disqus_shortname = 'emklblog';

const insertDisqus = (evnt) => {
  if ( evnt.target.id !== 'ek-disqus-trigger' ) {
    return;
  }
  evnt.target.parentNode.id = 'disqus_thread';
  evnt.target.parentNode.removeChild(evnt.target);
  loadDisqus(() => {
    if ( !initialLoad ) {
      window.DISQUS && DISQUS.reset({
        reload: true,
        config: function () {
          this.page.identifier = location.pathname;
          this.page.url = location.href;
        }
      });
    }
    initialLoad = false;
  });
};

const loadDisqus = (cb) => {
  let dsq;
  if ( disqusLoaded ) {
    return cb();
  }
  dsq = doc.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
  dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js'; dsq.id = 'disqus-script';
  dsq.onreadystatechange = dsq.onload = () => {
    if ( !cb.done && (!dsq.readyState || /loaded|complete/.test(dsq.readyState)) ) {
      dsq.onreadystatechange = dsq.onload = null;
      disqusLoaded = true;
      cb.done = true;
      cb();
    }
  };
  doc.getElementsByTagName('head')[0].appendChild(dsq);
};

bind(doc, 'click', insertDisqus);
