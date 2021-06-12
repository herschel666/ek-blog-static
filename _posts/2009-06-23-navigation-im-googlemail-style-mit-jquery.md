---
title: Navigation im Googlemail-Style mit jQuery
author: Emanuel Kluge
layout: post.swig
permalink: navigation-im-googlemail-style-mit-jquery/
categories:
  - HTML/CSS
  - JavaScript
  - jQuery
  - Tips und Tricks
  - Tutorial
---

Wer Googlemail benutzt, kennt sicherlich die Buttons mit dem Grauverlauf und den abgerundeten Ecken, die jedoch ohne eine Grafik auskommen. So etwas kann man relativ schnell selber machen, man muss nur genug HTML-Tags "in den Topf werfen". In diesem Tutorial zeige ich euch, wie ihr das mithilfe von jQuery bewerkstelligen könnt. jQuery deshalb, weil man einfach HTML-Tags hinzufügen kann und der eigentliche Quelltext schön sauber bleibt.

<noscript data-src="/wp-content/uploads/2009/06/googlemail-style-button-480x126.png" data-alt="navigation im googlemail-style">
<img src="/wp-content/uploads/2009/06/googlemail-style-button-480x126.png" alt="navigation im googlemail-style">
</noscript>

_[Demo][demo] | [Download][download]_

Und wenn wir schon beim Thema sind, fangen wir am besten mit dem Quelltext an. Dieser sieht so aus:

```html
<ul class="navigation">
  <li><a href="index.html">Home</a></li>
  <li><a href="#">About</a></li>
  <li><a href="#">Tutorials</a></li>
  <li><a href="#">Contact</a></li>
</ul>
```

Eine schlanke, ungeordnete Liste, wie es sich gehört. Allerdings brauchen wir nun ein Element, um die abgerundeten Ecken darzustellen, zwei weitere Elemente um den Grauverlauf zu bilden, und nochmal zwei Elemente um die geprägte Schrift auf den Buttons hinzubekommen.

Summa sumarum müssen also 5 Tags hinzugefügt werden, um den grafischen Effekt hinzubekommen. Deshalb auch die JavaScript-Lösung, da bspw. Suchmaschinen-Bots oder Menschen an Screen-Readern nichts mit dieser Fülle an HTML-Elementen anfangen können.

Hier nun die benötigten JavaScript-Angaben:

```javascript
$(document).ready(function () {
  var start =
    '<span class="layer_1"><span class="layer_2"></span><span class="layer_3"></span><span class="layer_4">';
  var middle = '</span><span class="layer_5">';
  var end = '</span></span>';

  var item = new Array();
  $('.navigation li a').each(function () {
    item.push(this.innerHTML);
    for (i = 0; i < item.length; i++) {
      $(this).html(start + item[i] + middle + item[i] + end);
    }
  });
});
```

Als erstes werden die benötigten Elemente &mdash; in diesem Fall `<span>`-Tags &mdash; in Variablen gespeichert. Danach werden die jeweiligen Beschriftungen der Listen-Elemente in einem Array gespeichert. Zum Schluss wird alles zusammengefügt. Nun fehlen nur noch die entsprechenden Styles, um die Buttons fertig zu machen. Diese gestalten sich wie folgt:

```css
body {
  padding: 100px;
  font: normal 12px Helvetica;
  font-weight: bold;
  background-color: #fff;
}

.navigation {
  height: 20px;
  padding: 1px 0;
  clear: left;
  list-style: none;
}

.navigation li {
  position: relative;
  width: 82px;
  height: 20px;
  margin: 0 10px 0 0;
  float: left;
  display: inline;
}

a,
span {
  display: block;
  text-decoration: none;
}

a:focus {
  outline: none;
}

a:link,
a:visited {
  width: 82px;
  height: 20px;
  position: relative;
  background-color: #ddd;
  text-align: center;
  line-height: 20px;
  color: #333;
  z-index: 100;
  overflow: visible;
}

a:hover {
  background-color: #999;
  color: #000;
}

.layer_1 {
  width: 80px;
  height: 20px;
  position: absolute;
  top: -1px;
  left: 1px;
  border: 0;
  border: 1px solid #ddd;
  border-left: 0;
  border-right: 0;
  background-color: #f9f9f9;
  overflow: hidden;
  z-index: 200;
}

a:hover .layer_1 {
  border-top: 1px solid #999;
  border-bottom: 1px solid #999;
}

.layer_2 {
  width: 80px;
  height: 2px;
  position: absolute;
  top: 10px;
  left: 0;
  background-color: #eee;
  z-index: 300;
}

a:active .layer_2 {
  top: 8px;
  left: 0;
}

.layer_3 {
  width: 80px;
  height: 8px;
  position: absolute;
  top: 12px;
  left: 0;
  background-color: #e3e3e3;
  z-index: 300;
}

a:active .layer_3 {
  top: 0;
  left: 0;
}

.layer_4 {
  width: 80px;
  height: 12px;
  position: absolute;
  top: 5px;
  left: 0;
  line-height: 12px;
  color: #fff;
  text-align: center;
  z-index: 400;
}

.layer_5 {
  width: 80px;
  height: 12px;
  position: absolute;
  top: 4px;
  left: 0;
  line-height: 12px;
  color: #777;
  text-align: center;
  z-index: 500;
}

a:hover .layer_5 {
  color: #333;
}
```

Zugegeben, das ist ein ganz schöner Rattenschwanz an CSS-Angaben, aber es lohnt sich. `layer_1` ist höher als das `<a>`-Tag und ragt oben und unten darüber hinaus. Dadurch bekommen wir die abgerundeten Ecken. `layer_2` und `layer_3` sind leer und erzeugen den Grauverlauf. `layer_4` und `layer_5` beinhalten die Beschriftung des Buttons und erzeugen den Eindruck geprägter Buchstaben, indem das untere Layer weiße Schrift und einen Offset von einem Pixel in der y-Achse hat.

Das ganze funktioniert im Internet Explorer 6-8, im Firefox, in Opera und in Safari. Andere Browser habe ich nicht getestet, allerdings sollte es mit keinem modernen Browser Probleme geben.

Für Anmerkungen nutzt bitte die Kommentarfunktion, ich freue mich immer über Anregungen und konstruktive Kritik. Solltet ihr noch keine Erfahrungen mit jQuery gemacht haben, empfehle ich euch folgendes Einsteiger-Tutorial: [jQuery: Erste Schritte][professorweb]

[demo]: http://www.emanuel-kluge.de/demo/googlemail-style-button/index.html
[download]: /wp-content/uploads/2009/06/googlemail-style-button.zip
[professorweb]: http://www.professorweb.de/javascript-ajax/jquery-erste-schritte.html
