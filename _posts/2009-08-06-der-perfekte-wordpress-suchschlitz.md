---
title: 'Der &quot;perfekte&quot; WordPress-Suchschlitz'
author: Emanuel Kluge
layout: post
permalink: /tutorial/der-perfekte-wordpress-suchschlitz/
categories:
  - HTML/CSS
  - JavaScript
  - Tutorial
  - WordPress
---

{% lazyImg /wp-content/uploads/2009/08/der-perfekte-wordpress-suchschlitz.jpg Der &quot;perfekte&quot; WordPress-Suchschlitz %}

*[Demo][demo] | [Download][download]*

Heute zeige ich, wie man mit etwas **JavaScript** und **PHP** einen benutzerfreundlichen Suchschlitz in WordPress baut. Das "perfekt" steht deshalb in Anführungszeichen, weil ich mir nicht anmaßen möchte, den wirklich perfekten Suchschlitz zu präsentieren. Möglicherweise würde es "advanced" eher treffen, aber wie klingt das denn bitte?!

Also los: Wir wollen einen Suchschlitz, in dem "Suchen &hellip;" steht, was wiederum verschwinden soll, wenn der Nutzer auf das Eingabefeld klickt und wieder erscheinen soll, wenn der Nutzer außerhalb des Eingabefeldes klickt. Des weiteren soll auf der Suchergebnis-Seite im Suchschlitz der Suchbegriff stehen, welcher ebenfalls verschwinden und erscheinen soll, je nachdem, wohin der Nutzer klickt.

Das klingt extrem kompliziert, ich weiß, aber bei Verständnisproblemen einfach die Demo anschauen. Ansonsten lege ich mal los. Und zwar brauchen wir folgenden HTML-Teil in der WordPress-Theme-Datei "searchform.php":



```html
<form method="get" id="search" action="<?php bloginfo('url'); ?>/">
  <fieldset>
    <input type="text" value="<?php echo $search_text; ?>" id="s" name="s" />
    <div>
      <input type="submit" name="submit" value="Absenden" />
    </div>
  </fieldset>
</form>
```

Falls ihr in eurem WordPress-Theme keine "searchform.php" habt, legt sie einfach an, ihr könnt sie mit folgendem Code-Schnippel in eure Templates einbinden:

```php
<?php include (TEMPLATEPATH . "/searchform.php"); ?>
```

Ansonsten handelt es sich um ein simples Formular mit einem Eingabefeld und einem Submit-Button, welchen ich in ein `<div>`-Element eingebettet habe. Warum, könnt ihr in meinem [Beitrag zum "Barrierefreien Button mit Text Replacement"][barrierefreier] nachlesen.

Als nächstes kommt der JavaScript-Teil, der dafür sorgt, dass das Eingabefeld beim Draufklicken geleert wird und zusätzlich dem Submit-Button die Klasse `submit_active` anhängt, wodurch der Farbwechsel im Schein um den Suchschlitz realisiert wird.

```javascript
window.onload = function() {
  var input = document.getElementById('s');
  var value = document.getElementById('s').value;
  var submit = document.getElementsByName('submit')[0];

  mFocus = function () {
    if ( this.value == value ) {
      this.value = '';
    }
    submit.className = 'submit_active';
  }

  mBlur = function () {
    if ( this.value == '' ) {
      this.value = value;
    }
    submit.className = '';
  }

  with ( input ) {
    onfocus = mFocus;
    onblur = mBlur;
  }
}
```

Als erstes werden die Selektoren für das Eingabefeld, für dessen Value und den Submit-Button in Variablen gespeichert. Danach die Funktionen definiert, die den Value wechseln und die Klasse `submit_active` anhängen bzw. entfernen. Zum Schluss werden diese den Events `onfocus` und `onblur` zugewiesen.

Als nächstes brauchen wir ein wenig PHP, um auf der Suchergebnis-Seite den spezifischen Suchbegriff im Suchschlitz erscheinen zu lassen:

```php
<?php
  if (!is_search()) {
    $search_text = "Suche …";
  } else {
    $search_text = "$s";
  }
?>
```

