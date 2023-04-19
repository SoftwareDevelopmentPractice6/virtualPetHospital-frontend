<!-- 管理员侧边菜单 -->

<template>
  <div class="adminBar">
    <el-sub-menu index="1">
      <template #title>
        <el-icon><user /></el-icon> <span>用户管理</span></template
      >
      <el-menu-item index="1-1"
        ><template #title>
          <el-icon><reading /></el-icon> <span>学生管理</span></template
        ></el-menu-item
      >
      <el-menu-item index="1-2"
        ><template #title>
          <el-icon><service /></el-icon> <span>老师管理</span></template
        ></el-menu-item
      >
      <el-menu-item index="1-3"
        ><template #title>
          <el-icon><DataBoard /></el-icon> <span>管理员管理</span></template
        ></el-menu-item
      >
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><notebook /></el-icon> <span>测试管理</span></template
      >
      <el-menu-item index="2-1">
        <template #title>
          <el-icon><collection /></el-icon> <span>题库管理</span></template
        ></el-menu-item
      >
      <el-menu-item index="2-2">
        <template #title>
          <el-icon><timer /></el-icon> <span>考试管理</span></template
        ></el-menu-item
      >
      <el-menu-item index="2-3"
        ><template #title>
          <el-icon><document /></el-icon> <span>试卷管理</span></template
        ></el-menu-item
      >
    </el-sub-menu>
    <el-menu-item index="/cases/list">
      <template #title>
        <el-icon><FirstAidKit /></el-icon> <span>病例管理</span></template
      >
    </el-menu-item>
    <el-sub-menu index="system">
      <template #title>
        <el-icon><setting /></el-icon>
        <span>基本功能管理</span></template
      >
      <el-menu-item index="/medicine/list"
        ><template #title>
          <el-icon><box /></el-icon> <span>药品管理</span></template
        ></el-menu-item
      >
      <el-menu-item index="/hospitalized/list"
        ><template #title>
          <el-icon><OfficeBuilding /></el-icon> <span>住院管理</span></template
        ></el-menu-item
      >
      <el-menu-item index="/charge/list"
        ><template #title>
          <el-icon><money /></el-icon> <span>收费管理</span></template
        ></el-menu-item
      >
      <el-menu-item index="/archive/list"
        ><template #title>
          <el-icon><tickets /></el-icon> <span>档案管理</span></template
        ></el-menu-item
      >
      <el-menu-item index="/laboratory/list"
        ><template #title>
          <el-icon><setUp /></el-icon> <span>化验项目管理</span></template
        ></el-menu-item
      >
    </el-sub-menu>
  </div>
</template>
