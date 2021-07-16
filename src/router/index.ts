import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import homeRouter from "./modules/home";
import componentsRouter from "./modules/components";
import systemRouter from "./modules/system";
import errorRouter from "./modules/error";
import remainingRouter from "./modules/remaining"; //静态路由

import { storageSession } from "../utils/storage";
import NProgress from "../utils/progress";

const constantRoutes: Array<RouteRecordRaw> = [
  homeRouter,
  componentsRouter,
  systemRouter,
  errorRouter,
  ...remainingRouter
];

// 按照路由中meta下的rank等级升序来排序路由
export const ascending = (arr) => {
  return arr.sort((a: any, b: any) => {
    return a?.meta?.rank - b?.meta?.rank;
  });
};

// 将所有静态路由导出
export const constantRoutesArr = ascending(constantRoutes);

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutesArr
});

console.log(router, constantRoutesArr)

const whiteList = ["/login"];

router.beforeEach((to, _from, next) => {
  // _from?.name;
  let name = storageSession.getItem("info");
  if (name) {
  }
  NProgress.start();
  // @ts-ignore
  to.meta.title ? (document.title = to.meta.title) : ""; // 动态title
  whiteList.indexOf(to.path) !== -1 || name ? next() : next("/login"); // 全部重定向到登录页
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
