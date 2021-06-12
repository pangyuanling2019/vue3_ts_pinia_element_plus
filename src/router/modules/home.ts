import Layout from "/@/layout/index.vue";

const homeRouter = {
  path: "/",
  name: "home",
  component: Layout,
  redirect: "/home",
  meta: {
    icon: "el-icon-s-home",
    showLink: true,
    savedPosition: false,
    rank: 0,
  },
  children: [
    {
      path: "/home",
      name: "home",
      component: () => import("/@/views/home/index.vue"),
      meta: {
        title: "message.hshome",
        showLink: true,
        savedPosition: false,
      },
    },
  ],
};

export default homeRouter;
