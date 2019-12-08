<script>
  (
    (rel ,href) => document.head.appendChild(
      Object.assign(
        document.createElement('link'),
        { rel, href }
      )
    )
  )('stylesheet', '{{ assets["main.css"].url }}');

  // Load index.js
  (function (scriptPath, doc, elem) {
    var e = doc.createElement(elem), r = doc.getElementsByTagName(elem)[0];
    e.src = scriptPath; e.type = 'text/java' + elem; e.async = true;
    r.parentNode.insertBefore(e, r);
  })('{{ assets["index.js"].url }}', document, 'script');
</script>
