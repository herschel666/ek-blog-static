---
title: „Drop-a-Site“ – Einfache, statische Seiten schnell erstellen
author: Emanuel Kluge
layout: post
permalink: /html-css/drop-a-site-einfache-statische-seiten-schnell-erstellen/
categories:
  - HTML/CSS
  - PHP
---

[{% img /wp-content/uploads/2012/07/github-_-herschel666-_-drop-a-site.jpg Github &mdash; herschel666 &mdash; Drop-a-Site %}][github]

["Drop-a-Site" auf GitHub][github] | [Download][download]

Hin und wieder kommt man in die Verlegenheit, eine kleine statische Seite aufsetzen zu müssen. Diese ist vom Umfang her so dünn, dass es sich nicht lohnt, eine Datenbank anzulegen und das Standard-CMS/-Framework der Wahl zu strapazieren. Andererseits hat man aber auch keine Lust, mit einem Haufen statischer HTML-Dateien rum zu hantieren.

Das ist der Punkt, wo so genannte "Static Site Generators" ins Spiel kommen. Ein Vertreter dieser Gattung möchte "Drop-a-Site" sein &mdash; einfachste Bereitstellung statischer Inhalte mithilfe von URL-Rewriting. Dabei habe ich Wert auf Simplizität gelegt. Man definiert die Pfade zu seinen Seiten sowie die zugehörigen Seitentitel, und "Drop-a-Site" liefert aus. Auf weiterführende Features habe ich bewusst verzichtet.

Die Einrichtung von "Drop-a-Site" ist denkbar einfach:

## 1. Seiten-URL definieren

Die nötigen Anpassungen müssen in der config.php vorgenommen werden. In der `SITE_URL`-Konstante wird der vollständige URL der Seite gespeichert. Liegt die Seite nicht im Wurzelverzeichnis sondern in einem Unterordner, muss das mit eingetragen werden.

## 2. Unterseitepfade und -titel definieren

Im `$pages`-Array werden die Pfade zu den Unterseiten sowie deren Titel gespeichert. Das URL-Rewriting sorgt dafür, dass die Seiten über den eingetragenen Pfaden erreichbar sind. Unter- und Unter-Unterseiten stellen kein Problem dar.

## 3. Anpassung für den Fall, dass die Seite nicht in der Wurzelebene liegt

Liegt deine Seite in der Wurzelebene, kannst du diesen Punkt getrost überspingen.

Liegt die zu erstellende Seite jedoch in einem Unterordner, muss die Deklaration der `$req`-Variable angepasst werden. Genauer gesagt, muss der Pfad zur Unterseite aus dem Request-String entfernt werden. Ist die Seite bspw. über die Adresse http://example.com/foo/bar/ erreichbar, muss die Deklaration der `$req`-Variablen folgendermaßen aussehen:



```php
$req = trim(str_replace('/foo/bar/', '', $_SERVER['REQUEST_URI']), '/');
```

## 4. Anpassen der .htaccess-Datei

Auch diesen Punkt kannst du überspringen, wenn deine Seite in der Wurzeleben liegt.

Andernfalls musst du dem mod_rewrite mitteilen, in welchem Unterordner die Seite liegt, damit es fehlerfrei funktionieren kann. Dafür gibt es in der .htaccess den Wert `RewriteBase`. Ausgehend von der Annahme, die Adresse deiner Seite ist http://example.com/foo/bar/, muss der Eintrag in der .htaccess so aussehen:

```php
RewriteBase /foo/bar/
```

## 5. Einstellen der Inhalte

Schlussendlich müssen nur noch die Inhalte eingetütet werden. Diese werden im Ordner "inc" gelagert und nach den entsprechenden Seiten benannt. Zur Seite "about" gehört also die Datei "about.inc.php". Für Unterseiten müssen entsprechende Ordner innerhalb von "inc" angelegt werden.

Zusätzlich gibt es innerhalb von "inc" den "components"-Ordner - in diesem können Template-Parts wie Header, Footer, Navigation, etc. ablegt werden.

* * *

Das ist auch schon alles, was es zu tun gibt, um "Drop-a-Site" in Betrieb zu nehmen. Natürlich kann das System nach Belieben erweitert und ausgebaut werden. Allerdings muss man dabei abwägen, ob es den Aufwand wert ist.

Bei Fragen oder Anregungen sei an die Kommentarfunktion verwiesen.

["Drop-a-Site" auf GitHub][github] | [Download][download]

[github]: https://github.com/herschel666/Drop-a-Site
[download]: https://github.com/herschel666/Drop-a-Site/zipball/master
