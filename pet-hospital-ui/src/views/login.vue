<!-- 登录页 -->

<template>
  <div class="login">
    <el-form
      ref="loginFormRef"
      :model="loginData.loginForm"
      :rules="loginData.loginRules"
      class="login-form"
    >
      <h3 class="title">虚拟宠物医院学习系统</h3>
      <el-form-item prop="username">
        <el-input
          v-model="loginData.loginForm.username"
          type="text"
          auto-complete="off"
          placeholder="账号"
          prefix-icon="User"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <!-- 回车触发 handleLogin -->
        <el-input
          v-model="loginData.loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          prefix-icon="Lock"
          @keyup.enter="handleLogin"
        >
        </el-input>
      </el-form-item>
      <el-checkbox
        v-model="loginData.loginForm.rememberMe"
        style="margin-bottom: 20px"
        >记住密码</el-checkbox
      >
      <el-form-item style="width: 100%">
        <!-- 阻止默认事件，触发 handleLogin -->
        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%"
          @click.prevent="handleLogin(loginFormRef)"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import { userStore } from "@/store/user";
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/jsencrypt";

const loginFormRef = ref();

let loginData = reactive({
  loginForm: {
    username: "admin",
    password: "123",
    rememberMe: false, // 是否记住我
  },
  loginRules: {
    username: [
      {
        required: true,
        trigger: "blur",
        message: "请输入您的账号",
      },
    ],
    password: [
      {
        required: true,
        trigger: "blur",
        message: "请输入您的密码",
      },
    ],
  },
  redirect: undefined,
});
let loading = ref(false); // 是否为登录加载中

// 获取 cookie
const getCookie = () => {
  const username = Cookies.get("username");
  const password = Cookies.get("password");
  const rememberMe = Cookies.get("rememberMe");
  const loginForm = loginData.loginForm;
  // 初始化 loginForm
  loginData.loginForm = {
    username: username === undefined ? loginForm.username : username,
    password: password === undefined ? loginForm.password : decrypt(password),
    rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
  };
};
getCookie();

// 登录页可从多入口进去，并更新最新数据
// 所以无需关闭页面，直接用代码监听路由
const route = useRoute();
watch(
  route,
  (route) => {
    loginData.redirect = route.query && route.query.redirect;
  },
  { immediate: true }
);

// 处理登录
const handleLogin = (loginFormRef) => {
  // 登录校验
  loginFormRef.validate((valid) => {
    if (valid) {
      // 登录加载中
      loading.value = true;
      const loginForm = loginData.loginForm;
      // 已选择记住我，将登录信息存入 Cookies（有效期为 30 天）
      if (loginForm.rememberMe) {
        Cookies.set("username", loginForm.username, {
          expires: 30,
        });
        // 执行加密操作
        Cookies.set("password", encrypt(loginForm.password), {
          expires: 30,
        });
        Cookies.set("rememberMe", loginForm.rememberMe, {
          expires: 30,
        });
      }
      // 未选择记住我，移除 Cookies 中的登录信息
      else {
        Cookies.remove("username");
        Cookies.remove("password");
        Cookies.remove("rememberMe");
      }
      const store = userStore();
      store
        // 存储登录信息
        .Login(loginForm)
        .then(() => {
          console.log("login成功");
          // 更改路由
          router.push({ path: loginData.redirect || "/" }).catch(() => {});
        })
        .catch(() => {
          console.log("login发生错误");
          // 发生错误
          loading = false;
        });
    }
  });
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/login-background.jpeg");
  background-size: cover;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}
.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 30px 5px 30px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .el-input__prefix {
    margin: auto 5px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  svg {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 38px;
}
</style>
