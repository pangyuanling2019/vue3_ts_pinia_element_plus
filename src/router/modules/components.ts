import Layout from "/@/layout/index.vue";

const componentsRouter = {
  path: "/components",
  name: "components",
  component: Layout,
  redirect: "/components/split-pane",
  meta: {
    icon: "el-icon-menu",
    title: "message.hscomponents",
    showLink: true,
    savedPosition: true,
    rank: 4,
  },
  children: [
    {
      path: "/components/draggable",
      name: "draggable",
      component: () => import("/@/views/components/draggable/index.vue"),
      meta: {
        title: "message.hsdraggable",
        showLink: true,
        savedPosition: true,
      },
    },
    {
      path: "/components/countTo",
      name: "countTo",
      component: () => import("/@/views/components/count-to/index.vue"),
      meta: {
        title: "message.hscountTo",
        showLink: true,
        savedPosition: true,
      },
    }
  ],
};

export default componentsRouter;
