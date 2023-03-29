<template>
  <div class="navbar">
    <hamburger class="hamburger-container" @toggleClick="toggleSideBar" />

    <div class="right-menu">
      <HospitalGit class="right-menu-item hover-effect" />
      <screenfull class="right-menu-item hover-effect" />

      <el-dropdown
        class="username-wrapper right-menu-item hover-effect"
        trigger="click"
      >
        <div class="username-container">
          {{ username }}
          <i class="el-icon-caret-bottom" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import Hamburger from "@/components/Hamburger.vue";
import HospitalGit from "@/components/HospitalGit.vue";
import Screenfull from "@/components/Screenfull.vue";
import { appStore } from "@/store/app";
import { userStore } from "@/store/user";
import { ElMessageBox } from "element-plus";
import { ref } from "vue-demi";

let store = userStore();
const username = ref(store.$state.name);

const myAppStore = appStore();
let toggleSideBar = () => {
  myAppStore.toggleSideBar();
};

const myUserStore = userStore();
const logout = async () => {
  ElMessageBox.confirm("确定注销并退出系统吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      myUserStore.LogOut();
      location.href = "/login";
    })
    .catch(() => {});
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .topmenu-container {
    position: absolute;
    left: 50px;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 10px;
      height: 100%;
      font-size: 20px;
      color: #5a5e66;
      vertical-align: middle;
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;
        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
    .username-wrapper {
      margin: 0 35px 10px 5px;
      .username-container {
        font-size: 17px;
        margin-top: 16px;
        color: var(--el-color-primary-dark-2);
        text-decoration: underline;
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }

        .el-icon-caret-bottom::before {
          position: relative;
          top: 9px;
          right: 10px;
          content: "";
          width: 0;
          height: 0;
          border-top: 4px solid #000;
          border-right: 4px solid transparent;
          border-left: 4px solid transparent;
        }
      }
    }
  }
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
