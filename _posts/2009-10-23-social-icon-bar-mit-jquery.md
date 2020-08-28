---
title: '&quot;Social Icon Bar&quot; mit jQuery'
author: Emanuel Kluge
layout: post.swig
permalink: social-icon-bar-mit-jquery/
categories:
  - HTML/CSS
  - JavaScript
  - jQuery
  - Tutorial
---

<noscript data-src="/wp-content/uploads/2009/10/social-icon-bar-mit-jquery.jpg" data-alt="Social Icon-Bar mit jQuery">
<img src="/wp-content/uploads/2009/10/social-icon-bar-mit-jquery.jpg" alt="Social Icon-Bar mit jQuery">
</noscript>

_[Demo][demo] | [Download][download]_

Um meine Besucher auf meine diversen Profile in Social Communities aufmerksam zu machen, habe ich rechts in der Sidebar eine Social Icon Bar installiert, deren Icons bspw. auf Flickr und Xing verweisen. Und damit das nicht so langweilig ist, habe ich den Spaß noch ein wenig mit [jQuery][jquery] befeuert.

Jetzt möchte ich kurz erläutern, wie das geht. Als erstes brauchen wir ein passendes Icon-Set. Ich habe für dieses Tutorial auf die [Matte Black Social Media Icons][webtreats] zurückgegriffen, da diese Sammlung u.a. auch ein Xing-Icon beinhaltet. Die Icons bringen wir nun in einem Grafik-Programm mithilfe des Crop-Tools auf die gewünschte Größe, in meinem Fall 40x40 Pixel.

<noscript data-src="/wp-content/uploads/2009/10/icon-crop-tool.jpg" data-alt="Icon mit dem Crop-Tool auf die richtige Groesse bringen">
<img src="/wp-content/uploads/2009/10/icon-crop-tool.jpg" alt="Icon mit dem Crop-Tool auf die richtige Groesse bringen">
</noscript>

Das machen wir mit allen Icons, die wir benötigen. Danach widmen wir uns dem HTML-Teil:

```html
<ul id="iconbar">
  <li>
    <span class="s1"></span>
    <span class="s2"></span>
    <span class="s3"></span>
    <span class="s4"></span>
    <a href="http://name.tld/feed/" title="Den RSS-Feed abonnieren">
      <img
        src="images/rss.png"
        alt="Den RSS-Feed abonnieren"
        width="40"
        height="40"
        title="Den RSS-Feed abonnieren"
      />
    </a>
  </li>
</ul>
```

Basis ist eine ungeordnete Liste. Der Übersichtlichkeit halber habe ich nur einen Listenpunkt angegeben. Die Liste kann natürlich beliebig erweitert werden. Innerhalb der Listenelemente sind vier `<span>`-Elemente. Diese bilden die Abdeckungen des jweiligen Icons, welche ähnlich einer Blende zu allen Seiten wegfahren, wenn man mit dem Cursor drüber geht.

Als nächstes kommt der jQuery-Teil:

```javascript
jQuery(function ($) {
  $('body').addClass('js_active');
  $('#iconbar li').each(function (i) {
    $(this).hover(
      function () {
        $('span.s1', this)
          .stop()
          .animate({ left: '-20px' }, { queue: false, duration: 500 });
        $('span.s2', this)
          .stop()
          .animate({ top: '-20px' }, { queue: false, duration: 500 });
        $('span.s3', this)
          .stop()
          .animate({ right: '-20px' }, { queue: false, duration: 500 });
        $('span.s4', this)
          .stop()
          .animate({ bottom: '-20px' }, { queue: false, duration: 500 });
      },
      function () {
        $('span.s1', this).animate(
          { left: '0' },
          { queue: false, duration: 500 }
        );
        $('span.s2', this).animate(
          { top: '0' },
          { queue: false, duration: 500 }
        );
        $('span.s3', this).animate(
          { right: '0' },
          { queue: false, duration: 500 }
        );
        $('span.s4', this).animate(
          { bottom: '0' },
          { queue: false, duration: 500 }
        );
      }
    );
  });
});
```

