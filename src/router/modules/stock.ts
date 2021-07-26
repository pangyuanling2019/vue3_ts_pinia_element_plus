import Layout from "/@/layout/index.vue";

const stockRouter = {
    path: "/stock",
    name: "stock",
    component: Layout,
    redirect: "/stock/statistics",
    meta: {
        icon: "icon--_cangku",
        title: "仓库",
        showLink: true,
        rank: 5,
    },
    children: [
        {
            path: "/stock/statistics",
            name: "statistics",
            component: () => import("/@/views/stock/statistics/index.vue"),
            meta: {
                title: "库存统计",
                showLink: true,
                parentPath: "/stock"
            },
        },
        {
            path: "/stock/check",
            name: "check",
            component: () => import("/@/views/stock/check/index.vue"),
            meta: {
                title: "库存盘点",
                showLink: true,
                parentPath: "/stock"
            },
        },
        {
            path: "/stock/warning",
            name: "warning",
            component: () => import("/@/views/stock/warning/index.vue"),
            meta: {
                title: "库存预警",
                showLink: true,
                parentPath: "/stock"
            },
        },
    ],
};

export default stockRouter;