Über `if (!is_search())` fragen wir ab, ob es sich **nicht** um die Suchergebnis-Seite handelt (man beachte das Ausrufezeichen, welches die Bedingung negiert). Ist dem so, speichert die Variable `$search_text` den Wert "Suche &hellip;". Andernfalls, wenn der Besucher sich auf der Suchergebnis-Seite befindet, speichert die Variable den spezifischen Suchbegriff. Wenn wir nochmal hoch zum HTML-Teil gucken, können wir sehen, dass die Beschriftung des Suchschlitzeingabefeldes mit genau dieser Variable `$search_text` realisiert wird, indem das Attribut `value` den Wert `<?php echo $search_text; ?>` bekommt.

Zum Schluss muss der ganze Spaß nur noch gestylet werden:

```css
#search {
  width: 301px;
  height: 52px;
  clear: left;
}

#s,
#search div input,
#search div input.submit_active {
  background-image: url('images/sprite.jpg');
  background-repeat: no-repeat;
}


#s {
  width: 231px;
  height: 22px;
  padding: 17px 12px 13px 17px;
  float: left;
  border: none;
  line-height: 22px;
  font-size: 16px;
  color: #666;
  background-position: 0 0;
}

#search div {
  width: 41px;
  height: 52px;
  float: left;
  overflow: hidden;
}

#search div input {
  width: 41px;
  padding-top: 52px;
  border: none;
  background-position: -260px 0;
  cursor: pointer;
}

#s:focus {
  background-position: 0 -52px;
  color: #369;
}

#search div input.submit_active {
  background-position: -260px -52px;
}

#search div input:hover {
  background-position: -301px -0;
}

#search div input.submit_active:hover {
  background-position: -301px -52px;
}
```

Ich denke, die Style-Angaben sind relativ selbsterklärend. Die `<input>`-Elemente werden formatiert und die jeweiligen Zustände mit der entsprechenden Hintergrundgrafik versehen, wobei ich hier auf ein sog. CSS-Sprite zurückgreife, wodurch sich die Grafik-Datei nicht ändert, sondern nur deren Position. Außerdem nutze ich immer ein sog. CSS-Reset, wodurch u.a. das Element `<fieldset>` direkt am Anfang die Style-Angabe `border: 0` zugewiesen bekommt, weshalb das hier im CSS-Teil nicht auftaucht. Bedenkt das, wenn ihr die Sachen hier direkt aus dem Beitrag rauskopiert. Im Zweifelsfalle geht ihr auf Nummer sicher, wenn ihr die Beispiel-Dateien runterladet.

Außerdem dürften der IE6 und der IE7 Probleme mit der Darstellung haben, da sie nicht mit den Pseudo-Klassen `:hover` und `:focus` um können, bzw. erstere nur bei Links anwenden können. Um diesen Makel zu beheben, [guckt nochmal in meinen Beitrag zum Thema <span lang="en">Internet Explorer 6</span>][explorer].

Ansonsten ist der "perfekte" Suchschlitz fertig. Ich habe noch die .psd-Datei für das CSS-Sprite in den Download-Ordner gepackt, damit ihr die Farben bei Bedarf anpassen könnt. Alternativ könnt ihr natürlich auch ein ganz eigenes Design machen.

In diesem Sinne viel Spaß damit und bei Fragen immer ran an die Kommentar-Funktion.

**Nachtrag:**

Ich habe im JavaScript-Teil zwei Ergänzungen bei der `mFocus`- und der `mBlur`-Funktion vorgenommen. Bevor der Inhalt des Eingabefeldes automatisch gelöscht oder mit dem Wert "Suche …" aufgefüllt wird, findet eine Abfrage statt. So wird verhindert, dass das vom Nutzer eingegebene Suchwort nach dem Klicken außerhalb des Eingabefeldes verschwindet.

[demo]: http://www.emanuel-kluge.de/demo/der-perfekte-wordpress-suchschlitz/
[download]: /wp-content/uploads/2009/08/der-perfekte-wordpress-suchschlitz.zip
[barrierefreier]: /html-css/barrierefreier-button-mit-text-replacement/
[explorer]: /html-css/wie-man-dem-internet-explorer-6-herr-wird/#die-hover-klasse-fuer-alle-elemente-verfuegbar-machen
