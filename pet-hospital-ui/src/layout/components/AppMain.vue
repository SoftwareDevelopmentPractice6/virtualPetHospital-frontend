<!-- 页面的主要内容部分 -->

<template>
  <section class="app-main">
    <!-- 过渡动画效果 -->
    <transition name="fade-transform" mode="out-in">
      <!-- 当路由 path 与访问地址相一致时 -->
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

let route = useRoute();
let key = computed(() => {
  return route.path;
});
</script>

<style lang="scss" scoped>
.app-main {
  /* navbar = 50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* navbar + tags-view = 84 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>
