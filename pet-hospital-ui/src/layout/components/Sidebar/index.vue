<!-- 侧边菜单栏 -->

<template>
  <div class="sidebar" :style="{ backgroundColor: variables.menuBackground }">
    <logo :collapse="!isCollapse" />
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      :background-color="variables.menuBackground"
      :text-color="variables.menuColor"
      :collapse="!isCollapse"
      unique-opened="true"
      @open="handleOpen"
      @close="handleClose"
    >
      <AdminMenu v-if="role === 'admin'" />
      <StudentMenu v-else-if="role === 'student'" />
      <TeacherMenu v-else />
    </el-menu>
  </div>
</template>

<script setup>
import Logo from "./Logo";
import { appStore } from "@/store/app";
import { userStore } from "@/store/user";
import variables from "@/assets/styles/variables.module.scss";
import { computed, ref } from "vue";
import AdminMenu from "./AdminMenu.vue";
import StudentMenu from "./StudentMenu.vue";
import TeacherMenu from "./TeacherMenu.vue";

const myUserStore = userStore();
const role = ref(myUserStore.$state.role);

const myAppStore = appStore();
const sidebar = myAppStore.sidebar;

let isCollapse = computed(() => !sidebar.opened);

// let handleOpen = (key, keyPath) => {
//   console.log("open", key, keyPath);
// };

// let handleClose = (key, keyPath) => {
//   console.log("close", key, keyPath);
// };
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}
</style>
