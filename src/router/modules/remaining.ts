import Layout from "/@/layout/index.vue";

const remainingRouter = [
  {
    path: "/login",
    name: "login",
    component: () => import("/@/views/login/index.vue"),
    meta: {
      title: "登陆",
      showLink: false,
      rank: 101,
    },
  },
  {
    // 找不到路由重定向到404页面
    path: "/:pathMatch(.*)",
    name: "pathMatch",
    component: Layout,
    redirect: "/error/404",
    meta: {
      icon: "el-icon-s-home",
      title: "首页",
      showLink: false,
      rank: 103,
    },
  }
];

export default remainingRouter;
