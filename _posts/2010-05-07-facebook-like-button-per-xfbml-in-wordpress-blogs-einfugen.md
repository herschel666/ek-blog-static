---
title: Facebook-Like-Button per XFBML in WordPress-Blogs einfügen
author: Emanuel Kluge
layout: post.swig
permalink: facebook-like-button-per-xfbml-in-wordpress-blogs-einfugen/
categories:
  - HTML/CSS
  - JavaScript
  - WordPress
---

<p><ins datetime="2014-10-26T16:12:29+00:00">Die XFBML-Methode ist schon seit geraumer Zeit veraltet. Bitte nutzt die iFrame- oder die HTML5-Variante.</ins></p>

Der Like-Button von Facebook zum Einbinden auf externen Websites ist ja nach wie vor in aller Munde und da ich gerade auf einem anderen WordPress-Blog einen solchen Button per XFBML eingebunden habe, möchte ich hier kurz vorstellen, wie das geht.

Als erstes braucht ihr eure User-ID und eine Application-ID für die Seite, auf der ihr den Like-Button einbauen möchtet. Die User-ID bekommt ihr, indem ihr folgendes in die Adress-Zeile eures Browsers eingebt:

_graph.facebook.com/euer.name_

Vereinfacht gesagt: Geht auf euer Facebook-Profil und ersetzt das "www" in der Adresse durch "graph". Auf der dann erscheinenden Seite, findet ihr eure User-ID.

Die Application-ID wiederum könnt ihr generieren, indem ihr auf folgender Seite euren Blog eintragt:

http://developers.facebook.com/setup/

Nun sind die Grundvoraussetzungen erfüllt, der Like-Button kann eingebunden werden. Im folgenden Beispiel zeige ich, wie man das in der Einzelansicht eines Artikels macht. Dafür müssen wir im Kopf- und Fußbereich, sowie unterhalb des Artikels etwas Code eingeben.

Fangen wir mit dem Kopfbereich an:

```php
<?php if ( is_single() ) : ?>
  <meta property="fb:admins" content="eure_user_id" />
  <meta property="fb:app_id" content="eure_app_id" />
  <meta property="og:site_name" content="<?php bloginfo('name'); ?>" />
  <meta property="og:title" content="<?php echo get_the_title(); ?>" />
  <meta property="og:type" content="article" />
<? endif; ?>
```

Diese fünf speziellen Facebook-Meta-Angaben müssen in der header.php innerhalb der `head`-Tags gesetzt werden. Sie verraten Facebook wem der Blog gehört, um welchen Blog es sich handelt, wie er heißt, welchen Titel die aktuelle Seite hat und um welchen Inhaltstyp es sich handelt. Natürlich müsst ihr _eure_user_id_ und _eure_app_id_ durch die entsprechende ID ersetzen.

Als nächstes binden wir den nötigen JavaScript-Kram im Fußbereich ein:

```html
<?php if ( is_single() ) : ?>
<div id="fb-root"></div>
<script
  src="http://connect.facebook.net/en_US/all.js"
  type="text/javascript"
></script>
<script type="text/javascript">
  window.fbAsyncInit = function() {
    FB.init({ appId: 'eure_app_id', status: true, cookie: true, xfbml: true });
  };
</script>
<?php endif; ?>
```

Das wird in die footer.php direkt über dem abschließenden `body`-Tag eingefügt. _eure_app_id_ ist auch hier entpsrechend zu ersetzen.

Nun muss der Button selbst noch auf der Artikelseite eingebunden werden:

```html
<fb:like
  href="<?php the_permalink() ?>"
  layout="standard"
  show_faces="false"
  width="xyz"
  action="like"
  colorscheme="light"
  font="trebuchet ms"
></fb:like>
```

Dies tragt ihr in der "single.php" da ein, wo der Button hin soll. Die Attribute könnt ihr in gewissem Maße euren Präferenzen anpassen. [Hier erfahrt ihr, was möglich ist][like].

Hat man das alles eingetragen, werden auf der Einzelansicht eines Artikels die nötigen Meta-Angaben angezeigt, das entsprechende JavaScript für den Like-Button wird eingebunden und der Like-Button selbst erscheint ober- oder unterhalb des Artikels &mdash; je nachdem, wo ihr ihn eingefügt habt.

Sollte euch das alles zu tricky sein, könnt ihr entweder die `iframe`-Variante einbinden oder auf das WordPress-PlugIn von [Bottomless][bottomlessinc] zurückgreifen: [Like][like_plugin].

Noch ein paar Worte zur Performance. Das Einbinden des Like-Button verlängert natürlich die Ladezeit eures Blogs. Allerdings sprechen wir hier von WordPress - hier ist es normal, dass auf jeder Seite drei zusätzliche JavaScript-Dateien und zwei zusätzliche Stylesheets eingebunden werden, weil irgendwo im Blog mal eine Lightbox aufgehen soll. Will heißen: Denkt darüber nach, ob ihr den Button einbauen wollt, aber bedenkt, dass euer System sowieso nicht Performance-optimiert ist.

Es sei denn, ihr seid bezüglich dieses Themas sensibilisiert und habt entsprechende Schritte unternommen, eurem Blog auf die Sprünge zu helfen.

Ansonsten wie immer: Bei Fragen schreibt einen Kommentar. Bei Gefallen bookmarkt den Artikel. Danke!

[like]: http://developers.facebook.com/docs/reference/plugins/like
[bottomlessinc]: http://blog.bottomlessinc.com/
[like_plugin]: http://wordpress.org/extend/plugins/like/
