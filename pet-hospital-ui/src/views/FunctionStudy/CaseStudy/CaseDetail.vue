<!-- 病例学习：病例详情 -->

<template>
  <div class="casedetail-wrapper">
    <!-- 上方 fixed bar -->
    <div class="top-wrapper">
      <div class="top-container">
        <div class="disease-name">
          {{ diseaseCategory }} &gt; {{ diseaseName }}
        </div>
        <div class="select-container">
          <el-select
            v-model="selectedCase"
            class="m-2"
            size="small"
            @change="handleSelect(selectedCase)"
          >
            <el-option
              v-for="item in caseData.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
    </div>

    <!-- 病例详情 -->
    <div class="case-wrapper">
      <div
        class="case-container"
        v-for="(item, index) in caseData.caseList"
        :key="index"
      >
        <div class="case-inner" v-if="item.flag">
          <!-- 病例号 -->
          <div class="triangle"></div>
          <div class="case-title">病例 {{ index + 1 }}</div>
          <div class="case-content">
            <!-- 疾病名称 -->
            <div class="name-wrapper wrapper">
              <div class="sub-title">
                <div class="dot pink"></div>
                <span>疾病名称</span>
              </div>
              <div class="text-wrapper subwrapper">
                <div class="title">文字信息：</div>
                <div class="text-content">
                  {{ item.medicalCaseDiseaseName.diseaseNameContent }}
                  &nbsp;&#40;
                  {{ item.medicalCaseDiseaseName.diseaseNameCategory }} &#41;
                </div>
              </div>
              <div
                class="image-wrapper subwrapper"
                v-if="cards[index].diseaseName.length !== 0"
              >
                <div class="title">图片信息：</div>
                <div class="image-container">
                  <Carousel
                    loop="true"
                    speed="1000"
                    perPage="4"
                    navigationEnabled="true"
                    autoplay="false"
                    centerMode="true"
                  >
                    <Slide
                      v-for="(item1, index1) in cards[index].diseaseName"
                      :key="index1"
                    >
                      <div class="slideBox">
                        <img :src="item1" alt="病例图片" />
                        <div>图片 {{ index1 + 1 }}</div>
                      </div>
                    </Slide>
                  </Carousel>
                </div>
              </div>
              <div
                class="video-wrapper subwrapper"
                v-if="videos[index].diseaseName.length !== 0"
              >
                <div class="title">视频信息：</div>
                <div class="allvideo" @click="navigateToAll(index, 'name')">
                  全部视频&nbsp;&nbsp;&gt;&gt;
                </div>
                <div class="video-container">
                  <video width="680" height="420" controls>
                    <source
                      :src="videos[index].diseaseName[0]"
                      type="video/mp4"
                    />
                    您的浏览器不支持 video 标签。
                  </video>
                  <div>视频 1</div>
                </div>
              </div>
            </div>

            <!-- 接诊 -->
            <div class="admission-wrapper wrapper">
              <div class="sub-title">
                <div class="dot blue"></div>
                <span>接诊</span>
              </div>
              <div class="text-wrapper subwrapper">
                <div class="title">文字信息：</div>
                <div class="text-content">
                  {{ item.medicalCaseAdmission.admissionContent }}
                </div>
              </div>
              <div
                class="image-wrapper subwrapper"
                v-if="cards[index].admission.length !== 0"
              >
                <div class="title">图片信息：</div>
                <div class="image-container">
                  <carousel
                    :loop="true"
                    :speed="1000"
                    :perPage="4"
                    :navigationEnabled="true"
                    :autoplay="false"
                    :centerMode="true"
                  >
                    <slide
                      v-for="(item1, index1) in cards[index].admission"
                      :key="index1"
                    >
                      <div class="slideBox">
                        <img :src="item1" alt="病例图片" />
                        <div>图片 {{ index1 + 1 }}</div>
                      </div>
                    </slide>
                  </carousel>
                </div>
              </div>
              <div
                class="video-wrapper subwrapper"
                v-if="videos[index].admission.length !== 0"
              >
                <div class="title">视频信息：</div>
                <div
                  class="allvideo"
                  @click="navigateToAll(index, 'admission')"
                >
                  全部视频&nbsp;&nbsp;&gt;&gt;
                </div>

                <div class="video-container">
                  <video width="680" height="420" controls>
                    <source
                      :src="videos[index].admission[0]"
                      type="video/mp4"
                    />
                    您的浏览器不支持 video 标签。
                  </video>
                  <div>视频 1</div>
                </div>
              </div>
            </div>

            <!-- 病例检查 -->
            <div class="check-wrapper wrapper">
              <div class="sub-title">
                <div class="dot green"></div>
                <span>病例检查</span>
              </div>
              <div class="text-wrapper subwrapper">
                <div class="title">文字信息：</div>
                <div class="text-content">
                  {{ item.medicalCaseCaseCheck.caseCheckContent }}
                </div>
              </div>
              <div
                class="image-wrapper subwrapper"
                v-if="cards[index].caseCheck.length !== 0"
              >
                <div class="title">图片信息：</div>
                <div class="image-container">
                  <carousel
                    :loop="true"
                    :speed="1000"
                    :perPage="4"
                    :navigationEnabled="true"
                    :autoplay="false"
                    :centerMode="true"
                  >
                    <slide
                      v-for="(item1, index1) in cards[index].caseCheck"
                      :key="index1"
                    >
                      <div class="slideBox">
                        <img :src="item1" alt="病例图片" />
                        <div>图片 {{ index1 + 1 }}</div>
                      </div>
                    </slide>
                  </carousel>
                </div>
              </div>
              <div
                class="video-wrapper subwrapper"
                v-if="videos[index].caseCheck.length !== 0"
              >
                <div class="title">视频信息：</div>
                <div
                  class="allvideo"
                  @click="navigateToAll(index, 'caseCheck')"
                >
                  全部视频&nbsp;&nbsp;&gt;&gt;
                </div>

                <div class="video-container">
                  <video width="680" height="420" controls>
                    <source
                      :src="videos[index].caseCheck[0]"
                      type="video/mp4"
                    />
                    您的浏览器不支持 video 标签。
                  </video>
                  <div>视频 1</div>
                </div>
              </div>
            </div>

            <!-- 诊断结果 -->
            <div class="diagnoseRes-wrapper wrapper">
              <div class="sub-title">
                <div class="dot orange"></div>
                <span>诊断结果</span>
              </div>
              <div class="text-wrapper subwrapper">
                <div class="title">文字信息：</div>
                <div class="text-content">
                  {{ item.medicalCaseDiagnosticResult.diagnosticResultContent }}
                </div>
              </div>
              <div
                class="image-wrapper subwrapper"
                v-if="cards[index].diagnosticRes.length !== 0"
              >
                <div class="title">图片信息：</div>
                <div class="image-container">
                  <carousel
                    :loop="true"
                    :speed="1000"
                    :perPage="4"
                    :navigationEnabled="true"
                    :autoplay="false"
                    :centerMode="true"
                  >
                    <slide
                      v-for="(item1, index1) in cards[index].diagnosticRes"
                      :key="index1"
                    >
                      <div class="slideBox">
                        <img :src="item1" alt="病例图片" />
                        <div>图片 {{ index1 + 1 }}</div>
                      </div>
                    </slide>
                  </carousel>
                </div>
              </div>
              <div
                class="video-wrapper subwrapper"
                v-if="videos[index].diagnosticRes.length !== 0"
              >
                <div class="title">视频信息：</div>
                <div
                  class="allvideo"
                  @click="navigateToAll(index, 'diagnosticRes')"
                >
                  全部视频&nbsp;&nbsp;&gt;&gt;
                </div>

                <div class="video-container">
                  <video width="680" height="420" controls>
                    <source
                      :src="videos[index].diagnosticRes[0]"
                      type="video/mp4"
                    />
                    您的浏览器不支持 video 标签。
                  </video>
                  <div>视频 1</div>
                </div>
              </div>
            </div>

            <!-- 治疗方案 -->
            <div class="treatment-wrapper wrapper">
              <div class="sub-title">
                <div class="dot purple"></div>
                <span>治疗方案</span>
              </div>
              <div class="text-wrapper subwrapper">
                <div class="title">文字信息：</div>
                <div class="text-content">
                  {{ item.medicalCaseTreatmentProgram.treatmentProgramContent }}
                </div>
              </div>
              <div
                class="image-wrapper subwrapper"
                v-if="cards[index].treatmentProgram.length !== 0"
              >
                <div class="title">图片信息：</div>
                <div class="image-container">
                  <carousel
                    :loop="true"
                    :speed="1000"
                    :perPage="4"
                    :navigationEnabled="true"
                    :autoplay="false"
                    :centerMode="true"
                  >
                    <slide
                      v-for="(item1, index1) in cards[index].treatmentProgram"
                      :key="index1"
                    >
                      <div class="slideBox">
                        <img :src="item1" alt="病例图片" />
                        <div>图片 {{ index1 + 1 }}</div>
                      </div>
                    </slide>
                  </carousel>
                </div>
              </div>
              <div
                class="video-wrapper subwrapper"
                v-if="videos[index].treatmentProgram.length !== 0"
              >
                <div class="title">视频信息：</div>
                <div
                  class="allvideo"
                  @click="navigateToAll(index, 'treatmentProgram')"
                >
                  全部视频&nbsp;&nbsp;&gt;&gt;
                </div>

                <div class="video-container">
                  <video width="680" height="420" controls>
                    <source
                      :src="videos[index].treatmentProgram[0]"
                      type="video/mp4"
                    />
                    您的浏览器不支持 video 标签。
                  </video>
                  <div>视频 1</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Carousel, Slide } from "@jambonn/vue-concise-carousel";
