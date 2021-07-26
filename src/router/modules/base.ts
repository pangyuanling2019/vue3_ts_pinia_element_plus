import Layout from "/@/layout/index.vue";

const baseRouter = {
    path: "/base",
    name: "base",
    component: Layout,
    redirect: "/base/material",
    meta: {
        icon: "icon-jichushuju",
        title: "基础",
        showLink: true,
        rank: 8,
    },
    children: [
        {
            path: "/base/material",
            name: "material",
            component: () => import("/@/views/base/material/index.vue"),
            meta: {
                title: "配件档案",
                showLink: true,
                parentPath: "/base"
            },
        },
        {
            path: "/base/customer",
            name: "customer",
            component: () => import("/@/views/base/customer/index.vue"),
            meta: {
                title: "客户档案",
                showLink: true,
                parentPath: "/base"
            },
        },
        {
            path: "/base/supplier",
            name: "supplier",
            component: () => import("/@/views/base/supplier/index.vue"),
            meta: {
                title: "供应商档案",
                showLink: true,
                parentPath: "/base"
            },
        },
        {
            path: "/base/warehouse",
            name: "warehouse",
            component: () => import("/@/views/base/warehouse/index.vue"),
            meta: {
                title: "仓库设置",
                showLink: true,
                parentPath: "/base"
            },
        },
        {
            path: "/base/project",
            name: "project",
            component: () => import("/@/views/base/project/index.vue"),
            meta: {
                title: "维修项目档案",
                showLink: true,
                parentPath: "/base"
            },
        },
    ],
};

export default baseRouter;
