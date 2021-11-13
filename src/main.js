import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// 导入 axios
import axios from "axios";
// axios 全局配置
axios.defaults.baseURL = 'http://127.0.0.1:8888'

createApp(App).use(router).mount("#app");
