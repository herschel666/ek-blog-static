---
title: WordPress-Statistik-Smiley verbergen
author: Emanuel Kluge
layout: post.swig
permalink: wordpress-statistik-smiley-verbergen/
categories:
  - HTML/CSS
  - Tips und Tricks
  - WordPress
---

Das Statistik-PlugIn [WordPress.com Stats][wp_stats] ist sicherlich praktisch. Vom Umfang her eher rudimentär, doch um schnell mal im Backend zu checken, was die Besucherzahl sagt, genau richtig.

Das einzige was störend sein kann, ist das kleine Smiley, das im Blog erscheint, wenn das PlugIn aktiv ist. Doch das wird man mit vier Zeilen CSS ganz schnell los:

```css
#wpstats {
  height: 0;
  visibility: hidden;
}
```

Nun ist das Bild verschwunden, wie es sich für einen "Zähl-Pixel" gehört, verrichtet jedoch weiter seinen Dienst.

[wp_stats]: http://wordpress.org/extend/plugins/stats/
