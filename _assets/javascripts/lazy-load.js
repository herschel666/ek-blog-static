const lazyLoad = () => {
  const elems = [...document.querySelectorAll('noscript[data-src]')];
  let i = elems.length - 1;
  const winHeight = window.innerHeight || document.documentElement.clientHeight;
  const yOffset = window.pageYOffset;
  while (i >= 0) {
    if (elems[i].parentNode.offsetTop < (winHeight + yOffset)) {
      const elem = Object.assign(
        document.createElement('img'),
        {
          src: elems[i].getAttribute('data-src'),
          alt: elems[i].getAttribute('data-alt'),
        }
      )
      elems[i].parentNode.replaceChild(elem, elems[i]);
      elems.splice(i, 1);
    }
    i -= 1;
  }
  return lazyLoad;
};

window.addEventListener('scroll', lazyLoad());
