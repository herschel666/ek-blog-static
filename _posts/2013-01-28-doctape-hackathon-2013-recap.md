---
title: 'Doctape Hackathon 2013: A Recap'
author: Emanuel Kluge
layout: post.html
permalink: /hannover/doctape-hackathon-2013-recap/
categories:
  - Hannover
  - Neuigkeiten
---

Das Wochenende um den 19./20. Januar 2013 hatten die Kollegen von [Doctape][doctape] zum Hackathon geladen. Anlass der Veranstaltung &mdash; falls es zum Hacken einen Anlass braucht &mdash; war der [Launch des Doctape-API][doctape_blogpost], welche von den anwesenden Codern auf Herz und Nieren getestet werden sollte. Als Veranstaltungsort wurde das [Co-Working-Space EDELSTALL][edelstall] gewählt, da es zum einen die nötige Infrastruktur für den Anlass bot und zum anderen die Doctape-Büros beherbergt.

{% lazyImg "/wp-content/uploads/2013/01/doctape-hackathon-hannover-01-480x320.jpg" "doctape-Hackathon | Hannover 2013" %}  
<small>*Photo by [Nicolas Hafele][img_copyright]*</small>

Los ging es Freitag abend mit einer Präsentation des Unternehmens und der Veranstaltung, sowie einer Vorstellungsrunde der Teilnehmenden. Einige hatten auch direkt schon eine Idee, was sie bauen wollten, andere waren noch in der Findungsphase. Ungeachtet dessen machte sich eigentlich jeder sofort daran, einen ersten Zugang zum API per oAuth2 zu bekommen. Fürs leibliche Wohl wurde eine ansehnliche Pizza-Bestellung abgeschickt.

Ich selbst ließ es am Freitag bei der erfolgreichen Authentifizierung bewenden und trat um 00:30 Uhr den Heimweg an. Einige waren jedoch schon im Flow und blieben teilweise bis 04:00 Uhr morgens.

{% lazyImg "/wp-content/uploads/2013/01/doctape-hackathon-hannover-02-480x320.jpg" "Doctape-Hackathon | Hannover 2013" %}  
<small>*Photo by [Nicolas Hafele][img_copyright]*</small>

Am Samstag ging es um 10:00 Uhr ganz entspannt weiter. Ein gemeinsames Frühstück verschaffte die nötige Stärkung für einen langen Tag des Codens. Nach und nach trudelten auch die Nachtaktiven ein, so dass man ab dem frühen Nachmittag wieder vollzählig an den Rechnern saß und das API strapazierte. Ich hatte nun auch die Muße, mich meiner geplanten App zu widmen. Fürs leibliche Wohl traf mittags ein dicker Topf feinsten Chili con Carnes ein. Standesgemäß und vom Chili beflügelt wurde auch Samstags wieder bis tief in die Nacht hinein gehackt.

Der Sonntag begann wie der Samstag gemütlich mit einem gemeinsamen Frühstück. Anschließend gab es noch ein paar Stunden Zeit, das eigene Projekt fertig zu machen. Um 15:30 Uhr war dann Präsentation der Ergebnisse angesagt. Folgende, beachtliche Resultate sind zu vermelden:

## [Couchtape][couchtapeapp]

Couchtape ist eine pfiffige, auf Node.js und WebSockets basierende Anwendung, die eine zentral zugängliche Playlist anzeigt und sukzessive abarbeitet. Die Songs kommen von einem Doctape-Account. Die Playlist wiederum kann von Anwesenden befüllt werden, indem diese mit ihrem Smartphone (per Browser) auf das Couchtape-System gehen und dort die verfügbaren Songs auswählen und auf die Liste setzen. Durch die Verwendung von WebSockets ist gewährleistet, dass die zentrale Playlist und alle anwesenden Clients immer in Sync sind.

Das Projekt wird weiter entwickelt und freut sich über Contributors!

## [TapeBooth][tapebooth]

TapeBooth ist eine iOS-App, die es ermöglicht, Bilder zu machen, diese mit Filtern zu versehen und anschließend zu teilen. Nebenbei findet automatisch eine Synchronisierung mit dem eigenen Doctape-Account statt, so dass die Fotos automatisch in Doctape verwaltet werden können. *Instagram for Doctapers* könnte man &mdash; etwas einfallslos &mdash; sagen.

## [Doctape-Gallery][doctape_gallery]

Der Name ist Programm. Doctape-Gallery ist mit Node.js realisiert, zieht alle Fotos über das API und stellt sie in einer schicken Galerie dar. Per Tagging können Bilder in unterschiedliche Galerien eingeordnet werden.

## [MIDI-Delight][midi_delight]

Mein Beitrag zur Veranstaltung: MIDI-Delight zieht alle MIDI-Dateien, die man in seinem Doctape abgelegt hat, und bietet die Möglichkeit, sie im Browser anzuhören. Das ganze baut auf der bei [Midi.js][midi_js] gleisteten Arbeit auf und funktioniert leider nur in modernen Desktop-Browsern, auch wenn das Layout der App etwas anderes suggeriert.

Das war es, was ich in Erinnerung behalten habe. Die Liste ist unvollständig. Wer seinen Beitrag zum Doctape-Hackathon hier nicht wiederfindet und das gerne ändern möchte, teilt es mir am besten über einen Kommentar mit. Ich passe die Liste dann an.

Ansonsten bleibt festzuhalten, dass die Veranstaltung gelungen und ein großer Spaß war. Vielen Dank an Doctape und auf ein nächstes mal!

[img_copyright]: http://nicolashafele.tumblr.com
[doctape]: http://www.doctape.com/
[doctape_blogpost]: http://blog.doctape.com/the-doctape-public-api-and-developer-center/
[edelstall]: http://edelstall.de
[couchtapeapp]: https://github.com/couchtape/couchtapeapp
[tapebooth]: https://github.com/kimar/tapebooth
[doctape_gallery]: https://github.com/chmanie/doctape-gallery
[midi_delight]: https://github.com/herschel666/MIDI-Delight
[midi_js]: http://mudcu.be/midi-js
