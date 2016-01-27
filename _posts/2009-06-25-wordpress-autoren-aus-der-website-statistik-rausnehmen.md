---
title: WordPress-Autoren aus der Website-Statistik rausnehmen
author: Emanuel Kluge
layout: post
permalink: /tips-und-tricks/wordpress-autoren-aus-der-website-statistik-rausnehmen/
categories:
  - Tips und Tricks
  - WordPress
---

{% lazyImg /wp-content/uploads/2009/06/google-analytics-479x94.png google analytics-Screenshot %}

Gerade gucke ich meine Statistiken auf Google Analytics an und muss mit Erschrecken feststellen, dass jedes mal, wenn ich beim Schreiben eines neuen Artikels diesen in der Vorschau betrachtet habe, das ganze als Page Impression festgehalten wurde. Was für ein Blödsinn, ich gucke den ganzen Tag pausenlos bei meinem Blog vorbei, und verfälsche mir damit die Statistik.

Unangenehmer wird das ganze noch, wenn man einen Blog mit mehreren Autoren betreibt. Schön, wenn die regelmäßig vorbei gucken und was schreiben, aber in der Besucherstatistik haben die nicht wirklich was verloren. Deshalb bietet es sich an, einfach alle eingeloggten User aus der Besucherzählung rauszunehmen. Und dafür fragen wir den Status ab:



```php
<?php if (!is_user_logged_in()) : ?>
  <!-- Hier den Statistik-Code-Schnippel einf&uuml;gen -->
<?php endif; ?>
```

Ist der Nutzer eingeloggt, wird der Zählcode nicht angezeigt. Für alle anderen, nicht eingeloggten Besucher schon. Nun muss die erste Amtshandlung beim Besuchen seiner Seite nur noch das Einloggen sein, und schon ist man raus und die Statistik zählt nur noch "echte", externe Besucher der Seite.
