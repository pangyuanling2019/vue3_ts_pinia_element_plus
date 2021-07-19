<template>
  <div ref="containerDom" class="tags-view" v-if="!showTags">
    <el-scrollbar wrap-class="scrollbar-wrapper" class="scroll-container" view-class="scroll-view">
      <div
        v-for="(item, index) in dynamicTagList"
        :key="index"
        :ref="'dynamic' + index"
        :class="['scroll-item', $route.path === item.path   ? 'card-active' : '' ]"
        @contextmenu.prevent.native="openMenu(item, $event)"
      >
        <router-link :to="item.path">{{ item.meta.title }}</router-link>
        <i v-if="index !== 0" class="iconfont team-iconshanchu" @click="deleteMenu(item)"></i>
      </div>
    </el-scrollbar>
    <!-- 右键菜单按钮 -->
    <ul
      v-show="visible"
      :style="{ left: buttonLeft + 'px',top: buttonTop + 'px'}"
      class="contextmenu"
    >
      <div v-for="(item,key) in tagsViews" :key="key" style="display:flex; align-items: center;">
        <li v-if="item.show" @click="selectTag(item,key)">
          <span>
            <i :class="item.icon"></i>
          </span>
          {{item.text}}
        </li>
      </div>
    </ul>
    <!-- 右侧功能按钮 -->
    <ul class="right-button">
      <li>
        <i title="刷新路由" class="el-icon-refresh-right rotate" @click="onFresh"></i>
      </li>
      <li>
        <el-dropdown trigger="click" placement="bottom-end">
          <i class="el-icon-arrow-down"></i>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(item,key) in tagsViews"
                :key="key"
                :icon="item.icon"
                :divided="item.divided"
                :disabled="item.disabled"
                @click="onClickDrop(key, item)"
              >{{item.text}}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </li>
      <li>
        <slot></slot>
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { useDynamicRoutesHook } from "./tagsHook";
import { useRoute, useRouter } from "vue-router";
import {
  ref,
  watchEffect,
  watch,
  onBeforeMount,
  unref,
  nextTick,
  getCurrentInstance
} from "vue";
import { storageLocal } from "/@/utils/storage";
import { emitter } from "/@/utils/mitt";
import { toggleClass, removeClass, hasClass } from "/@/utils/operate";
import { templateRef } from "@vueuse/core";
import { homeRoute } from "./type";
let refreshButton = "refresh-button";

export default {
  setup() {
    let vm: any;
    const {
      deleteDynamicTag,
      dynamicRouteTags,
      dRoutes,
      routesLength
    } = useDynamicRoutesHook();
    const route = useRoute();
    const router = useRouter();
    const showTags = ref(storageLocal.getItem("tagsVal") || false);
    const containerDom = templateRef<HTMLElement | null>("containerDom", null);
    const activeIndex = ref(-1);
    const tagsViews = ref([
      {
        icon: "el-icon-refresh-right",
        text: "重新加载",
        divided: false,
        disabled: false,
        show: true
      },
      {
        icon: "el-icon-close",
        text: "关闭当前标签页",
        divided: false,
        disabled: unref(routesLength) > 1 ? false : true,
        show: true
      },
      {
        icon: "el-icon-more",
        text: "关闭其他标签页",
        divided: true,
        disabled: unref(routesLength) > 2 ? false : true,
        show: true
      },
      {
        icon: "el-icon-minus",
        text: "关闭全部标签页",
        divided: false,
        disabled: unref(routesLength) > 1 ? false : true,
        show: true
      }
    ]);

    // 显示模式，默认卡片模式显示
    const showModel = ref(storageLocal.getItem("showModel") || "card");
    if (!showModel) {
      storageLocal.setItem("showModel", "card");
    }

    let visible = ref(false);
    let buttonLeft = ref(0);
    let buttonTop = ref(0);

    // 当前右键选中的路由信息
    let currentSelect = ref({});

    function deleteMenu(item) {
      let tagslen = storageLocal.getItem("routesInStorage").length;
      if (tagslen === 2) {
        Array.from([1, 2, 3]).forEach(v => {
          tagsViews.value[v].disabled = true;
        });
      }
      if (tagslen === 3) {
        tagsViews.value[2].disabled = true;
      }
      deleteDynamicTag(item, route.path);
    }

    // 初始化页面刷新保证当前路由tabview存在
    let stop = watchEffect(() => {
      let parentPath = route.path.slice(0, route.path.lastIndexOf("/"));
      dynamicRouteTags(route.path, parentPath, route);
    });

    setTimeout(() => {
      // 监听只执行一次，但获取不到当前路由，需要下一个事件轮询中取消监听
      stop();
    });

    function onFresh() {
      toggleClass(true, refreshButton, document.querySelector(".rotate"));
      const { path, fullPath } = unref(route);
      console.log(fullPath);
      router.replace({
        path: "/redirect" + fullPath
      });
      setTimeout(() => {
        removeClass(document.querySelector(".rotate"), refreshButton);
      }, 600);
    }

    function onClickDrop(key, item, selectRoute) {
      if (item && item.disabled) return;
      // 当前路由信息
      switch (key) {
        case 0:
          // 重新加载
          onFresh();
          break;
        case 1:
          // 关闭当前标签页
          selectRoute
            ? deleteMenu({ path: selectRoute.path, meta: selectRoute.meta })
            : deleteMenu({ path: route.path, meta: route.meta });
          break;
        case 2:
          // 关闭其他标签页
          dRoutes.value = selectRoute
            ? [homeRoute, { path: selectRoute.path, meta: selectRoute.meta }]
            : [homeRoute, { path: route.path, meta: route.meta }];
          storageLocal.setItem("routesInStorage", dRoutes.value);
          tagsViews.value[2].disabled = true;
          if (selectRoute) router.push(selectRoute.path);
          break;
        case 3:
          // 关闭全部标签页
          dRoutes.value = [homeRoute];
          storageLocal.setItem("routesInStorage", dRoutes.value);
          router.push("/home");
          Array.from([1, 2, 3]).forEach(v => {
            tagsViews.value[v].disabled = true;
          });
          break;
      }
    }

    function selectTag(item, key) {
      onClickDrop(key, {}, currentSelect.value);
    }

    function openMenu(tag, e) {
      if (tag.path === "/home") {
        // 右键菜单为首页，只显示刷新
        Array.from([1, 2, 3]).forEach(v => {
          tagsViews.value[v].show = false;
        });
        tagsViews.value[0].show = true;
      } else if (route.path !== tag.path) {
        // 右键菜单匹配当前路由，显示刷新
        tagsViews.value[0].show = false;
        Array.from([1, 2, 3]).forEach(v => {
          tagsViews.value[v].show = true;
        });
      } else {
        Array.from([0, 1, 2, 3]).forEach(v => {
          tagsViews.value[v].show = true;
        });
      }
      // debugger;
      currentSelect.value = tag;
      const menuMinWidth = 105;
      const offsetLeft = unref(containerDom).getBoundingClientRect().left;
      const offsetWidth = unref(containerDom).offsetWidth;
      const maxLeft = offsetWidth - menuMinWidth;
      const left = e.clientX - offsetLeft;
      if (left > maxLeft) {
        buttonLeft.value = maxLeft;
      } else {
        buttonLeft.value = left;
      }
      buttonTop.value = e.clientY - 45;
      visible.value = true;
    }

    function closeMenu() {
      visible.value = false;
    }

    watch(
      () => visible.value,
      val => {
        if (val) {
          document.body.addEventListener("click", closeMenu);
        } else {
          document.body.removeEventListener("click", closeMenu);
        }
      }
    );

    onBeforeMount(() => {
      vm = getCurrentInstance();

      emitter.on("changLayoutRoute", indexPath => {
        let currentLen = storageLocal.getItem("routesInStorage").length;
        console.log(currentLen);
        if (currentLen === 1) {
          Array.from([1, 3]).forEach(v => {
            tagsViews.value[v].disabled = false;
          });
        }
        if (currentLen >= 2) {
          Array.from([1, 2, 3]).forEach(v => {
            tagsViews.value[v].disabled = false;
          });
        }
      });
    });

    return {
      dynamicTagList: useDynamicRoutesHook().dRoutes,
      deleteMenu,
      showTags,
      onFresh,
      tagsViews,
      onClickDrop,
      visible,
      buttonLeft,
      buttonTop,
      openMenu,
      closeMenu,
      selectTag,
      currentSelect,
      activeIndex,
      showModel
    };
  }
};
</script>

