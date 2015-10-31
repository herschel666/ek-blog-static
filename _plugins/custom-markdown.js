
'use strict';

module.exports = function () {
  return function (files, metalsmith, done) {
    Object.keys(files).forEach(function (file) {
      const contents = files[file]
        .contents
        .toString('utf8')
        .replace(/\{%\s([a-z]+)\s([^%]+)%\}/ig, function (str, tag, attrs) {
          switch ( tag ) {
          case 'img':
            return makeImage(attrs);
            break;
          default:
            return '';
          }
        });
      files[file].contents = new Buffer(contents, 'utf8');
    });
    setImmediate(done);
  };
}

function makeImage(attrs) {
  attrs = attrs.trim().split(/\s+?/);
  const SOURCE = attrs.shift();
  const ALT = attrs.join(' ');
  return `<noscript data-src="${SOURCE}" data-alt="${ALT}">
    <img src="${SOURCE}" alt="${ALT}">
  </noscript>`;
}
