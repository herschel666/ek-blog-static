---
title: 'Backbone.js-Tutorial: Die Merkliste'
author: Emanuel Kluge
layout: post.html
permalink: /tutorial/backbone-js-tutorial-die-merkliste/
categories:
  - Backbone.js
  - HTML/CSS
  - JavaScript
  - jQuery
  - Tutorial
---

<noscript data-src="/wp-content/uploads/2011/05/backbone.png" data-alt="Backbone.js-Tutorial">
<img src="/wp-content/uploads/2011/05/backbone.png" alt="Backbone.js-Tutorial">
</noscript>

*[Demo][demo] | [Download][download]*

[Backbone.js][backbone] ist ein interessantes JavaScript-MVC, mit welchem ich mich seit etwa zwei Wochen beschäftige. Und nun möchte ich ein kleines Tutorial dazu präsentieren - wir bauen uns ein Merkliste. Das Konzept sieht wie folgt aus: Ständig laufen einem tolle Filme, Bücher und Spiele über den Weg, die man unbedingt noch sehen/lesen/spielen möchte, aber man merkt sie sich nie. Das ist der Punkt, wo die Merkliste ins Spiel kommt.

Bei der Programmierung habe ich mich stark an der [Todo List Application][todos] orientiert, allerdings ist die Merkliste vom Funktionsumfang her schmaler, beinhaltet dafür aber einen Controller für das URL-Routing.

Aber nun zur Sache:

Als erstes benötigen wir den HTML-Teil.

```html
<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  
  <title>Backbone.js-Tutorial - Merkliste</title> 
  <link rel="stylesheet" href="style.css" />
  
</head>

<body>

  <ul id="nav"></ul>
  <input type="text" placeholder="Gib einen Titel ein&hellip;" id="list_input" />
  <ul id="list"></ul>
  
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>
  <script src="//ajax.cdnjs.com/ajax/libs/underscore.js/1.1.6/underscore-min.js"></script>
  <script src="//ajax.cdnjs.com/ajax/libs/backbone.js/0.3.3/backbone-min.js"></script>
  <script src="js/backbone-localstorage.js"></script>
  <script src="js/list.min.js"></script>
  
  <script type="text/template" id="list-item-template">
    <strong><%= title %></strong>
    <span class="delete_item">x</span>
  </script>
  
  <script type="text/template" id="nav-template">
    <a href="#/category/<%= title %>"><%= title %></a>
  </script>
  
</body>
</html>
```

Für die Merklisten-App benötigen wir [jQuery][jquery], [Underscore.js][underscore], [Backbone.js][backbone] und die Backbone-Erweiterung [Local-Storage][localstorage], damit die Einträge im Browser gespeichert werden können. Des weiteren werden die Container für die Navigation und die Listeneinträge, sowie das Eingabefeld angelegt. Schlussendlich brauchen wir noch zwei Templates - eins für die Navigation, eins für die Liste.

Kommen wir nun zum JavaScript-Teil. Als erstes benötigen wir hier unser Model:

```javascript
window.List = Backbone.Model.extend();
```

Als nächstes erstellen wir zwei Collections, eine für die Navigation, eine für die Listeneinträge:

```javascript
window.NavCollection = Backbone.Collection.extend({
  model : List
});
  
window.ListCollection = Backbone.Collection.extend({
    
  model : List,
    
  localStorage : new Store('List'),
    
  getByCategory : function ( category ) {
    return this.filter( function (item) {
      return item.get('category') == category;
    });
  }
});
```

In der Collection für die Listen-Einträge wird der *Local Storage* angemeldet und eine Funktion eingefügt, die es ermöglicht, die Einträge der Collection nach ihrer Kategorie zu filtern.

Kommen wir nun zum Controller der App:

