---
title: Barrierefreier Button mit Text Replacement
author: Emanuel Kluge
layout: post.swig
permalink: barrierefreier-button-mit-text-replacement/
categories:
  - HTML/CSS
  - Tips und Tricks
---

Jeder kommt früher oder später beim Bauen einer Website in die Situation, dass er die Beschriftung eines Buttons loswerden möchte, um den Button mit einer schönen Grafik zu versehen. Das Auge surft schließlich mit.

<noscript data-src="/archive/wp-content/uploads/2009/07/barrierefreier-button-mit-text-replacement-480x107.png" data-alt="Barrierefreier Button mit Text Replacement">
<img src="/archive/wp-content/uploads/2009/07/barrierefreier-button-mit-text-replacement-480x107.png" alt="Barrierefreier Button mit Text Replacement">
</noscript>

_[Demo][demo] | [Download][download]_

Oftmals sieht man in diesen Fällen, dass das `value`-Attribut einfach leer gelassen wird. Dies ist allerdings eine wenig elegante Lösung, da Besucher mit Screenreader raten müssen, wofür der Button gedacht ist. Alternativ könnte man auf die Standard-Text-Replacement-Methode über `text-indent: -9999px;` zurückgreifen. Dies funktioniert auch ganz passabel in mordernen Browsern. IE6 und IE7 schieben dabei allerdings den kompletten Button nach links ins Abseits.

Es muss also eine andere Methode her. Und die sieht so aus, dass man einfach ein `<div>`-Element um den Button packt und ihm die gleiche Größe wie dem Button gibt. Dann verschiebt man selbigen noch mittels `padding-top` ins Abseits und schon ist der Text weg und man kann seine Grafik einbauen. Der Quelltext dafür sieht folgendermaßen aus:

```html
<div class="button">
  <input type="submit" value="Absenden" />
</div>
```

Dazu kommen noch folgende CSS-Angaben:

```css
.button {
  height: 30px;
  width: 80px;
  overflow: hidden;
}

input {
  width: 80px;
  height: 30px;
  padding: 30px 0 0 0;
  border: 0;
  background: #369 url('button.jpg') 0 0 no-repeat;
}
```

Diese Technik funktioniert einwandfrei im Firefox, in Safari sowie im IE6/7/8.

Natürlich kann man den gleichen Effekt erzielen, indem man einem `<input>`-Element das Attribut `type="image"` gibt und die Grafik direkt im Quelltext einbaut. Allerdings hat man dann nicht die Möglichkeit, für den `:hover`- und `:active`>-Zustand eine alternative Grafik per CSS zuzuweisen, was der User Experience durchaus zuträglich ist.

PS: Wie ihr `<input>`-Elemente im IE6 `:hover`-fähig macht, erfahrt ihr [hier][explorer].

**Nachtrag:**

Thorsten hat mich in den Kommentaren darauf aufmerksam gemacht, dass diese Lösung im Opera-Browser nicht funktioniert, da sich dort die Button-Beschriftung nicht durch `padding` ins Abseits schieben lässt. Hier müssen wir also mit der üblichen Text Replacement-Methode mittels der CSS-Angabe `text-indent: -9999px;` ran.

Allerdings hat der Internet Explorer wie oben beschrieben seine Schwierigkeiten mit dieser Lösung und verschiebt den kompletten Button ins Abseits, was sicherlich nicht im Sinne des Erfinders ist. Wir müssen den Internet Explorer also ausschließen, was auf zwei Arten Möglich ist.

**1. Über herkömmliche Conditional Tags:**

```html
<!--[if !IE]>
  <style type="text/css">
    input {
      text-indent: -9999px;
    }
  </style>
<![endif]-->
```

Dies ist die Standard-Abfrage, ob es sich beim Browser um einen Internet Explorer handelt oder nicht. Diesen Code-Schnipsel fügt man in den Kopf-Bereich ein und schon sieht der Button auch im Opera-Browser anständig aus.

**2. Ergänzung im `type`-Attribut:**

Ergänzt man das `type`-Attribut des `<style>`-Elements um die mit Apostroph abgegrenzte Angabe `charset=utf-8`, interpretiert der Internet Explorer die Angabe nicht mehr. Trotzdem ist das Dokument weiterhin valide.

```html
<style type="text/css;charset=utf-8">
  input {
    text-indent: -9999px;
  }
</style>
```

Welche Lösung ihr wählt, sei euch überlassen. Eine Empfehlung, welche besser ist, kann ich nicht abgeben.

[demo]: http://www.emanuel-kluge.de/demo/barrierefreier-button-mit-text-replacement/
[download]: /archive/wp-content/uploads/2009/07/barrierefreier-button-mit-text-replacement.zip
[explorer]: /html-css/wie-man-dem-internet-explorer-6-herr-wird/#die-hover-klasse-fuer-alle-elemente-verfuegbar-machen
