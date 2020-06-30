# Run In Browser

[![npm](https://img.shields.io/npm/dy/reveal.js-run-in-browser)](https://www.npmjs.com/package/reveal.js-run-in-browser)

---

A plugin for [Reveal.js](https://revealjs.com), that allows to execute js code right in browser

It works for structure like this:

```html
<pre><code>
    Here is the code
</code></pre>
```

then install the plugin and it will work automatically.

## Installation

### npm installation

This plugin is published to, and can be installed from, npm.

```javascript
npm install reveal.js-run-in-browser
```

The plugin folder can then be referenced from `node_modules/reveal.js-run-in-browser/dist/revealjs-run-in-browser`

## Setup

### JavaScript

```html
<script src="dist/reveal.js" />
<script src="node_modules/reveal.js-run-in-browser/dist/revealjs-run-in-browser" />
<script>
  Reveal.initialize({
    // ...
    plugins: [RunInBrowser],
  });
</script>
```
