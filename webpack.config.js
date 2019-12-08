const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const isProdEnv = process.env.NODE_ENV === 'production';
const mode = isProdEnv ? 'production' : 'development';
const watchModeActive = process.argv.includes('--serve');

const SOURCE_ASSETS_PATH = path.join(__dirname, '_assets');
const OUTPUT_ASSETS_PATH = path.join(__dirname, '_site', 'assets');

const plugins = [
  new MiniCssExtractPlugin({
    filename: watchModeActive
      ? '[name].css'
      : '[name].[hash].css',
    chunkFilename: '[id].css',
    ignoreOrder: false, // Enable to remove warnings about conflicting order
  }),
];

if ( isProdEnv ) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    preserveComments: false,
    exclude: /(critical|main)\.css/i
  }));
}

module.exports = {
  watch: watchModeActive,
  context: SOURCE_ASSETS_PATH,
  entry: {
    'index': './javascripts/index.js',
    'critical': './styles/critical.scss',
    'main': './styles/main.scss',
  },
  output: {
    path: OUTPUT_ASSETS_PATH,
    publicPath: './',
    filename: watchModeActive
      ? '[name].js'
      : '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread'],
            },
          },
        ]
      }, {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: !isProdEnv,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')],
            },
          },
          'sass-loader',
        ],
      }, {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5 * 1024,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              disable: !isProdEnv,
            },
          },
        ],
      },
    ],
  },
  plugins,
  mode,
};
