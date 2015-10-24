---
title: Das title-Attribut ist kein SEO-Spielzeug!
author: Emanuel Kluge
layout: post
permalink: /html-css/das-title-attribut-ist-kein-seo-spielzeug/
categories:
  - HTML/CSS
  - Überlegungen
---

Manchmal habe ich das Gefühl, es gibt Menschen da draußen, die das **title-Attribut** für ein **SEO-Spielzeug** halten. Eine Möglichkeit noch ein paar zusätzliche Infos für Google mit auf den Weg zu geben, um in den Rankings besser dazustehen. Das macht man, wenn man Lust darauf hat. Oder lässt es, wenn man nicht zu den Pedanten in Sachen Suchmaschinenoptimierung gehört.

Allerdings spielt das title-Attribut auch in Sachen Usability eine Rolle. Es bietet die Möglichkeit, dem Nutzer (tiefergehende) Informationen bezüglich eines Bildes oder eines Links zu geben.

### Das title-Attribut bei Verweisen

Links sind immer in ihrer Wortzahl begrenzt, da nur in den wenigsten Fällen ein ganzer Textabschnitt zum Link umfunktioniert wird. Eher sind es Teile von Sätzen oder - außerhalb von Textabschnitten - einzelne Begriffe, die auf andere Seiten verweisen. Auf jeden Fall kriegt man in der Link-Beschriftung nie den Namen der Seite, auf die verwiesen wird, deren Beschreibung, sowie eine kurze Beschreibung des Inhalts der Unterseite - falls nicht auf die Startseite verwiesen wird - unter. Mithilfe des title-Attributs ist das jedoch möglich.

Angenommen, man möchte auf eine Unterseite der Website des deutschen Dackel-Clubs verweisen, die sich mit dem Thema Aufzucht befasst. Erste Möglichkeit ist es, den Link im Text unterzubringen:



```html
<p>&hellip; bei der <a href="dackel-club.tld/path/to/aufzucht/" title="Deutscher Dackel-Club - Informationen zur Aufzucht von Dackeln">Aufzucht</a> von Dackeln &hellip;</p>
```

Ohne das title-Attribut weiß man nicht, wohin der Begriff "Aufzucht" führt. Durch Setzen des title-Attributs kann der Leser es jedoch herausfinden, indem er den Cursor etwas länger über dem Link ruhen lässt.

Eine weitere Möglichkeit ist es, den Link unterhalb des Textabschnitts zu setzen:

```html
<a href="dackel-club.tld/path/to/aufzucht/" title="Deutscher Dackel-Club - Informationen zur Aufzucht von Dackeln">Deutscher Dackel-Club</a>
```

Der Leser sieht, dass es weitergehende Informationen beim deutschen Dackel-Club gibt, doch worum es sich genau handelt, kann er aus der Link-Beschriftung "Deutscher Dackel-Club" nicht herauslesen. Das title-Attribut gibt hier mehr Aufschluss.

Nun wird der eine oder die andere vielleicht einwerfen, dass man den Inhalt des Link-Ziels doch aus dem Thema des Textes ableiten kann. Das ist sicherlich richtig, doch will man seine Besucher immer raten lassen oder lieber klar definierte Informationen liefern?!

### Das title-Attribut bei grafischen Verweisen

Als erstes zwei Beispiele, die mich überhaupt dazu bewogen haben, diesen Text zu schreiben:

  1. [Thinking for a Living][http://www.thinkingforaliving.org/]
  2. [Interview with Tom Hoops][http://photointerview.ru/2010/02/tom-hoops-the-dark-knight-of-the-portrait-photography/]

Bei beiden Seiten tauchen links und rechts des Inhalts zwei große Pfeile auf, die einen mehr oder weniger verfolgen und geklickt werden wollen, jedoch nicht preisgeben, welchen Zweck sie haben. Das ist äußerst irritierend und sollte auf jeden Fall vermieden werden. Das gleiche ist es mit Icons und Piktogrammen. Klar weiß ich, wenn ich ein kleines Stift-Symbol auf einer Seite sehe, dass da was bearbeitet werden kann. Doch was genau, sagt mir die Grafik nicht.

Möchte man also vermeiden, dass Nutzer unnötig klicken müssen, um den genauen Zweck des Links zu ergründen, dann sollte man sich des title-Attributs befleißigen und so unnötiges Herumraten und möglicherweise Frust vermeiden.

### Das title-Attribut bei Bildern

Neben dem alt-Attribut, kann man zur Beschreibung von Bildern auf Webseiten auch das title-Attribut benutzen. Dies kann durchaus sinnvoll sein, denn nur die wenigsten Bilder sprechen für sich und den Inhalt des alt-Attributs bekommt der durchschnittliche Besucher nicht zu sehen, es sei denn der Pfad zum Bild ist falsch gesetzt.

Allerdings muss man in diesem Fall etwas relativieren. In letzter Zeit haben sich immer mehr die so genannten Image-Captions durchgesetzt, bei denen die Beschreibung des Bildes direkt unterhalb des selben stehen. Das ist für den Besucher sicherlich sinnvoller, da die Beschreibung so direkt ersichtlich ist, und man nicht erst den Cursor auf dem Bild "parken" muss. Bedient man sich der Image-Captions, wird das Setzen des title-Attributs wirklich zu einer reinen SEO-Aktion.

Verzichtet man jedoch auf Image-Captions, sollte man den Besuchern, die noch über ihr Augenlicht verfügen, den Gefallen tun und das title-Attribut befüllen.

So, das war mein kleiner Diskurs am Morgen. Ich freue mich natürlich immer auf andere Ansichten zu diesem Thema. Wenn ihr also bei dem ein oder anderen Punkt der Meinung seid, das stimmt so nicht, wie ich es geschrieben habe, dann nutzt die Kommentar-Funktion und ergreift das Wort.
