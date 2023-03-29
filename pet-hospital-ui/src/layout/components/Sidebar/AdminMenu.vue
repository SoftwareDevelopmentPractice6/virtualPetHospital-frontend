<template>
  <div class="adminBar">
    <el-sub-menu index="1">
      <template #title>
        <el-icon><notebook /></el-icon> <span>测试管理</span></template
      >
      <el-menu-item index="1-1">题库管理</el-menu-item>
      <el-menu-item index="1-2">考试管理</el-menu-item>
      <el-menu-item index="1-3">试卷管理</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><user /></el-icon> <span>用户管理</span></template
      >
      <el-menu-item index="2-1">学生管理</el-menu-item>
      <el-menu-item index="2-2">老师管理</el-menu-item>
      <el-menu-item index="2-3">管理员管理</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <el-icon><FirstAidKit /></el-icon> <span>病例管理</span></template
      >
      <el-menu-item index="3-1">学生管理</el-menu-item>
      <el-menu-item index="3-2">老师管理</el-menu-item>
      <el-menu-item index="3-3">管理员管理</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>
        <el-icon><setting /></el-icon>
        <span>基本功能管理</span></template
      >
      <el-menu-item index="4-1">药品管理</el-menu-item>
      <el-menu-item index="4-3">住院管理</el-menu-item>
      <el-menu-item index="4-3">收费管理</el-menu-item>
      <el-menu-item index="4-2">档案管理</el-menu-item>
      <el-menu-item index="4-3">化验项目管理</el-menu-item>
    </el-sub-menu>
  </div>
</template>
