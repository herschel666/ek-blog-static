---
title: Animierte Navigation mit jQuery
author: Emanuel Kluge
layout: post.html
permalink: /tutorial/animierte-navigation-mit-jquery/
categories:
  - HTML/CSS
  - JavaScript
  - jQuery
  - Tutorial
---

{% lazyImg "/wp-content/uploads/2009/07/animierte-navigation-mit-jquery.png" "Animierte Navigation mit jQuery" %}

*[Demo][demo] | [Download][download]*

Dies ist eine Reiter-Navigation, bei der der aktive Reiter am Inhaltsbereich andockt und die inaktiven Reiter darüber schweben. Sozusagen ein Wink mit dem Zaunpfahl für den User. Damit die Benutzung noch ein bißchen geschmeidiger ist, docken die inaktiven Reiter am Inhaltsbereich an, wenn man mit dem Cursor über sie fährt. Für den Effekt nutze ich die JavaScript-Library.

Als erstes wie gewohnt der HTML-Teil:

```html
<ul>
  <li class="active"><a href="index.html">Home</a></li>
  <li><a href="about.html">About</a></li>
  <li><a href="contact.html">Contact</a></li>
</ul>
```

Eine schlichte, ungeordnete Liste. Wichtig ist jedoch, dass der aktive Reiter die Klasse `active` bekommt.

Als nächstes der CSS-Teil:

```css
ul {
  width: 800px;
  height: 51px;
  padding: 0 0 0 10px;
  clear: left;
  list-style: none;
  background: url('pixel.gif') left bottom repeat-x;
}

li {
  width: auto;
  _width: 97px;
  height: 40px;
  float: left;
  display: inline;
  margin-right: 10px;
  text-align: center;
}

a {
  display: block;
  width: auto;
  height: 38px;
  padding: 0 10px;
  margin-bottom: 0;
  line-height: 38px;
  border: 1px solid #333;
  text-decoration: none;
}

a:link,
a:visited {
  color: #333;
  background-color: #EEE;
}

a:hover {
  color: #333;
  background-color: #FFF;
}

a:active {
  color: #666;
  background-color: #FFF;
}

.active a:link,
.active a:visited {
  margin-top: 11px;
  border-bottom-color: #FFF;
  background-color: #FFF;
}

.active a:hover{
  color: #666;
}

.active a:active {
  color: #999;
}
```

Da der Internet Explorer Höhen- und Breitenangaben flexibel handhabt, können wir das `<a>`-Element nicht einfach mit dem entsprechenden `margin`-Wert über das `<ul>`-Element hinaus schieben. Deshalb habe ich den unteren Rand des `<ul>`-Elements nicht mit einer CSS-`border`, sondern mit einer ein Pixel großen Grafik realisiert.

Des weiter befindet sich beim Teil für das `<li>`-Element die Angabe `_width: 97px;`. Das ist für den IE6, da dieser das `<li>`-Element bei der Angabe `width: auto;` über die komplette Breite des Inhaltsbereich zieht.

Als nächstes kommen wir zum JavaScript-Teil:

```javascript
if ( navigator.appName != 'Microsoft Internet Explorer' ) {
  $(function () {
    $('li').filter('[class=]').hover(function() {
      $('a', this).animate({ marginTop: '11px', color: '#CFF' }, 200).animate({ borderBottom: '1px solid #FFF' }, 1);
    }, function () {
      $('a', this).animate({ borderBottom: '1px solid #333' }, 1).animate({ marginTop: '0', color: '#EEE' }, 200);
    });
  });
}
```

Direkt am Anfang kommt eine Abfrage, ob es sich beim Browser des Nutzers um den Internet Explorer handelt. Dieser spuckt beim vorliegenden JavaScript-Code einen *Script Error* aus, was meinen Recherchen zufolge an der jQuery-Methode `animate()` liegt. Leider konnte ich keine Lösung des Fehlers finden, weshalb die Navigation im Internet Explorer ohne jQuery mit reinem CSS auskommen muss.

Ansonsten ist der jQuery-Code-Schnippel schnell erklärt. Fährt man mit dem Cursor über ein in nichtaktives `<li>`-Element, wird das darin liegende `<a>`-Element animiert, fährt runter und bekommt einen weißen unteren Rand. Beim Verlassen des `<li>`-Elements mit dem Cursor, wiederholt sich das Spiel in umgekehrter Reigenfolge.

Zum Schluss bauen wir noch die entsprechenden Style-Angaben ein, um die Navigation für den Internet Explorer und Browser mit deaktiviertem JavaScript fit zu machen:

```html
<!--[if IE]>
  <style type="text/css">
    a:hover,
    a:focus {
      margin-top: 11px;
      border-bottom: 1px solid #FFF;
    }
  </style>
<![endif]-->
<noscript>
  <style type="text/css">
    a:hover,
    a:focus {
      margin-top: 11px;
      border-bottom: 1px solid #FFF;
    }
  </style>
</noscript>
```

Fertig ist die animierte Navigation mit jQuery. Oben findet ihr den Link zu den Dateien. Bei Fragen oder Anregungen freue ich mich wie immer über einen Kommentar.

[demo]: http://www.emanuel-kluge.de/demo/animierte-navigation-mit-jquery/
[download]: /wp-content/uploads/2009/07/animierte-navigation-mit-jquery.zip
