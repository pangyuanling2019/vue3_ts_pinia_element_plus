import Layout from "/@/layout/index.vue";

const purchaseRouter = {
    path: "/purchase",
    name: "purchase",
    component: Layout,
    redirect: "/purchase/order1",
    meta: {
        icon: "icon-guanli",
        title: "采购",
        showLink: true,
        rank: 2,
    },
    children: [
        {
            path: "/purchase/order1",
            name: "p_order",
            component: () => import("/@/views/purchase/order/index.vue"),
            meta: {
                title: "采购订单",
                showLink: true,
                parentPath: "/purchase"
            },
        },
        {
            path: "/purchase/po",
            name: "po",
            component: () => import("/@/views/purchase/po/index.vue"),
            meta: {
                title: "采购入库",
                showLink: true,
                parentPath: "/purchase"
            },
        },
        {
            path: "/purchase/ro",
            name: "p_ro",
            component: () => import("/@/views/purchase/ro/index.vue"),
            meta: {
                title: "采购退货",
                showLink: true,
                parentPath: "/purchase"
            },
        },
    ],
};

export default purchaseRouter;
