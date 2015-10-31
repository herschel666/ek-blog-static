---
title: Require.js: Umgebungsvariablen übers Script-Tag mitgeben
author: Emanuel Kluge
layout: post
permalink: /tips-und-tricks/require-js-umgebungsvariablen-ubers-script-tag-mitgeben/
categories:
  - JavaScript
  - Tips und Tricks
---

{% img /wp-content/uploads/2012/11/requirejs.jpg Require.js %}

Angenommen man lädt mit seine JavaScript-Dateien mit [Require.js](http://requirejs.org/), wobei man über das `data-main`-Attribut die Require.js-Konfiguration anspricht und innerhalb dieser mithilfe der `deps`-Eigenschaft die weiteren benötigten Dateien anmeldet. Hat man nun keine klassiche "Single-page App", sondern mehrere Unterseiten, auf welchen man unterschiedliche Funktionalitäten anbieten möchte, hat man drei Möglichkeiten:

  1. **Man verpackt alles in eine JavaScript-Datei und lädt diese auf allen Unterseiten**  
    Das ist ziemlich unelegant und läuft der Idee von Require.js, JavaScript zu modularisieren, zuwider. 
  2. **Man legt für jeden Unterseite eine Config-Datei an, die das gewünschte, zur Unterseite gehörige Script lädt**  
    Auch dies ist unelegant, da es Redundanz und unnötigen Overhead erzeugt. 
  3. **Man definiert am Script-Tag, welches die Require.js-Library einbindet, seitenspezifische Umgebungsvariablen**  
    Dazu im folgenden mehr …

Der Trick bei letzterer Herangehensweise ist, mithilfe des HTML5-`data`-Attributs weitere Informationen zu übergeben und dem Script-Tag eine ID zu verpassen, so dass es einfach angesprochen werden kann. Dadurch hat man die Möglichkeit, mit einer Konfigurationsdatei flexibel auf die jeweilige Unterseite zu reagieren.

Folgendermaßen sieht das Einbinden von Require.js aus:



```html
<script src="path/to/require.js" id="requirejs" data-main="path/to/config" data-env="about" data-devmode="1"></script>
```

require.js und die config.js werden geladen. Soweit, so normal. Außerdem wird mithilfe von `data-env` definiert, dass es sich bei der aktuellen Seite um die "About"-Seite handelt, und mithilfe von `data-devmode` weiterhin festgelegt, dass der Entwicklungsmodus aktiv ist. Bei letzterem muss man auf "0" und "1" zurückgreifen, da die Attributwerte immer als `String` ausgelesen werden. "true" und "false" wären als nicht-leere `Strings` also beide in der Abfrage `true`.

"0" und "1" jedoch kann man über den Umweg `Integer` in `Boolean` umwandeln. Dies geht mithilfe von [Bitwise-Operatoren](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Operators/Bitwise_Operators) folgendermaßen:

```javascript
typeof ('1337' | 0) // => "number"
```

Die zu ladene config.js sieht dann folgendermaßen aus:

```javascript
var requirejsElem = document.getElementById('requirejs');

require.config({

    deps : (function () {
        return [requirejsElem.getAttribute('data-env') + '.main']
    })(),

    urlArgs : (function () {
        return !!(requirejsElem.getAttribute('data-devmode')|0)
            ? 'bust=' + Date.now()
            : '';
    })(),

    paths : {
        jquery : 'libs/jquery-1.8.2.min'
    }

});
```

Als erstes wird das Script-Tag, welches Require.js lädt, in der Variable `requirejsElem` gespeichert, um bequem darauf zugreifen zu können. Dies ist zwar eine globale Variable, was es eigentlich zu vermeiden gilt, aber hier heiligt der Zweck die Mittel.

Als nächste folgt die eigentliche Require.js-Konfiguration. Die `deps`-Eigenschaft, welche die benötigte Applikationslogik lädt, ist nun dynamisch und spricht alle `<prefix>.main.js`-Dateien an. In diesen können dann die jeweils benötigten Module per `require([…])` geladen werden.

Das `devmode`-Flag wird fürs Cache-Busting genutzt. Ist die Seite im Dev-Mode, wird an alle Script-Pfade der GET-Parameter `bust` angehängt und diesem der aktuelle Timecode übergeben.

Befindet sich die Seite nicht im Dev-Mode, wird der `urlArgs`-Eigenschaft ein leerer String übergeben und das Caching der Scripte findet statt.

Dies sind nur zwei Möglichkeiten, Require.js mithilfe des `data`-Attributs flexibler zu nutzen. Im täglichen Entwicklerleben ergeben sich bestimmt noch weitere praktische Anwendungsfälle. Kann man zudem sicher sein, nur für moderne Browser zu entwickeln, muss man nicht umständlich mit `getAttribute` hantieren, sondern kann auf die [HTML5-data-Attribute-API](http://html5doctor.com/html5-custom-data-attributes/) zurückgreifen. Anstatt `requirejsElem.getAttribute('data-env')` reicht in dem Fall `requirejsElem.dataset.env`.
