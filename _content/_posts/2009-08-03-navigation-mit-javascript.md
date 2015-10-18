---
title: Navigation mit JavaScript
author: Emanuel Kluge
layout: post
permalink: /tutorial/navigation-mit-javascript/
categories:
  - HTML/CSS
  - JavaScript
  - Tutorial
---

{% img /wp-content/uploads/2009/08/navigation-mit-javascript.jpg Navigation mit JavaScript %}

*[Demo][demo] | [Download][download]*

Dieses mal geht es um eine Navigation, bei der zu jedem Item eine kurze Info erscheint, wenn man mit dem Cursor rüberfährt. Dies wird regelmäßig von Usability-Experten empfohlen und kann durchaus Sinn machen. Meine Lösung baut wie gewohnt auf **HTML** und **CSS**, sowie **JavaScript** für den Hover-Effekt.

Beginnen wir mit dem HTML-Teil:



```html
<ul id="nav">
  <li>
    <a href="index.html">Home</a>
    <span>Back to frontpage</span>
  </li>
  <li>
    <a href="#">About</a>
    <span>Learn more about this site</span>
  </li>
  <li>
    <a href="#">Contact</a>
    <span>Send me an email</span>
  </li>
</ul>
```

Eine einfache, ungeordnete Liste, bei der zusätzlich zum Link die jeweilige Info in einem `<span>`-Elements steht.

Als nächstes der CSS-Teil:

```css
#nav {
  width: 456px;
  height: 100px;
  list-style: none;
  clear: left;
}

li {
  width: 130px;
  height: 80px;
  padding: 20px 10px 0 10px;
  float: left;
  border-left: 2px solid #FFF;
  cursor: pointer;
}

li span {
  display: none;
}

.active {
  background: url('images/li_bg.jpg') 0 0 no-repeat;
}

.active span {
  display: block;
  line-height: 15px;
  color: #EEE;
}

a {
  display: block;
  margin-bottom: 5px;
  font: bold 24px Helvetica, Arial;
  color: #FFF;
  line-height: 30px;
}
```

Die Liste weist vom Styling her keine Abnormalitäten auf, außer, dass durch die Angabe `cursor: pointer;` über dem ganzen `<li>`-Element der für Links typische Cursor in Form einer Hand auftaucht. Warum das so ist, wird im JavaScript-Teil ersichtlich. Ansonsten ist das `<span>`-Element unsichtbar, es sei denn das `<li>`-Element hat die Klasse `active`.

Nun zum JavaScript-Teil:

```javascript
window.onload = function () {
  var lis = document.getElementById('nav').getElementsByTagName('li');
  mOver = function() {
    this.className = 'active';
  }
  mOut = function() {
    this.className = '';
  }
  mClick = function() {
    location.href = this.getElementsByTagName('a')[0].href;
  }
  for ( i=0; i < lis.length; i++ ) {
    with ( lis[i] ) {
      onmouseover = mOver;
      onmouseout = mOut;
      onclick = mClick;
    }
  }
}
```

Innerhalb einer `window.onload`-Funktion definieren wir als erstes den Selektor für die `<li>`-Elemente der ungeordneten Liste. Danach werden die Funktionen für die Maus-Events aufgestellt. Fährt man mit der Maus über ein `<li>`-Elemente, wird diesem die Klasse `active` angehängt. Geht man mit dem Cursor wieder vom `<li>`-Element runter, wird die Klasse wieder entfernt. Klickt man auf ein `<li>`-Element, wird man zu dem im jeweiligen Link spezifizierten URL weitergeleitet.

Dadurch erklärt sich auch die Angabe `cursor: pointer;` für `<li>`-Elemente im Stylesheet. Der klickbare Bereich wird einfach vergrößert, was dem Besucher der Seite die Nutzung der Navigation erleichtert.

Nachdem die Funktionen für die Maus-Events aufgestellt sind, werden sie in einer `for`-Schleife zugewiesen. Fertig ist die Navigation mit eingeblendeter Info. Wie immer könnt ihr euch die nötigen Dateien runterladen. Viel Spaß!

[demo]: http://www.emanuel-kluge.de/demo/navigation-mit-javascript/
[download]: /wp-content/uploads/2009/08/navigation-mit-javascript.zip
