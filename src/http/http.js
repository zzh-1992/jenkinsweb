import axios from "axios";

const http = axios.create({
  // 添加默认请求头
  headers: { name: "grape" },
});
// axios 全局配置
http.defaults.baseURL = "http://127.0.0.1:8888";
// 添加请求拦截器
http.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
http.interceptors.response.use(
  function (response) {
    let httpCode = response.status;
    return httpCode === 200
      ? Promise.resolve(response.data)
      : Promise.reject(response);
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default http;
