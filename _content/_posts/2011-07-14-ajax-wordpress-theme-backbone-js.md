---
title: 'Studie "Backboned": AJAX-powered WordPress-Theme mit Backbone.js'
author: Emanuel Kluge
layout: post
permalink: /html-css/ajax-wordpress-theme-backbone-js/
categories:
  - Backbone.js
  - HTML/CSS
  - JavaScript
  - jQuery
  - PHP
  - WordPress
---

{% img /wp-content/uploads/2011/07/backboned-screenshot.gif &quot;Backboned&quot; &middot; AJAX-powered WordPress-Theme &middot; Screenshot %}

[Download][http://www.emanuel-kluge.de/wp-content/uploads/2011/07/backboned.zip]

**[Check out Backboned v2!!][https://github.com/herschel666/Backboned-v2]**

Um mir gelegentlich etwas Zerstreuung vom Lernen zu geben, habe ich einen lange gehegten Plan in die Tat umgesetzt: Ein AJAX-betriebenes WordPress-Theme mit [Backbone.js][http://documentcloud.github.com/backbone/] zu bauen. Und zwar keine auf "Graceful Degradation" setzende Kompromisslösung. Alle Inhalte werden asynchron geladen und sind per Hashbang URIs ansteuerbar. Ein Blick in den Quellcode offenbart, was ich meine: Ein JSON-Objekt mit allen grundlegenden Daten, eine Handvoll jQuery-Templates und das HTML-Grundgerüst. Das war es an statischem Content - die Darstellung des Inhalts geschieht über Backbone.js.

Damit Suchmaschinen nicht außen vor bleiben und man sich nicht die Mühe machen muss, einen "Headless Browser"  à la HtmlUnit auf seinem Server zum laufen bringen zu müssen, werden grundsätzlich alle Inhalte als GET-Anfrage mit dem Parameter `_escaped_fragment_` abgehandelt - die Ausgabe variiert dann je nachdem zwischen statischem HTML oder einem nackten JSON-Objekt. So ist sichergestellt, dass die Inhalte trotzdem indiziert werden können. Die einzigen, die in die Röhre schauen, sind Besucher ohne JavaScript.

Um diesen Workaround zu realisieren, war jedoch ein hohes Maß an Improvisation vonnöten. Mit WordPress-Bordmitteln habe ich es nicht geschafft, das Frontend-seitige URL-Routing von Backbone.js server-seitig abzubilden und entsprechend zu bearbeiten. Ich habe deshalb auf ein simples MVC-Pattern zurück gegriffen und in das eigentliche Theme eine Art Child-Theme integriert. Das ist insgesamt kein Ansatz der mir - besonders in meiner Umsetzung - gefällt. Des weiteren muss man für einen störungsfreien Betrieb des Themes das URL-Rewriting in den WordPress-Einstellungen deaktivieren.

Darüber hinaus bleibt anzumerken, dass das Theme insgesamt eher rudimentär ist. Ich würde von einem Produktiveinsatz abraten. Allerdings bin ich grundsätzlich von der Idee des Themes überzeugt und freue mich natürlich, wenn jemand sich ebenfalls dafür begeistern kann und daran weiterarbeitet. Gerne auch in Kollaboration mit mir. Zu tun gibt es unter anderem noch:

  1. die grundsätzliche Verbesserung des PHP-Codes (sicherer machen, besser in das WordPress-Environment integrieren, &hellip;)
  2. den Funktionsumfang erhöhen (Neueste Kommentare, Tags, Suchfunktion, Sidebar-Widgets(?), &hellip;)
  3. das JavaScript straffen (Performance, geschmeidigere GUI-Abläufe, &hellip;)

&hellip; um ein paar Aspekte zu nennen.

Ansonsten freue ich mich wie immer über Anregungen und Verbesserungsvorschläge - gerade bei einem Vorhaben dieser Größenordnung hat man als Entwickler nicht wirklich einen umfassenden Überblick.

<del datetime="2011-07-15T09:15:57+00:00">PS: Wahrscheinlich werde ich das Teil zeitnah bei GitHub reinladen. Muss mich da aber erst noch anschlauen.</del>

<ins datetime="2011-07-15T09:15:57+00:00"><strong>Update:</strong> Okay, die Geschichte ist jetzt auch auf GitHub - <a href="https://github.com/herschel666/Backboned" title="'Backboned' auf GitHub">https://github.com/herschel666/Backboned</a>. Viel Spaß.</ins>
