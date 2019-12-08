<!DOCTYPE html>
<html class="no-js" lang="de" itemscope itemtype="http://schema.org/WebPage">

  {% include "../_includes/head.swig" %}

  <body>

    {% include "../_includes/header.swig" %}

    <main class="ek-main">
      <div class="ek-content clearfix">
        {% block content %}{% endblock %}
      </div>
      {% include "../_includes/aside.swig" %}
    </main>

    {% include "../_includes/footer.swig" %}
    {% include "../_includes/scripts.swig" %}

  </body>

</html>
