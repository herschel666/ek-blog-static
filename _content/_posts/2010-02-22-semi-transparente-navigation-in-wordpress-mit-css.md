---
title: Semi-transparente Navigation in WordPress mit CSS
author: Emanuel Kluge
layout: post
permalink: /tutorial/semi-transparente-navigation-in-wordpress-mit-css/
categories:
  - HTML/CSS
  - PHP
  - Tutorial
  - WordPress
---

{% img /wp-content/uploads/2010/02/semi-transparente-navigation-in-wordpress-mit-css.jpg Semi-transparente Navigation in WordPress mit CSS %}

*[Demo][http://www.emanuel-kluge.de/demo/semi-transparente-navigation-in-wordpress-mit-css/] | [Download][http://www.emanuel-kluge.de/wp-content/uploads/2010/02/semi-transparente-navigation-in-wordpress-mit-css]*

Heute geht es um eine horizontale Reiternavigation in **WordPress**, deren inaktive Reiter dank **CSS** Browser-übergreifend semi-transparent sind. Dafür muss als erstes ein `<span>`-Element innerhalb der Listen-Elemente der Navigation eingefügt werden. Dies geschieht über folgenden PHP-Code-Schnipsel:



```html
<div id="header">
   <ul>
      <li<?php if (is_home() || is_paged() ) echo ' class="current_page_item"'; ?>>
         <span></span>
         <a href="<?php bloginfo('url'); ?>" title="Back to Main Page">Home</a>
      </li>
      <?php
         echo preg_replace('@\<li([^>]*)>\<a([^>]*)>(.*?)\<\/a>@i', '<li$1><span></span><a$2>$3</a>', wp_list_pages('echo=0&title_li=&depth=1'));
      ?>
   </ul>
   <div class="hr"><hr /></div>
</div>
```

Das `<span>`-Element bekommt in diesem Fall die Transparenz. Würde man die Transparenz auf das `<a>`-Element anwenden, würde auch die darin liegende Schrift transparent werden und das soll vermieden werden. Außerdem wird vor der Funktion zur Ausgabe der Seiten noch ein Listenelement mit dem Link zur Startseite eingesetzt. Der ist optional und kann auch entfernt werden, wenn man z.B. den Blog-Titel auf die Startseite verlinkt. Schlussendlich befindet sich unterhalb der Navigation noch ein von einem `<div>`-Element umschlossenes hr-Element. Unter diesem werden die inaktiven Listenelemente verschwinden.

Kommen wir nun zum CSS:

```css
#header ul {
   height: 60px;
   position: relative;
   clear: left;
}

  #header ul li {
    width: auto;
    height: 60px;
    margin-left: 20px;
    float: left;
    display: inline;
    position: relative;
  }

    #header ul li span {
      display: block;
      width: 100%;
      height: 60px;
      position: absolute;
      top: 10px;
      left: 0;
      z-index: 1000;
      background-color: #FFF;
      background: -moz-linear-gradient( top, #c7e0ed, #fff );
      background: -webkit-gradient( linear, left top, left bottom, from(#c7e0ed), to(#fff) );
      opacity: .7;
    }

      #header ul li a:link,
      #header ul li a:visited {
        display: block;
        width: auto;
        height: 24px;
        padding: 13px 20px 23px 20px;
        line-height: 24px;
        position: relative;
        bottom: -10px;
        z-index: 2000;
        color: #0660cf;
        text-decoration: none;
        text-shadow: #FFF 0 1px 2px;
      }

      #header ul li a:hover,
      #header ul li a:focus,
      #header ul li.current_page_item a {
        background-color: #FFF;
        background: -moz-linear-gradient( top, #c7e0ed, #fff ); /* gradient for firefox */
        background: -webkit-gradient( linear, left top, left bottom, from(#c7e0ed), to(#fff) ); /* gradient for chrome and safari */
        position: relative;
        bottom: 0;
      }

      #header ul li a:hover,
      #header ul li a:focus {
        color: #c41604;
      }

      #header ul li a:active {
        color: #0059ce;
        position: relative;
        bottom: -1px;
      }

.hr {
  height: 30px;
  background-color: #333;
  background: -moz-linear-gradient( top, #333, #555 ); /* gradient for firefox */
  background: -webkit-gradient( linear, left top, left bottom, from(#333), to(#555) ); /* gradient for chrome and safari */
  position: relative;
  z-index: 3000;
}

  .hr hr {
    display: none; /* hiding hr because of the IE. quel surprise! */
  }
```

Am meisten Platz nehmen hier die Angaben für die Transparenz ein. Das liegt daran, dass alle Eventualitäten &mdash; sprich "Browser" &mdash; berücksichtigt werden müssen. Dafür lässt sich diese Navigation aber auch mit reinem CSS und ohne PNG-Grafiken umsetzen, die ja im IE6 für Ärger sorgen würden.

Trotzdem funktioniert auch das hier nicht ohne dem ein oder anderen Mätzchen unserer Lieblings-Browser aus Redmond &mdash; den Internet Explorern. Der **IE6** benötigt eine feste Breite für die Listenelemente. Hier ist also etwas **Anpassung** nötig, je nachdem wie lang die Beschriftung der Reiter ist. Der **IE7** hingegen hat Probleme mit den **Hover-Zuständen**, so dass die Reiter hier nicht nach oben fahren und intransparent werden, wenn man mit dem Cursor rüberfährt. Das ist ärgerlich, schränkt jedoch die Benutzbarkeit der Seite nicht ein.

Des weiteren habe ich noch etwas **CSS3** verwendet. Mit den aktuellen Versionen von Firefox, Safari und Chrome bekommt man deshalb einen **Farbverlauf** bei den Reitern serviert. In den gleichen Browsern sowie der aktuellen Version von Opera gibt es außerdem noch einen leichten **Schlagschatten bei der Link-Beschriftung**.

Das ist auch schon alles. Und natürlich ist diese Navigation nichts WordPress-spezifisches. In der Demo gibt es eine statische Variante, die in jeder anderen Seite auch verwendet werden kann.

Ansonsten mein übliches Mantra an dieser Stelle: Wenn ihr Fragen habt oder etwas nicht so funktioniert, wie es soll, nutzt die Kommentar-Funktion. Und wenn euch das Tutorial gefallen hat, würde ich mich freuen, wenn ihr es bookmarkt oder twittert. Vielen Dank!
