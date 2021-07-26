<template>
    <div :style="{ width: collapsed ? '226px' : '70px' }">
        <div class="fixed-menu">
            <el-scrollbar wrap-class="scrollbar-fixed-wrapper">
                <div
                    v-for="route in routeStore"
                    :key="route.path"
                    :class="[
                        route.path === menuActive
                            ? 'fixed-menu-item fixed-menu-item-active'
                            : 'fixed-menu-item',
                    ]"
                    @click="handleSelectMenu(route)"
                >
                    <i :class="['iconfont', route.meta.icon]"></i>
                    <span class="fixed-menu-item-name">{{
                        route.meta.title
                    }}</span>
                </div>
            </el-scrollbar>
        </div>

        <div class="fixed-subMenu">
            <el-scrollbar wrap-class="scrollbar-wrapper">
                <div
                    v-for="item in subMenuChild"
                    :key="item.path"
                    :class="[
                        item.path === activeSubMenu
                            ? 'fixed-subMenu-item fixed-subMenu-item-active'
                            : 'fixed-subMenu-item',
                    ]"
                    @click="handleSelectSubMenu(item)"
                >
                    <span>{{ item.meta.title }}</span>
                </div>
            </el-scrollbar>
        </div>
    </div>
</template>

<script lang="ts">
import {
    computed,
    defineComponent,
    ref,
    reactive,
    onBeforeMount,
    watch,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDynamicRoutesHook } from "./tag/tagsHook";
import { constantRoutesArr } from "/@/router/index";
import { useGlobalModel } from "/@/store/globalModel";
import { toRefs } from "@vueuse/core";

export default defineComponent({
    name: "sidebar",
    setup() {
        const router = useRouter();
        const route = useRoute();
        const globalModel = useGlobalModel();
        //动态修改tags
        const { dynamicRouteTags } = useDynamicRoutesHook();

        //过滤掉不需要显示的route
        const routeStore = computed<any[]>(() =>
            constantRoutesArr.filter((item) => item.meta.showLink)
        );
        console.log(routeStore);
        //默认选中首页
        const menuActive = ref<string>("/home");

        //记录选中的子路由
        const subMenuRoute = reactive({
            subMenuChild: [],
        });

        const toggleMenu = (bool: boolean) => {
            globalModel.toggleMenu(bool);
        };

        /**
         *menu事件, 有子路由展示子路由， 没有跳转路由
         *1.没有子路由关闭子路由弹框  2.点击同一个 切换子路由弹框
         */
        const handleSelectMenu = (route) => {
            if (route.children && route.children.length > 0) {
                toggleMenu(
                    menuActive.value === route.path
                        ? !globalModel.getCollapsed
                        : true
                );
                subMenuRoute.subMenuChild = route.children.filter(
                    (item) => item.meta.showLink
                );
            } else {
                router.push({
                    path: route.redirect ?? route.path,
                });
                dynamicRouteTags(
                    route.redirect ?? route.path,
                    route.meta.parentPath,
                    route
                );
                toggleMenu(false);
            }
            menuActive.value = route.path;
        };

        //subMenu事件，子路由跳转
        const handleSelectSubMenu = (item) => {
            router.push({
                path: item.path,
            });
            dynamicRouteTags(item.path, item.meta.parentPath, item);
        };

        //计算路由变化， 回显选中的二级菜单
        const activeSubMenu = computed(() => {
            const { meta, path } = route;
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return path;
        });

        //监听路由变化，回显选中的一级menu， 在弹框展开的情况下回显子路由
        watch(
            () => route.meta,
            (routeMeta, prevRouteMeta) => {
                if (routeMeta.parentPath) {
                    if (globalModel.collapsed) {
                        let findRouteChild = routeStore.value.find(
                            (item) => item.path === routeMeta.parentPath
                        );
                        subMenuRoute.subMenuChild = findRouteChild
                            ? findRouteChild.children.filter(
                                  (item) => item.meta.showLink
                              )
                            : [];
                    }
                    menuActive.value = routeMeta.parentPath as string;
                }
            }
        );

        //页面刷新 拿route  回显
        onBeforeMount(() => {
            menuActive.value = route.meta.parentPath as string;
        });

        return {
            ...toRefs(subMenuRoute),
            collapsed: computed(() => globalModel.getCollapsed),
            routeStore,
            activeSubMenu,
            toggleMenu,
            menuActive,
            handleSelectMenu,
            handleSelectSubMenu,
        };
    },
});
</script>