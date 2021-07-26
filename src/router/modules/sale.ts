import Layout from "/@/layout/index.vue";

const saleRouter = {
    path: "/sale",
    name: "sale",
    component: Layout,
    redirect: "/sale/order",
    meta: {
        icon: "icon-xiaoshoudingdan1",
        title: "销售",
        showLink: true,
        rank: 3,
    },
    children: [
        {
            path: "/sale/order",
            name: "s_order",
            component: () => import("/@/views/sale/order/index.vue"),
            meta: {
                title: "销售订单",
                showLink: true,
                parentPath: "/sale"
            },
        },
        {
            path: "/sale/so",
            name: "so",
            component: () => import("/@/views/sale/so/index.vue"),
            meta: {
                title: "销售单",
                showLink: true,
                parentPath: "/sale"
            },
        },
        {
            path: "/sale/ro",
            name: "s_ro",
            component: () => import("/@/views/sale/ro/index.vue"),
            meta: {
                title: "销售退货",
                showLink: true,
                parentPath: "/sale"
            },
        },
    ],
};

export default saleRouter;
