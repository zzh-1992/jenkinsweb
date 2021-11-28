import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// 导入封装的axios
import http from "./http/http";

const app = createApp(App);

app.config.globalProperties.$http = http;

app.use(router).mount("#app");
