<template>
    <div class="app-wrapper">
        <!-- 顶部导航栏 -->
        <navbar v-show="!containerHiddenSideBar" />
        <!-- 侧边栏 -->
        <sidebar class="sidebar-container" v-if="!containerHiddenSideBar" />
        <div
            class="main-container"
            :style="{ marginLeft: collapsed ? '226px' : '70px' }"
        >
            <div>
                <!-- tabs标签页 -->
                <tag>
                    <i
                        :class="
                            containerHiddenSideBar
                                ? 'iconfont icon-team-iconshow-main-container'
                                : 'iconfont icon-team-iconhidden-main-container'
                        "
                        @click="onFullScreen"
                    ></i>
                </tag>
            </div>
            <!-- 主体内容 -->
            <app-main />
        </div>
        <!-- 系统设置 -->
        <setting />
    </div>
</template>

<script lang="ts">
import { Navbar, Sidebar, AppMain, setting, tag } from "./components";
import {
    ref,
    unref,
    reactive,
    computed,
    toRefs,
    onMounted,
} from "vue";
import { useGlobalModel } from "/@/store/globalModel";
import { toggleClass, removeClass } from "/@/utils/operate";
let hiddenMainContainer = "hidden-main-container";
import { useRouter, useRoute } from "vue-router";

export default {
    name: "layout",
    components: {
        Navbar,
        Sidebar,
        AppMain,
        setting,
        tag,
    },
    setup() {
        const globalModel = useGlobalModel();
        const router = useRouter();
        const route = useRoute();

        let containerHiddenSideBar = ref(false);

        function onFullScreen() {
            if (unref(containerHiddenSideBar)) {
                containerHiddenSideBar.value = false;
                toggleClass(
                    false,
                    hiddenMainContainer,
                    document.querySelector(".main-container")
                );
            } else {
                containerHiddenSideBar.value = true;
                toggleClass(
                    true,
                    hiddenMainContainer,
                    document.querySelector(".main-container")
                );
            }
        }

        onMounted(() => {
            toggleClass(
                unref(containerHiddenSideBar),
                hiddenMainContainer,
                document.querySelector(".main-container")
            );
        });

        return {
            collapsed: computed(() => globalModel.collapsed),
            containerHiddenSideBar,
            onFullScreen,
        };
    },
};
</script>

<style lang="scss" scoped>
@mixin clearfix {
    &:after {
        content: "";
        display: table;
        clear: both;
    }
}
$sideBarWidth: 210px;

.app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar {
        position: fixed;
        top: 0;
    }
}
.drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
}

.hidden-main-container {
    margin-left: 0 !important;
}
</style>
