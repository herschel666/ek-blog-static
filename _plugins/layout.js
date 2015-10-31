
'use strict';

module.exports = function _layout() {
  return function (files, metalsmith, done) {
    setImmediate(done);
    Object.keys(files).forEach(function (file) {
      var data = files[file];
      if ( !data.template && data.layout ) {
        data.template = data.layout + '.html';
        delete data.layout;
        files[file] = data;
      }
    });
  };
}
