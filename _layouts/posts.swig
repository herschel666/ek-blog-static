{% extends "./default.swig" %}

{% block content %}
  <section class="ek-post-wrap">

    {% for post in pagination.files %}
      <article class="ek-post" id="post-{{ post.title | md5 }}" itemscope itemtype="http://schema.org/BlogPosting">
        <header class="ek-posts__header">
          <h1 class="ek-post__headline" itemprop="headline">
            <a class="ek-posts__heading-link"
              href="{{ post.path | prepend(site.baseurl + '/') }}"
              rel="bookmark"
              itemprop="url">{{ post.title }}</a>
          </h1>
        </header>
        <div class="ek-post__content" itemprop="articleBody">
          {{ post.contents | safe }}
        </div>
        <footer class="ek-post__footer">
          <p class="ek-post__meta">
            Geschrieben am <time datetime="{{ post.date | date('Y-m-d') }}" class="published updated"><meta itemprop="datePublished" content="{{ post.date | date('Y-m-d') }}">{{ post.date | date('d. m. Y') }}</time>
          </p>
        </footer>
      </article>
    {% endfor %}

    <nav class="ek-meta-nav clearfix">
      <div class="ek-meta-nav__link ek-meta-nav__link--prev">
        {% if pagination.previous %}
          <a href="{{ pagination.previous.path | prepend(site.baseurl + '/') }}">
            <span>&laquo;</span> Neuere Beiträge
          </a>
        {% endif %}
      </div>
      <div class="ek-meta-nav__link ek-meta-nav__link--next">
        {% if pagination.next %}
          <a href="{{ pagination.next.path | prepend(site.baseurl + '/') }}">
            Ältere Beiträge <span>&raquo;</span>
          </a>
        {% endif %}
      </div>
    </nav>

  </section>
{% endblock %}
