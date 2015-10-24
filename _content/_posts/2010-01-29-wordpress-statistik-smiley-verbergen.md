---
title: WordPress-Statistik-Smiley verbergen
author: Emanuel Kluge
layout: post
permalink: /html-css/wordpress-statistik-smiley-verbergen/
categories:
  - HTML/CSS
  - Tips und Tricks
  - WordPress
---

Das Statistik-PlugIn [WordPress.com Stats](http://wordpress.org/extend/plugins/stats/) ist sicherlich praktisch. Vom Umfang her eher rudimentär, doch um schnell mal im Backend zu checken, was die Besucherzahl sagt, genau richtig.

Das einzige was störend sein kann, ist das kleine Smiley, das im Blog erscheint, wenn das PlugIn aktiv ist. Doch das wird man mit vier Zeilen CSS ganz schnell los:



```css
#wpstats {
  height: 0;
  visibility: hidden;
}
```

Nun ist das Bild verschwunden, wie es sich für einen "Zähl-Pixel" gehört, verrichtet jedoch weiter seinen Dienst.
