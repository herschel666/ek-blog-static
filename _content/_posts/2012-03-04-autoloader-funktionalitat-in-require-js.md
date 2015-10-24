---
title: Autoloader-Funktionalität in Require.js
author: Emanuel Kluge
layout: post
permalink: /tutorial/autoloader-funktionalitat-in-require-js/
categories:
  - Backbone.js
  - HTML/CSS
  - JavaScript
  - jQuery
  - Tutorial
---

{% img /wp-content/uploads/2012/03/requirejs-autoloader.jpg Require.js-Autoloader %}

*[Demo](http://www.emanuel-kluge.de/demo/requirejs-autoloader/) | [Download](http://www.emanuel-kluge.de/wp-content/uploads/2012/03/requirejs-autoloader.zip)*

Wenn aus dem "One-Pager" ein "Multi-One-Pager" wird, kann sich ein gewisser Overhead bezüglich der geladenen Skripte einstellen. Angenommen man baut eine Web-App, die aus vielen Einzelseiten besteht, und jede Einzelseite stellt für sich einen "One-Pager" dar, welcher nicht zwingend beim Besuch eines Nutzers aufgerufen wird. Dann werden — benutzt man Require.js zum Laden der Skripte — beim initialen Aufruf der Web-App alle Skripte geladen, auch wenn sie letztlich gar nicht benötigt werden.

In diesem Fall wäre es praktischer, mehrere Require.js-Instanzen anzulegen und durch einen zentralen Router gesteuert bei Bedarf aufzurufen. Dieses Szenario habe ich einmal mithilfe von Backbone.js nachgestellt. Die "Web-App" besteht aus diversen Einzelseiten, welche bestimmte jQuery-UI-Widgets beinhalten. Außerdem gibt es eine Startseite mit einem kurzen Erklärungstext. Ziel ist es, den Startseiteninhalt und die jQuery-UI-Widgets nur bei Bedarf zu laden.

Dafür wird beim Aufruf der Seite lediglich eine fundamentale Require.js-Instanz aufgerufen, die die global benötigten Skripte — jQuery, Underscore, Backbone, den jQuery-UI-Core und einen Observer — laden und einen Backbone-Router initialisieren, der die Autoloader-Funktionalität zur Verfügung stellt.



```javascript
require(['jQuery', 'Underscore', 'Backbone', 'Observer'], function ($, _, Backbone, Observer) {

  var Router = Backbone.Router.extend({

    routes : {
      ':site/*sub' : 'autoLoad'
    },

    initialize : function () {
      location.hash = location.hash || 'index/';

      Backbone.history.start();
    },

    autoLoad : function (site, sub) {
      var path = 'sites/' + site + '/app';

      require([path], function (App) {
        App.init({
          subPages : sub
        });
      });
    }
  }),

  router = new Router();

});
```

Der Router prüft als erstes, ob ein Location-Hash gesetzt ist. Ist dies nicht der Fall, wird der Hash `/index/` gesetzt, was die Initialisierung der Startseite einleitet. Weiterhin wartet der Router auf Änderungen des Location-Hash und führt im Bedarfsfall die `autoLoad`-Funktion aus, welche das gewünschte Modul/die gewünschte Seite lädt. Das `*sub` im `routes`-String des Routers stellt sicher, dass auch beim initialen Aufruf von Unter-Unterseiten die Autoload-Funktion tut, was sie soll.

Das vom Autoloader geladene Skript übergibt eine `init`-Funktion — dabei kann es sich, je nachdem ob die Seite lediglich statischen Inhalt hat oder tiefergreifende Funktionalität besitzt, entweder um eine Backbone-View- oder eine Backbone-Router-Instanz handeln.

```javascript
var init = function () {
    return new View();
  };

return {
  init : init
};
```

```javascript
var init = function (args) {
    return new Router(args);
  };

return {
  init : init
};
```

Das Datepicker-Modul habe ich als Beispiel für eine zusätzliche Router-Instanz gewählt. Inhaltlich zugegebenermaßen etwas mau, wird doch deutlich, dass auf diese Weise die Funktionalität der Web-App auch auf Unterebenen gewährleistet werden kann, ohne dass dies beim initialen Aufruf der Seite angemeldet bzw. geladen werden muss.

Beobachtet man den Inhalt des HTML-Head beim Durchklicken der Seite im Firebug bzw. Web Inspector, kann man sehr schön verfolgen, wie die jeweils benötigten Module und Widgets sukzessive nachgeladen werden.

Ich hoffe, mein Versuch, den Sachverhalt hier darzustellen, ist einigermaßen verständlich. Über Anregungen, Anmerkungen und Fragen freue ich mich immer. Sollte diesbezüglich Bedarf bestehen, kann ich nur dazu ermutigen, regen Gebrauch von der Kommentar-Funktion zu machen.

Außerdem sei darauf hingewiesen, dass der Code zur schnellen Inspektion auch [auf GitHub zur Verfügung steht](https://github.com/herschel666/Require.js-Autoloader).
