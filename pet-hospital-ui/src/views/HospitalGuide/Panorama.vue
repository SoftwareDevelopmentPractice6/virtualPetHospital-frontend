<!-- 科室全景导览 -->

<template>
  <div class="panorama-wrapper" v-loading="loading">
    <iframe
      ref="Iframe"
      :src="vue2PageUrl"
      scrolling="no"
      width="100%"
      height="100%"
    ></iframe>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

let Iframe = ref();
let vue2PageUrl = ref("http://localhost:9527");
let loading = ref(false);

const iframeLoad = () => {
  loading.value = true;
  const iframe = Iframe.value;
  if (iframe.attachEvent) {
    // IE
    iframe.attachEvent("onload", () => {
      loading.value = false;
    });
  } else {
    // 非 IE
    iframe.onload = () => {
      loading.value = false;
    };
  }
};

onMounted(() => {
  iframeLoad();
});
</script>

<style lang="scss" scoped>
.panorama-wrapper {
  height: calc(100vh - 50px);
  background-color: antiquewhite;
}
</style>
