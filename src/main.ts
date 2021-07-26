import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { useElementPlus } from "../src/plugins/element-plus";
import { useTable } from "../src/plugins/vxe-table";

// 导入公共样式
import "./style/index.scss";
// 导入字体图标
import "./assets/iconfont/iconfont.js";
import "./assets/iconfont/iconfont.css";



const app = createApp(App);
const store = createPinia();

app.use(router).use(store).use(useElementPlus).use(useTable).mount("#app");

