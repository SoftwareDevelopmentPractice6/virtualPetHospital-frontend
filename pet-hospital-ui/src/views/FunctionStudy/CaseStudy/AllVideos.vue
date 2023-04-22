<!-- 病例学习：全部视频 -->

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

    <!-- 视频列表 -->
    <div class="content-wrapper">
      <div class="video-wrapper">
        <div
          class="video-container"
          v-for="(item, index) in videos"
          :key="index"
        >
          <div class="video-inner">
            <video width="400" height="260" controls>
              <source :src="item" type="video/mp4" />
              您的浏览器不支持 video 标签。
            </video>
            <div class="title">
              <span>视频 {{ index + 1 }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { caseStore } from "@/store/case";
import { reactive, ref } from "vue";

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

// 视频列表数据
let videos = reactive(store.videos);
</script>

<style lang="scss" scoped>
.allvideo-wrapper {
  overflow-y: auto;
  height: calc(100vh - 50px);
  .top-wrapper {
    height: 43px;
    .top-container {
      position: fixed;
      z-index: 10;
      width: 100%;
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
  .content-wrapper {
    display: flex;
    justify-content: center;
    margin: 13px 0;
    .video-wrapper {
      width: 90%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .video-container {
        width: 32%;
        .video-inner {
          display: flex;
          flex-direction: column;
          .title {
            display: flex;
            justify-content: center;
            margin-top: 3px;
          }
        }
      }
    }
  }
}

// 滚动条样式
::-webkit-scrollbar {
  width: 12px;
  height: 12px;
  background-color: rgba(0, 75, 37, 0.2);
}
::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: rgba(0, 84, 42, 0.2);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
}
::-webkit-scrollbar-track:hover {
  background-color: rgba(0, 82, 41, 0.15);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 153, 153, 0.7);
}
::-webkit-scrollbar-track:active {
  background-color: rgba(0, 88, 44, 0.4);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 153, 153, 0.2);
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: rgba(0, 90, 45, 0.3);
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.4);
}
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 97, 97, 0.4);
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.4);
}
::-webkit-scrollbar-thumb:active {
  background: rgba(0, 138, 138, 0.5);
}
</style>
