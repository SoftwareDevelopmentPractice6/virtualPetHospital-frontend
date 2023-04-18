<template>
  <div class="container">
    <!-- 禁止点击遮罩层 -->
    <div class="clickShade" v-show="clickShadeSign"></div>
    <!-- loading -->
    <loading-triangle></loading-triangle>

    <!-- 地图容器 -->
    <div id="map-container"></div>
  </div>
</template>

<script setup>
import { default as mapApp } from "@/map/init";
// loading 页面
import LoadingTriangle from "@/components/LoadingTriangle.vue";
import { ref, onMounted } from "vue";

let clickShadeSign = ref(true);

onMounted(() => {
  // 初始化地图
  mapApp.initMap();
  window.mapApp = mapApp; // 测试环境中开发此对象方便调试，生产环境可以注释

  mapApp.clickShadeSign = clickShadeSign;
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;

  .clickShade {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
    cursor: wait;
  }

  #map-container {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
</style>
