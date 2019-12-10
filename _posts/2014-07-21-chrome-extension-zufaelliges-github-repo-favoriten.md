---
title: 'Chrome-Extension: zufälliges GitHub-Repo aus der Favoritenliste'
author: Emanuel Kluge
layout: post.swig
permalink: chrome-extension-zufaelliges-github-repo-favoriten/
categories:
  - JavaScript
  - Neuigkeiten
---

<noscript data-src="/wp-content/uploads/2014/07/icon-128.png" data-alt="GitHub Random Favorite">
<img src="/wp-content/uploads/2014/07/icon-128.png" alt="GitHub Random Favorite">
</noscript>

&rarr; [&raquo;GH Random Favorite&laquo; im Google Chrome Store][store]

&rarr; [&raquo;GH Random Favorite&laquo; auf GitHub][github]

Interessante GitHub-Repos zu favorisieren ist fast schon ein Reflex. Ich denke, niemand spart dabei mit Sternen. Allerdings gilt für die meisten favorisierten Repos wohl der Leitspruch: aus den Augen, aus dem Sinn.

Das ist schade und oftmals ärgerlich. Wie oft sucht man nach einer Lösung (aka Library, PlugIn, Framework, …) für ein bestimmtes Problem und stellt dann — nachdem man auf GitHub etwas gefunden hat — fest, dass man das Repo vor einem halben Jahr schon einmal favorisiert hat.

Um dieser Form der digitalen Demenz entgegen zu treten, habe ich eine Chrome-Extension — »GH Random Favorite« — geschrieben, die auf der GitHub-Startseite ein zufällig gewähltes Repo aus der Favoritenliste anzeigt. Dabei treten wahre Schätze wieder zutage.

Probierts mal aus!

Sollte es Probleme geben, kann [im zugehörigen GitHub-Repo][issue] ein Ticket angelegt werden.

PS: Das ganze läuft über die stark reglementierte Public API von GitHub. Es können also nur 30 zufällige Favoriten pro Stunden angezeigt werden (es braucht zwei Requests pro zufälligem Favorit). Sollte sich herausstellen, dass das zu wenig ist, könnte man über die Integration von OAuth nachdenken. Das spielt für mich momentan jedoch noch keine Rolle.

[store]: https://chrome.google.com/webstore/detail/gh-random-favorite/ogmnlelgbkfjjjhmhefdlfblpdiopedb
[github]: https://github.com/herschel666/gh-random-favorite
[issue]: https://github.com/herschel666/gh-random-favorite/issues
