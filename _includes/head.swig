<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <link rel="preconnect" href="{{ site.cdnurl }}">
    <link rel="preload" href="{{ assets['index.js'].url }}" as="script" crossorigin="true">
    <link rel="preload" href="{{ assets['main.css'].url }}" as="style" crossorigin="true">
    <!--[if IE]>
      <meta http-equiv="imagetoolbar" content="no">
    <![endif]-->
    <meta name="author" content="Emanuel Kluge">
    <meta name="MSSmartTagsPreventParsing" content="true">
    <meta name="verify-v1" content="pYcpJoNSdi6bVynT2dKuPoD+74fWR1PHO3mb3slZJns=">
    <meta name="robots" content="noindex,nofollow,noarchive">

    <meta property="og:type" content="blog">
    <meta property="og:title" content="Emanuel Kluge">
    <meta property="og:description" content="ek &middot; Beiträge zum Thema JS, HTML, CSS &amp; anderem Kram">
    <meta property="og:image" content="">

    <meta name="viewport" content="width=device-width">
    <meta http-equiv="cleartype" content="on">

    <title>{% if page.title %}{{ page.title }}{% else %}{{ site.title }}{% endif %}</title>
    <script>
      // Adding `js`-class
      (function (s,w,a,g) {
        w[a] = w[a].replace(/\bno-js\b/, 'js');
        s[g] = s[g] = {};
        s[g].isDev = {% if environment == "production" %}false{% else %}true{% endif %};
        s[g].build = '{{ build_str }}';
      })(window, document.documentElement, 'className', 'EK_FOO');
    </script>
    {% if site.description %}
      <meta name="description" content="{{ site.description }}">
    {% endif %}

    <style>{{ assets['critical.css'].contents | safe }}</style>
    <noscript>
      <link rel="stylesheet" href="{{ assets['main.css'].url }}">
    </noscript>
    <link rel="canonical" href="{{ path | replace('index.html', '') | prepend(site.baseurl + '/') }}">
    <link rel="alternate" type="application/rss+xml" title="RSS 2.0" href="{{ "/feed.xml" | prepend(site.baseurl) }}">
    <link rel="author" href="https://plus.google.com/+{{ site.google_plus }}/posts">
</head>
