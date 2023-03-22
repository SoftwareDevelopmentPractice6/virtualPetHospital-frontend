<!-- 管理系统框架结构 -->

<template>
  <div class="app-wrapper">
    <!-- 左侧菜单栏 -->
    <sidebar />
    <!-- 右侧容器 -->
    <div class="main-container">
      <!-- 上方操作栏 -->
      <navbar />
      <!-- 内容区 -->
      <AppMain />
    </div>
  </div>
</template>

<script setup>
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar.vue";
import AppMain from "./components/AppMain.vue";
</script>

<style lang="scss" scoped>
.app-wrapper {
  display: flex;
  height: 100%;
  .main-container {
    height: 100%;
    flex: 1;
  }
}
</style>
