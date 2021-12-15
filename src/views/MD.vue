<template>
  <el-container style="height: 800px">
    <el-aside width="250px" style="background-color: #333333">
      <el-table
          max-height="800"
          :data="tableData"
          style="width: 100%; height: 100%"
      >
        <el-table-column label="文章列表">
          <template v-slot="scope">
            <div @click="downloadMdById(scope.row.id)">
              <el-link>
                {{ scope.row.title }}
              </el-link>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-aside>

    <el-container>
      <el-header style="background: #56a13e">
        <span>{{ title }}</span>
        <!-- 引用子组件,父->子 props:绑定参数 子->父 定义事件 -->
        <Tag v-bind:tags="tags" v-bind:hello="2021" @childTag="fromChild">
        </Tag>
      </el-header>
      <el-main>
        <div id="editor">
          <!-- <textarea class="md" :value="input" @input="update"></textarea>-->
          <div class="markdown-body md" v-html="compiledMarkdown"></div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {defineComponent, ref} from "vue";

import {marked} from "marked";
//import "highlight.js/styles/androidstudio.css";
import "highlight.js/styles/atelier-dune-dark.css";
import Tag from "./Tag";

// 导入markdown样式
import "../static/github-markdown.min.css";

export default defineComponent({
  components: {Tag},
  mounted() {
    this.downloadAllMd();
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function (code, lang) {
        const hljs = require("highlight.js");
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, {language}).value;
      },
      langPrefix: "hljs language-", // highlight.js css expects a top-level 'hljs' class.
      pedantic: false,
      gfm: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false,
    });

    this.compiledMarkdown;
  },
  computed: {
    compiledMarkdown() {
      console.log("input:" + this.input);
      return marked(this.input /*, { sanitize: true }*/);
    },
  },
  data() {
    return {
      tags: [],
      message: "",
      title: "",
      tableData: [],
      // markdown内容
      input: "",
      // id markdown数据对应的主键
      id: "",
      // 侧边栏宽度
      size: "300px",
    };
  },
  methods: {
    fromChild(childData) {
      // 将子组件传递的数据赋值给父组件的tags
      this.tags = childData.dynamicTags;
    },
    downloadAllMd() {
      this.drawer = true
      console.log("下载所有");
      this.$http
          .post("/downloadAllMd")
          .then((response) => {
            this.tableData = response;
            console.log("List:" + response);
          })
          .catch((err) => {
            console.log(err);
          });
    },
    downloadMdById(id) {
      console.log("下载:" + id.toString());
      this.$http
          .post("/downloadMdById", {id: id.toString()})
          .then((response) => {
            // 属性赋值
            this.input = response.content;
            this.id = response.id;
            this.title = response.title;
            this.tags = response.tagArray;
            // 成功获取文件后关闭draw
            this.drawer = false;
            console.log("List:" + response);
          })
          .catch((err) => {
            console.log(err);
          });
    },
  },
  setup() {
    const item = {
      date: "2016-05-02",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    };

    const tableData2 = ref(Array(20).fill(item));

    return {
      tableData2,
    };
  },
});
</script>

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
  width: 100%;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
}
</style>
