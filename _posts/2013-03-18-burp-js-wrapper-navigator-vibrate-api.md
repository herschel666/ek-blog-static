---
title: Burp.js — Wrapper für das Navigator.Vibrate-API
author: Emanuel Kluge
layout: post.html
permalink: /javascript/burp-js-wrapper-navigator-vibrate-api/
categories:
  - JavaScript
---

[<noscript data-src="/wp-content/uploads/2013/03/burp-js-screenshot.png" data-alt="Burp.js &mdash; Screenshot">
<img src="/wp-content/uploads/2013/03/burp-js-screenshot.png" alt="Burp.js &mdash; Screenshot">
</noscript>][github]

Seit kurzer Zeit gibt es ein JavaScript-API, mit welchem man Vibrationen von mobilen Geräten im Browser steuern kann. Um den Umgang mit dem API intuitiver zu gestalten, habe ich [einen Navigator.Vibrate-Wrapper namens Burp.js][repo] geschrieben. Dieser funktioniert folgendermaßen:

```javascript
Burp('*·*·*·**-**', 200);
```

Die `Burp`-Funktion nimmt zwei Parameter entgegen: Einen String, welcher den Rhythmus der Vibration steuert. Sternchen bilden dabei Vibrationen, Punkte ([Middle Dot][middledot]) sind kurze Unterbrechungen und Bindestriche Pausen, welche die gleiche Länge wie die Vibrationen haben. Mehrere Vibrationen bzw. Pausen hintereinander werden addiert.

Der zweite, optionale Parameter gibt in Millisekunden an, wie lang die Vibrationen und Pausen sein sollen. Der Default-Wert ist 300ms.

**[Hier gibt es eine Demo dazu &hellip;][github]**

Das ganze wird theoretisch vom mobilen Firefox, dem Android-Browser und dem mobilen Chrome unterstützt. Praktisch zum Laufen bekommen habe ich es jedoch nur im Mobile Firefox. Man wird sehen, wie es sich entwickelt. [Für mehr Informationen empfehle ich den Beitrag auf MDN dazu][mdn].

[github]: http://herschel666.github.com/Burp.js/
[repo]: https://github.com/herschel666/Burp.js
[middledot]: http://www.fileformat.info/info/unicode/char/b7/index.htm
[mdn]: https://developer.mozilla.org/en-US/docs/DOM/window.navigator.vibrate
