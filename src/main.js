import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// 导入封装的axios
import http from "./http/http";

// 添加组件库
import ElementPlus from "element-plus";

// 添加树型组件
import VXETable from "vxe-table";
import "vxe-table/lib/style.css";

const app = createApp(App);

app.config.globalProperties.$http = http;

app.use(router).use(ElementPlus).use(VXETable).mount("#app");
