
'use strict';

const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const isProdEnv = process.env.NODE_ENV === 'production';

const SOURCE_ASSETS_PATH = path.join(__dirname, '_assets');
const OUTPUT_ASSETS_PATH = path.join(__dirname, '_site', 'assets');

const plugins = [
  new webpack.optimize.DedupePlugin(),
  new ExtractTextPlugin('[name].[hash].css', {
    sourceMap: false,
    allChunks: true,
    relaxInvalidOrder: true
  })
];

if ( isProdEnv ) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    preserveComments: false,
    exclude: /(critical|main)\.css/i
  }));
}

module.exports = {
  context: SOURCE_ASSETS_PATH,
  entry: {
    'index': './javascripts/index.js',
    'load-styles': './javascripts/load-styles.js',
    'critical': './styles/critical.scss',
    'main': './styles/main.scss'
  },
  output: {
    path: OUTPUT_ASSETS_PATH,
    publicPath: './',
    filename: '[name].[hash].js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel?presets[]=es2015'
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(
        'css?root=~&-url' + (isProdEnv ? '&minify' : '') + '!' +
        'autoprefixer!' +
        'sass'
      )
    }, {
      test: /\.(jpe?g|png|gif|svg)$/,
      loader: 'url?limit=' + (5 * 1024) + '&name=--img--/[sha512:hash:base64:24].[ext]' +
        (isProdEnv ? '!image-webpack?optimizationLevel=7&interlaced=true' : '')
    }]
  },
  resolve: {
    modulesDirectories: ['node_modules']
  },
  resolveLoader: {
    root: [path.join(__dirname, 'node_modules')]
  },
  plugins: plugins
};