Als erstes fügen wir dem `<body>`-Element die Klasse `.js_active` hinzu. Dadurch werden die `<span>`-Elemente sichtbar. So ist dafür gesorgt, dass die Social Icon Bar auch ohne Effekt funktioniert, wenn der Besucher JavaScript deaktiviert hat. Als nächtes wird mit der `each()`-Methode auf die einzelnen Elemente der ungeordneten Liste zugegriffen. Fährt der Besucher mit dem Cursor über eines der Listen-Elemente, fahren die `<span>`-Elemente ausgelöst durch die `animate()`-Methode von jQuery in die jeweils vorgegebene Richtung. Der Wert `500` gibt an, dass dieser Vorgang eine halbe Sekunde dauern soll. Bewegt man den Cursor vom Listen-Element weg, gehen die `<span>`-Elemente wieder in ihre Ausgangsposition.

Zum Schluss muss das ganze natürlich noch ansprechend mithilfe von CSS ausgerichtet werden:

```css
#iconbar {
  clear: left;
  overflow: hidden;
  list-style: none;
}

#iconbar li {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  float: left;
  position: relative;
  overflow: hidden;
  border: 1px solid #999;
  border-radius: 2px;
}

#iconbar li span {
  display: none;
}

body.js_active #iconbar li span {
  display: block;
  width: 20px;
  height: 20px;
  position: absolute;
  background-color: #fff;
  opacity: 0.7;
  cursor: pointer;
}

.s1 {
  left: 0;
  top: 0;
}

.s2 {
  top: 0;
  right: 0;
}

.s3 {
  right: 0;
  bottom: 0;
}

.s4 {
  bottom: 0;
  left: 0;
}
```

Die Listen-Elemente sind 40 Pixel breit und hoch, und werden nach links gefloated. Wichtig beim Listen-Element sind die Angaben `position: relative;`, damit die darin liegenden `<span>`-Elemente absolut positioniert werden können, und `overflow: hidden;`, damit die `<span>`-Elemente beim Mouseover auch wirklich verschwinden. Zusätzlich geben wir den Listen-Elementen noch eine leichte Eckenrundung mit.

Die `<span>`-Elemente sind durch die CSS-Angabe `display: none;` eigentlich unsichtbar. Ist JavaScript allerdings im Browser des Besuchers aktiviert, bekommt das `<body>`-Element die Klasse `.js_active` hinzugefügt und es greift die darunter liegende CSS-Angabe. Die `<span>`-Elemente sind nun 20x20 Pixel groß und absolut positioniert. Durch die Angabe `opacity: 0.7;` werden sie außerdem leicht durchsichtig und geben einen Blick auf das dahinter liegende Icon frei. Durch die Angabe `cursor: pointer;` wird der Cursor schon beim Überfahren der `<span>`-Elemente zur &mdash; für Links charakteristischen &mdash; Hand. Das erhöht die User Experience.

Zum Schluss werden die einzelnen `<span>`-Elemente noch positioniert und schon ist die Social Icon Bar fertig. Ihr könnt sie wie ich in die Sidebar integrieren oder unter jeden Blog-Eintrag für die Bookmark-Links. Möglichkeiten gibt es wie immer viele.

Solltet ihr noch Fragen haben oder Probleme auftreten, nutzt die Kommentar-Funktion und scheut euch nicht, mir Fragen zu stellen. Ansonsten danke ich für eure Aufmerksamkeit und &mdash; falls euch der Artikel gefallen hat &mdash; würde mich freuen, wenn ihr ihn einschlägigen Bookmark-Diensten zuführt.

[demo]: http://www.emanuel-kluge.de/demo/social-icon-bar-mit-jquery/
[download]: /wp-content/uploads/2009/09/social-icon-bar-mit-jquery.zip
[jquery]: http://jquery.com/
[webtreats]: http://webtreats.mysitemyway.com/154-matte-black-social-media-icons/