import "@jambonn/vue-concise-carousel/lib/vue-concise-carousel.css";
import { getCase } from "@/api/case";
import { caseStore } from "@/store/case";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { getFileLists } from "@/api/file";

// 图片列表
let cards = reactive([
  {
    admission: [],
    caseCheck: [],
    diagnosticRes: [],
    diseaseName: [],
    treatmentProgram: [],
  },
]);

// 视频列表
let videos = reactive([
  {
    admission: [],
    caseCheck: [],
    diagnosticRes: [],
    diseaseName: [],
    treatmentProgram: [],
  },
]);

// 病例数据
let caseData = reactive({
  caseList: [],
  options: [],
});

let selectedCase = ref("病例 1"); // 选中病例
let curIndex = ref(0); // 当前病例 index

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

// 缓存 diseaseId, diseaseName, diseaseCategory
sessionStorage.setItem("diseaseId", diseaseId.value);
sessionStorage.setItem("diseaseName", diseaseName.value);
sessionStorage.setItem("diseaseCategory", diseaseCategory.value);

// 获取病例列表
async function getCaseList() {
  await getCase(null, null, null, diseaseId.value)
    .then((res) => {
      let list = res.data.medicalCaseList.medicalCaseList;
      console.log("获取病例列表成功", list);

      for (let i in list) {
        // 初始化 select 数据
        caseData.options.push({
          value: "病例 " + (Number(i) + 1),
          label: "病例 " + (Number(i) + 1),
        });

        // 处理图片视频数据
        handleData(list[i]);
      }

      // 初始选中病例 1
      for (let i in list) {
        if (i === "0") {
          list[i].flag = true;
        } else {
          list[i].flag = false;
        }
        caseData.caseList.push(list[i]);
      }
    })
    .catch((error) => {
      console.log("获取病例列表失败", error);
    });
}
getCaseList();

