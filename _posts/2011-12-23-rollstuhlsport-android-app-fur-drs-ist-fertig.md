---
title: “Rollstuhlsport” – Android-App für DRS ist fertig
author: Emanuel Kluge
layout: post.html
permalink: /html-css/rollstuhlsport-android-app-fur-drs-ist-fertig/
categories:
  - HTML/CSS
  - JavaScript
  - Neuigkeiten
---

<noscript data-src="/wp-content/uploads/2011/12/rollstuhlsport-android-app.gif" data-alt="Rollstuhlsport &mdash; Android-App des DRS">
<img src="/wp-content/uploads/2011/12/rollstuhlsport-android-app.gif" alt="Rollstuhlsport &mdash; Android-App des DRS">
</noscript>

Der [Deutsche Rollstuhl-Sportverband][drs] hat neuerdings eine [Android-App][drsapp], welche ich in meiner Rolle als Frontend-Developer bei [w3design.][w3design] entwickeln durfte. Die App wird zeitnah außerdem auch für das iPhone erscheinen.

Was daran jedoch besonders interessant ist &mdash; abgesehen vom Erscheinen der App selbst &mdash;, ist die Tatsache, dass ich sowohl von Java, als auch von Objective-C nicht den blassesten Schimmer habe. Vielmehr habe ich mich beim Entwickeln der App auf meine HTML-, CSS- und JavaScript-Kenntnisse verlassen. Möglich ist das durch [PhoneGap][phonegap], ein Framework, das Web-Apps in native Apps umwandelt und dabei ein paar sinnvolle Hardware-APIs zur Verfügung stellt.

Für die App selbst, habe ich auf [Backbone.js][backbone] gesetzt, da es mir gute Möglichkeiten bot, einerseits die Fülle an unterschiedlichen Daten zu verarbeiten, und andererseits ein sehr umfangreichen &ldquo;One-Pager&rdquo; zu bauen, welcher aus einer index.html besteht und alle Unterseiten client-seitig rendert.

Ich kann Phonegap jedenfalls nur empfehlen und möchte noch auf [LungoJS][lungojs] hinweisen, welches bei kleineren Apps sicher gut mit Phonegap Hand in Hand geht.

[drs]: http://www.drs.org/cms/
[drsapp]: https://market.android.com/details?id=com.phonegap.drsapp
[w3design]: http://www.w3design.de/
[phonegap]: http://phonegap.com/
[backbone]: http://documentcloud.github.com/backbone/
[lungojs]: http://www.lungojs.com/
