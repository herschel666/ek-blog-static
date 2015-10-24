---
title: Bilder mit jQuery einblenden, wenn sie fertig geladen sind
author: Emanuel Kluge
layout: post
permalink: /tutorial/bilder-mit-jquery-einblenden-wenn-sie-fertig-geladen-sind/
categories:
  - HTML/CSS
  - JavaScript
  - jQuery
  - Tutorial
---

Das hier ist zwar eher im Bereich "Spielerei" anzusiedeln, aber dennoch recht nützlich. Schließlich sieht es einfach eleganter aus, wenn die Bilder eingeblendet werden, wenn sie fertig geladen sind. Außerdem sehen die Besucher nicht den alternativen Text des Bildes, sondern das kleine, sich drehende Rädchen, bei dem heutzutage (fast) jeder weiß, dass gerade etwas in Arbeit ist.

{% img /wp-content/uploads/2009/06/bilder-mit-jquery-einblenden.png Bilder mit jQuery einblenden, wenn sie fertig geladen sind %}

*[Demo](http://www.emanuel-kluge.de/demo/bilder-einblenden-mit-jquery/index.html) | [Code auf GitHub](https://github.com/herschel666/demo-images-jquery)*

<ins datetime="2013-09-21T16:01:16+00:00">**Update (21.9.2013):**</ins>

<ins datetime="2013-09-21T16:01:16+00:00">Ich habe den Code überarbeitet. Dieser war vier Jahre alt und nicht mehr auf Höhe der Zeit. Grundsätzlich hat sich nicht viel geändert. Außer das Einblenden der Bilder, welches nun über CSS-Transitions realisiert wird. Außerdem habe ich <a href="https://github.com/herschel666/demo-images-jquery" title="Code auf GitHub">den vollständigen Code auf GitHub</a> veröffentlicht.</ins>

Los geht es mit dem HTML-Teil:

```html
<div class="wrap">
  <a href="http://www.flickr.com/photos/herschel_r/3226358452/" class="image-frame">
    <img src="http://farm4.static.flickr.com/3474/3226358452_14572d5570.jpg" width="240" height="160" class="image loading" alt="" />
  </a>
  <a href="…" class="image-frame">
    …
  </a>
  …
</div>
```

Der Übersichtlichkeit halber habe ich hier nur ein Bild eingebunden, und nicht sechs, wie in der Demo. Man kann allerdings so viele Bilder einbinden, wie man möchte. Der Aufbau ist ziemlich simpel: Ein `<div>`-Tag zum Aufspannen des Inhaltsbereiches und jeweils ein `<a>`-Tag pro Bild.

Im `<head>`-Bereich der Demo ist außerdem folgender, spannender Schnipsel zu finden:

```html
<script>(function(e,c){e[c]=e[c]+' js'})(document.documentElement,'className')</script>
```

Auf diese Weise ist gewährleistet, dass, wenn wir im Stylesheet die Klasse `.js` vor eine Angabe hängen, diese nur greift, wen JavaScript im Browser aktiviert ist. Das gleiche erreicht man übrigens, wenn man statt dieses Code-Schnipsels [Modernizr](http://modernizr.com) einbindet, was grundsätzlich zu empfehlen ist.

Kommen wir nun zum JavaScript-/jQuery-Teil:

```javascript
(function (win, $, spinner) {

  /*
   * Anmelden der Variable fuer spaetere Nutzung.
  **/
  var $elems;

  /*
   * Ladegrafik 'spinner' an die '.image-frame'-Elemente
   * haengen und 'load'-Event am window-Objekt abgreifen.
   * Als Callback wird die 'showImages'-Funktion
   * uebergeben.
  **/
  function init() {
    $elems = $('.image-frame').append(spinner);
    $(win).load(showImages);
  }

  /*
   * Ueber die '.image-frame'-Elemente iterieren und sowohl
   * die Ladegrafik als auch die '.loading'-Klasse von den
   * '.image'-Elementen entfernen.
   *
   * Das geschmeidige Einblenden der Bilder wird mit einer
   * CSS-Transition geregelt.
  **/
  function showImages() {
    $elems.each(function () {

      var $this = $(this);

      $this.find('.spinner').remove();
      $this.find('.image').removeClass('loading');

    });
  }

  /*
   * Die 'init'-Funktion wird auf DOMReady ausgefuehrt.
  **/
  $(init);

})(window, jQuery, '<img src="assets/images/load.gif" class="spinner" alt="L&auml;dt …" />');
```

Die Ladegrafik `spinner` wird innerhalb der `init`-Funktion in alle `.image-frame`-Elemente eingefügt. Die Bilder sind &mdash; wenn JavaScript im Browser aktiviert ist &mdash; alle unsichtbar durch die CSS-Angabe `opacity: 0;`. Wenn der `load`-Event auf das `window`-Objekt ge-triggert wird, wird sowohl die Ladegrafik als auch die `.loading`-Klasse von den Bildern entfernt. Das Einblenden geschieht dann mithilfe von CSS-Transitions.

In Browsern, die keine CSS-Transitions unterstützen, erscheinen die Bilder ohne den weichen Übergang. Das ist jedoch nicht weiter tragisch, die grundsätzliche Funktionalität ist gewährleistet.

Zum Schluss brauchen wir noch eine Portion CSS, damit das ganze auch so aussieht wie in der Demo:

```css
.wrap {
  max-width: 556px;
  margin: 2em auto;
  clear: left;
  }

.image-frame {
  position: relative;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 44.604317%;
  margin: .9375em 2.697842%;
  float: left;
  border: 1px solid #EEE;
  }

.image {
  width: 100%;
  height: auto;
  min-height: 100px;
  display: block;
  padding: 1px;
  border: 2px solid #EEE;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: all .3s linear;
  -moz-transition: all .3s linear;
  transition: all .3s linear;
  }
a:hover .image,
a:focus .image {
  border-color: #AAA;
  }

/*
 * Zero opacity for the images if JS is enabled.
**/
.js .loading {
  opacity: 0;
  }

.spinner {
  position: absolute;
  width: 32px;
  height: 32px;
  margin: -16px 0 0 -16px;
  top: 50%;
  left: 50%;
  background-color: #FFF;
  }
```

Das ganze kann man ganz nach seinen Bedürfnissen anpassen. Wichtig ist nur, dass die Angabe `position: relative;` bei der Klasse `.image-frame` stehen bleibt, damit sich das Ladebildchen innerhalb des dazu gehörenden `<a>`-Tags absolut positionieren lässt. Und falls euch das Ladebildchen nicht so zusagt, findet ihr auf [Ajaxload.info](http://www.ajaxload.info/) Alternativen.

Die Angabe `backface-visibility: hidden;` bei den `.image`-Elementen sorgt dafür, dass es beim Einblenden durch Transitions keine unschönen Nebeneffekte gibt, bspw. dass sich die Größe der Bilder kurzzeitig leicht ändert und dadurch das ganze Layout "zittert".

Ansonsten bitte ich wie immer, bei Fragen oder Anregungen die Kommentarfunktion zu nutzen.
