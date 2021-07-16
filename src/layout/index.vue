<template>
  <div :class="classes" class="app-wrapper">
    <!-- 顶部导航栏 -->
    <navbar v-show="!containerHiddenSideBar" />
    <!-- 侧边栏 -->
    <sidebar class="sidebar-container" v-if="!containerHiddenSideBar" />
    <div class="main-container" :style="{marginLeft:collapsed?'226px':'70px'}">
      <div :class="{ 'fixed-header': fixedHeader }">
        <!-- tabs标签页 -->
        <tag>
          <i
            :class="containerHiddenSideBar? 'iconfont team-iconhidden-main-container': 'iconfont team-iconshow-main-container'"
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
  watch,
  nextTick,
  watchEffect,
  onMounted,
  onBeforeMount,
  onBeforeUnmount
} from "vue";
import { useGlobalModel } from "/@/store/modules/globalModel";
import { useSettingStoreHook } from "/@/store/modules/settings";
import { useEventListener, useFullscreen } from "@vueuse/core";
import { toggleClass, removeClass } from "/@/utils/operate";
let hiddenMainContainer = "hidden-main-container";
import options from "/@/settings";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "layout",
  components: {
    Navbar,
    Sidebar,
    AppMain,
    setting,
    tag
  },
  setup() {
    const globalModel = useGlobalModel();

    const pureSetting = useSettingStoreHook();

    const router = useRouter();
    const route = useRoute();

    let containerHiddenSideBar = ref(options.hiddenSideBar);

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
      onFullScreen
    };
  }
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

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}

.hidden-main-container {
  margin-left: 0 !important;
}
</style>
