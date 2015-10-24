---
title: Email Obfuscation: jQuery-PlugIn zur Verschleierung von Email-Adressen
author: Emanuel Kluge
layout: post
permalink: /jquery/email-obfuscation-jquery-plugin-zur-verschleierung-von-email-adressen/
categories:
  - JavaScript
  - jQuery
---

<p><ins datetime="2011-03-27T18:23:33+00:00"><strong>Anmerkung:</strong> Die Überschrift ist genau genommen etwas irreführend, da das PlugIn die Email-Adresse vielmehr entschleiert. Das aber nur am Rande erwähnt.</ins></p>

Ein altes Problem, für welches es mittlerweile zugegebenermaßen schon viele Lösungen gibt, ist das Veröffentlichen von Email-Adressen auf Websites. Schreibt man die richtige Adresse in den Quelltext, macht man seinen Besuchern das Leben leichter. Aber man arbeitet auch den Email-Spammern in die Hände, die das Netz nach Adressen durchforsten.

Verschleiert man seine Email-Adresse, indem man bspw. das @-Zeichen durch "(at)" ersetzt, hat man das Problem nicht. Nur müssen Besucher die Zeichen erst umständlich ersetzen, wenn sie eine Email an die Adresse schreiben wollen.

Meine Lösung des Problems ist eine Kombination aus Verschleierung der Adresse im Quelltext und ein Re-Build der Adresse per Javascript mithilfe eines jQuery-Plugins:

```javascript
(function ($) {
  $.fn.obfuscateEmail = function (at, point, addClass) {

    /**
     * Regular Expressions fuer @ und . definieren
     * falls die Argumente gesetzt sind
     */
    var at = at && new RegExp(at, 'g') || false,
        point = point && new RegExp(point, 'g') || false;

    /**
     * Plugin-Funktion ausfuehren, falls
     * Regular Expressions fuer @ und . definiert
     * sind.
     * Ansonsten nur 'this' zurueck geben.
     */
    return at && point && this.each(function () {

      /**
       * Wenn 'addClass' auf 'true' gesetzt ist,
       * dem Element die Klasse 'js' anhaengen
       */
       this.className = this.className + (addClass && ' js' || '');

      /**
       * Verschleierte Adresse anhand der Leer-
       * zeichen in Array aufsplitten
       */
      var mailTo = this.innerHTML.split(' '),
          mailToLen = mailTo.length,
          address = [],
          i;

      /**
       * Anhand der uebergebene @- und .-Werte
       * jedes Element des mailTo-Arrays pruefen
       * und ggf. Zeichen ersetzen.
       * mailTo-Elemente in address-Array speichern.
       */
      for ( i = 0; i < mailToLen; i += 1 ) {
        address.push(point.test(mailTo[i])
          ? '.'
          : at.test(mailTo[i])
          ? '@'
          : mailTo[i]);
      }

      /**
       * Inhalt des Elements mit mailto-Link
       * und der unverschleieerten Adresse aus
       * dem address-Array befuellen
       */
      this.innerHTML = '<a href="mailto:' + address.join('') + '">' + address.join('') + '</a>';

    }) || this;
  };
})(jQuery);
```

Angewendet wird das PlugIn folgendermaßen:

```javascript
$(document).ready(function () {
  $('span.email').obfuscateEmail('(at)', '(punkt)', true);
});
```

Die ersten beiden Argumente der Funktion definieren, mit welchen Ausdrücken das @- und .-Zeichen der Email-Adressen verschleiert ist. Das dritte Argument ist ein Boolean-Wert und gibt an, ob den Adressen die Klasse 'js' angehängt werden soll, um sie unterschiedlich stylen zu können, je nachdem, ob der Besucher JavaScript aktiviert hat oder nicht. Das PlugIn arbeitet sich dann durch alle Adressen der Seite, hängt im Bedarfsfall die Klasse 'js' an und ersetzt die verschleierte Adresse durch die korrekte, inklusive mailto-Hyperlink zum einfachen Versenden im Email-Client bei Klicken der Adresse.

Die Adressen können folgendermaßen aussehen:

```html
<span class="email">hansmustermann (at) domain (punkt) com</span>
<p class="email">foo <em>(punkt)</em> bar <em>(at)</em> domain <em>(punkt)</em> com</p>
```

Wichtig bei den Adressen ist, dass die einzelnen Elemente durch ein Leerzeichen getrennt sind, sonst funktioniert es nicht. Wie man in der zweiten Zeile sieht, können die verschleierten Symbole beliebig in HTML gefasst werden, um die Adresse für Besucher ohne JavaScript besser lesbar zu machen. Der Funktionalität des PlugIns tut dies kein Abbruch, solange die Leerzeichen vorhanden sind.

So einfach ist. Fragen, Anregungen, Verbesserungsvorschläge bitte in die Kommentare. Vielen Dank.