```javascript
window.ListController = Backbone.Controller.extend({

  _navModel : new NavCollection([
    {title : 'Filme'},
    {title : 'Buecher'},
    {title : 'Spiele'}
  ]),
  _navViews : [],
  _categoryModel : new ListCollection,
  _inputView : null,

  routes : {
    '' : 'init',
    '/category/:category' : 'getItems',
  },

  initialize : function () {
    this._navModel.each( function ( item, i ) {
      this._navViews[i] = new NavigationView({
        model : item
      });
    }, this);
      
    Backbone.history.start();
  },
    
  init : function () {
    window.location.hash = '/category/Filme';
  },
  
  getItems : function (category) {
    for ( view in this._navViews ) {
      this._navViews[view]
        .render()
        .setClass();
    };

    if ( this._inputView == null ) {
      this._inputView = new ListInputView({
        model : this._categoryModel,
        category : category
      });
    } else {
      this._inputView.options.category = category;
      this._inputView.model.trigger('refresh');
    }
  }

});
```

Als erstes werden - jeweils für die Navigation und die Liste - neue Instanzen der zugehörigen Collection erstellt und Platzhalter für die jeweiligen Views angemeldet. Danach werden die relevanten Pfade mit Funktionen verknüpft. In diesem Fall wird die Funktion `init()` ausgeführt, wenn kein *Hash* vorhanden ist, und die Funktion `getItems()`, wenn ein Kategorie-*Hash* vorhanden ist.

Als nächstes folgt die `initialize`-Funktion, welche als erstes beim Aufrufen des Controllers ausgeführt wird. Dabei wird das Navigation-Model mit den nötigen Einträgen versehen, danach für jeden Eintrag der Navigation-Collection eine View-Instanz erstellt und im _navView-Array gespeichert, sowie die `Backbone.history`-Funktion gestartet.

Als nächstes wird die `init`-Funktion definiert. Diese sorgt einfach nur dafür, dass die Kategorie "Filme" gewählt wird, indem der entsprechende Kategorie-*Hash* gesetzt wird. Die Kategorie ist hierbei willkürlich von mir gewählt.

Danach folgt die Definition der `getItems`-Funktion. In dieser werden als erstes die Views für die Navigationspunkte ge-rendert. Daraufhin folgt entweder die Initialisierung des Views für die Listeneinträge, oder - falls dies schon geschehen ist - das Überschreiben der aktuellen, dem View übergebenen Kategorie und das Neu-Aufbauen der Liste mit den entsprechenden Einträgen. Dabei kommt die Filter-Funktion der Listen-Collection zum Einsatz.

Nachdem nun Model, Collection und Controller vorhanden sind, geht es an die Views. Davon benötigen wir drei - einen für das Eingabefeld, einen für die Liste und einen für die Navigation. Fangen wir mit dem Eingabefeld an:

```javascript
window.ListInputView = Backbone.View.extend({
  
  el : $('#list_input'),
  
  list : $('#list'),
  
  events : {
    'keypress' : 'createListItem'
  },
  
  initialize : function () {
    _.bindAll(this, 'addListItem', 'addAllListItems');
    
    this.model.bind('add', this.addListItem);
    this.model.bind('refresh', this.addAllListItems);
    
    this.model.fetch();
  },
  
  createListItem : function (e) {
    if ( e.keyCode == 13 ) {
      this.model.create({
        category : this.options.category,
        title : this.el.val()
      });
      
      this.el.val('');
      this.el.blur();
    }
  },
  
  addListItem : function (item) {
    var view = new ListItemView({model : item});
    
    !view.model.length &#038;& this.list.append( view.render().el );
  },
  
  addAllListItems : function () {
    this.list.empty();
    
    _.each(this.model.getByCategory(this.options.category), function (item) {
      this.addListItem(item);
    }, this);
  }
  
});
```

