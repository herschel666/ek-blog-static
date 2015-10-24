---
title: Animierte Image-Caption mit jQuery unter WordPress
author: Emanuel Kluge
layout: post
permalink: /tutorial/animierte-image-caption-mit-jquery-unter-wordpress/
categories:
  - HTML/CSS
  - JavaScript
  - jQuery
  - Tutorial
  - WordPress
---

{% img /wp-content/uploads/2009/09/animierte-image-caption-mit-jquery-unter-wordpress.jpg Animierte Image-Caption mit jQuery unter WordPress %}

*[Demo](http://www.emanuel-kluge.de/demo/animierte-image-caption-mit-jquery-unter-wordpress/) | [Code auf GitHub](https://github.com/herschel666/animated-wordpress-image-captions)*

<p><ins datetime="2013-10-15T20:31:38+00:00"><strong>Update 15.10.2013</strong></ins></p>
<p><ins datetime="2013-10-15T20:31:38+00:00">Da der Code schon etwas in die Jahre gekommen ist, habe ich mir mal die Mühe gemacht, ihn zu aktualisieren. Hauptsächlich geändert ist die Art der Animation. Diese läuft nun über CSS-Transitions. Ältere Browser, wie bspw. der IE8, stellen also keine Animation dar. Die Grundfunktionalität ist jedoch auch ohne Animation gegeben.</ins></p>

Google liebt es ja, wenn unter oder neben Bildern noch ein beschreibender Text steht. Deswegen hat **WordPress** vor einiger Zeit die **Image-Caption** eingeführt. Diese kann man - wenn man kein Freund von Bildunterschriften ist — mit **jQuery** jedoch so manipulieren, dass sie nur bei einem **MouseOver** erscheint. Wie das geht, erkläre ich in diesem Tutorial.

Wie gehabt als erstes der HTML-Teil:

```html
<div class="wp-caption" style="width: ???px">
  <img src="/path/to/img.jpg" alt="Dies ist eine Beschreibung" title="Dies ist eine Beschreibung" width="???" height="???" class="size-full wp-image-3402" />
  <p class="wp-caption-text">Dies ist eine Beschreibung</p>
</div>
```

Dies ist der Caption-Quelltext, der von WordPress ausgegeben wird. Anstatt der Fragezeichen kommen natürlich die richtigen Höhen- und Breitenangaben, ebenso wie der richtige Pfad zum Bild.

Als nächstes ein bißchen CSS für das entsprechende Aussehen:

```css
.wp-caption {
  position: relative;
  margin-bottom: 1.5em;
  border: 3px solid #999;
  overflow: hidden;
  border-radius: 2px;
}

.wp-caption img {
  display: block;
  width: 100%;
  height: auto;
  -webkit-transition: margin .3s ease-in-out;
  -moz-transition: margin .3s ease-in-out;
  transition: margin .3s ease-in-out;
}

.wp-caption-text {
  padding: .357143em .714286em;
  margin: 0;
  background-color: #333;
  color: #F3F3F3;
  border-top: 1px solid #666;
}
```

Wichtig hierbei ist die Angabe `overflow: hidden`, da der Caption-Text sonst nicht verschwinden würde. Alle anderen Angaben zu Farben, Innen- und Außenabständen können ohne weiteres angepasst werden. Auch die `transition-duration` kann noch feinjustiert werden. Ja nach persönlicher Preferenz.

Zum Schluss den nötigen JavaScript- bzw. jQuery-Teil, ohne den hier gar nichts läuft:

```javascript
(function (win, $) {

  /*
   * init!
  **/
  function init() {

    // no animated Image Captions on touch devices
    if ( 'ontouchstart' in document.documentElement || win.navigator.msMaxTouchPoints ) {
        return;
    }

    // animated captions 4 all.
    $('.wp-caption').each(captionThis);

  }

  /*
   * Enabling the animated captions.
  **/
  function captionThis() {

    var $this = $(this),
        $img = $this.find('img'),
        imgHeight = $img.attr('height'),
        captionHeight = $this.find('p').outerHeight();

    $this
      .height(imgHeight)
      .hover(function () {
        $img.css('margin-top', -captionHeight);
      }, function () {
        $img.css('margin-top', 0);
      });

  }

  /*
   * Starting on DOMLoad
  **/
  $(init);

})(window, jQuery);
```

Touch-Devices sind von dieser Spielerei ausgenommen. Mit der `each()`-Methode wird jede einzelne Image-Caption auf der Seite angesprochen. Danach wird die Höhe des dazugehörigen Bildes und der Beschreibung gespeichert. Als nächstes wird die Höhe des Caption-`<div>` gleich der Höhe des Bildes gesetzt, so dass die Beschreibung abgeschnitten und nicht sichtbar ist.

Daraufhin wird ein `hover()`-Binding aufgemacht. Fährt man mit dem Cursor über eine mage-Caption, bekommt das dazugehörige Bild einen negativen `margin-top`, der der Höhe der Beschreibung entspricht, so dass diese in den sichtbaren Bereich fährt. Verlässt man die mage-Caption wieder mit dem Cursor, wird der `margin-top` des Bildes wieder auf Null gesetzt.

Das war es auch schon, fertig ist die animierte mage-Caption unter WordPress. Wobei natürlich nichts dagegen spricht, das ganze außerhalb von WordPress einzusetzen. Wie immer verweise ich an die Kommentar-Funktion, falls es Fragen gibt oder etwas nicht so funktioniert, wie es soll.
