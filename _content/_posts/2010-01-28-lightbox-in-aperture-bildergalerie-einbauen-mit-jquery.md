---
title: Lightbox in Aperture-Bildergalerie einbauen mit jQuery
author: Emanuel Kluge
layout: post
permalink: /tips-und-tricks/lightbox-in-aperture-bildergalerie-einbauen-mit-jquery/
categories:
  - Apple
  - Fotografie
  - JavaScript
  - jQuery
  - Tips und Tricks
---

{% img /wp-content/uploads/2010/01/aperture-screenshot.jpg Aperture — Screenshot %}

[Aperture](http://www.apple.com/aperture/) ist eine Photo-Editing-Software von Apple™, welche die Möglichkeit bietet, Galerien zu erstellen und im HTML-Format zu exportieren. Diese Funktion kann ich aufgrund des generierten Quelltextes nicht empfehlen, nichtsdestominder ist sie sehr praktisch für Leute, die schnell eine Galerie veröffentlichen wollen, jedoch kein HTML können.

Ein weiteres Manko ist der Umstand, dass jedes Foto eine eigene Unterseite bekommt und man sich an diesen entlang hangelt. Heutzutage allerdings — möchte ich behaupten — ist eine **Lightbox** Standard, wenn es um das Betrachten von Fotos im Browser geht. Deshalb möchte ich zeigen, wie man mithilfe von **jQuery** und einem **PlugIn** diese Funktionalität relativ schnell nachrüsten kann.

Als erstes benötigen wir das PlugIn [jQuery lightBox](http://leandrovieira.com/projects/jquery/lightbox/). Wir entpacken das Zip-File und legen den "js"-Ordner, den "css"-Ordner und den "images"-Ordner aus dem "jquery-lightbox-0.5"-Ordner in dem aus Aperture exportierten Galerie-Ordner ab.

Nun muss das PlugIn eingebunden werden und zwar innerhalb der `<head>`-Tags der index.html der Galerie. Als erstes die beiden JavaScript-Dateien und das Stylesheet:



```html
<link rel="stylesheet" type="text/css" href="css/jquery.lightbox-0.5.css" media="screen" />
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/jquery.lightbox-0.5.pack.js"></script>
```

Mit folgendem JavaScript-Code aktivieren wir die Lightbox:

```javascript
$(function () {
  $('dd.imagecell a').lightBox();
});
```

Nun ergibt sich allerdings das Problem, dass das Lightbox-PlugIn darauf angewiesen ist, dass die Links um die Thumbnails der Fotos auf die große Version der selben verweisen. Dies tun sie in der Aperture-Galerie allerdings nicht. Vielmehr verweist der Link auf die Unterseite, auf der die große Version des Fotos eingebunden ist. Die Links müssen also erst noch manipuliert werden, bevor die Lightbox funktioniert:

```javascript
$(document).ready( function() {
  var link = $('dd.imagecell a');
  link.each(function (i) {
    i += 1;
    $(this).attr('href', 'pictures/picture-' + i + '.jpg');
  });
});
```

Mit diesem JavaScript-Code werden die Verweise auf den Thumbnails auf die großen Versionen der jeweiligen Fotos umgelenkt. Alles in allem muss man also folgendes in den `<head>`-Bereich der index.html schreiben:

```html
<link rel="stylesheet" type="text/css" href="css/jquery.lightbox-0.5.css" media="screen" />
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/jquery.lightbox-0.5.pack.js"></script>
<script type="text/javascript">
  $(function () {
    var link = $('dd.imagecell a');
    link.each(function (i) {
      i += 1;
      $(this).attr('href', 'pictures/picture-' + i + '.jpg');
    });
    link.lightBox();
  });
</script>
```

Schon habt ihr mit etwas jQuery eine moderne Lightbox in eure Aperture-Galerie eingebaut.

Noch ein Hinweis am Rande: Die Pfade zum Warte-Bild, den Pfeilen und dem Close-Button sind in der "lightbox.js" festgelegt. Wenn ihr den "images"-Ordner also nicht im Galerie-Ordner ablegt, sondern bspw. darunter, müsst ihr diese Pfad-Angaben ändern, sonst wird die Lightbox nicht richtig angezeigt.

Ansonsten gilt wie immer: Wenn es Fragen gibt, nutzt die Kommentar-Funktion!

Weiterführende Links:

  * [jQuery lightBox](http://leandrovieira.com/projects/jquery/lightbox/)
  * [Offizielle jQuery-Seite](http://jquery.com/)
