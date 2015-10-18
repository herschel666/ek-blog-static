
'use strict';

var sass = require('node-sass');
var path = require('path');

module.exports = function _criticalCSS() {
  return function (files, metalsmith, done) {
    var metadata = metalsmith.metadata();
    sass.render({
      file: path.join(process.env.PWD, '_content', '_assets', 'styles', 'critical.scss'),
      outputStyle: metadata.production ? 'compressed' : 'expanded'
    }, function (err, result) {
      if ( err ) {
        throw Error(err);
      }
      metadata.criticalCSS = result.css.toString();
      setImmediate(done);
    });
  };
};
