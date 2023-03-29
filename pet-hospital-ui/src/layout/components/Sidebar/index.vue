<!-- 侧边菜单栏 -->

<template>
  <div class="sidebar" :style="{ backgroundColor: variables.menuBackground }">
    <logo :collapse="!isCollapse" />
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      :background-color="variables.menuBackground"
      :text-color="variables.menuColor"
      :unique-opened="isUnique"
      :default-openeds="openeds"
      :collapse="!isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <AdminMenu @getData="getData" v-if="role === 'admin'" />
      <StudentMenu @getData="getData" v-else-if="role === 'student'" />
      <TeacherMenu @getData="getData" v-else />
    </el-menu>
  </div>
</template>

<script setup>
import Logo from "./Logo";
import { appStore } from "@/store/app";
import variables from "@/assets/styles/variables.module.scss";
import { computed, reactive, ref } from "vue";
import AdminMenu from "./AdminMenu.vue";
import StudentMenu from "./StudentMenu.vue";
import TeacherMenu from "./TeacherMenu.vue";
import Cookies from "js-cookie";

const role = Cookies.get("role");

const myAppStore = appStore();
const sidebar = myAppStore.sidebar;

let isCollapse = computed(() => !sidebar.opened);

let isUnique = ref(false);
let openeds = reactive();
if (role === "student") {
  openeds = ["1", "2", "3"];
} else if (role === "teacher") {
  openeds = ["1"];
} else {
  isUnique.value = true;
}
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}
</style>
