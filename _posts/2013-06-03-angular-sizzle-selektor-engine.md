---
title: Angular.js mit Sizzle.js als Selektor-Engine
author: Emanuel Kluge
layout: post.html
permalink: /javascript/angular-sizzle-selektor-engine/
categories:
  - Angular
  - JavaScript
---

{% lazyImg "/wp-content/uploads/2013/06/sizzle-angular-480x95.gif" "Sizzle & Angular" %}

Wie weithin bekannt ist, benutzt [Angular][angular] für DOM-Angelegenheiten intern eine abgespeckte [jQuery][jquery]-Variante namens [jqLite][ngElement], auf die über `angular.element` zugegriffen werden kann. Diese bietet ein paar Methoden aus dem Bereich DOM-Manipulation und -Traversing, hat jedoch keine Selektor-Engine. Bindet man parallel zu Angular die jQuery-Library ein, wird jqLite durch jQuery ersetzt.

Angesichts der Tatsache, dass Angular eigene Services für AJAX und Animationen (Version >= 1.1.3 in Verbindung mit CSS3) bietet, ist der Einsatz von jQuery jedoch stark übertrieben. Zum Glück gibt es die von jQuery verwandte und von John Resig geschriebene Selektor-Engine [Sizzle][sizzle] auch als Stand-alone-Version. Diese kann man alternativ einbinden. Man muss `angular.element` dann nur noch beibringen, sie auch zu verwenden.

Das wiederum ist schnell erledigt.

```javascript
// Anlegen einer Referenz auf die eigentliche angular.element-Methode
angular._element = angular.element;

// Ueberschreiben der angular.element-Methode
angular.element = function (selector) {
    // ist das uebergebene Argument bereits eine
    // Instanz von angular._element, wird es ohne
    // Umschweife zurueck gegeben.
    if ( selector instanceof angular._element ) {
        return selector;
    }

    // Andernfalls wird eine Sizzle-Instanz erstellt
    // und an die angular._element-Methode uebergeben.
    return angular._element(Sizzle(selector));
};
```

Fertig ist die Laube!

Das ganze gibt es auch als Angular-Modul [Angular-Sizzle" auf Github][github].

Zum Schluss noch der Hinweis, dass der Einsatz von Angular-Sizzle gut überlegt sein will. Das Konzept von Angular sieht vor, dass tiefgreifendere Arbeiten am DOM über Direktiven erledigt werden. Diese bieten abstrahierte Element-, Klassen- und Attribut-Selektoren. Innerhalb der Direktiven gibt es automatisch eine jqLite-Instanz der relevanten DOM-Elemente, mit der man arbeiten kann.

Der Einsatz einer ausgewachsenen Selektor-Engine könnte also übertrieben sein. Das hängt jedoch davon ab, was man vor hat.

[angular]: http://angularjs.org
[jquery]: http://jquery.com
[ngElement]: http://docs.angularjs.org/api/angular.element
[sizzle]: http://sizzlejs.com/
[github]: https://github.com/herschel666/angular-sizzle
