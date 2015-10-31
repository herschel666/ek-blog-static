---
title: Wie man dem Internet Explorer 6 Herr wird
author: Emanuel Kluge
layout: post
permalink: /html-css/wie-man-dem-internet-explorer-6-herr-wird/
categories:
  - HTML/CSS
  - Tips und Tricks
---

Der IE6 kann zurecht als Schmutzfleck auf dem Browser-Markt bezeichnet werden. Und hartnäckig ist er obendrein auch, jedenfalls solange auf den Firmenrechnern der Welt Windows XP läuft. Und solange dies so ist, muss man beim Erstellen einer Website darauf Rücksicht nehmen. Allerdings muss **Cross-Browser-Kompabilität** auch in Zeiten des Internet Explorer 6 kein Grund sein, sich graue Haare stehen zu lassen.

Jedenfalls nicht, solange man "nur" einfache Seiten in HTML/CSS schreibt. Es gibt lediglich ein paar Dinge, auf die man achten muss, und schon sieht die Welt gleich viel freundlicher aus.

 1. [Weg mit der XML-Deklaration!](#weg-mit-derxml-deklaration)
 2. [Den "Double-Margin-Bug" unterbinden](#den-double-margin-bug-unterbinden)
 3. [Das "`hasLayout`-Konzept" berücksichtigen](#das-haslayout-konzept-beruecksichtigen)
 4. [`<hr>`-Tags immer umschließen](#hr-tags-immer-umschliessen)
 5. [`text-align: center` für zentrierte Layouts](#text-align-center-fuer-zentriert-layouts)
 6. [Die :Hover-Pseudoklasse für alle Elemente verfügbar machen](#die-hover-klasse-fuer-alle-elemente-verfuegbar-machen)
 7. [Finger weg von Attribut-Selektoren](#finger-weg-von-attribut-selektoren)
 8. [Vorsicht bei Hover-Effekten in Verbindung mit Hintergrund-Grafiken](#vorsicht-bei-hover-effekten-in-verbindung-mit-hintergrund-grafiken)
 9. ["iepngfix" für PNGs mit Alpha-Transparenz](#iepngfix-fuer-png-mit-alpha-transparenz)
 10. [Fazit](#ie6-fazit)

<a name="weg-mit-derxml-deklaration"></a>
### Weg mit der XML-Deklaration!

Solange euer HTML-Dokument mit der Zeile `<?xml version="1.0" encoding="utf-8"?>` anfängt, fällt der IE6 in den [Quirks-Modus](http://de.wikipedia.org/wiki/Quirks-Modus) und das Box-Modell wird falsch berechnet. Das hat zur Folge, dass `margin`-, `padding`- und `border`-Angaben im Stylesheet nicht mit in die Breite bzw. Höhe eines Block-Elements einfließen.

 * [XML-Deklaration im IE6](http://xhtmlforum.de/33772-xml-version-1-0-encoding-utf.html)

<a name="den-double-margin-bug-unterbinden"></a>
### Den "Double-Margin-Bug" unterbinden

Weist man einem Block-Element die Eigenschaft `float: left` zu, verdoppelt der IE6 den Außenabstand nach links. Analog läuft es mit `float: right`. Dies kann einem jedes Layout verhageln. Unterbinden lässt sich dies, indem man dem gefloateten Element die Eigenschaft `display: inline;` zuweist. Klingt absurd, hilft aber.

 * [IE6 Double Margin Bug Fix](http://www.jaymeblackmon.com/ie6-double-margin-bug-fix)
 * [IE6 double margin bug](http://www.kollermedia.at/archive/2008/10/17/ie6-double-margin-bug/)

<a name="das-haslayout-konzept-beruecksichtigen"></a>
### Das "`hasLayout`-Konzept" berücksichtigen

`hasLayout` ist eine proprietäre Eigenschaft von Microsoft und kann `true` oder `false` sein. Viele Darstellungsfelder im IE6 gehen auf diesen Eigenschaft zurück. Man geht also auf Nummer Sicher, wenn man mit `width`-Angaben im Stylesheet nicht knausert, wodurch das Element auf `hasLayout = true` gesetzt wird.

 * [Über hasLayout](http://www.satzansatz.de/cssd/onhavinglayout.html)
 * ["Microsoft — HasLayout" Overview](http://msdn.microsoft.com/en-us/library/bb250481.aspx)

<a name="hr-tags-immer-umschliessen"></a>
### `<hr>`-Tags immer umschließen

`<hr>`-Elemente haben im IE6 immer einen Rand, daher muss man sie mit `<div>`-Tags umschließen und das `<hr>`-Tag selbst im Stylesheet auf `display: none;` setzen.

```html
<div class="hr">
  <hr />
</div>
```

```css
.hr {
  /* hier das styling */
}

.hr hr {
  display: none
}
```

 * [Styling `<hr>` with CSS](http://www.sovavsiti.cz/css/hr.html)

<a name="text-align-center-fuer-zentriert-layouts"></a>
### `text-align: center` für zentrierte Layouts

Will man sein Layout zentrieren, so wie ich das hier gemacht habe, weist man dem Inhaltscontainer einfach im Stylesheet die Eigenschaft `margin: 0 auto;` zu und schon sitzt das Ding mittig. Außer natürlich im IE6.

Hier gibt es allerdings einen schönen Workaround: Einfach dem `<body>`-Tag `text-align: center;` zuweisen, dadurch wird der Inhaltscontainer zentriert. Dem Inhaltscontainer wiederum weist ihr die eigentliche, auf der Website gewünschte Textausrichtung zu.

```css
body {
  text-align: center
}

#wrap {
  text-align: left
}
```

<a name="die-hover-klasse-fuer-alle-elemente-verfuegbar-machen"></a>
### Die :Hover-Pseudoklasse für alle Elemente verfügbar machen

`:hover` ist eine sogenannte **Pseudoklasse** und funktioniert im IE6 nur in Verbindung mit dem `<a>`-Element. Dies kann nervig sein, wenn man z.B. einen Button mit einem Hover-Effekt versehen möchte, was der Benutzbarkeit einer Website ja durchaus zuträglich sein kann.

Für diesen Fall empfiehlt sich der *"Whatever:hover"-Hack*. Sobald dieser eingebunden ist, kann man die `:hover`-Klasse auf alle Elemente anwenden.

**Achtung: Funktioniert nur bei aktiviertem JavaScript!**

 * [Whatever:hover — Erklärung und Download](http://www.xs4all.nl/~peterned/csshover.html)

<a name="finger-weg-von-attribut-selektoren"></a>
### Finger weg von Attribut-Selektoren

Mit Attribut-Selektoren hat man bspw. die Möglichkeit einzelne `<input>`-Elemente in einem Formular über `input[type=text]` oder `input[type=submit]` anzusprechen und zu stylen. Eine tolle Einrichtung in CSS, die im Internet Explorer 6 leider nicht funktioniert. Man kommt also nicht umhin, althergebrache ID's oder Klassen zu vergeben, wenn man diese Elemente ansprechen möchte.

 * [Beschreibung aller Attribut-Selektoren](http://jendryschik.de/wsdev/einfuehrung/css/selektoren#attributselektoren)

<a name="vorsicht-bei-hover-effekten-in-verbindung-mit-hintergrund-grafiken"></a>
### Vorsicht bei Hover-Effekten in Verbindung mit Hintergrund-Grafiken

Besonders bei Hover-Effekten empfiehlt es sich eigentlich, auf sogenannte CSS-Sprites zurück zu greifen, um Verzögerungen beim Laden der Hover-Grafik zu vermeiden. CSS-Sprites bedeutet, dass man alle Grafiken in eine Datei steckt und beim Hover-Effekt keine neue Grafik lädt, sondern lediglich die Hintergrundposition des CSS-Sprites ändert.

Eine geniale Lösung — außer für den IE6. Dieser speichert Grafiken nicht im Cache, so dass die große CSS-Sprite-Grafik jedes mal neu geladen werden muss, was den Hover-Effekt noch holperiger als bei der Standard-Lösung macht. Das bedeutet, dass man für den IE6 ein Extra-Stylesheet anlegen muss, in dem man die Hover-Effekte auf althergebrachte Weise mit Einzelgrafiken definiert.

 * [Hovereffekte mit CSS-Sprites](http://www.webkrauts.de/2007/10/20/hovereffekte-mit-css-sprites/)
 * [CSS Sprites: Image Slicing’s Kiss of Death](http://www.alistapart.com/articles/sprites)

<a name="iepngfix-fuer-png-mit-alpha-transparenz"></a>
### "iepngfix" für PNGs mit Alpha-Transparenz

Der IE6 unterstützt von Hause aus keine Alpha-Transparenz bei PNGs, weshalb der eigentlich transparente Bereich in einem "dekorativen" grau erstrahlt. Allerdings ist das kein Grund zu verzagen, gibt es doch den "**iepngfix**". Diesen — genauso wie den "Whatever:hover"-Hack — in die Website einbinden, und schon bereiten PNGs keine Probleme mehr.

**Achtung: Funktioniert nur bei aktiviertem JavaScript!**

* [Entwicklerseite des "iepngfix"](http://www.twinhelix.com/css/iepngfix/)
* [Transparente PNGs im Internet Explorer 6](http://www.drweb.de/magazin/transparente-pngs-im-internet-explorer-6/)

<a name="ie6-fazit"></a>
### Fazit

Berücksichtigt man diese Dinge, kann man schon von Vornherein eine Menge Unheil verhindern, ohne dass man von Beginn an seine Zeit mit dem IE6 verschwendet. Ich als Apple-User baue meine Seite komplett im Firefox und erst zum Schluss schmeiße ich "Parallels Desktop" an und begutachte die Seite im Internet Explorer. Klingt mutig, ist aber kein Problem, wenn man den IE6 von Anfang an im Hinterkopf hat.

Sollte ich etwas wichtiges vergessen haben, bin ich über einen Hinweis in den Kommentaren dankbar. Ansonsten wünsche ich weiterhin viel Spaß(?) beim Arbeiten mit dem Internet Explorer 6.

PS: Auch interessant ist der [Beitrag über den Umgang mit dem IE6](http://www.highresolution.info/spotlight/entry/hold_on_an_stand_still_das_leben_mit_dem_ie6/) von Dirk Jesse.
