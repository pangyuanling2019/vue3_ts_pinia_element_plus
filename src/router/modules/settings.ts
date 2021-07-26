import Layout from "/@/layout/index.vue";

const settingsRouter = {
    path: "/settings",
    name: "settings",
    component: Layout,
    redirect: "/settings/role",
    meta: {
        icon: "icon-shezhi",
        title: "设置",
        showLink: true,
        rank: 9,
    },
    children: [
        {
            path: "/settings/role",
            name: "role",
            component: () => import("/@/views/settings/role/index.vue"),
            meta: {
                title: "角色设置",
                showLink: true,
                parentPath: "/settings"
            },
        },
        {
            path: "/settings/user",
            name: "user",
            component: () => import("/@/views/settings/user/index.vue"),
            meta: {
                title: "用户设置",
                showLink: true,
                parentPath: "/settings"
            },
        },
        {
            path: "/settings/system",
            name: "system",
            component: () => import("/@/views/settings/system/index.vue"),
            meta: {
                title: "系统设置",
                showLink: true,
                parentPath: "/settings"
            },
        },
    ],
};

export default settingsRouter;
