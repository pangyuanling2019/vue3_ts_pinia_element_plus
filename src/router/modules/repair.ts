import Layout from "/@/layout/index.vue";

const repairRouter = {
    path: "/repair",
    name: "repair",
    component: Layout,
    redirect: "/repair/appointment",
    meta: {
        icon: "icon-fangwuweixiu",
        title: "维修",
        showLink: true,
        rank: 4,
    },
    children: [
        {
            path: "/repair/appointment",
            name: "appointment",
            component: () => import("/@/views/repair/appointment/index.vue"),
            meta: {
                title: "维修预约",
                showLink: true,
                parentPath: "/repair"
            },
        },
        {
            path: "/repair/order",
            name: "order",
            component: () => import("/@/views/repair/order/index.vue"),
            meta: {
                title: "维修开单",
                showLink: true,
                parentPath: "/repair"
            },
        }
    ],
};

export default repairRouter;
