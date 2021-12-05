<template>
  <el-container>
    <el-row>
      <el-col :span="24">
        <el-col :span="8">
          <el-button
            type="success"
            style="margin-right: 16px"
            @click="downloadAllMd()"
          >
            Show All MD
          </el-button>
        </el-col>

        <el-col :span="8">
          <el-button
            type="success"
            style="margin-right: 16px"
            @click="saveMarkdown()"
          >
            Save MD
          </el-button>
        </el-col>

        <el-col :span="8">
          <el-button
            type="success"
            style="margin-right: 16px"
            @click="newMarkdown()"
          >
            New MD
          </el-button>
        </el-col>

        <el-col :span="18">
          <el-input v-model="title" placeholder="Please input title"></el-input>
        </el-col>
      </el-col>
      <el-col :span="24">
        <el-drawer
          v-model="drawer"
          title="I am the title"
          :direction="direction"
          :size="size"
        >
          <el-table
            max-height="800"
            :data="tableData"
            border
            style="width: 100%"
          >
            <el-table-column label="content">
              <template v-slot="scope">
                <div @click="downloadMdById(scope.row.id)">
                  {{ scope.row.title }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-drawer>

        <div id="editor">
          <textarea class="md" :value="input" @input="update"></textarea>
          <div class="md" v-html="compiledMarkdown"></div>
        </div>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import { marked } from "marked";
//import "highlight.js/styles/androidstudio.css";
import "highlight.js/styles/atom-one-dark.css";

import { ref } from "vue";
import { ElMessageBox } from "element-plus";

export default {
  name: "HelloWorld",
  components: {},
  component: {},
  data() {
    return {
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
  computed: {
    compiledMarkdown() {
      console.log("input:" + this.input);
      return marked(this.input /*, { sanitize: true }*/);
    },
  },
  methods: {
    download() {
      //alert("modelValue:" + this.drawer);
      // 设置drawer为false 关闭侧边栏
      this.drawer = false;
    },
    update(e) {
      this.input = e.target.value;
      this.compiledMarkdown;
    },
    newMarkdown() {
      // 创建新的markdown时重置属性
      this.id = "";
      this.input = "";
      this.title = "";
    },
    // 保存或更新
    saveMarkdown() {
      let input1 = this.input;
      let id1 = this.id;
      let title = this.title;
      this.$http
        .post("/saveMarkdown", { id: id1, title: title, content: input1 })
        .then((response) => {
          //this.tableData = response;
          this.id = response.id;
          console.log("List:" + response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    log() {
      console.log("markdown initialized-------->");
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
          this.id = response.id;
          this.title = response.title;
          // 成功获取文件后关闭draw
          this.drawer = false;
          console.log("List:" + response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function (code, lang) {
        const hljs = require("highlight.js");
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language }).value;
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
    this.log();
    this.compiledMarkdown;
  },
  setup() {
    const drawer = ref(false);
    console.log("-======>");
    // 默认左侧显示
    const direction = ref("ltr");
    const handleClose = (done) => {
      ElMessageBox.confirm("Are you sure you want to close this?")
        .then(() => {
          done();
        })
        .catch(() => {
          // catch error
        });
    };
    return {
      drawer,
      direction,
      handleClose,
    };
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
