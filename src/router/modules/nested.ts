import Layout from "/@/layout/index.vue";

const nestedRouter = {
  path: "/nested",
  component: Layout,
  redirect: "/nested/menu1/menu1-1",
  name: "Nested",
  meta: {
    title: "多级菜单",
    icon: "el-icon-s-data",
    showLink: true,

    rank: 5,
  },
  children: [
    {
      path: "menu1",
      component: () => import("/@/views/nested/menu1/index.vue"),
      name: "Menu1",
      meta: {
        title: "菜单1",
        showLink: true,

      },
      redirect: "/nested/menu1/menu1-1",
      children: [
        {
          path: "menu1-1",
          component: () => import("/@/views/nested/menu1/menu1-1/index.vue"),
          name: "Menu1-1",
          meta: {
            title: "菜单1-1",
            showLink: true,

          },
        },
        {
          path: "menu1-2",
          component: () => import("/@/views/nested/menu1/menu1-2/index.vue"),
          name: "Menu1-2",
          redirect: "/nested/menu1/menu1-2/menu1-2-1",
          meta: {
            title: "菜单1-2",
            showLink: true,

          },
          children: [
            {
              path: "menu1-2-1",
              component: () =>
                import("/@/views/nested/menu1/menu1-2/menu1-2-1/index.vue"),
              name: "Menu1-2-1",
              meta: {
                title: "菜单1-2-1",
                showLink: true,

              },
            },
            {
              path: "menu1-2-2",
              component: () =>
                import("/@/views/nested/menu1/menu1-2/menu1-2-2/index.vue"),
              name: "Menu1-2-2",
              meta: {
                title: "菜单1-2-2",
                showLink: true,

              },
            },
          ],
        },
        {
          path: "menu1-3",
          component: () => import("/@/views/nested/menu1/menu1-3/index.vue"),
          name: "Menu1-3",
          meta: {
            title: "菜单1-3",
            showLink: true,

          },
        },
      ],
    },
    {
      path: "menu2",
      name: "Menu2",
      component: () => import("/@/views/nested/menu2/index.vue"),
      meta: {
        title: "菜单2",
        showLink: true,

      },
    },
  ],
};

export default nestedRouter;
