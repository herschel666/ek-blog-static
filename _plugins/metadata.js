
'use strict';

module.exports = function _metadata() {
  return function (files, metalsmith, done) {
    setImmediate(done);
    Object.keys(files).forEach(function (file) {
      var metadata = metalsmith.metadata();
      delete metadata.posts;
      files[file].metadata = metadata;
    });
  };
};