// 处理图片视频数据
const handleData = (item) => {
  const adItem = item.medicalCaseAdmission,
    ccItem = item.medicalCaseCaseCheck,
    drItem = item.medicalCaseDiagnosticResult,
    dnItem = item.medicalCaseDiseaseName,
    tpItem = item.medicalCaseTreatmentProgram;

  const admissionImgPath = adItem.admissionPhoto,
    caseCheckImgPath = ccItem.caseCheckPhoto,
    diagnosticResImgPath = drItem.diagnosticResultPhoto,
    diseaseNameImgPath = dnItem.diseaseNamePhoto,
    treatmentProgImgPath = tpItem.treatmentProgramPhoto;

  // 接诊图片
  getFileLists(admissionImgPath).then((res) => {
    for (let item of res.data.filePathList) {
      cards[curIndex.value].admission.push(
        process.env.VUE_APP_INTERFACE_URL +
          "\\file\\files?filePath=" +
          encodeURI(item)
      );
    }
  });
  // 病例检查图片
  getFileLists(caseCheckImgPath).then((res) => {
    for (let item of res.data.filePathList) {
      cards[curIndex.value].caseCheck.push(
        process.env.VUE_APP_INTERFACE_URL +
          "\\file\\files?filePath=" +
          encodeURI(item)
      );
    }
  });
  // 诊断结果图片
  getFileLists(diagnosticResImgPath).then((res) => {
    for (let item of res.data.filePathList) {
      cards[curIndex.value].diagnosticRes.push(
        process.env.VUE_APP_INTERFACE_URL +
          "\\file\\files?filePath=" +
          encodeURI(item)
      );
    }
  });
  // 病例名图片
  getFileLists(diseaseNameImgPath).then((res) => {
    for (let item of res.data.filePathList) {
      cards[curIndex.value].diseaseName.push(
        process.env.VUE_APP_INTERFACE_URL +
          "\\file\\files?filePath=" +
          encodeURI(item)
      );
    }
  });
  // 治疗方案图片
  getFileLists(treatmentProgImgPath).then((res) => {
    for (let item of res.data.filePathList) {
      cards[curIndex.value].treatmentProgram.push(
        process.env.VUE_APP_INTERFACE_URL +
          "\\file\\files?filePath=" +
          encodeURI(item)
      );
    }
  });

  const admissionVideoPath = adItem.admissionVideo,
    caseCheckVideoPath = ccItem.caseCheckVideo,
    diagnosticResVideoPath = drItem.diagnosticResultVideo,
    diseaseNameVideoPath = dnItem.diseaseNameVideo,
    treatmentProgVideoPath = tpItem.treatmentProgramVideo;

  // 接诊视频
  getFileLists(admissionVideoPath).then((res) => {
    for (let item of res.data.filePathList) {
      videos[curIndex.value].admission.push(
        process.env.VUE_APP_INTERFACE_URL +
          "\\file\\files?filePath=" +
          encodeURI(item)
      );
    }
  });
  // 病例检查视频
  getFileLists(caseCheckVideoPath).then((res) => {
    for (let item of res.data.filePathList) {
      videos[curIndex.value].caseCheck.push(
        process.env.VUE_APP_INTERFACE_URL +
          "\\file\\files?filePath=" +
          encodeURI(item)
      );
    }
  });
  // 诊断结果视频
  getFileLists(diagnosticResVideoPath).then((res) => {
    for (let item of res.data.filePathList) {
      videos[curIndex.value].diagnosticRes.push(
        process.env.VUE_APP_INTERFACE_URL +
          "\\file\\files?filePath=" +
          encodeURI(item)
      );
    }
  });
  // 病例名视频
  getFileLists(diseaseNameVideoPath).then((res) => {
    for (let item of res.data.filePathList) {
      videos[curIndex.value].diseaseName.push(
        process.env.VUE_APP_INTERFACE_URL +
          "\\file\\files?filePath=" +
          encodeURI(item)
      );
    }
  });
  // 治疗方案视频
  getFileLists(treatmentProgVideoPath).then((res) => {
    for (let item of res.data.filePathList) {
      videos[curIndex.value].treatmentProgram.push(
        process.env.VUE_APP_INTERFACE_URL +
          "\\file\\files?filePath=" +
          encodeURI(item)
      );
    }
  });
};

