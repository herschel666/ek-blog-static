---
title: Fancy Login-/Logout-Button für deinen WordPress-Blog
author: Emanuel Kluge
layout: post.html
permalink: /tutorial/fancy-login-logout-button-fur-deinen-wordpress-blog/
categories:
  - HTML/CSS
  - Tutorial
  - WordPress
---

Hier habe ich ein kleines Tutorial, wie ihr in euren WordPress-Blog einen schicken Login-/Logout-Button einbaut. Dafür nutzen wir die WordPress-eigene Funktion `wp_loginout()`, die Abfrage `is_user_logged_in()` und die Text Replacement-Technik mithilfe von CSS.

{% lazyImg "/wp-content/uploads/2009/06/loginout-button\_-\_style-480x132.png" "loginout-button &mdash; style" %}

Vorweg eine kleine [Demo][demo].

Und nun los:

Die Funktion `wp_loginout()` generiert, je nachdem, ob der User eingeloggt ist oder nicht, automatisch einen Anmelden- bzw. Abmelden-Link. Um mit der Text Replacement-Technik darauf zugreifen zu können, müssen wir jedoch dem umschließenden `<p>`-Tag eine Klasse abhängig vom User-Status zuweisen. Das ist der Punkt, wo die Abfrage `is_user_logged_in()` ins Spiel kommt.

Der Code sieht folgendermaßen aus:

```html
<?php if ( is_user_logged_in() ) : ?>
  <p class="logout">
<?php else : ?>
  <p class="login">
<?php endif; wp_loginout(); ?>
</p>
```

Ist der User angemeldet, bekommt das `<p>`-Tag die Klasse "logout" und der Logout-Button wird angezeigt, ist der User nicht angemeldet, bekommt das `<p>`-Tag die Klasse "login" und der Login-Button wird angezeigt.

Nun kommen die Styles hinzu, um den schicken Button, anstatt des schnöden Text-Links anzuzeigen:

```css
.login,
.logout {
  width: 100px;
  height: 60px;
  text-indent: -9999px;
  overflow: hidden;
}

.login a,
.logout a {
  display: block;
  width: auto;
  height: 60px;
  background-image: url('loginout.jpg');
  background-repeat: no-repeat;
}

.login a:link,
.login a:visited { background-position: 0 0 }
.login a:hover { background-position: 0 -60px }
.login a:active { background-position: 0 -120px }

.logout a:link,
.logout a:visited { background-position: -100px 0 }
.logout a:hover { background-position: -100px -60px }
.logout a:active { background-position: -100px -120px }
```

Per `text-indent: -9999px` wird der Text-Link nach links ins Abseits verschoben und zurück bleibt die Grafik. Diese sieht wie folgt aus:

{% lazyImg "/wp-content/uploads/2009/06/loginout.jpg" "loginout &mdash; grafik" %}

Per `background-position` wird je nach Zustand der richtige Button angezeigt. Ihr könnt die Grafik gerne übernehmen, oder einfach was eigenes entwerfen, was besser in euren Blog passt.

Wenn ihr dieses Tutorial hilfreich fandet, würde ich mich freuen, wenn ihr auf Twitter darauf aufmerksam macht oder es beim Bookmark-Service eures Vertrauens speichtert.

Vielen Dank.

Weiterführende Links:

 * [Function Reference/wp loginout][wp_loginout]
 * [Function Reference/is user logged in][is_user_logged_in]

[demo]: http://www.emanuel-kluge.de/demo/loginout-button/
[wp_loginout]: http://codex.wordpress.org/Function_Reference/wp_loginout
[is_user_logged_in]: http://codex.wordpress.org/Function_Reference/is_user_logged_in
