// 封装 http 请求

import axios from "axios";

// 创建 axios 实例
const request = axios.create({
  baseURL: "http://127.0.0.1:4523/m1/2511274-0-default/api", // url = base url + request url
  timeout: 5000,
});

// request 拦截器
request.interceptors.request.use((config) => config);

// response 拦截器
request.interceptors.response.use((response) => {
  return response.data;
});

export default request;
