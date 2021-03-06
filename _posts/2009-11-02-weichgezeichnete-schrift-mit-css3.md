---
title: Weichgezeichnete Schrift mit CSS3
author: Emanuel Kluge
layout: post.swig
permalink: weichgezeichnete-schrift-mit-css3/
categories:
  - HTML/CSS
  - Tips und Tricks
---

<noscript data-src="/wp-content/uploads/2009/11/weichgezeichnete-schrift-mit-css3.jpg" data-alt="Weichgezeichnete Schrift mit CSS3">
<img src="/wp-content/uploads/2009/11/weichgezeichnete-schrift-mit-css3.jpg" alt="Weichgezeichnete Schrift mit CSS3">
</noscript>

_[Demo][demo] | [Download][download]_

Hier ein kleiner Trick, wie man mithilfe von **CSS3** "Blurred Typo", also weichgezeichnete Schrift, machen kann. Das ganze funktioniert durch den Umweg über die `text-shadow`-Funktion in CSS3.

Um das Beispiel zu verdeutlichen habe ich eine unspektakuläre Navigation gewählt. Hier der HTML-Teil:

```html
<ul id="nav">
  <li><a href="index.html">Home</a></li>
  <li><a href="#">About</a></li>
  <li><a href="#">Portfolio</a></li>
  <li><a href="#">Contact</a></li>
</ul>
```

Eine ungeordnete Liste, wie es sich für eine anständige Navigation gehört. Als nächstes der CSS-Teil:

```css
#nav {
  width: auto;
  clear: left;
  overflow: hidden;
  border-left: 1px solid #eee;
  list-style: none;
}

#nav li {
  width: auto;
  height: 30px;
  padding: 0 20px 20px 20px;
  float: left;
  border-right: 1px solid #eee;
  line-height: 30px;
}

#nav li a:link,
#nav li a:visited {
  text-decoration: none;
  color: #ccc;
  text-shadow: 0 0 3px #ccc;
}

#nav li a:hover,
#nav li a:focus {
  text-shadow: 0 1px 1px #666;
  color: #093;
}

#nav li a:active {
  color: #999;
  text-shadow: none;
}
```

Indem man die X- und Y-Offset-Werte bei `text-shadow` gleich Null setzt, entsteht anstelle des Schatten mehr so etwas wie ein äußeres Leuchten. Da dieses Leuchten die gleiche Farbe wie die Schrift hat, wirkt diese dadurch weichgezeichnet. Beim Überfahren mit der Maus verschwindet dieser Effekt und die Schrift erscheint klar.

Da es sich um eine CSS3-Spielerei handelt, braucht man zur Darstellung einen modernen Browser, wie Safari 4, Firefox 3.5, Opera 10 oder Chrome. Im Internet Explorer geht das ganze wie erwartet nicht, was aber kein Weltuntergang ist, da die Funktion der Seite ansich dadurch nicht beeinträchtigt wird.

[demo]: http://www.emanuel-kluge.de/demo/weichgezeichnete-schrift-mit-css3/
[download]: /wp-content/uploads/2009/11/weichgezeichnete-schrift-mit-css3.zip
