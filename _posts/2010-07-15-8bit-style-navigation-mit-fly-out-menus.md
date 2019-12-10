---
title: 8Bit-Style-Navigation mit Fly-Out-Menus
author: Emanuel Kluge
layout: post.swig
permalink: 8bit-style-navigation-mit-fly-out-menus/
categories:
  - HTML/CSS
  - JavaScript
  - jQuery
  - Tutorial
---

Heute möchte ich kurz zeigen, wie man mit etwas **HTML**, **CSS** und ein paar kleinen GIF-Grafiken eine pixelige Seiten-Navigation im 8Bit-Stil baut. Außerdem benutzen wir etwas jQuery-Magic, um der Navigation noch Fly-Out-Menus zu spendieren.

<noscript data-src="/wp-content/uploads/2010/07/8bit-style-navigation-mit-fly-out-menus.gif" data-alt="8Bit-Style-Navigation mit Fly-Out-Menus">
<img src="/wp-content/uploads/2010/07/8bit-style-navigation-mit-fly-out-menus.gif" alt="8Bit-Style-Navigation mit Fly-Out-Menus">
</noscript>

*[Demo][demo] | [Download][download]*

Beginnen wir wie gewohnt mit dem HTML-Teil:


```html
<div id="nav">
  <ul>
    <li class="top">
      <a href="index.html">
        <strong>Home</strong>
      </a>
      <div class="sub">
        <div>
          <ul>
            <li>
              <a href="#">Sub-Item 1</a>
            </li>
            <li>
              <a href="#">Sub-Item 2</a>
            </li>
            <li>
              <a href="#">Sub-Item 3</a>
            </li>
            <li>
              <a href="#">Sub-Item 4</a>
            </li>
            <li>
              <a href="#">Sub-Item 5</a>
            </li>
          </ul>
        </div>
      </div>
    </li>
    <li class="top">
      <a href="#">
        <strong>About</strong>
      </a>
      <div class="sub">
        <div>
          <ul>
            <li>
              <a href="#">One Sub-Item</a>
            </li>
            <li>
              <a href="#">Another Sub-Item</a>
            </li>
            <li>
              <a href="#">Still a Sub-Item</a>
            </li>
          </ul>
        </div>
      </div>
    </li>
    <li>
      <a href="#">
        <strong>Contact</strong>
      </a>
    </li>
  </ul>
</div>
```

Wie gewohnt eine ungeordnete Liste für die Haupt-Navigation und jeweils eine für die Sub-Navigationen. Um die charakteristischen Ecken hinzubekommen, müssen zwei Elemente ineinander verschachtelt und gegeneinander verschoben werden. Das macht den Quelltext Tag-intensiver. In meinen Augen jedoch noch in einem vertretbaren Rahmen und weit entfernt von klassischer "Diveritis".

Als nächstes kommen wir zum CSS:

