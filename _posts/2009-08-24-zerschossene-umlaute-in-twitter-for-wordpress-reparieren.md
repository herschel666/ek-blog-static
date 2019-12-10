---
title: Zerschossene Umlaute in “Twitter for WordPress” reparieren
author: Emanuel Kluge
layout: post.swig
permalink: zerschossene-umlaute-in-twitter-for-wordpress-reparieren/
categories:
  - PHP
  - Tips und Tricks
  - Twitter
---

Seit ich diesen Blog gestartet habe, zeige ich meine drei aktuellsten [Twitter-Updates][twitter] mit ["Twitter for WordPress"][twitter_for_wordpress] in der Sidebar an. Und seitdem werden die Umlaute zerschossen. Das ist nicht sehr schön und endlich habe ich eine Lösung gefunden, das Problem zu beheben.

Und zwar mithilfe des [Plug-Ins "WP-RSS Import" von Frank Bueltge][bueltge]. Dieses setzt genau wie das Plug-In "Twitter for WordPress" auf die WordPress-eigene Funktion `fetch_rss()`, welche wiederum die Probleme verursacht.

Die Lösung besteht nun aus zwei Arrays aus Franks Plug-In:

```php
$umlaute = array('&#8211;', '&#8212;', &hellip;);
$htmlcode = array('&ndash;', '&mdash;', &hellip;);
```

Die kompletten Arrays kann ich hier nicht angeben, da sie viel zu umfangreich sind. Ihr findet sie aber im [SVN-System des Plug-In Directory von WordPress][rss_import]. Die beiden gesuchten Arrays befinden sich in der Mitte und sind eigentlich nicht zu übersehen.

Diese kopiert ihr bspw. in Zeile 70 der Datei twitter.php von "Twitter for WordPress", vor die `foreach`-Schleife. Als nächstes kommt die Funktion, die dafür sorgt, dass alle Umlaute, die im Array `$umlaute` stehen, durch die entsprechenden Entitäten aus dem Array `$htmlcode` ersetzt werden:

```php
$msg = str_replace($umlaute, $htmlcode, $msg);
```

Das tragt ihr in Zeile 76 der twitter.php ein und schon seid ihr fertig. Von nun an werden alle mit "Twitter for WordPress" eigebundenen Tweets sauber dargestellt.

An dieser Stelle noch einmal ein Dank an Frank Bueltge für das Erstellen dieser beiden monströsen Arrays. Wer genauso wie ich nach langer, erfolgloser Suche darin endlich die Lösung für das Umlaute-Problem gefunden hat, dem möchte ich den [Spenden-Button][bueltge] auf seiner Seite nahelegen. Einen Euro oder mehr für gute Programmier-Arbeit zu spenden ist eine schöne Geste und sorgt dafür, dass die Entwicklung im Open-Source-Bereich weiter geht.

[twitter]: http://twitter.com/Herschel_R
[twitter_for_wordpress]: http://wordpress.org/extend/plugins/twitter-for-wordpress/
[bueltge]: http://bueltge.de/wp-rss-import-plugin/55/
[rss_import]: http://svn.wp-plugins.org/rss-import/branches/3.7/rssimport.php
