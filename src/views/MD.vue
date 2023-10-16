<template>
  <el-container>
    <el-aside width="250px">
      <el-table
        maxheight="auto"
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
      <el-header>
        <!--        <span>{{ title }}</span>-->
        <el-input v-model="title" placeholder="Please input title"></el-input>
        <br />
        <el-button type="success" @click="saveMarkdown">保存</el-button>
        <el-button type="success" @click="isShowText">显示原文</el-button>
        <el-button type="info" @click="isShowMd">显示md</el-button>
        <!-- 引用子组件,父->子 props:绑定参数 子->父 定义事件 -->
        <Tag v-bind:tags="tags" v-bind:hello="2021" @childTag="fromChild">
        </Tag>
      </el-header>
      <el-main class="el-main2">
        <div id="editor" style="height: 50%; overflow-y: auto">
          <textarea
            v-show="showText"
            class="markdown-body md"
            :value="input"
            @input="update"
          ></textarea>
          <div
            v-show="showMd"
            class="markdown-body md"
            v-html="compiledMarkdown"
          ></div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { defineComponent, ref } from "vue";

import { marked } from "marked";
//import "highlight.js/styles/androidstudio.css";
import "highlight.js/styles/atelier-dune-dark.css";
import Tag from "./Tag";

// 导入markdown样式
import "../static/github-markdown.min.css";

import { saveMarkdown } from "@/http/api";

import {
  ElContainer,
  ElMain,
  ElHeader,
  ElTable,
  ElAside,
  ElLink,
  ElButton,
  ElTableColumn,
  ElMessage,
} from "element-plus";

export default defineComponent({
  components: {
    ElContainer,
    ElMain,
    ElHeader,
    ElButton,
    Tag,
    ElTable,
    ElAside,
    ElLink,
    ElTableColumn,
  },
  mounted() {
    this.downloadAllMd();
    marked.setOptions({
      renderer: new marked.Renderer(),
      /*highlight: function (code, lang) {
        const hljs = require("highlight.js");
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language }).value;
      },*/
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
      showMd: true,
      showText: false,
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
    isShowMd() {
      this.showMd = true;
      this.showText = false;
    },
    isShowText() {
      this.showMd = false;
      this.showText = true;
    },
    update(e) {
      this.input = e.target.value;
      this.compiledMarkdown;
    },
    fromChild(childData) {
      // 将子组件传递的数据赋值给父组件的tags
      this.tags = childData.dynamicTags;
    },
    saveMarkdown() {
      try {
        const response = saveMarkdown(
          this.input,
          this.id,
          this.title,
          this.tags
        );
        this.id = response.id;
        //console.log("List:" + response);
        this.successMsg(new Date().toDateString());
      } catch (err) {
        console.log(err);
      }
    },
    downloadAllMd() {
      this.drawer = true;
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
        .post("/downloadMdById", { id: id.toString() })
        .then((response) => {
          // 属性赋值
          this.input = response.content;
          this.id = id;
          this.title = response.title;
          this.tags = response.tagArray;
          // 成功获取文件后关闭draw
          this.drawer = false;
          // console.log("List:" + response);
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

    const successMsg = (msg) => {
      ElMessage({
        message: "Successfully saved." + msg,
        type: "success",
      });
    };

    const tableData2 = ref(Array(20).fill(item));

    return {
      tableData2,
      successMsg,
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

.el-main {
  padding-bottom: 10px;
  overflow: hidden;
}
.el-main2 {
  padding-bottom: 10px;
  overflow: auto;
}

textarea,
body,
#editor {
  margin: 0;
  height: 100%;
  font-family: "Helvetica Neue", Arial, sans-serif;
  color: #333;
  overflow: auto;
  border-color: #c01010;
}

.md {
  display: inline-block;
  width: 100%;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
  overflow: auto;
}
</style>
