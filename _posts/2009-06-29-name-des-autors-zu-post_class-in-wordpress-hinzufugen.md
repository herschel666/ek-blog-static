---
title: Name des Autors zu post_class() in WordPress hinzufügen
author: Emanuel Kluge
layout: post.swig
permalink: name-des-autors-zu-post_class-in-wordpress-hinzufugen/
categories:
  - HTML/CSS
  - Tips und Tricks
  - WordPress
---

Ein Freund kam neulich auf mich zu fragte mich, wie er die Beiträge seines Blogs optisch trennen kann, je nachdem, welcher Autor den Beitrag geschrieben hat. Ich sagte, das sei ganz einfach und nahm &mdash; optmistisch, wie ich bin &mdash; an, die WordPress-Funktion `post_class()` würde u.a. auch den Namen des Autors als Klasse ausgeben. Dem ist jedoch nicht so.

Man kann den Namen des Autors aber ganz schnell mit folgendem PHP-Code hinzufügen:



```php
<?php $curauth = get_userdata(intval($post->post_author)); ?>

<div <?php post_class($curauth->user_login) ?>>
```

Nun erscheint der Autorenname in der Klasse des Beitrags-`<div>` und man kann die einzelnen Posts ganz bequem per CSS optisch anpassen.

(via [the english guy web design][theenglishguy])

[theenglishguy]: http://www.theenglishguy.co.uk/2009/05/15/post_class-and-user-login/
