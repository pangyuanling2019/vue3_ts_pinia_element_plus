<template>
  <div class="login">
    <div class="login-form">
      <div class="login-header">
        <img src="../../assets/logo-green.png" width="64" alt />
        <p>电商产品-云修管理系统</p>
      </div>
      <el-input
        placeholder="请输入用户名"
        suffix-icon="fa fa-user"
        v-model="loginState.userName"
        style="margin-bottom: 16px"
      ></el-input>

      <el-input
        placeholder="请输入密码"
        suffix-icon="fa fa-keyboard-o"
        v-model="loginState.password"
        type="password"
        style="margin-bottom: 32px"
      ></el-input>

      <el-button
        type="primary"
        :loading="loginLoading"
        style="width: 100%;margin-bottom: 18px"
        @click="doLogin"
      >登录</el-button>
    </div>
  </div>
  <!-- <div class="caseBlanche" v-if="loadingG">
            <div class="rond">
                <div class="test"></div>
            </div>
            <div class="load">
                <p>loading</p>
            </div>
  </div>-->
</template>

<script lang="ts">
import { reactive, onBeforeMount, defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { storageSession } from "/@/utils/storage";
import { warnMessage, successMessage } from "/@/utils/message";

export interface loginType {
  userName: string;
  password: string;
}

const loginFn = () => {
  return new Promise(async (res, ret) => {
    await setTimeout(() => {
      res(true);
    }, 1000);
  });
};

export default defineComponent({
  name: "login",
  setup() {
    const router = useRouter();
    const loginLoading = ref(false);
    const loginState: loginType = reactive({
      userName: "",
      password: ""
    });

    const doLogin = async () => {
      loginLoading.value = true;
      if (!loginState.userName) {
        warnMessage("请输入用户名");
        loginLoading.value = false;
        return;
      }
      if (!loginState.password) {
        warnMessage("请输入密码");
        loginLoading.value = false;
        return;
      }
      let result = await loginFn();
      if (result) {
        loginLoading.value = false;
        successMessage("登录成功");

        storageSession.setItem("info", {
          username: "admin",
          accessToken: "eyJhbGciOiJIUzUxMiJ9.test"
        });
        router.push("/");
        console.log(result);
      }
    };
    return {
      loginState,
      loginLoading,
      doLogin
    };
  }
});
</script>

<style lang="scss" scoped>
@import "login.scss";
</style>