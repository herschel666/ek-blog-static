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
const collections = require('metalsmith-collections');
const pagination = require('metalsmith-pagination');
const serve = require('metalsmith-serve');
const msStatic = require('metalsmith-static');
const metallic = require('metalsmith-metallic');
const htmlMinifier = require('metalsmith-html-minifier');
const feed = require('metalsmith-feed');
const md5 = require('md5');

const webpackConfig = require('./webpack.config');

const PORT = 8083;
const WATCH_MODE_ACTIVE = process.argv.includes('--serve');
const IS_PRODUCTION = !WATCH_MODE_ACTIVE;
const BASE_URL = IS_PRODUCTION
  ? 'https://ekblog.de'
  : 'http://localhost:' + PORT;
const SUBDOMAIN_PREFIX = process.env.GITHUB_REF || '';
const CDN_URL = IS_PRODUCTION
  ? `https://${SUBDOMAIN_PREFIX}ekblogcdn.netlify.com/`
  : '/';
const SOURCE = path.join(__dirname, '_posts');
const DESTINATION = path.join(__dirname, '_site');
const LAYOUTS = path.join(__dirname, '_layouts');
const FILE_NAME_DATE_RE = /^(\d{4}-\d{2}-\d{2})/;

process.env.NODE_ENV = IS_PRODUCTION ? 'production' : 'development';

const webpackWatchOptions = {
  ignored: ['_site/**/*', 'node_modules', '.github'],
};

let webpackCompiler;
let lastWebpackBuildHash;

rimraf.sync(DESTINATION);
mkdirp.sync(DESTINATION);

const metalSmithInstance = Metalsmith(__dirname)
  .source(SOURCE)
  .destination(DESTINATION)
  .metadata({
    site: {
      title: 'Emanuel Kluge',
      description: 'Beiträge zum Thema JS, HTML, CSS & anderem Kram',
      baseurl: BASE_URL,
      url: BASE_URL, // For Metalsmith-feed ...
      cdnurl: CDN_URL,
      time: new Date(),
    },
    build_str: process.env.GITHUB_SHA || Date.now(),
    environment: process.env.NODE_ENV,
  })
  .use(runWebpack())
  .use(
    msStatic({
      src: '_assets/images',
      dest: 'assets/img',
    })
  )
  .use(
    msStatic({
      src: 'userfiles',
      dest: 'wp-content',
    })
  )
  .use(
    msStatic({
      src: 'favicon.ico',
      dest: 'favicon.ico',
    })
  )
  .use(
    msStatic({
      src: '_headers',
      dest: '_headers',
    })
  )
  .use(postDate())
  .use(
    collections({
      posts: {
        pattern: '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]-*.md',
        sortBy: 'date',
        reverse: true,
      },
      feed: {
        pattern: '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]-*.md',
        sortBy: 'date',
        reverse: true,
        limit: 10,
        refer: false,
      },
    })
  )
  .use(
    pagination({
      'collections.posts': {
        perPage: 10,
        noPageOne: true,
        layout: 'posts.swig',
        first: 'index.html',
        path: 'page/:num/index.html',
      },
    })
  )
  .use(metallic())
  .use(markdown())
  .use(permalinks())
  .use(prepareFeedContents())
  .use(
    feed({
      collection: 'feed',
      destination: 'feed.xml',
      limit: 10,
    })
  )
  .use(
    layouts({
      engineOptions: {
        filters: {
          prepend: (str, prefix) => prefix.trim() + str,
          md5: (str) => md5(str),
        },
      },
      directory: LAYOUTS,
    })
  )
  .use(serveSite());
// .use(minifyHtml());

function postDate() {
  return function (files, metalsmith, done) {
    Object.keys(files).forEach((file) => {
      if (FILE_NAME_DATE_RE.test(file)) {
        const date = new Date(FILE_NAME_DATE_RE.exec(file)[0]);
        files[file] = Object.assign({}, files[file], { date });
      }
    });
    setImmediate(done);
  };
}

function prepareFeedContents() {
  return function (files, metalsmith, done) {
    const metadata = metalsmith.metadata();
    const feedContents = metadata.feed.map((item) => {
      item.excerpt =
        item.contents
          .toString('utf8')
          .replace(/\n/g, '')
          .replace(/\{\%[^%]+\%\}/g, '')
          .replace(/<[^>]+>/g, '')
          .trim()
          .substring(0, 400) + ' …';
      return item;
    });
    metalsmith.metadata(
      Object.assign({}, metadata, {
        feed: feedContents,
      })
    );
    setImmediate(done);
  };
}

function serveSite() {
  if (WATCH_MODE_ACTIVE) {
    return serve({
      port: PORT,
    });
  }
  return noopPlugin();
}

function minifyHtml() {
  if (IS_PRODUCTION) {
    return htmlMinifier({
      minifyJS: true,
    });
  }
  return noopPlugin();
}

function metalsmithBuildCallback(err) {
  if (err) throw err;
  console.log('Successfully built the site!');
}

const handleWebpackIssues = (done) => (err, stats) => {
  if (err || stats.hasErrors()) {
    done(err || stats.toJson({ all: false, errors: true }).errors.shift());
    return;
  }

  if (stats.hasWarnings()) {
    console.warn(stats.toString());
  }
};

const saveWebpackCompilerResult = (metalsmith, done) => {
  const assets = {};
  async.each(
    fs.readdirSync(webpackConfig.output.path),
    (file, cb) => {
      const stats = fs.statSync(path.join(webpackConfig.output.path, file));

      if (stats.isDirectory()) {
        cb();
        return;
      }

      const fileNameParts = file.split('.');
      const fileName = fileNameParts.shift() + '.' + fileNameParts.pop();
      const fullPath = path.join(DESTINATION, 'assets', file);
      fs.readFile(fullPath, 'utf8', (err, contents) => {
        if (err) return cb(err);
        assets[fileName] = {
          url: url.resolve(CDN_URL, path.join('/assets', file)),
          contents: Buffer.from(contents, 'utf8'),
        };
        cb();
      });
    },
    (err) => {
      if (err) {
        throw err;
      }
      metalsmith.metadata({
        ...metalsmith.metadata(),
        assets,
      });
      done();
    }
  );
};

function runWebpack() {
  return function (_, metalsmith, done) {
    if (webpackCompiler) {
      return;
    }

    webpackCompiler = webpack(webpackConfig);

    if (WATCH_MODE_ACTIVE) {
      console.log('Starting Webpack in "watch"-mode...');
      webpackCompiler.watch(webpackWatchOptions, handleWebpackIssues(done));
      webpackCompiler.hooks.afterEmit.tap('MetalsmithBuild', (compilation) =>
        saveWebpackCompilerResult(metalsmith, (err) => {
          if (err) {
            done(new Error(err.message));
            return;
          }
          const stats = compilation.getStats().toJson();

          if (
            Boolean(lastWebpackBuildHash) &&
            stats.hash !== lastWebpackBuildHash
          ) {
            console.log('Re-build Metalsmith...');
            metalSmithInstance.build();
          }

          lastWebpackBuildHash = stats.hash;
          done();
        })
      );
    } else {
      webpackCompiler.run((err, stats) => {
        let compilerError = null;
        handleWebpackIssues((compilerErrorArg) => {
          compilerError = compilerErrorArg;
        })(err, stats);

        if (!compilerError) {
          saveWebpackCompilerResult(metalsmith, done);
        } else {
          done(compilerError);
        }
      });
    }
  };
}

function noopPlugin() {
  return (_, __, done) => done();
}

metalSmithInstance.build(metalsmithBuildCallback);
