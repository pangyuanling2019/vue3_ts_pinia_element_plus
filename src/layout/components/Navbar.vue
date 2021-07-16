<template>
  <div class="navbar">
    <div class="logo-container">
      <div class="logo">
        <img src="../../assets/logo-green.png" alt="logo" />
      </div>
      <div class="desc">
        <span>云修维保数据管理平台</span>
        <span>Yunxiu wei bao shu ju guan li ping tai</span>
      </div>
    </div>

    <div class="right-menu">
      <!-- 全屏 -->
      <!-- <screenfull v-show="!deviceDetection()" /> -->
      <i class="el-icon-setting hsset" title="系统设置" @click="onPanel"></i>
      <i class="el-icon-setting hsset" title="系统设置" @click="onPanel"></i>
      <i class="el-icon-setting hsset" title="系统设置" @click="onPanel"></i>
      <i class="el-icon-setting hsset" title="系统设置" @click="onPanel"></i>
      <!-- 退出登陆 -->
      <!-- <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img :src="favicon" />
          <p>{{ usename }}</p>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="el-icon-switch-button" @click="logout">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>-->
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, unref, watch } from "vue";
import screenfull from "../components/screenfull/index.vue";
import { useRouter, useRoute } from "vue-router";
import { mapGetters } from "pinia";
import { storageSession } from "/@/utils/storage";
import favicon from "/favicon.ico";
import { emitter } from "/@/utils/mitt";
import { deviceDetection } from "/@/utils/deviceDetection";

export default defineComponent({
  name: "Navbar",
  components: {
    screenfull
  },
  setup() {
    let langs = ref(true);

    const router = useRouter();
    const route = useRoute();

    let usename = storageSession.getItem("info").username;

    // 退出登录
    const logout = (): void => {
      storageSession.removeItem("info");
      router.push("/login");
    };

    function onPanel() {
      emitter.emit("openPanel");
    }

    onMounted(() => {
      document
        .querySelector(".el-dropdown__popper")
        ?.setAttribute("class", "resetTop");
      document
        .querySelector(".el-popper__arrow")
        ?.setAttribute("class", "hidden");
    });

    return {
      langs,
      usename,
      logout,
      favicon,
      onPanel,
      deviceDetection
    };
  }
});
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 64px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0px 2px 1px 0px rgba(33, 34, 34, 0.08);

  .logo-container {
    height: 100%;
    float: left;
    margin-left: 22px;
    display: flex;
    .logo {
      display: flex;
      align-items: center;
      width: 49px;
      img {
        width: 100%;
      }
    }
    .desc {
      line-height: 64px;
      margin-left: 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      span {
        line-height: 1;
      }
      & span:first-child {
        font-size: 18px;
        font-weight: bold;
        margin: 6px 0px;
        background: linear-gradient(0deg, #1f89f1 0%, #3bb5f7 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      & span:last-child {
        font-size: 14px;
        font-weight: bold;
        color: #7d7d7d;
      }
    }
  }

  .right-menu {
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
    height: 64px;
    line-height: 64px;
    margin-right: 27px;
    .hsset {
      width: 40px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-right: 20px;
      font-size: 36px;
      &:hover {
        cursor: pointer;
        background: #f0f0f0;
      }
    }

    .el-dropdown-link {
      width: 70px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-right: 10px;
      cursor: pointer;
      p {
        font-size: 14px;
      }
      img {
        width: 22px;
        height: 22px;
      }
    }
  }
}
// single element-plus reset
.el-dropdown-menu__item {
  padding: 0 10px;
}
.el-dropdown-menu {
  padding: 0;
}
.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  color: #606266;
  background: #f0f0f0;
}
</style>
