
'use strict';

const path = require('path');
const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const customMarkdown = require('./_plugins/custom-markdown');
const metadata = require('./_plugins/metadata');
const permalinks = require('./_plugins/permalinks');
const layout = require('./_plugins/layout');
const posts = require('./_plugins/posts');
const assets = require('./_plugins/assets');
const templates = require('metalsmith-templates');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const WEBSITE_URL = IS_PRODUCTION ?
  'http://www.emanuel-kluge.de' :
  'http://localhost:8080';
const SOURCE = path.join(__dirname, './_content');
const DESTINATION = path.join(__dirname, './_site');

Metalsmith(__dirname)
  .source(SOURCE)
  .destination(DESTINATION)
  .clean(true)
  .metadata({
    production: IS_PRODUCTION,
    baseurl: WEBSITE_URL,
    title: 'Emanuel Kluge',
    description: 'Beiträge zum Thema JS, HTML, CSS & anderem Kram',
    google_plus: 'Emanuel.Kluge'
  })
  .use(markdown())
  .use(customMarkdown())
  .use(metadata())
  .use(permalinks())
  .use(layout())
  .use(posts())
  .use(assets({
    entry: {
      'main.js': './_assets/javascripts/main.js',
      'load-styles.js': './_assets/javascripts/load-styles.js',
      'main.css': './_assets/styles/main.scss',
      'critical.css': './_assets/styles/critical.scss'
    },
    output: {
      path: './assets',
      filename: '[name]'
    },
    es2015: true,
    sass: true
  }))
  .use(templates({
    engine: 'swig',
    directory: '_layouts'
  }))
  .build((err) => {
    if ( err ) {
      console.log(`${err.message}\n=======================`);
      console.log(err.stack);
      return;
    }
    console.log('Successfully built.');
  });
