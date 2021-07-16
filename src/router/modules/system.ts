import Layout from "/@/layout/index.vue";

const systemRouter = {
    path: "/system",
    name: "system",
    component: Layout,
    redirect: "/system/user",
    meta: {
        icon: "el-icon-setting",
        title: "系统管理",
        showLink: true,
        rank: 6,
    },
    children: [
        {
            path: "/system/user",
            name: "user",
            component: () => import("/@/views/system/user/index.vue"),
            meta: {
                title: "基础信息",
                showLink: true,
                parentPath: "/system"
            },
        },
        {
            path: "/system/dict",
            name: "dict",
            component: () => import("/@/views/system/dict/index.vue"),
            meta: {
                title: "字典管理",
                showLink: true,
                parentPath: "/system"
            },
        },
    ],
};

export default systemRouter;
