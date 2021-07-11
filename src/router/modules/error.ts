import Layout from "/@/layout/index.vue";

const errorRouter = {
  path: "/error",
  name: "error",
  component: Layout,
  redirect: "/error/401",
  meta: {
    icon: "el-icon-position",
    title: "错误页面",
    showLink: false,
     
    rank: 7,
  },
  children: [
    {
      path: "/error/401",
      name: "401",
      component: () => import("/@/views/error/401.vue"),
      meta: {
        title: "401",
        showLink: false,
         
      },
    },
    {
      path: "/error/404",
      name: "404",
      component: () => import("/@/views/error/404.vue"),
      meta: {
        title: "404",
        showLink: false,
         
      },
    },
  ],
};

export default errorRouter;