<style lang="scss" scoped>
.tags-view {
  width: 100%;
  font-size: 14px;
  display: flex;
  .scroll-item {
    position: relative;
    border-right: 1px solid #e5e5e5;
    padding: 0px 24px;
    display: inline-block;
    height: 100%;
    line-height: 34px;
    &:hover {
      background-color: #eaf4fe;
    }
  }
  a {
    text-decoration: none;
    color: #666;
    padding: 10px;
  }

  // 卡片模式
  .card-active::after {
    position: absolute;
    top: -1px;
    left: 0;
    content: " ";
    width: 100%;
    height: 2px;
    background-color: #218df1;
    border-radius: 2px;
  }
  .card-active::before {
    position: absolute;
    bottom: -1px;
    left: 0;
    content: " ";
    width: 100%;
    height: 1px;
    background-color: #fff;
  }

  .scroll-container {
    white-space: nowrap;
    position: relative;
    width: 100%;
    background: #fff;

    .scrollbar-wrapper {
      position: absolute;
      height: 40px;
      overflow-x: hidden !important;
    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}

.right-button {
  display: flex;
  align-items: center;
  background: #fff;
  font-size: 16px;
  li {
    width: 40px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    border: 1px solid #e5e5e5;
    border-left: none;
    cursor: pointer;
  }
}

.el-dropdown-menu {
  padding: 0;
}
.el-dropdown-menu__item:not(.is-disabled):hover {
  color: #606266;
  background: #f0f0f0;
}
.el-dropdown-menu__item,
.el-menu-item {
  padding: 0 14px;
  overflow: hidden;
}
:deep(.el-dropdown-menu__item) i {
  margin-right: 10px;
}

// 关闭图标
.team-iconshanchu {
  margin-left: 9px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 50%;
  color: #fff;
  background: #eb3941;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

// 刷新按钮动画效果
.refresh-button {
  -webkit-transition-property: -webkit-transform;
  -webkit-transition-duration: 600ms;
  -moz-transition-property: -moz-transform;
  -moz-transition-duration: 600ms;
  -webkit-animation: rotate 600ms linear infinite;
  -moz-animation: rotate 600ms linear infinite;
  -o-animation: rotate 600ms linear infinite;
  animation: rotate 600ms linear infinite;
}
@-webkit-keyframes rotate {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
@-moz-keyframes rotate {
  from {
    -moz-transform: rotate(0deg);
  }
  to {
    -moz-transform: rotate(360deg);
  }
}
@-o-keyframes rotate {
  from {
    -o-transform: rotate(0deg);
  }
  to {
    -o-transform: rotate(360deg);
  }
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