Der ListInputView nimmt die Eingabe entgegen, erstellt eine neue Instanz des Listen-Eintrag-View und fügt füllt die Liste mit Einträgen. Die Funktion `createListItem()` erstellt einen neuen Eintrag in der Collection, wenn das Eingabefeld abgefeuert wurde. Über die Angabe `this.model.bind('add', this.addListItem);` in der `initialize`-Funktion wird gesorgt, dass daraufhin die Funktion `addListItem()` aufgerufen wird, die für den neuen Eintrag in der Collection eine Instant des Listen-Eintrag-View erstellt und diesem den Befehl `render()` mit auf den Weg gibt. Über die Funktion `addAllListItems()` wird einerseits sichergestellt, dass die Liste geleert wird, bevor neue Einträge nach einem Kategorie-Wechsel reingladen werden, und andererseits, bei Übergabe einer Collection mit mehreren einträgen, für jeden Eintrag die Funktion `addListItem()` ausgeführt wird.

Als nächstes kommen wir zum Listen-Eintrag-View:

```javascript
window.ListItemView = Backbone.View.extend({
    
  tagName : 'li',
    
  className : 'list_item',
    
  tmpl : _.template($('#list-item-template').html()),
    
  events : {
    'click .delete_item' : 'removeItem'
  },
    
  render : function () {
    $(this.el).html( this.tmpl( this.model.toJSON() ));
      
    return this;
  },
    
  removeItem : function () {
    this.model.destroy();
    $(this.el).fadeOut( function () {
      $(this).remove();
    });
  }

});
```

Hier wird das Element vom Standard (`div`) auf `li` gesetzt, die gewünschte CSS-Klasse gesetzt, das Template für den Eintrag angemeldet, ein Klick-Event mit der Funktion `removeItem()` verknüpft und anschließend die Funktionen `render()` und `removeItem()` definiert. Erstere fügt die Daten des Collection-Eintrags in das Template ein, letztere löscht den View und den dazugehörigen Collection-Eintrag.

Schlussendlich benötigen wir noch einen View für die Navigation:

```javascript
window.NavigationView = Backbone.View.extend({

  tagName : 'li',

  tmpl : _.template($('#nav-template').html()),

  hash : function () {
    return window.location.hash.replace('#/category/', '');
  },

  render : function () {
    $('#nav').append($(this.el).html( this.tmpl( this.model.toJSON() ) ));
      
    return this;
  },
    
  setClass : function () {
    var curHash = this.hash();

    this.el.className = ( curHash == $(this.el).find('a').text() ) ? 'current' : '';
  }

});
```

Neu und interessant ist hier die Funktion `setClass()`. Diese sorgt nach dem Rendern der Navigation, dass der aktuelle Reiter die Klasse "current" bekommt.

Um die Listen-App nun zum Laufen zu bringen, erstellen wir eine neue Instanz des Controllers:

```javascript
var listApp = new ListController();
```

Der ganze Spaß wird in eine anonyme jQuery-Funktion geschrieben, damit die App gestartet wird, sobald das DOM geladen ist.

Das war es auch schon. Ich hoffe, meine Erklärungen sind einigermaßen nachvollziehbar. Falls nicht, nutzt auf jeden Fall die Kommentar-Funktion. Des weiteren würde ich mich natürlich über Anregungen und Verbesserungsvorschläge freuen, da ich ja doch ein Neuling in Sachen Backbone.js bin. Ansonsten noch der Hinweis, dass bei Gefallen natürlich gerne regen Gebrauch von den unten stehenden Social-Media-Buttons gemacht werden kann.

Vielen Dank!

[demo]: http://www.emanuel-kluge.de/demo/backbone-js-merkliste/
[download]: http://www.emanuel-kluge.de/wp-content/uploads/2011/05/backbone-js-merkliste.zip
[backbone]: http://documentcloud.github.com/backbone/
[todos]: http://documentcloud.github.com/backbone/examples/todos/index.html
[jquery]: http://jquery.com/
[underscore]: http://documentcloud.github.com/underscore/
[localstorage]: http://documentcloud.github.com/backbone/docs/backbone-localstorage.html
