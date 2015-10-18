---
title: HTTP Fehler beim Upload in WordPress unter 1und1
author: Emanuel Kluge
layout: post
permalink: /tips-und-tricks/http-fehler-beim-upload-in-wordpress-unter-1und1/
categories:
  - Tips und Tricks
  - WordPress
---

Momentan richte ich einen **WordPress**-Blog auf **1und1**-Webspace ein und wurde beim Hochladen von Bildern mit dem **"HTTP Fehler"** konfrontiert. Das Bild ist zwar auf dem Server gelandet, sogar da, wo es hin soll, doch konnte WordPress weder die Größe ermitteln, noch die obligatorischen Thumbnail- und 'Mittlere Größe'-Äquivalente anlegen.

Den "HTTP Fehler" gab es vor einiger Zeit schon einmal, beim Update auf die WordPress-Version 2.7. Damals lag es am Flash-Uploader, den man per PlugIn deaktivieren und das Problem somit lösen konnte.

In diesem Fall aber liegt es nicht am Flash-Uploader, sondern an dem Umstand, dass 1und1 die WordPress-Skripte als PHP4-Skripte *parst*. Richtigerweise werden diese jedoch als PHP5-Skripte *geparst*, was man durch folgenden Eintrag in die .htaccess-Datei erreichen kann:



```ini
AddType x-mapp-php5 .php
AddHandler x-mapp-php5 .php
```

Solltet ihr noch keine .htaccess-Datei haben, legt lokal bei euch eine leere htaccess.txt-Datei an, ladet sie ins root-Verzeichnis eurer WordPress-Installation hoch, entfernt das Suffix ".txt" und fügt einen Punkt an den Anfang des Dateinamens. Daraufhin wird die Datei wahrscheinlich verschwinden. Um sie wieder zu sehen, müsst ihr in eurem FTP-Programm das Anzeigen versteckter Dateien aktivieren.

Nun sollte der "HTTP Fehler" Vergangenheit sein.

Quelle: [1&1 Hilfe-Center][1und1]

[1und1]: http://hilfe-center.1und1.de/hosting/scripte_datenbanken/php/18.html
