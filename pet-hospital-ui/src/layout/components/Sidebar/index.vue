<!-- 侧边菜单栏 -->

<template>
  <div class="sidebar" :style="{ backgroundColor: variables.menuBackground }">
    <logo :collapse="!isCollapse" />
    <el-menu
      default-active="/index"
      class="el-menu-vertical-demo"
      :background-color="variables.menuBackground"
      :text-color="variables.menuColor"
      :unique-opened="isUnique"
      :default-openeds="openeds"
      :collapse="!isCollapse"
      router
      @selsect="handleSelect"
    >
      <el-menu-item index="/index">
        <template #title>
          <el-icon><homeFilled /></el-icon> <span>系统首页</span></template
        ></el-menu-item
      >
      <AdminMenu @getData="getData" v-if="role === 'admin' && isCollapse" />
      <StudentMenu
        @getData="getData"
        v-else-if="role === 'student' && isCollapse"
      />
      <TeacherMenu @getData="getData" v-else-if="isCollapse" />
    </el-menu>
  </div>
</template>

<script setup>
import Logo from "./Logo";
import { appStore } from "@/store/app";
import { computed, reactive, ref } from "vue";
import AdminMenu from "./AdminMenu.vue";
import StudentMenu from "./StudentMenu.vue";
import TeacherMenu from "./TeacherMenu.vue";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";

const variables = reactive({
  menuColor: "#bfcbd9",
  menuBackground: "#304156",
});

const role = Cookies.get("role");

const myAppStore = appStore();
const sidebar = myAppStore.sidebar;
let isCollapse = computed(() => !sidebar.opened); // 侧边栏是否展开

let isUnique = ref(false); // 是否只能展开一个子目录
let openeds = reactive(); // 默认展开的子目录 index
if (role === "student") {
  openeds = ["1", "2", "3"];
} else if (role === "teacher") {
  openeds = ["1"];
} else {
  isUnique.value = true;
}

let router = useRouter();
// 选中菜单项, 跳转至对应路由
const handleSelect = (key) => {
  router.push({
    path: key,
  });
};
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}
</style>
