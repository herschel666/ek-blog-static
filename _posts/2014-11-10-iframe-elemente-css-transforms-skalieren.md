---
title: iFrame-Elemente mit CSS-Transforms skalieren
author: Emanuel Kluge
layout: post
permalink: /tutorial/iframe-elemente-css-transforms-skalieren/
categories:
  - HTML/CSS
  - JavaScript
  - Tips und Tricks
  - Tutorial
---

<small>(<a href="http://codepen.io/herschel666/blog/scaling-iframes-css-transforms" rel="nofollow">English version of this article @Codepen.</a>)</small>

Neulich hatte ich ein interessantes Problem: Ich musste ein `<iframe>`-Element in eine responsive Website einbetten, dessen Inhalt wiederum nicht responsiv war. Man kann sich leicht vorstellen, wo hier der Fallstrick liegt. Wird der Bildschirm kleiner, passt sich die umgebende Website zwar problemlos an, der Inhalt des iFrames jedoch bleibt starr in seinen Dimensionen. Zusätzlich erscheinen unschöne, horizontale Scroll-Balken am iFrame.

Glücklicherweise gibt es in modernen Browsern einen Weg, mit diesem Problem umzugehen. Mithilfe von CSS-Transforms kann der iFrame inklusive seines Inhalts runter skaliert werden wie ein Bild. Der folgende Codepen zeigt, wie das aussehen kann.

<iframe id="cp_embed_pzAGo" src="//codepen.io/herschel666/embed/pzAGo?theme-id=0&amp;height=300&amp;default-tab=result&amp;slug-hash=pzAGo&amp;user=herschel666" scrolling="no" allowtransparency="true" allowfullscreen="true" class="cp_embed_iframe undefined" style="width: 100%; overflow: hidden;" frameborder="0" height="300"></iframe>

([Link zur Demo-Seite][codepen])

Um dieses Verhalten zu implementieren, benötigen wir als erstes einen Breakpoint, ab dem die Skalierung wirksam wird. Den Breakpoint kann man sehr leicht ermitteln, indem man das Browser-Fenster verkleinert. Sobald am iFrame ein horizontaler Scroll-Balken auftaucht, hat man den Breakpoint erreicht.



```javascript
var BREAKPOINT = 1060; // (Willkuerlich gewaehlter Wert!)
```

Der Breakpoint dient außerdem als Referenz-Breite des iFrames: 100% entsprechen 1060px. Nun benötigen wir den Skalierungs-Faktor. In der Theorie ist das der Quotient aus gegenwärtiger Bildschirm-Breite und iFrame-Referenz-Breite. In der Praxis hat sich dieser Wert für mich jedoch ab einem bestimmten Punkt als zu groß erwiesen. Daher verringere ich den Wert geringfügig mithilfe der `Math.pow`-Methode und einem Exponenten von 1.2.

```javascript
var scale = Math.pow(window.innerWidth / BREAKPOINT, 1.2);
```

Eigentlich habe wir damit auch schon alles, was wir benötigen: einen Breakpoint, ab dem das Skalieren einsetzt, und einen Skalierungs-Faktor. Setzten wir nun jedoch den CSS-Transforms-Wert mit dem jeweiligen Skalierungs-Faktor am iFrame-Element an, passiert etwas merkwürdiges: der Inhalt des iFrames skaliert unmerklich, wobei das iFrame-Element selbst rapide an Größe verliert und buchstäblich in sich zusammen fällt. Das ist leider nicht das gewünschte Resultat.

Glücklicherweise gibt es einen Weg, dieses Verhalten zu unterbinden. Die Lösung ist, die Dimensionen des iFrames in dem Maße zu erhöhen, in dem es skaliert wird. Die Auswirkungen der CSS-Transforms auf die Abmessungen werden somit vollständig kompensiert und der iFrame verhält sich wieder wie ein normales, responsives Element. Lediglich der Inhalt des iFrames schrumpft wie gewünscht.

```javascript
var scale = 0.8; // (Willkürlich gewählt!)
var width = 100 / scale; // Breite in Prozent
var height = INITIAL_IFRAME_HEIGHT / scale; // Hoehe in Pixeln
```

Die Breite des iFrames in Prozent ist die Inverse des gegenwärtigen Skalierungs-Faktors multipliziert mit 100. Die angepasste Höhe in Pixel ist der Quotient aus initialer Höhe und Skalierungs-Faktor. Die initiale Höhe des iFrames muss dabei ganz zu Beginn einmal ermittelt und gespeichert werden.

Jetzt gibt es nur noch ein potenzielles Problem: ist das iFrame-Element mithilfe von `margin: * auto;` mittig auf der Seite positioniert, muss die `transform-origin` ebenfalls durch "`center top`" auf Zentrierung eingestellt werden.

Dies hat jedoch zur Folge, dass der iFrame während des Skalierens rechts aus dem Bild "läuft", da sich seine Breite sukzessive erhöht. Um dieses Verhalten zu kompensieren, muss der iFrame um die Hälfte seines Wachstums in der Breite nach links verschoben werden.

```javascript
var width = 100 / scale; // Breite in Prozent
var offsetLeft = (width - 100) / -2; // Versatz nach links in Prozent
```

Setzt man diesen Versatz mithilfe von `transform: translateX(…);`, bleibt der iFrame in der Mitte der Seite.

Das ist auch schon alles. Solltest du Fragen dazu haben, schreib einen Kommentar oder frag mich via Twitter: [@Herschel_R][twitter].

[codepen]: http://codepen.io/herschel666/full/pzAGo
[twitter]: https://twitter.com/Herschel_R
