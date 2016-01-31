---
title: “Rising Curtain”-Effekt bei Input-Feldern mit jQuery
author: Emanuel Kluge
layout: post.html
permalink: /tutorial/rising-curtain-effekt-bei-input-feldern-mit-jquery/
categories:
  - HTML/CSS
  - JavaScript
  - jQuery
  - Tutorial
---

{% lazyImg "/wp-content/uploads/2010/03/rising-curtain-effekt-bei-input-feldern-mit-jquery.jpg" "”Rising Curtain“-Effekt bei Input-Feldern mit jQuery" %}

*[Demo][demo] | [Download][download]*

Heute möchte ich zeigen, wie man `<input>`-Felder in Formularen mithilfe des "Rising Curtain"-Effekts und jQuery interessanter gestalten kann, wenn der Fokus auf ihnen liegt. Alles was man dafür braucht, ist eine kleine Hintergrundgrafik mit einem Farbverlauf und ein paar Zeilen jQuery. Als erstes aber wenden wir uns dem HTML-Teil zu:



```html
<div>
   <span>
      <input type="text" id="input1" />
   </span>
   <label for="input1">Input 1</label>
</div>
```

Dieser bedarf wohl keiner großen Erklärung. Es gibt ein `<input>`-Feld plus dem dazugehörigen Label. Das `<input>`-Feld ist in `<span>`-Tags eingefasst, welche für den Rand sorgen.

Als nächstes der CSS-Teil:

```css
div {
   height: 24px;
   margin-bottom: 10px;
   clear: left;
}

span {
  height: 24px;
  float: left;
  display: inline;
  margin-right: 10px;
  border: 1px solid #999;
}

span.active {
  border-color: #063050;
}

input {
  display: block;
  width: 200px;
  height: 18px;
  padding: 2px 4px;
  line-height: 18px;
  background: #FFF url('img/gradient.jpg') 0 0 repeat-x;
  border: 1px solid #FFF;
  color: #063050;
}

label {
  height: 24px;
  float: left;
  display: inline;
  line-height: 24px;
  cursor: pointer;
}
```

`<span>` und `label>` werden mit `float: left` nebeneinander angeordnet. Das `<input>`-Feld bekommt einen weißen Rand, damit der dunkle Hintergrund nicht an den dunklen Rand des `<span>`-Elements klatscht. Der Hintergrund wiederum stellt einen Farbverlauf von dunkelblau zu weiß dar, der mehr als doppelt so hoch wie das `<input>`-Feld ist.

Kommen wir nun zum jQuery-Teil:

```javascript
jQuery(function ($) {
   $('input').focus( function () {
      $(this).parent().addClass('active');
      if ( jQuery.browser.webkit || jQuery.browser.msie ) {
         $(this).animate({'background-position-y' : '-28px'}, 500, 'linear');
      } else {
         $(this).animate({'background-position' : '0 -28px'}, 0, 'linear');
      }
   });
   $('input').blur( function () {
      $(this).parent().removeClass('active');
      if ( jQuery.browser.webkit || jQuery.browser.msie ) {
         $(this).animate({'background-position-y' : '0'}, 500, 'linear');
      } else {
         $(this).animate({'background-position' : '0 0'}, 0, 'linear');
      }
   });
});
```

Liegt der Fokus auf einem `<input>`-Feld, bekommt das umschließende `<span>`-Element die Klasse `active` zugewiesen und der Rand wird dunkelblau. Außerdem verschiebt sich der Hintergrund des `<input>`-Feldes nach oben mithilfe der `animate()`-Methode von jQuery. Das ist der so genannte "Rising Curtain"-Effekt, durch den der Hintergrund des `<input>`-Feldes heller wird. Gesteuert wird das ganze über die CSS-Eigenschaft `background-position-y`.

So einfach ist das. Das ganze lässt sich natürlich auch bei einer `<textarea>` anwenden. Denkt aber daran, dass die Hintergrund-Grafik entsprechend groß sein muss. Auch ist es denkbar, die Hintergrund-Grafik ganz aus dem sichtbaren Bereich fahren zu lassen, so dass das `<input>`-Feld weiß wird. Der Kreativität sind kaum Grenzen gesetzt.

Das war es auch schon. Bookmark setzen oder dieses Tutorial via twitter durch den Äther jagen, wird wie immer gern gesehen. Bei Fragen und Anregungen steht die Kommentar-Funktion zur Verfügung. Nichts neues also.

[demo]: http://www.emanuel-kluge.de/demo/rising-curtain-effekt-bei-input-feldern-mit-jquery/
[download]: http://www.emanuel-kluge.de/wp-content/uploads/2010/03/rising-curtain-effekt-bei-input-feldern-mit-jquery.zip
