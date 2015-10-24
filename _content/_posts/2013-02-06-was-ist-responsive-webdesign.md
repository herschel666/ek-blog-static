---
title: Was ist Responsive Webdesign?
author: Emanuel Kluge
layout: post
permalink: /html-css/was-ist-responsive-webdesign/
categories:
  - HTML/CSS
---

*Responsive Webdesign* (kurz: RWD) kann man getrost als **old News** bezeichnen und mittlerweile weiß jeder, worum es beim *Responsive Webdesign* geht. Sollte man meinen.

Meine Recherche nach einem Drupal-Template am gestrigen Abend hat mich jedoch ziemlich ernüchtert und mich an eine BarCamp-Session erinnert, wo der Vortragende über *Responsive Webdesign* erzählen wollte, jedoch nur eine kleine Einführung in *Media Queries* gab und sich anschließend im Glauben wähnte, das Thema angemessen erschlagen zu haben. Doch beschränkt sich der RWD-Ansatz mitnichten nur auf den Einsatz von *Media Queries*.

Aber zurück zu meiner Recherche: Wie es heutzutage beim intensiven Betrachten einer Website Gang und Gäbe ist, habe ich mir jeweils mit dem Cursor den linken Browser-Rand geschnappt und das Fenster horizontal auf und zu gezogen. Das hat sich in den letzten Jahren zu einer regelrechten Neurose in Webdesigner-Kreisen entwickelt. Doch liegt der Nutzen auf der Hand: Man kriegt eine Demonstration darüber, wie sich die Seite ungefähr auf kleineren Bildschirmen verhält.

Dabei war das Resultat in den meisten Fällen das gleiche: Der Inhalt schreckte angsterfüllt zurück sobald der Fensterrand näher kam und kauerte sich nahezu klaustrophobisch in die Seitenmitte. Nur, um nach kurzer Zeit abermals zusammen zu zucken und in neuerliche, geschrumpfte Hab-Acht-Stellung zu verfallen. Da ich einen "Auftrag" hatte und keine Lust, mich mit diesen "Schmuddelkindern" des RWDs intensiver auseinander zu setzen, habe ich die *Breakpoints* in den *Media Queries* nicht näher untersucht.

Ich würde jedoch Geld darauf wetten, dass da einfach anhand der Auflösung aktueller iPhones und iPads die *Breakpoints* gesetzt und das Layout neu-definiert wurde. Das ist auch akzeptabel für Besucher mit "Referenz"-Geräten. Wer jedoch das Pech hat, bspw. mit einem Tablet auf die Seite zu kommen, das eine geringfügig kleinere Auflösung als das iPad hat, bekommt das iPhone-Layout angezeigt: ein Klopapier-breiter Inhaltsstreifen in Gesellschaft zweiter dicker Whitespace-Bereiche links und rechts.

[Hier lässt sich der Effekt gut beobachten][http://www.devsaran.com/theme/best_responsive/] (der Name des Templates grenzt an Hohn).

Schön und gut, denkt sich da vielleicht der/die geneigte Leser/in. Toll ist das nicht, aber wie soll man es denn dann machen?

"Nichts leichter wie dies!", um es mit den Worten Helge Schneiders zu sagen. Man schmeißt die lästigen Pixel-Angaben aus seinem Stylesheet und macht Breiten-Angaben sowie horizontale Abstände in Prozent-Angaben. Zusätzlich gibt man eine Maximal-Breite der Seite an, damit diese bspw. nicht auf 24-Zoll-Bildschirmen den kompletten horizontalen Raum einnimmt. In den *Media Queries* ergänzt man anschließend noch Angaben zur Anpassung des Layouts der Elemente. Das Resultat ist ein Design, dass sich geschmeidig wie eine junge Katze dem Browser-Fenster anpasst, egal, wie breit es ist.

[Hier lässt sich das ganze praktisch erfahren][http://www.devsaran.com/theme/professional/] (kurioserweise ist das *Professional Theme* unter RWD-Gesichtspunkten besser als das *Best Responsive Theme* &hellip;)

Dem Design ist es nun egal, mit welchem Gerät man die Seite besucht. Die *Breakpoints* wurden auch nicht nach Lieblingshersteller gesetzt, sondern anhand des Inhalts. Unterstützt werden nicht eine handvoll Auflösungen, sondern ein stufenloser Bereich zwischen einer Minimal- und einer Maximalauflösung.

Und warum habe ich diesen Artikel geschrieben? Ganz einfach, um Missverständnisse aus der Welt zu räumen. Für diejenigen, die nicht selbst HTML/CSS schreiben, jedoch auf fertige Themes/Templates zurückgreifen und da etwas responsives suchen, der Hinweis, genau zu prüfen, was einem da als "responsive" angeboten wird. Euren Besuchern auf *Mobile Devices* zuliebe solltet ihr auf pseudo-responsive, fixe Layouts verzichten und richtige, responsive Fluid-Layouts wählen. So wird euer Inhalt immer anständig dargestellt, nicht nur auf drei Geräten. Den Unterschied sieht man im sogenannten Browser-Fenster-Auf-und-Zuzieh-Test.

Und für diejenigen, die selbst entwickeln und beim Thema *Responsive Webdesign* bisher als erste Assoziation *Media Queries* hatten, die Bitte, sich des Themas umfassender anzunehmen. RWD ist ein neuer Ansatz abseits fixer Layouts. *Media Queries* sind dabei nur ein Teilaspekt. Folgende zwei Bücher sind ein großartiger Einstieg in das Thema:

  1. [Responsive Webdesign: Reaktionsfähige Websites gestalten und umsetzen][http://www.amazon.de/gp/product/3446430156/ref=as_li_ss_tl?ie=UTF8&camp=1638&creative=19454&creativeASIN=3446430156&linkCode=as2&tag=pha5-21]<img src="http://www.assoc-amazon.de/e/ir?t=pha5-21&#038;l=as2&#038;o=3&#038;a=3446430156" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /> | neu, umfassend und auf deutsch
  2. [Responsive Web Design][http://www.abookapart.com/products/responsive-web-design] | der Klassiker von Ethan Marcotte

So, das musste ich einfach mal loswerden. Fragen, Anregungen, Ergänzungen sind hoch willkommen. Scheib einfach einen Kommentar.
