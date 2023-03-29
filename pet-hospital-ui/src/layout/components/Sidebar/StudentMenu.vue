<template>
  <div class="studentBar">
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon> <span>医院科室导览</span></template
      >
      <el-menu-item index="1-1">3D 医院地图</el-menu-item>
      <el-menu-item index="1-2">全景科室导览</el-menu-item>
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
  </div>
</template>
