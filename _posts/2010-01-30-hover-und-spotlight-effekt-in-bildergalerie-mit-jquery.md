---
title: 'Hover- und Spotlight-Effekt in Bildergalerie mit jQuery'
author: Emanuel Kluge
layout: post
permalink: /tutorial/hover-und-spotlight-effekt-in-bildergalerie-mit-jquery/
categories:
  - HTML/CSS
  - JavaScript
  - jQuery
  - Tutorial
---

{% img /wp-content/uploads/2010/01/hover-und-spotlight-effekt.jpg Hover-und-Spotlight-Effekt in Bildergalerie mit jQuery %}

*[Demo][demo] | [Download][download]*

Jede **Bildergalerie** gewinnt, wenn das Thumbnail-Bild unter dem Cursor durch einen **Hover-Effekt** hervorgehoben wird und der Nutzer weiß, was gerade Sache ist. Wenn die umliegenden Thumbnails dann auch noch durch einen **Spotlight-Effekt** abgedunkelt werden, ist es noch leichter für den Nutzer, sich auf das aktuelle Bild zu konzentrieren. Wie man das mit jQuery realisiert, zeige ich jetzt.

Als erstes der HTML-Teil:



```html
<body class="no-js">
  <div class="wrap">
    <a href="path/to/image.html" class="image">
      <img src="path/to/image.jpg" alt="" />
    </a>
    <a href="path/to/image.html" class="image">
      <img src="path/to/image.jpg" alt="" />
    </a>
    <a href="path/to/image.html" class="image">
      <img src="path/to/image.jpg" alt="" />
    </a>
  </div>
</body>
```

Als nächstes der CSS-Teil:

```css
.wrap {
  width: 321px;
  height: 321px;
  padding: 20px 0 0 20px;
  margin: 30px auto;
  clear: left;
}

  .image {
    width: 77px;
    height: 77px;
    padding: 5px;
    margin: 0 20px 20px 0;
    float: left;
    display: inline;
    position: relative;
    z-index: 10;
    background-color: #CCC;
  }
  
  .no-js .image:hover,
  .no-js .image:focus {
    background-color: #36F;
  }
  
    .image img {
      position: relative;
      z-index: 30;
      border-width: 1px;
      border-style: solid;
      border-color: #666 #999 #999 #666;
    }
    
    .layer1, 
    .layer2 {
      display: block;
      position: absolute;
    }
    
    .layer1 {
      width: 87px;
      height: 87px;
      top: 0;
      left: 0;
      z-index: 20;
      background-color: #36F;
    }
    
    .layer2 {
      width: 77px;
      height: 77px;
      top: 5px;
      left: 5px;
      z-index: 40;
      background-color: #000;
    }
```

Kleine Anmerkung dazu: Wenn JavaScript im Browser aktiviert ist, wird die Klasse `.no-js` vom `<body>`-Tag entfernt. Geschieht dies nicht, bekommt das `<a>`-Tag um die Thumbnails einen `:hover`-Effekt.

Schlussendlich der jQuery-Teil:

```javascript
jQuery(function ($) {
  $('body').removeClass('no-js');
  var image = $('a.image');
  var html = '<span class="layer1"></span><span class="layer2"></span>';
  image.append(html).find('span').css('opacity', '0');
  image.each( function() {
    $(this).hover( function() {
      $('span.layer1', this).stop().fadeTo(800, 1);
      $(this).siblings().find('span.layer2').stop().fadeTo(800, 0.5);
    }, function() {
      $('span.layer1', this).stop().fadeTo(800, 0);
      $(this).siblings().find('span.layer2').stop().fadeTo(800, 0);
    });
  });
});
```

Als erstes wird die Klasse `.no-js` vom `<body>`-Tag entfernt. Danach werden die beiden `<span>`-Tags eingefügt, die für den Hover- und den Spotlight-Effekt zuständig sind. Danach wird in einer `each()`-Schleife festgelegt, dass bei einem Hover die `<span>`-Tags erscheinen und entsprechend wieder verschwinden.

Das war es auch schon. Falls es Fragen oder Probleme gibt, möchte ich euch wie immer die Kommentar-Funktion nahe legen. Ansonsten freue ich mich natürlich, wenn ihr den Artikel bookmarkt oder auf twitter verbreitet.

[demo]: http://www.emanuel-kluge.de/demo/hover-und-spotlight-effekt-in-bildergalerie-mit-jquery/
[download]: http://www.emanuel-kluge.de/wp-content/uploads/2010/01/hover-und-spotlight-effekt-in-bildergalerie-mit-jquery.zip
