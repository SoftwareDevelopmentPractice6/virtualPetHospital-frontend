<!-- 病例学习：病名列表 -->

<template>
  <div class="allvideo-wrapper">
    <!-- 上方 fixed bar -->
    <div class="top-wrapper">
      <div class="top-container">
        <div class="disease-name">
          {{ diseaseCategory }} &gt; {{ diseaseName }} &gt; 全部视频
        </div>
      </div>
    </div>
    <div class="video-wrapper">
      <div class="video-container"></div>
    </div>
  </div>
</template>

<script setup>
import { caseStore } from "@/store/case";
import { ref } from "vue";

// 获取疾病 id, name, category
const store = caseStore();
let diseaseId = store.diseaseId ? ref(store.diseaseId) : ref(""),
  diseaseName = store.diseaseName ? ref(store.diseaseName) : ref(""),
  diseaseCategory = store.diseaseCategory
    ? ref(store.diseaseCategory)
    : ref("");

// 防止 pinia 中的 id, name, category 由于刷新而丢失
if (!diseaseId.value || !diseaseName.value || !diseaseCategory.value) {
  console.log("已丢失");
  // 使用 sessionStorage 中的值
  diseaseId.value = sessionStorage.getItem("diseaseId");
  diseaseName.value = sessionStorage.getItem("diseaseName");
  diseaseCategory.value = sessionStorage.getItem("diseaseCategory");
}
</script>

<style lang="scss" scoped>
.allvideo-wrapper {
  .top-wrapper {
    height: 43px;
    .top-container {
      position: fixed;
      z-index: 10;
      width: 88.5%;
      height: 43px;
      padding: 8px 18px;
      background-color: rgb(87, 115, 148);
      border: 2px solid #000;
      border-left: none;
      border-right: none;
      color: #fffaf1;
      .disease-name {
        font-size: 16px;
      }
      .disease-name:hover {
        color: rgb(255, 203, 107);
      }
    }
  }
}
</style>
