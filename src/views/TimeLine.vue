<template>
  <div>
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in activities"
        :key="index"
        :icon="getIcon(item.type)"
        :type="item.type"
        :hollow="false"
        :content="getColor(item.type)"
        :timestamp="item.timestamp"
        placement="top"
      >
        {{ item.content }}
        <el-card>
          <h4>
            error Update Gitub template
            <!--            <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>-->
            <el-button @click="detail(item.stackStrace)">details</el-button>
          </h4>

          <p>Tom committed 2018/4/12 20:46</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>

    <el-dialog v-model="dialogVisible" title="StackTrace" width="65%">
      <div style="font-size: 8px" v-html="this.stackStrace"></div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { Select, WarningFilled, CloseBold } from "@element-plus/icons-vue";
import { marked } from "marked";

export default {
  components: {},
  data() {
    return {
      dialogVisible: false,
      stackStrace: "",
      activities: [],
    };
  },
  mounted() {
    this.downloadAllMd();
  },
  methods: {
    getColor(type) {
      if (type === "primary") {
        return "#0b35bd";
      }
      if (type === "success") {
        return "#0bbd87";
      }
      if (type === "warning") {
        return "#c6e30b";
      }
      if (type === "danger") {
        return "#a21414";
      } else {
        // info
        return "#7d8d81";
      }
    },

    // primary / success / warning / danger / info
    getIcon(type) {
      if (type === "primary") {
        return Select;
      }
      if (type === "success") {
        return Select;
      }
      if (type === "warning") {
        return WarningFilled;
      }
      if (type === "danger") {
        return CloseBold;
      } else {
        return Select;
      }
    },
    detail(msg) {
      // 开启模态窗口
      this.dialogVisible = true;

      // 转换为markdown
      if (msg !== "" || msg === null || msg === undefined) {
        this.stackStrace = marked("```\n " + msg + " \n```");
      } else {
        return "";
      }
    },
    downloadAllMd() {
      this.$http
        .get("/lifeCycle/selectList")
        .then((response) => {
          //console.log(response);
          this.activities = response;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}

.md {
}
</style>
