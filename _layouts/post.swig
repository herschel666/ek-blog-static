{% extends "./default.swig" %}

{% block content %}
  <section class="ek-post-wrap">
    <div class="ek-post">
      <article class="ek-post__content">
        <header class="ek-posts__header">
          <h1 class="ek-post__headline" itemprop="headline">
            {{ title }}
          </h1>
        </header>
        <div class="ek-post__content" itemprop="articleBody">
          {{ contents | safe }}
        </div>
        <footer class="ek-post__footer ek-post__footer--detail">
          <p class="ek-post__meta">
            Geschrieben am <time datetime="{{ date | date("Y-m-d") }}" class="published updated"><meta itemprop="datePublished" content="{{ date | date("Y-m-d") }}">{{ date | date("d. m. Y") }}</time>
          </p>
        </footer>
      </article>
    </div>
  </section>
{% endblock %}
