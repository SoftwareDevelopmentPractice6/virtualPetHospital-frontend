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
    <div class="content-wrapper">
      <div class="video-wrapper">
        <div class="video-container">
          <div class="video-inner">
            <video width="400" height="260" controls>
              <source
                src="../../../assets/images/video-demo.mp4"
                type="video/mp4"
              />
              您的浏览器不支持 video 标签。
            </video>
            <div class="title"><span>视频 1</span></div>
          </div>
        </div>
        <div class="video-container">
          <div class="video-inner">
            <video width="400" height="260" controls>
              <source
                src="../../../assets/images/video-demo.mp4"
                type="video/mp4"
              />
              您的浏览器不支持 video 标签。
            </video>
            <div class="title"><span>视频 2</span></div>
          </div>
        </div>
        <div class="video-container">
          <div class="video-inner">
            <video width="400" height="260" controls>
              <source
                src="../../../assets/images/video-demo.mp4"
                type="video/mp4"
              />
              您的浏览器不支持 video 标签。
            </video>
            <div class="title"><span>视频 3</span></div>
          </div>
        </div>
        <div class="video-container">
          <div class="video-inner">
            <video width="400" height="260" controls>
              <source
                src="../../../assets/images/video-demo.mp4"
                type="video/mp4"
              />
              您的浏览器不支持 video 标签。
            </video>
            <div class="title"><span>视频 4</span></div>
          </div>
        </div>
        <div class="video-container">
          <div class="video-inner">
            <video width="400" height="260" controls>
              <source
                src="../../../assets/images/video-demo.mp4"
                type="video/mp4"
              />
              您的浏览器不支持 video 标签。
            </video>
            <div class="title"><span>视频 5</span></div>
          </div>
        </div>
        <div class="video-container">
          <div class="video-inner">
            <video width="400" height="260" controls>
              <source
                src="../../../assets/images/video-demo.mp4"
                type="video/mp4"
              />
              您的浏览器不支持 video 标签。
            </video>
            <div class="title"><span>视频 6</span></div>
          </div>
        </div>
        <div class="video-container">
          <div class="video-inner">
            <video width="400" height="260" controls>
              <source
                src="../../../assets/images/video-demo.mp4"
                type="video/mp4"
              />
              您的浏览器不支持 video 标签。
            </video>
            <div class="title"><span>视频 7</span></div>
          </div>
        </div>
        <div class="video-container">
          <div class="video-inner">
            <video width="400" height="260" controls>
              <source
                src="../../../assets/images/video-demo.mp4"
                type="video/mp4"
              />
              您的浏览器不支持 video 标签。
            </video>
            <div class="title"><span>视频 8</span></div>
          </div>
        </div>
        <div class="video-container">
          <div class="video-inner">
            <video width="400" height="260" controls>
              <source
                src="../../../assets/images/video-demo.mp4"
                type="video/mp4"
              />
              您的浏览器不支持 video 标签。
            </video>
            <div class="title"><span>视频 9</span></div>
          </div>
        </div>
        <div class="video-container">
          <div class="video-inner">
            <video width="400" height="260" controls>
              <source
                src="../../../assets/images/video-demo.mp4"
                type="video/mp4"
              />
              您的浏览器不支持 video 标签。
            </video>
            <div class="title"><span>视频 10</span></div>
          </div>
        </div>
      </div>
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
  overflow-y: auto;
  height: calc(100vh - 50px);
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
</style>
