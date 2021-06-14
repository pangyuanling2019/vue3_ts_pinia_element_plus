import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { setupStore } from "/@/store";

import { useElementPlus } from "../src/plugins/element-plus";
import { useTable } from "../src/plugins/vxe-table";
import { usI18n } from "../src/plugins/i18n";

// 导入公共样式
import "./style/index.scss";
// 导入字体图标
import "./assets/iconfont/iconfont.js";
import "./assets/iconfont/iconfont.css";


const app = createApp(App);

setupStore(app);

app.use(router).use(useElementPlus).use(useTable).use(usI18n);

router.isReady();

app.mount("#app");
