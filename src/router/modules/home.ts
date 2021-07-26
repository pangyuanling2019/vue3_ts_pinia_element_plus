import Layout from "/@/layout/index.vue";

const homeRouter = {
  path: "/",
  name: "home",
  component: Layout,
  redirect: "/home",
  meta: {
    icon: "icon-home",
    showLink: true,
    title: "首页",
    rank: 1,
  },
  children: [
    {
      path: "/home",
      name: "home",
      component: () => import("/@/views/home/index.vue"),
      meta: {
        title: "首页",
        showLink: true,
        parentPath:"/"
      },
    },
  ],
};

export default homeRouter;
