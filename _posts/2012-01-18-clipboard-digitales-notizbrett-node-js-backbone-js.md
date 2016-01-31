---
title: „Clipboard“ – Digitales Notizbrett mit Node.js und Backbone.js
author: Emanuel Kluge
layout: post.html
permalink: /html-css/clipboard-digitales-notizbrett-node-js-backbone-js/
categories:
  - Backbone.js
  - HTML/CSS
  - JavaScript
  - Neuigkeiten
---

[{% lazyImg "/wp-content/uploads/2012/01/clipboard-node-js.gif" "Clipboard &ndash; Digitales Notizbrett mit Node.js und Backbone.js" %}][demo]

Um etwas Zerstreuung vom Uni-Lernstress zu bekommen, habe ich einen Ausflug in die bunte [Node.js][nodejs]-Welt unternommen. Als Mittel zum Zweck diente mir dabei [das digitale Notizbrett "Clipboard"][demo]. Serverseitig kommt das [Application-Framework Express][expressjs] zum Einsatz. Gespeichert werden die Daten in einer MongoDB-Datenbank mithilfe von [Mongoose][mongoosejs].

Client-seitig kommt die bewährte Kombo aus [Underscore][underscore], [Backbone][backbone] und [jQuery][jquery] zum Einsatz. Für Ordnung sorgt überdies [Require.js][requirejs], wobei ich auf folgenden Ansatz zurückgegriffen habe: [Modular JavaScript & Backbone.js][modular_backbone]. Außerdem hat [jQueryUI][jqueryui] einen "Gast-Auftritt" und sorgt für die Draggability der Notizen.

Das Hosting übernimmt dankenswerterweise [AppFog][appfog], die Daten werden bei [MongoHQ][mongohq] abgelegt. Defenitiv zwei sehr praktische Services.

([Clipboard-Code bei GitHub][github])

[demo]: http://clipboard.eu01.aws.af.cm/
[nodejs]: http://nodejs.org/
[expressjs]: http://expressjs.com/
[mongoosejs]: http://mongoosejs.com/
[underscore]: http://documentcloud.github.com/underscore/
[backbone]: http://documentcloud.github.com/backbone/
[jquery]: http://jquery.com/
[requirejs]: http://requirejs.org/
[modular_backbone]: https://github.com/thomasdavis/backbonetutorials/tree/gh-pages/examples/modular-backbone
[jqueryui]: http://jqueryui.com/
[appfog]: https://www.appfog.com/
[mongohq]: https://mongohq.com/
[github]: https://github.com/herschel666/clipboard
