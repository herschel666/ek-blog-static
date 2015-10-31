---
title: "Clipboard" – Digitales Notizbrett mit Node.js und Backbone.js
author: Emanuel Kluge
layout: post
permalink: /html-css/clipboard-digitales-notizbrett-node-js-backbone-js/
categories:
  - Backbone.js
  - HTML/CSS
  - JavaScript
  - Neuigkeiten
---

[{% img /wp-content/uploads/2012/01/clipboard-node-js.gif Clipboard — Digitales Notizbrett mit Node.js und Backbone.js %}](http://clipboard.eu01.aws.af.cm/)

Um etwas Zerstreuung vom Uni-Lernstress zu bekommen, habe ich einen Ausflug in die bunte [Node.js](http://nodejs.org/)-Welt unternommen. Als Mittel zum Zweck diente mir dabei [das digitale Notizbrett "Clipboard"](http://clipboard.eu01.aws.af.cm/). Serverseitig kommt das [Application-Framework Express](http://expressjs.com/) zum Einsatz. Gespeichert werden die Daten in einer MongoDB-Datenbank mithilfe von [Mongoose](http://mongoosejs.com/).

Client-seitig kommt die bewährte Kombo aus [Underscore](http://documentcloud.github.com/underscore/), [Backbone](http://documentcloud.github.com/backbone/) und [jQuery](http://jquery.com/) zum Einsatz. Für Ordnung sorgt überdies [Require.js](http://requirejs.org/), wobei ich auf folgenden Ansatz zurückgegriffen habe: [Modular JavaScript & Backbone.js](https://github.com/thomasdavis/backbonetutorials/tree/gh-pages/examples/modular-backbone). Außerdem hat [jQueryUI](http://jqueryui.com/) einen "Gast-Auftritt" und sorgt für die Draggability der Notizen.

Das Hosting übernimmt dankenswerterweise [AppFog](https://www.appfog.com/), die Daten werden bei [MongoHQ](https://mongohq.com/) abgelegt. Defenitiv zwei sehr praktische Services.

([Clipboard-Code bei GitHub](https://github.com/herschel666/clipboard))
