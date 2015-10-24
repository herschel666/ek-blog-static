
'use strict';

module.exports = function () {
  return function (files, metalsmith, done) {
    Object.keys(files).forEach(function (file) {
      var contents = files[file]
        .contents
        .toString()
        .replace(/\{%\s([a-z]+)\s([^%]+)%\}/ig, function (str, tag, attrs) {
          switch ( tag ) {
          case 'img':
            return makeImage(attrs);
            break;
          default:
            return '';
          }
        });
      files[file].contents = new Buffer(contents);
    });
    setImmediate(done);
  };
}

function makeImage(attrs) {
  attrs = attrs.trim().split(/\s+?/);
  return '<img src="' + attrs.shift() + '" alt="' + attrs.join(' ') + '">';
}
