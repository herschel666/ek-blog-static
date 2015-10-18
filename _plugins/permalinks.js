
'use strict';

var path = require('path');

module.exports = plugin;

function plugin() {
  return function (files, metalsmith, done) {
    setImmediate(done);
    Object.keys(files).forEach(function (file) {
      var data = files[file];
      var date = /^_posts\/(\d{4}-\d{2}-\d{2})/.exec(file);
      var out = file.replace('_pages/', '');
      if ( date && date[1] ) {
        data.date = date[1];
      }
      if ( data.permalink ) {
        out = path.join(data.permalink, 'index.html').replace(/^\//, '');
        data.permalink = out;
      }
      delete files[file];
      files[out] = data;
    });
  };
}
