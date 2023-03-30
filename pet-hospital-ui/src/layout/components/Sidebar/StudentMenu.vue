<template>
  <div class="studentBar">
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon> <span>医院科室导览</span></template
      >
      <el-menu-item index="/hospitalGuide/overview"
        ><template #title>
          <el-icon><guide /></el-icon> <span>3D 医院地图</span></template
        ></el-menu-item
      >
      <el-menu-item index="/hospitalGuide/panorama"
        ><template #title>
          <el-icon><place /></el-icon> <span>科室全景导览</span></template
        ></el-menu-item
      >
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><reading /></el-icon> <span>职能学习</span></template
      >
      <el-menu-item index="2-1"
        ><template #title>
          <el-icon><medal /></el-icon> <span>角色扮演模式</span></template
        ></el-menu-item
      >
      <el-menu-item index="2-2"
        ><template #title>
          <el-icon><document /></el-icon> <span>病例学习模式</span></template
        ></el-menu-item
      >
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <el-icon><tickets /></el-icon> <span>学习测试</span></template
      >
      <el-menu-item index="3-1"
        ><template #title>
          <el-icon><timer /></el-icon> <span>我的考试</span></template
        ></el-menu-item
      >
      <el-menu-item index="3-2"
        ><template #title>
          <el-icon><trophy /></el-icon> <span>我的成绩</span></template
        ></el-menu-item
      >
    </el-sub-menu>
  </div>
</template>
