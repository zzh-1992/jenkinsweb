<template>
  <el-container class="myContainer">
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

          <el-button
            type="warning"
            style="margin-right: 16px"
            @click="timeOut()"
          >
            timeOut
          </el-button>
        </el-col>

        <el-col :span="18">
          <el-input v-model="title" placeholder="Please input title"></el-input>
        </el-col>

        <el-col :span="18">
          <!-- 引用子组件,父->子 props:绑定参数 子->父 定义事件 -->
          <Tag v-bind:tags="tags" v-bind:hello="2021" @childTag="fromChild">
          </Tag>
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
          <textarea
            class="md markdown-body"
            style="font-size: 25px"
            :value="input"
            @input="update"
          ></textarea>
          <div
            class="md markdown-body"
            style="font-size: 25px"
            v-html="compiledMarkdown"
          ></div>
        </div>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import { marked } from "marked";
//import "highlight.js/styles/androidstudio.css";
import "highlight.js/styles/atom-one-dark.css";

// 导入markdown样式
import "../static/github-markdown.min.css";

import { ref } from "vue";
import { ElMessageBox } from "element-plus";
import Tag from "./Tag";
import { ElMessage } from "element-plus";

export default {
  name: "HelloWorld",
  components: { Tag },
  component: {},
  data() {
    return {
      tags: [],
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
    fromChild(childData) {
      // 将子组件传递的数据赋值给父组件的tags
      this.tags = childData.dynamicTags;
    },
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
      this.tags = [];
    },
    // 保存或更新
    saveMarkdown() {
      let input1 = this.input;
      let id1 = this.id;
      let title = this.title;
      let tags = this.tags;
      this.$http
        .post("/saveMarkdown", {
          id: id1,
          title: title,
          content: input1,
          tags: tags.toString(),
        })
        .then((response) => {
          //this.tableData = response;
          this.id = response.id;
          console.log("List:" + response);
          // 成功提示
          this.successMsg(new Date().toDateString());
        })
        .catch((err) => {
          console.log(err);
          // 失败提示
          this.errorMsg(err);
        });
    },
    log() {
      console.log("markdown initialized-------->");
    },
    timeOut() {
      this.$http
        .get("/timeOut")
        .then((response) => {
          console.log("timeOut api:" + response.toString());
        })
        .catch((err) => {
          var msg = "";
          msg = err.message;
          if (msg.startsWith("timeout of 2000ms exceeded")) {
            alert("接口超时,建议减少数据后再尝试");
          }
        });
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
    const successMsg = (msg) => {
      ElMessage({
        message: "Successfully saved." + msg,
        type: "success",
      });
    };
    const errorMsg = (msg) => {
      ElMessage({
        message: "Failed saved." + msg,
        type: "error",
      });
    };

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
      successMsg,
      errorMsg,
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
