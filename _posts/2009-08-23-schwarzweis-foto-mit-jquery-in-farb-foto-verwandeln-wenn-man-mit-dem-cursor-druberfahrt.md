---
title: Schwarzweiß-Foto mit jQuery in Farb-Foto verwandeln, wenn man mit dem Cursor drüberfährt
author: Emanuel Kluge
layout: post.html
permalink: /tutorial/schwarzweis-foto-mit-jquery-in-farb-foto-verwandeln-wenn-man-mit-dem-cursor-druberfahrt/
categories:
  - HTML/CSS
  - JavaScript
  - jQuery
  - Tutorial
---

Wie euch vielleicht aufgefallen ist, habe ich in die Sidebar eine kurze Autoren-Info gepackt, damit die Leute wissen, wer hier schreibt. Und wer von euch mal mit dem Cursor über das Foto drüber gefahren ist, wird gemerkt haben, dass sich das Schwarzweiß-Foto dabei in ein Farb-Foto verwandelt. Das ist sicher kein Basis-Feature, aber eine nette jQuery-Spielerei. Und wie das geht, verrate ich jetzt.

Als erstes brauchen wir den entsprechenden HTML-Code:

```html
<div id="image">
  <img src="image_bw.jpg" alt="Scharzwei&szlig;-Bild" />
</div>
```

Ein normales, von einem `<div>`-Element umschlossenes Bild. Im `<img>`-Element ist das Schwarzweiß-Foto eingebunden.

Als nächstes etwas CSS:

```css
#image {
  width: …;
  height: …;
  background: url('image_color.jpg') 0 0 no-repeat;
}
```

Die Breite und Höhe des `<div>`-Elements entsprechen der Breite und Höhe eures Bildes. Als Hintergrund-Bild ist das Farb-Foto eingebunden. Es befindet sich also die ganze Zeit hinter dem Schwarzweiß-Foto und wird von diesem verdeckt.

Nun zum jQuery-Teil:

```javascript
$(function () {
  $('#image img').hover(function () {
    $(this).stop().fadeTo('slow', 0);
  }, function() {
    $(this).stop().fadeTo('slow', 1);
  });
});
```

Fährt man mit dem Cursor über das Schwarzweiß-Foto, wird dieses ausgeblendet und offenbart das Farb-Foto. Geht man mit dem Cursor vom Foto runter, wird das Schwarzweiß-Foto wieder eingeblendet. Das ganze mit der Geschwindigkeitsangabe `slow`, damit es auch schön geschmeidig vonstatten geht.

Das war es auch schon. Bei Fragen oder Anregungen sei wie immer auf die Kommentar-Funktion verwiesen.

PS: Eine Demo des ganzen gibt es auf der Blog-Startseite!
