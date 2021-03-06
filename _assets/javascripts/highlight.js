import hljs from 'highlight.js';
import handlebars from 'highlight.js/lib/languages/handlebars';
import php from 'highlight.js/lib/languages/php';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import ini from 'highlight.js/lib/languages/ini';

hljs.registerLanguage('handlebars', handlebars);
hljs.registerLanguage('php', php);
hljs.registerLanguage('css', css);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('ini', ini);