// 处理 select 选择
const handleSelect = (selectedCase) => {
  curIndex = selectedCase[selectedCase.length - 1] - 1;
  let list = caseData.caseList;
  for (let i = 0; i < list.length; ++i) {
    caseData.caseList[i].flag = false;
  }
  caseData.caseList[curIndex].flag = true;
  selectedCase.value = selectedCase;
};

const router = useRouter();

// 跳转到所有视频
const navigateToAll = (index, itemName) => {
  store.setVideos(videos[index][itemName]);
  router.push({
    path: diseaseName.value + "/allVideos",
    query: { itemName: itemName },
  });
};
</script>

<style lang="scss" scoped>
.casedetail-wrapper {
  overflow-y: auto;
  height: calc(100vh - 50px);
  font-size: 16px;
  .top-wrapper {
    height: 58px;
    .top-container {
      position: fixed;
      z-index: 10;
      width: 100%;
      height: 58px;
      padding: 3px 18px;
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
      .select-container {
        width: 100%;
        display: flex;
        justify-content: right;
        .m-2 {
          position: relative;
          right: 13%;
        }
      }
    }
  }

  .case-wrapper {
    padding: 10px 13px;
    .case-container {
      border-radius: 10px;
      border: 2px solid rgb(227, 223, 217);
      background-color: rgb(255, 250, 243);
      .triangle {
        display: inline-block;
        margin: 20px 2px 12px 26px;
        width: 0px;
        height: 0px;
        border: 10px solid #333;
        border-top-color: transparent;
        border-right-color: transparent;
        border-bottom-color: transparent;
      }
      .case-title {
        display: inline-block;
        position: relative;
        bottom: 12px;
        color: #333;
        font-weight: bold;
        font-size: 23px;
      }
      .case-content {
        margin-bottom: 20px;
        .wrapper {
          width: 96%;
          margin: 20px auto;
          border-radius: 5px;
          padding: 15px 18px;
        }
        .name-wrapper {
          margin-top: 5px;
          background-color: rgb(255, 230, 235);
          border: 1px solid rgb(223, 196, 200);
        }
        .admission-wrapper {
          background-color: rgb(232, 249, 255);
          border: 1px solid rgb(172, 211, 225);
        }
        .check-wrapper {
          background-color: rgb(238, 255, 228);
          border: 1px solid rgb(188, 219, 170);
        }
        .diagnoseRes-wrapper {
          background-color: rgb(255, 235, 208);
          border: 1px solid rgb(225, 202, 176);
        }
        .treatment-wrapper {
          background-color: rgb(233, 221, 235);
          border: 1px solid rgb(207, 191, 210);
        }
        .sub-title {
          .dot {
            display: inline-block;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: 1px solid #999;
            margin-right: 12px;
            position: relative;
            top: 1px;
          }
          span {
            font-weight: 600;
            font-size: 20px;
            color: #444;
            text-decoration: underline;
            letter-spacing: 0.5px;
          }
          .pink {
            background-color: rgb(255, 137, 157);
          }
          .blue {
            background-color: rgb(107, 213, 255);
          }
          .green {
            background-color: rgb(166, 243, 88);
          }
          .orange {
            background-color: rgb(255, 177, 81);
          }
          .purple {
            background-color: rgb(211, 140, 227);
          }
        }
        .subwrapper {
          padding: 12px;
          background-color: #fff;
          border: 1px solid #ddd;
          margin: 20px;
        }
        .title {
          color: #444;
          font-weight: 600;
          font-size: 17px;
          margin-bottom: 15px;
        }
        .image-container {
          width: 1060px;
          margin: 25px auto 10px;
          padding: 0;
          .VueCarousel-slide {
            color: #333;
            align-items: center;
            justify-content: center;
            text-align: center;
          }
          .slideBox {
            margin: 0px 10px;
            padding: 12px;
            border: 1px solid #ccc;
          }
          img {
            max-width: 220px;
          }
        }
        .video-wrapper {
          position: relative;
          .allvideo {
            position: absolute;
            right: 25px;
            top: 30px;
          }
          .allvideo:hover {
            cursor: pointer;
            color: orangered;
          }
          .video-container {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 15px 0 20px;
            video {
              width: 680px;
              margin-bottom: 10px;
            }
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
