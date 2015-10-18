
'use strict';

module.exports = function _posts() {
  return function (files, metalsmith, done) {

    var metadata = metalsmith.metadata();
    var posts = [];
    var lastPage;

    Object.keys(files).forEach(function (file) {
      var data = files[file];
      if ( files[file].template === 'post.html' ) {
        posts.push(data);
      }
    });

    posts
      .sort(function (a, b) {
        var da = +new Date(a.date),
            db = +new Date(b.date);
        return da < db ? 1 : db < da ? -1 : 0;
      })
      .reduce(function (prev, cur, index) {
        var page = Math.floor(index / 10);
        var pageIndex = page - 1;
        var permalink = 'page/' + page + '/index.html';
        delete cur.metadata;
        delete cur.template;
        if ( index < 10 ) {
          files['index.html'].posts = files['index.html'].posts || [];
          files['index.html'].posts.push(cur);
          return prev;
        }
        if ( !prev[pageIndex] ) {
          prev[pageIndex] = {
            permalink: permalink,
            prev: !!pageIndex && 'page/' + pageIndex + '/index.html',
            next: 'page/' + (page + 1) + '/index.html',
            page: page,
            posts: []
          };
        }
        prev[pageIndex].permalink = permalink;
        prev[pageIndex].posts.push(cur);
        return prev;
      }, [])
      .forEach(function (page) {
        files[page.permalink] = {
          metadata: metadata,
          template: 'index.html',
          contents: new Buffer(' '),
          prev: page.prev,
          next: page.next,
          page: page.page,
          posts: page.posts
        }
        lastPage = page.permalink;
      });

    files[lastPage].next = false;

    setImmediate(done);

  };
};
