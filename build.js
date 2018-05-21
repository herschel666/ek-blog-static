
'use strict';

const fs = require('fs');
const url = require('url');
const path = require('path');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const async = require('async');
const webpack = require('webpack');
const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const permalinks = require('metalsmith-permalinks');
const layouts = require('metalsmith-layouts');
const inPlace = require('metalsmith-in-place');
const collections = require('metalsmith-collections');
const pagination = require('metalsmith-pagination');
const serve = require('metalsmith-serve');
const msStatic = require('metalsmith-static');
const metallic = require('metalsmith-metallic');
const htmlMinifier = require('metalsmith-html-minifier');
const feed = require('metalsmith-feed');
const swig = require('swig');
const md5 = require('md5');

const webpackConfig = require('./webpack.config');

const PORT = 8083;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const BASE_URL = IS_PRODUCTION ?
  'https://emanuel-kluge.de' :
  'http://localhost:' + PORT;
const CDN_URL = IS_PRODUCTION ? 'https://guard-tiger-28423.netlify.com/' : '/';
const SOURCE = path.join(__dirname, '_posts');
const DESTINATION = path.join(__dirname, '_site');
const LAYOUTS = path.join(__dirname, '_layouts');
const SOURCE_ASSETS = path.join(__dirname, '_assets');
const FILE_NAME_DATE_RE = /^(\d{4}-\d{2}-\d{2})/;
const XML_CHAR_MAP = {
  '<': '&lt;',
  '>': '&gt;',
  '&': '&amp;',
  '"': '&quot;',
  "'": '&apos;'
};

rimraf.sync(DESTINATION);
mkdirp.sync(DESTINATION);

Metalsmith(__dirname)
  .source(SOURCE)
  .destination(DESTINATION)
  .metadata({
    site: {
      title: 'Emanuel Kluge',
      description: 'Beiträge zum Thema JS, HTML, CSS & anderem Kram',
      baseurl: BASE_URL,
      url: BASE_URL, // For Metalsmith-feed ...
      cdnurl: CDN_URL,
      time: new Date()
    },
    build_str: process.env.TRAVIS_COMMIT || Date.now(),
    environment: process.env.NODE_ENV
  })
  .use(runWebpack())
  .use(msStatic({
    src: '_assets/images',
    dest: 'assets/img'
  }))
  .use(msStatic({
    src: 'userfiles',
    dest: 'wp-content'
  }))
  .use(msStatic({
    src: 'favicon.ico',
    dest: 'favicon.ico'
  }))
  .use(postDate())
  .use(categoryFolder())
  .use(collections({
    posts: {
      pattern: '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]-*.md',
      sortBy: 'date',
      reverse: true
    },
    feed: {
      pattern: '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]-*.md',
      sortBy: 'date',
      reverse: true,
      limit: 10,
      refer: false
    }
  }))
  .use(pagination({
    'collections.posts': {
      perPage: 10,
      noPageOne: true,
      layout: 'posts.html',
      first: 'index.html',
      path: 'page/:num/index.html'
    }
  }))
  .use(metallic())
  .use(markdown())
  .use(permalinks(':folder/:permalink'))
  .use(prepareFeedContents())
  .use(feed({
    collection: 'feed',
    destination: 'feed.xml',
    limit: 10
  }))
  .use(layouts({
    engine: 'swig',
    directory: LAYOUTS
  }))
  .use(inPlace({
    engine: 'swig',
    pattern: '**/*.html'
  }))
  .use(serveSite())
  // .use(minifyHtml())
  .build(err => {
    if (err) throw err;
    console.log('Successfully built the site!');
  });

swig.setFilter('prepend', (str, prefix) => prefix.trim() + str);
swig.setFilter('md5', str => md5(str));
swig.setTag('lazyImg',
  (str, line, parser, types) => {
    const args = { alt: '' };
    parser.on(types.UNKNOWN, function (token) {
      const attrs = token.match.replace(/&quot;/g, '').trim();
      const ws = attrs.indexOf(' ');
      if (ws === -1) {
        args.src = attrs;
        return;
      }
      args.src = attrs.substring(0, ws);
      args.alt = attrs.substring(ws + 1);
    });
    parser.on('end', function () {
      this.out.push(args);
    });
    return true;
  },
  (compiler, args, content, parents, options, blockName) => {
    const attrs = args.shift();
    content.push(`<noscript data-src="${attrs.src}" data-alt="${attrs.alt}">
      <img src="${attrs.src}" alt="${attrs.alt}">
    </noscript>`);
    return compiler(content, parents, options, blockName);
  }, false, true);

function postDate() {
  return function (files, metalsmith, done) {
    Object.keys(files).forEach(file => {
      if (FILE_NAME_DATE_RE.test(file)) {
        const date = new Date(FILE_NAME_DATE_RE.exec(file)[0]);
        files[file] = Object.assign({}, files[file], {date});
      }
    });
    setImmediate(done);
  };
}

function categoryFolder() {
  return function (files, metalsmith, done) {
    Object.keys(files).forEach(file => {
      if (typeof files[file].permalink !== 'string') {
        return;
      }
      const parts = files[file].permalink.replace(/^\/|\/$/g, '').split('/');
      const folder = parts[0];
      const permalink = parts[1];
      files[file] = Object.assign({}, files[file], {
        folder, permalink
      });
    });
    setImmediate(done);
  };
}

function prepareFeedContents() {
  return function (files, metalsmith, done) {
    const metadata = metalsmith.metadata();
    const feedContents = metadata.feed.map(item => {
      item.excerpt = item.contents.toString('utf8')
        .replace(/\n/g, '')
        .replace(/\{\%[^%]+\%\}/g, '')
        .replace(/<[^>]+>/g, '')
        .trim().substring(0, 400) + ' …';
      return item;
    });
    metalsmith.metadata(Object.assign({}, metadata, {
      feed: feedContents
    }));
    setImmediate(done);
  };
}

function serveSite() {
  if (process.argv.indexOf('--serve') > -1) {
    return serve({
      port: PORT
    });
  }
  return noopPlugin();
}

function minifyHtml() {
  if (IS_PRODUCTION) {
    return htmlMinifier({
      minifyJS: true
    });
  }
  return noopPlugin();
}

function runWebpack() {
  return function (files, metalsmith, done) {
    const metadata = metalsmith.metadata();
    const compiler = webpack(webpackConfig);
    compiler.run((err, stats) => {
      if (err) throw err;
      const assets = {};
      async.each(fs.readdirSync(webpackConfig.output.path), (file, cb) => {
        const fileNameParts = file.split('.');
        const fileName = fileNameParts.shift() + '.' + fileNameParts.pop();
        const fullPath = path.join(DESTINATION, 'assets', file);
        fs.readFile(fullPath, 'utf8', (err, contents) => {
          if (err) return cb(err);
          assets[fileName] = {
            url: url.resolve(CDN_URL, path.join('/assets', file)),
            contents: new Buffer(contents, 'utf8')
          };
          cb();
        })
      }, err => {
        if (err) throw err;
        metalsmith.metadata(Object.assign({}, metadata, {assets}));
        done();
      });
    });
  };
}

function noopPlugin() {
  return (_, __, done)  => done();
}
