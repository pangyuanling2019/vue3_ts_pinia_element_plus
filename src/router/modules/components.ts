import Layout from "/@/layout/index.vue";

const componentsRouter = {
  path: "/components",
  name: "components",
  component: Layout,
  redirect: "/components/draggable",
  meta: {
    icon: "el-icon-menu",
    title: "组件",
    showLink: true,
    rank: 4,
  },
  children: [
    {
      path: "/components/draggable",
      name: "draggable",
      component: () => import("/@/views/components/draggable/index.vue"),
      meta: {
        title: "拖拽组件",
        showLink: true,
        parentPath: "/components"
      },
    },
    {
      path: "/components/countTo",
      name: "countTo",
      component: () => import("/@/views/components/count-to/index.vue"),
      meta: {
        title: "数字动画",
        showLink: true,
        parentPath: "/components"
      },
    }
  ],
};

export default componentsRouter;
