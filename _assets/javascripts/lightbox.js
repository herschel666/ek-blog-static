import * as basicLightbox from 'basiclightbox';

let closeLightbox = null;

const elems = [...document.querySelectorAll('a[rel="lightbox"]')];

const closeOnEsc = ({ key }) => {
  if (typeof closeLightbox === 'function' && key === 'Escape') {
    closeLightbox();
  }
};

const bindCloseOnEsc = () => document.addEventListener('keyup', closeOnEsc);

const unbindCloseOnEsc = () =>
  document.removeEventListener('keyup', closeOnEsc);

if (window.matchMedia && matchMedia('screen and (min-width: 600px)').matches) {
  elems.forEach((elem) =>
    elem.addEventListener('click', (evnt) => {
      evnt.preventDefault();
      const { href: src } = evnt.currentTarget;
      const { alt } = evnt.currentTarget.querySelector('img');
      const instance = basicLightbox.create(
        `<img src="${src}" alt="${alt}" />`,
        {
          onShow: bindCloseOnEsc,
          onClose: unbindCloseOnEsc,
        }
      );

      closeLightbox = instance.close;
      instance.show();
    })
  );
}
