
'use strict';

var path = require('path');
var webpack = require('webpack');
var chalk = require('chalk');
var async = require('async');
var mkdirp = require('mkdirp');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var realFs = require('fs');
var fsObj = {};
var MemoryFS = require('memory-fs');
var fs = new MemoryFS(fsObj);

var isProduction = process.env.NODE_ENV === 'production';
var projBaseDir = null;
var projOutputDir = null;
var options = null;
var loaders = [];

var plugins = [
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin('[name]', {
        sourceMap: false,
        allChunks: true,
        relaxInvalidOrder: true
    })
];

if ( isProduction ) {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = function (opts) {
  options = opts || {};
  if ( options.es2015 ) {
    loaders.push({
      test: /\.js$/,
      loader: 'babel'
    });
  }
  if ( options.sass ) {
    var indentedSyntax = options.sass.indentedSyntax;
    loaders.push({
      test: new RegExp('.' + (indentedSyntax ? 'sass' : 'scss') + '$'),
      loader: ExtractTextPlugin.extract('css?root=~!autoprefixer!sass' +
        (indentedSyntax ? '?indentedSyntax' : ''))
    });
  }
  return assets;
};

function assets(files, metalsmith, done) {

  projBaseDir = path.join(metalsmith.path());
  projOutputDir = path.resolve(projBaseDir, metalsmith.destination());
  options.output.path = path.join(projOutputDir, options.output.path);
  mkdirp.sync(options.output.path);

  var compiler = webpack({
    entry: options.entry,
    output: options.output,
    module: {
      loaders: loaders
    },
    resolve: {
      modulesDirectories: [
        'node_modules',
        'bower_components'
      ]
    },
    resolveLoader: {
      root: [path.join('..', __dirname, 'node_modules')]
    },
    plugins: plugins
  });
  compiler.outputFileSystem = fs;

  compiler.run(function (err, stats) {
    if ( err  ) {
      console.log(chalk.red(err));
      return done();
    }
    var jsonStats = stats.toJson();
    if ( jsonStats.errors.length ) {
      jsonStats.errors.forEach(function (error) {
        console.error(chalk.red(error));
      });
    }
    if ( jsonStats.warnings.length ) {
      jsonStats.warnings.forEach(function (warning) {
        console.warn(chalk.yellow(warning));
      });
    }
    writeAssetsToFiles(files, jsonStats, metalsmith, done);
  });

}

function writeAssetsToFiles(files, stats, metalsmith, finished) {
  var assets = {};
  async.each(stats.assets, function (asset, done) {
    var baseFilePath = path.resolve(options.output.path, asset.name);
    var filePath = path.relative(projOutputDir, baseFilePath);
    var content = fs.readFileSync(baseFilePath);
    assets[asset.name] = {
      path: filePath,
      content: content.toString()
    };
    realFs.writeFile(
      baseFilePath,
      content,
      {encoding: 'utf8'},
      done);
  }, function (err) {
    if ( err ) {
      return finished(err);
    }
    Object.keys(files).forEach(function (file) {
      files[file].assets = assets;
    });
    setImmediate(finished);
  });
}