```css
@font-face {
  font-family: 'SilkscreenNormal';
  src: url('slkscr-webfont.eot');
  src: local('☺'), url('slkscr-webfont.woff') format('woff'), url('slkscr-webfont.ttf') format('truetype'), url('slkscr-webfont.svg#webfontUx1SMfhe') format('svg');
  font-weight: normal;
  font-style: normal;
}

ul {
  list-style: none;
}

body {
  background-color: #FFF;
  color: #333;
  font: normal 13px SilkscreenNormal, sans-serif;
}

#nav,
#nav > ul,
#nav > ul > li {
  float: left;
  display: inline;
}

#nav,
#nav > ul {
  width: auto;
  height: 32px;
}

#nav {
  margin: 50px;
  position: relative;
  border-width: 2px 0;
  border-style: solid;
  border-color: #666;
}

#nav > ul {
  position: relative;
  left: -2px;
  margin-right: -4px;
  padding: 0 10px;
  border-width: 0 2px;
  border-style: solid;
  border-color: #666;
  background: url('data:image/gif;base64,R0lGODlhBAAEAIAAAP///73n/yH5BAAAAAAALAAAAAAEAAQAAAIGTACGqBkFADs=') 0 0 repeat;
}

#nav > ul > li {
  margin: 3px 5px;
  position: relative;
}

#nav > ul > li > a {
  display: block;
  position: relative;
  width: auto;
  height: 22px;
  border-width: 2px 0;
  border-style: solid;
  border-color: #999;
  background-color: #FFF;
}

#nav > ul > li > a:link,
#nav > ul > li > a:visited {
  color: #999;
  text-decoration: none;
  background: url('data:image/gif;base64,R0lGODlhBAAEAIAAAP/////fvSH5BAAAAAAALAAAAAAEAAQAAAIGTACGqBkFADs=') 0 0 repeat;
}

#nav > ul > li > a:hover,
#nav > ul > li > a:focus,
#nav > ul > li > a:active {
  color: #666;
  background-image: url('data:image/gif;base64,R0lGODlhBAAEAIAAAP/////MmSH5BAAAAAAALAAAAAAEAAQAAAIGTACGqBkFADs=');
}

#nav > ul > li > a strong {
  display: block;
  position: relative;
  width: auto;
  height: 22px;
  padding: 0 10px;
  line-height: 22px;
  left: -2px;
  margin-right: -4px;
  border-width: 0 2px;
  border-style: solid;
  border-color: #999;
}

#nav > ul > li.top > a > strong {
  padding-left: 21px;
  background: url('data:image/gif;base64,R0lGODlhBgAEAIABAJmZmf///yH5BAEAAAEALAAAAAAGAAQAAAIHhI8WocuwCgA7') 5px center no-repeat;
}

#nav > ul > li > a:hover,
#nav > ul > li > a:hover strong,
#nav > ul > li > a:focus,
#nav > ul > li > a:focus strong {
  border-color: #666;
}

#nav > ul > li.top > a:hover strong,
#nav > ul > li.top > a:focus strong {
  background-image: url('data:image/gif;base64,R0lGODlhBgAEAIABAGZmZv///yH5BAEAAAEALAAAAAAGAAQAAAIHhI8WocuwCgA7');
}

#nav > ul > li > a:active {
  top: 1px;
}

.sub {
  position: absolute;
  width: auto;
  top: 24px;
  left: 0;
  padding-top: 9px;
  display: none;
}

.sub div {
  position: relative;
  border-top: 2px solid #666;
  border-bottom: 2px solid #666;
}

.sub div ul {
  position: relative;
  left: -2px;
  margin-right: -4px;
  border-left: 2px solid #666;
  border-right: 2px solid #666;
  background: url('data:image/gif;base64,R0lGODlhBAAEAIAAAP///+7u7iH5BAAAAAAALAAAAAAEAAQAAAIGTACGqBkFADs=') 0 0 repeat;
}

.sub div ul li {
 border-top: 2px solid #666;
}

.sub div ul li:first-child {
  border-top: none;
}

.sub div ul li a {
  display: block;
  padding: 0 10px;
  line-height: 22px;
  font-size: 12px;
  white-space: nowrap;
}

.sub div ul li a:link,
.sub div ul li a:visited {
  color: #666;
}

.sub div ul li a:hover,
.sub div ul li a:focus {
  background: url('data:image/gif;base64,R0lGODlhBAAEAIAAAP///93d3SH5BAAAAAAALAAAAAAEAAQAAAIGTACGqBkFADs=') 0 0 repeat;
}

.sub div ul li a:active {
  background: url('data:image/gif;base64,R0lGODlhBAAEAIAAAP///8zMzCH5BAAAAAAALAAAAAAEAAQAAAIGTACGqBkFADs=') 0 0 repeat;
}
```

Als erstes binde ich den Pixel-Font "SilkScreen" von [Jason Kottke][silkscreen] ein. Danach folgen die Angaben für die Navigation.

Interessant ist dabei, dass selbst das äußere Element `<div id="nav">` die Angabe `float: left` hat, damit es sich der Breite des Inhalts anpasst. Das kann zu Layout-Problemen führen, weshalb man im praktischen Einsatz darauf achten muss, das Element direkt unterhalb der Navigation mit einem `clear: left` zu versehen.

Des weiteren kann man sehen, wie die charakteristischen Ecken zustande kommen: Das äußere Element hat jeweils unten und oben eine zwei-Pixel-starke `border` und das innere jeweils links und rechts. Das innere Element wird dann per `left: -2px` und `margin-righ: -4px` um jeweils zwei Pixel nach links und rechts aus dem umgebenden Element hinaus gezogen. Schon ist der gewünschte Effekt da.

Ebenfalls erwähnenswert sind die Grafiken. Da diese nur 4x4 Pixel bzw. 4x6 Pixel groß sind, lohnt es sich, sie in Form von Data URIs einzubinden und so unnötige HTTP Requests zu sparen.

[Bilder in Data URIs umwandeln könnt ihr übrigens mit diesem Online-Tool.][data_uri]

Zum Schluss noch etwas jQuery um die Fly-Out-Menu-Funktionalität zu realisieren:

```javascript
function () {
  $('#nav li.top').hover( function() {
    $(this).find('div').stop(true, true).fadeIn('slow');
  }, function() {
    $(this).find('div').stop(true, true).fadeOut('slow');
  });
});
```

Ich denke, das ist die spartanischste Lösung und bedarf keiner weiteren Erläuterung.

Das war es auch schon. Die Navigation ist beliebig per Copy&Paste erweiterbar, denkt nur daran, den `li`-Elementen, die eine Sub-Navigation beinhalten, die Klasse `top` zu verpassen, damit die Fly-Out-Menu-Funktionalität gewährleistet ist.

Ansonsten wünsche ich viel Spaß mit der Navigation. Bei Fragen bitte wie immer die Kommentar-Funktion nutzen. Und bei Gefallen fleißig via Twitter und Facebook verbreiten. Vielen Dank!

[demo]: http://www.emanuel-kluge.de/demo/8bit-style-navigation-mit-fly-out-menus/
[download]: http://www.emanuel-kluge.de/wp-content/uploads/2010/07/8bit-style-navigation-mit-fly-out-menus.zip
[silkscreen]: http://www.kottke.org/plus/type/silkscreen/index.html
[data_uri]: http://websemantics.co.uk/online_tools/image_to_data_uri_convertor/
