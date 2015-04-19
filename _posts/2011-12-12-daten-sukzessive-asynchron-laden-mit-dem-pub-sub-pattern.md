---
title: Daten sukzessive, asynchron laden mit dem Pub-Sub-Pattern
author: Emanuel Kluge
layout: post
permalink: /html-css/daten-sukzessive-asynchron-laden-mit-dem-pub-sub-pattern/
categories:
  - HTML/CSS
  - JavaScript
  - jQuery
---

Derzeit bin ich mit dem Bau einer Web-App beschäftigt, die initial einen Haufen Daten asynchron laden soll. Dafür könnte ich zwar ganz einfach ein paar `$.ajax`-Funktionen nacheinander aufrufen, doch hat diese Methode ihre Nachteile:

  1. Es bestehen Abhängigkeiteen zwischen den zu ladenden Daten, so dass sicher gestellt sein muss, dass die Daten vom Typ A fertig geladen sind, bevor das Laden der Daten vom Typ B startet bzw. starten kann.
  2. Der Fortschritt des Ladevorgangs soll visualisiert werden, heißt, ist ein Ladevorgang abgeschlossen und es beginnt der nächste, soll ein Ladebalken vorwärts schreiten.

Es wird ersichtlich, dass es nicht damit getan ist, die AJAX-Calls hintereinander aufzurufen. Vielmehr braucht es eine ordnende Instanz, die dafür sorgt, dass die Aufrufe sauber von einander getrennt ablaufen und zwischendurch Callback-Funktionen aufgerufen werden können. Um das zu erreichen, greife ich auf [das Pub-Sub-Pattern von Addy Osmani][scriptjunkie] zurück und kombiniere es mit einer *InitialDataloader*-Funktion. Die AJAX-Funktionalitäten hole ich mir von jQuery.

Im folgenden das Pub-Sub-Pattern:

```javascript
var mediator = (function () {

  function subscribe(channel, fn) {

    if ( !mediator.channels[channel] ) {
      mediator.channels[channel] = [];
    }

    mediator.channels[channel].push({
      context : this,
      callback : fn
    });

    return this;

  }

  function publish(channel, context) {

    var i = 0,
      len,
      args,
      subscription;

    if ( !mediator.channels[channel] ) {
      return false;
    }

    args = Array.prototype.slice.call(arguments, 2);
    len = mediator.channels[channel].length;

    for ( ; i<len; i += 1 ) {
      subscription = mediator.channels[channel][i];
      subscription.callback.apply((context || subscription.context), args);
    }

    return this;

  }

  return {
    channels : {},
    publish : publish,
    subscribe : subscribe,
    installTo : function (obj) {
      obj.subscribe = subscribe;
      obj.publish = publish;
    }
  }

})();
```

Auf das Pub-Sub-Pattern möchte ich gar nicht weiter eingehen. Lediglich der Hinweis, dass ich die *Publish*-Funktion um die Möglichkeit ergänzt habe, einen eigenen Kontext zu übergeben.

Kommen wir als nächstes zur *InitialDataloader*-Funktion:

```javascript
var InitialDataloader = function (args) {
  this.args = args;
  this.result = [];

  this.init();
};

InitialDataloader.prototype.init = function () {

  var i = 0,
    len = this.args.length;

  if ( !len ) {
    return;
  }

  for ( ; i<len; i+=1 ) {
    mediator.subscribe(this.args[i], this.load);
  }

  mediator.publish(this.args[0], this, {path : this.args[0], next : 1});

};

InitialDataloader.prototype.load = function (obj) {

  var that = this,
    deferred = $.ajax({url : obj.path});

  deferred.success(function (resp) {
    that.result.push('Data' + obj.next + ' loaded');
  });

  deferred.then( function (resp) {
    if ( obj.next === that.args.length ) {
      console.log(that.result);
    } else {
      mediator.publish(that.args[obj.next], that, {path : that.args[obj.next], next : obj.next+1});
    }
  });

};
```

in der Konstruktor-Funktion werden die Argumente entgegen genommen und der Prozess via der *init*-Funktion gestartet. Das args-Argument stellt dabei einen Array dar, der die Pfade zu den Daten enthält.

In der *init*-Funktion wiederum wird für jeden Pfad des args-Array eine Funktion im Pub-Sub-Pattern angemeldet. Anschließend wird das erste Element des Pub-Sub-Patterns "veröffentlicht", sprich die *load*-Funktion mit dem ersten Pfad aufgerufen und der Zähler zum nächsten Element des Pfad-Arrays mit übergeben.

Innerhalb der *load*-Funktion wird ein AJAX-Call auf den übergebenen Pfad gemacht und an ein *deferred*-Objekt übergeben. Dies wird anschließend genutzt, um eine *Callback*-Funktion zu starten, wenn der Ladevorgang abgeschlossen ist, und anschließend entweder das nächste Element des Pfad-Array im Pub-Sub-System zu "veröffentlichen" oder &mdash; wenn alle AJAX-Calls gemacht sind &mdash; eine finale Funktion aufzurufen (*console.log(that.result);*).

Anschließend noch der Aufruf der Funktion:

```javascript
var initialDataLoad = new InitialDataloader([
  'http://apple.com/',
  'https://twitter.com/',
  'http://www.spiegel.de/',
  'http://www.flickr.com/'
]);
```

Die Adressen sind willkürlich gewählt.

Wenn man den Code in ein Skript packt und im Browser laufen lässt, sieht man in der Konsole nacheinander die AJAX-Calls und abschließend die Ausgabe des `this.result`-Array, der die einzelnen, zu ladenden Elemente mitgezählt hat.

Das war es auch schon. Sollte es Fragen oder Anregungen, nutzt bitte die Kommentar-Funktion. Ich freue mich immer über Feedback!

[scriptjunkie]: http://msdn.microsoft.com/en-us/scriptjunkie/hh201955.aspx
