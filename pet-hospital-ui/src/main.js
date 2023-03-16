import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import store from "./store/index";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./assets/styles/index.scss"; // 全局样式
import * as ElementPlusIconsVue from "@element-plus/icons-vue"; // 图标

const app = createApp(App);
// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(router).use(createPinia()).use(store).use(ElementPlus).mount("#app");
