---
title: '&quot;Contact Form 7&quot; auf goneo-Webspace zum Laufen kriegen'
author: Emanuel Kluge
layout: post.swig
permalink: contact-form-7-auf-goneo-webspace-zum-laufen-kriegen/
categories:
  - Tips und Tricks
  - Tutorial
  - WordPress
---

<noscript data-src="/wp-content/uploads/2009/06/mail-210x140.jpg" data-alt="Mail">
<img src="/wp-content/uploads/2009/06/mail-210x140.jpg" alt="Mail">
</noscript>  
<small>*[The slot for the mail next to the front door also has the doorbell button on it.][flickr_img] von [Samuraijohnny][flickr_img] unter [CC][cc]-Lizenz*</small>

Kontaktformulare sind eine gute Sache, wenn sie funktionieren. Funktionieren sie nicht, werden sie schnell zu einem Quell steten Ärgernis. Dies ist der Fall, wenn man seine WordPress-Installation auf **goneo-Webspace** liegen hat. goneo hat nämlich im März sein System dergestalt modifiziert, dass Mail-Skripte nur noch mit einer bei goneo angelegten Email-Adresse funktionieren. Dies ist eine Reaktion auf das erhöhte Spam-Aufkommen.

Möchte man dann - so wie ich - seinen Blog mit dem ganz ausgezeichneten PlugIn **["Contact Form 7"][contact_form_7]** ausstatten, wird das nicht von Erfolg gekrönt sein, auch wenn bei Testläufen immer die Meldung "Email wurde erfolgreich versandt." erscheint. Man muss dem Skript also irgendwie seine bei goneo angemeldete Email-Adresse mitteilen.

Dies kann man einerseits sicherlich im PlugIn selbst machen, was kompliziert ist und genau bis zum nächsten Update hält, oder man geht den Weg über die [php.ini][claroline]. Letztere Möglichkeit beschreibe ich im folgenden, **wobei [mod_rewrite][mod_rewrite] aktiviert sein muss**, was auf dem goneo-Webspace problemlos möglich und generell empfehlenswert ist.

Also dann: Nehmen wir an, unser Kontaktformular ist über den URL "http://www.meine-homepage.tld/kontaktformular/" im WordPress-System erreichbar. Dann müssen wir kurz gesagt nur eine Kopie der php.ini mit den entsprechenden Anpassungen in das Verzeichnis "/kontaktformular/" laden und schon funktioniert alles.

Dafür brauchen wir als erstes das Verzeichnis "/kontaktformular/". Da wir _mod_rewrite_ benutzen, existiert dieses Verzeichnis nicht. Wir legen es aber einfach an, indem wir auf der root-Ebene unserer WordPress-Installation (dort, wo die Ordner wp-admin, wp-content und wp-includes liegen) einen Ordner erstellen und "kontaktformular" nennen. In diesen kopieren wir die "index.php"-Datei von der root-Ebene und modifizieren sie im Text-Editor der Wahl folgendermaßen:

Aus Zeile 17 &hellip;

```php
require('./wp-blog-header.php');
```

wird &hellip;

```php
require('../wp-blog-header.php');
```

Nicht wundern, es wurde wirklich nur ein Punkt hinzugefügt.

Als nächstes brauchen wir eine Kopie der php.ini, um "Contact Form 7" unsere Email-Adresse mitteilen zu können. Um diese in den Ordner "kontaktformular" zu kopieren, legen wir im Ordner eine PHP-Datei an und nenne sie "copyini.php". In diese fügen wir folgenden Code-Schnippel ein:

```php
<?php
$cfg = get_cfg_var('cfg_file_path');
if ( copy($cfg,'./php.ini') ) {
  echo "Kopieren erfolgreich"; }
else {
  echo "Kopieren fehlgeschlagen"; }
?>
```

Danach gehen wir in den Browser und rufen das Skript auf, indem wir "http://www.meine-homepage.tld/kontaktformular/copyini.php" in die Adresszeile eintippen. Nun sollte im Browser-Fenster die Zeile "Kopieren erfolgreich" erscheinen. Das bedeutet, dass eine Kopie der php.ini im Ordner "kontaktformular" angelegt wurde.

Nun schmeißen wir die Datei copyini.php weg und nehmen uns die php.ini vor. Einfach im Text-Editor der Wahl öffnen und die Zeile 630

```ini
sendmail_path = /usr/local/sbin/sendmail -t -i
```

durch folgende ersetzen:

```ini
sendmail_path = /usr/local/sbin/sendmail -t -i -f mail@meine-homepage.tld
```

Nun noch speichern und fertig ist die Laube!

Ich möchte allerdings noch einmal darauf hinweisen, dass sich diese Anleitung nur auf WordPress-Installationen bezieht, die auf **goneo-Webspace** liegen. Solltet ihr bei einem anderen Hoster sein und Probleme haben, kann ich euch nur das [Support Forum][cf7_forum] nahe legen.

**Nachtrag:**

Der Sicherheit halber solltet ihr zum Schluss noch den Zugriff auf auf die php.ini-Datei über den Browser per [.htaccess][wikipedia] unterbinden. Das geht mit folgendem Code-Schnipsel, der in besagte .htaccess-Datei eingetragen werden muss:

```ini
<Files php.ini>
  order allow,deny
  deny from all
</Files>
```

Weiterführende Links:

- [Mailversand über den goneo Webserver mit PHP][mailversand_php]
- [Eigene php.ini Datei][php_ini]
- [Ein Kontaktformular für WordPress - Contact Form 7][pingalerie]

[flickr_img]: http://www.flickr.com/photos/samuraislice/3317585107/
[flickr_user]: http://www.flickr.com/photos/samuraislice/
[cc]: http://creativecommons.org/licenses/by-sa/2.0/deed.en
[contact_form_7]: http://ideasilo.wordpress.com/2007/04/30/contact-form-7/
[mod_rewrite]: http://de.wikipedia.org/wiki/Rewrite-Engine
[claroline]: http://doc.claroline.net/de/index.php/Was_ist_eine_php.ini-Datei%3F_Wo_finde_ich_sie%3F
[cf7_forum]: http://wordpress.org/tags/contact-form-7
[wikipedia]: http://de.wikipedia.org/wiki/Htaccess
[mailversand_php]: http://wiki.goneo.de/doku.php?id=mailversand_php
[php_ini]: http://wiki.goneo.de/doku.php?id=php.ini
[pingalerie]: http://pingalerie.de/ein-kontaktformular-fuer-wordpress-contact-form-7/
