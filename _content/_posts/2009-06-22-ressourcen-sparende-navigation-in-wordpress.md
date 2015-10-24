---
title: Ressourcen-sparende Navigation in WordPress
author: Emanuel Kluge
layout: post
permalink: /html-css/ressourcen-sparende-navigation-in-wordpress/
categories:
  - HTML/CSS
  - Tips und Tricks
  - WordPress
---

Normalerweise baut man die Navigation in WordPress mit der Funktion `wp_list_pages()` ([mehr auf WordPress Codex][http://codex.wordpress.org/Template_Tags/wp_list_pages]), so dass man im Backend Seiten anlegen kann und diese dynamisch im Frontend erscheinen. Dadurch ist es für Nutzer möglich, jedes beliebige Theme zu laden und trotzdem eine vollständige Navigation zu haben, ohne dass sie im Quelltext rumwerkeln müssen.

Allerdings sind damit eine Menge Abfragen verbunden, die die Ladezeit der Seite erhöhen. Baut man sich ein eigenes Theme und weiß, welche Seiten man anlegen möchte, sollte man ernsthaft darüber nachdenken, auf `wp_list_pages()` zu verzichten und die Navigation selbst in statischem HTML mithilfe einer ungeordneten Liste zu bauen.

Blöderweise muss man dabei auf das von `wp_list_pages()` zur Verfügung gestellte **Navigation Highlighting** verzichten. Dabei wird dem `<li>`-Tag des Navigationspunktes der Seite, auf der man sich gerade befindet, die Klasse `current\_page\_item` hinzugefügt, so dass man die Möglichkeit hat, diesen Punkt per CSS hervorzuheben.

Hier kommt jedoch die neue WordPress-Funktion `body_class()` ins Spiel. Diese fügt dem `<body>`-Tag u.a. den Name der aktuellen Seite als Klasse hinzu. Der HTML-Teil einer Navigation kann dann bspw. so aussehen:

```html
<body <?php body_class() ?>>
  …
  <ul class="navigation">
    <li class="home_nav"><a href="#">Home</a></li>
    <li class="leistungen_nav"><a href="#">Leistungen</a></li>
    <li class="referenzen_nav"><a href="#">Referenzen</a></li>
  </ul>
  …
</body>
```

Den Pfad zur Seite müsst ihr natürlich ins `href`-Attribut des `<a>`-Tags eintragen. Ansonsten trifft hier der Titel der Seite in der `<body>`-Klasse auf die Klasse des zur Seite gehörenden `<li>`-Tags. Das kann man sich zunutze machen und zwar mit folgenden CSS-Angaben:

```css
.home li.home_nav a:link,
.home li.home_nav a:visited,
.leistungen li.leistungen_nav a:link,
.leistungen li.leistungen_nav a:visited,
.referenzen li.referenzen_nav a:link,
.referenzen li.referenzen_nav a:visited {
  color: #FFF;
  background-color: #369;
  text-decoration: underline;
}

.home li.home_nav a:hover,
.leistungen li.leistungen_nav a:hover,
.referenzen li.referenzen_nav a:hover {
  color: #FFF;
  background-color: #666;
  text-decoration: underline;
}
```

Natürlich muss man noch den Normalzustand der Navigation definieren, aber ansonsten ist das **Navigation Highlighting** fertig. Alles mit einer(!) dymischen Komponente &mdash; der `body_class()`-Funktion &mdash;, also schön schlank.

**Weiterführende Links:**

 * [WordPress 2.8 and the `body_class()` Function][http://www.nathanrice.net/blog/wordpress-2-8-and-the-body_class-function/]
