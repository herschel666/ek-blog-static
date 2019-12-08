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
      </article>

    </div>
  </section>
{% endblock %}
