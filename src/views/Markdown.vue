<template>
  <div id="editor">
    <textarea class="md" :value="input" @input="update"></textarea>
    <div class="md" v-html="compiledMarkdown"></div>
  </div>
</template>

<script>
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/googlecode.css";

export default {
  name: "HelloWorld",
  data() {
    return {
      input: "```java\n" +
          "@PostMapping(\"/saveMarkdown\")\n" +
          "public String saveMd(@RequestBody Markdown markdown){\n" +
          "    markdown.setTitle(\"Markdown\");\n" +
          "    markdown.setModifier(\"grape\");\n" +
          "    markdown.setModifyTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern(\"yyyy/MM/dd HH:mm:ss\")));\n" +
          "\n" +
          "    markdownService.save(markdown);\n" +
          "    return LocalDateTime.now().format(DateTimeFormatter.ofPattern(\"yyyy/MM/dd HH:mm:ss\"));\n" +
          "    }\n" +
          "```",
    };
  },
  computed: {
    compiledMarkdown() {
      console.log("input:" + this.input);
      return marked(this.input, { sanitize: true });
    },
  },
  methods: {
    update(e) {
      this.input = e.target.value;
      this.compiledMarkdown;
    },
    log() {
      console.log("markdown initialized-------->")
    },
  },
  mounted() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function (code) {
        // eslint-disable-next-line no-undef
        return hljs.highlightAuto(code).value;
      },
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false,
    });
    this.log();
    this.compiledMarkdown;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html,
body,
#editor {
  margin: 0;
  height: 100%;
  font-family: "Helvetica Neue", Arial, sans-serif;
  color: #000000;
}

textarea,
body,
#editor {
  margin: 0;
  height: 100%;
  font-family: "Helvetica Neue", Arial, sans-serif;
  color: #333;
}

.md {
  display: inline-block;
  width: 49%;
  height: 800px;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
}
</style>
