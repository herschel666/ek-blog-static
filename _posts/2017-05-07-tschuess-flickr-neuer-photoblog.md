---
title: Tschüß, Flickr — mein neuer Photoblog ist am Start
author: Emanuel Kluge
layout: post.html
permalink: /neuigkeiten/tschuess-flickr-neuer-photoblog-am-start/
categories:
  - Neuigkeiten
---

<a href="/wp-content/uploads/2017/05/nepal-shrine.jpg" rel="lightbox">
  {% lazyImg "/wp-content/uploads/2017/05/nepal-shrine-480.jpg" "Hinduistischer Schrein im Licht der Abendsonne" %}
</a>

Es ist endlich geschafft: ich habe einen selbst gehosteten [Photoblog](https://photos.klg.bz/).

Seit Jahren trage ich mich nun schon mit einer ausgeprägten Aversion gegen Flickr. Seit der Dienst im Jahre 2005 von Yahoo übernommen wurde, gab es immer wieder firmenpolitische Entscheidungen und Vorfälle, die stark an meinen einst gehegten Sympathien genagt haben.

Jetzt endlich bin ich den Schritt gegangen, eine eigene Website für meine Fotos ins Netz zu löten. Ich nutze außerdem diese Gelegenheit, die [Fotos meiner Reise nach Nepal im Oktober 2016](https://photos.klg.bz/sets/nepal-2016/) zu veröffentlichen. Ansonsten habe ich derzeit drei bestehende Alben von Flickr auf die neue Website migriert. Die anderen Alben warten noch darauf, umgezogen zu werden.

Für diejenigen, die es interessiert, hier noch eine kurze Zusammenfassung der technischen Rahmenbedingungen:

Die Website wird mit [Webpack](https://webpack.js.org/) und dem [Static-Site-Generator-Plugin](https://www.npmjs.com/package/static-site-generator-webpack-plugin) zusammen gebaut. Im Client habe ich [Turbolinks](https://www.npmjs.com/package/turbolinks) integriert, um die Navigation innerhalb der Site etwas zackiger zu machen. Gehostet wird das ganze bei [Netlify](https://www.netlify.com/), ein Service den ich nur jedem wärmstens empfehlen kann, wenn es darum geht, eine statische Website zu hosten.
