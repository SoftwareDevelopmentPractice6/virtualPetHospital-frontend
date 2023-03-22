<template>
  <div
    class="sidebar has-logo"
    :style="{ backgroundColor: variables.menuBackground }"
  >
    <logo :collapse="!isCollapse" />
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :background-color="variables.menuBackground"
      :text-color="variables.menuColor"
      :collapse="!isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon> <span>医院导览</span></template
        >
        <el-menu-item index="1-1">3D 医院地图</el-menu-item>
        <el-menu-item index="1-2">3D 科室导览</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><reading /></el-icon> <span>职能学习</span></template
        >
        <el-menu-item index="2-1">角色扮演模式</el-menu-item>
        <el-menu-item index="2-2">病例学习模式</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <el-icon><tickets /></el-icon> <span>学习测试</span></template
        >
        <el-menu-item index="3-1">我的考试</el-menu-item>
        <el-menu-item index="3-2">我的成绩</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="4">
        <template #title>
          <el-icon><notebook /></el-icon> <span>测试管理</span></template
        >
        <el-menu-item index="4-1">题库管理</el-menu-item>
        <el-menu-item index="4-2">考试管理</el-menu-item>
        <el-menu-item index="4-3">试卷管理</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="5">
        <template #title>
          <el-icon><user /></el-icon> <span>用户管理</span></template
        >
        <el-menu-item index="5-1">学生管理</el-menu-item>
        <el-menu-item index="5-2">老师管理</el-menu-item>
        <el-menu-item index="5-3">管理员管理</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="6">
        <template #title>
          <el-icon><FirstAidKit /></el-icon> <span>病例管理</span></template
        >
        <el-menu-item index="6-1">学生管理</el-menu-item>
        <el-menu-item index="6-2">老师管理</el-menu-item>
        <el-menu-item index="6-3">管理员管理</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="7">
        <template #title>
          <el-icon><setting /></el-icon>
          <span>基本功能管理</span></template
        >
        <el-menu-item index="7-1">药品管理</el-menu-item>
        <el-menu-item index="7-3">住院管理</el-menu-item>
        <el-menu-item index="7-3">收费管理</el-menu-item>
        <el-menu-item index="7-2">档案管理</el-menu-item>
        <el-menu-item index="7-3">化验项目管理</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup>
import Logo from "./Logo";
import { appStore } from "@/store/app";
import variables from "@/assets/styles/variables.module.scss";
import { computed } from "vue";

console.log("variables", variables.menuBackground);

const store = appStore();
const sidebar = store.sidebar;

let isCollapse = computed(() => !sidebar.opened);

let handleOpen = (key, keyPath) => {
  console.log("open", key, keyPath);
};

let handleClose = (key, keyPath) => {
  console.log("close", key, keyPath);
};
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}

.el-menu--collapse {
  width: 65px !important;
}

.el-menu-vertical-demo:not(.el-menu--collase) {
  width: 200px;
  min-height: 400px;
}
</style>
