<!-- 角色扮演：详情页 -->

<template>
  <div class="playdetail-wrapper">
    <!-- 上方 fixed bar -->
    <div class="top-wrapper">
      <div class="top-container">
        <!-- 功能名 -->
        <div class="feature-name">
          {{ roleName }} &gt; {{ curFeature.funcName }}
        </div>

        <!-- 角色 & 功能选择器 -->
        <div class="select-wrapper">
          <!-- 角色选择器 -->
          <div class="select-container">
            <el-select
              v-model="selectedRole"
              class="m-2"
              @change="handleSelectRole(selectedRole)"
            >
              <el-option
                v-for="item in selectRoleOptions"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>

          <!-- 功能选择器 -->
          <div class="select-container">
            <el-select
              v-model="selectedFeature"
              class="m-2"
              @change="handleSelectFeature"
            >
              <el-option
                v-for="item in selectFeatureOptions"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              />
            </el-select>
          </div>

          <!-- 切换按钮 -->
          <div class="btn-container">
            <el-button type="primary" plain @click="handleClickBtn"
              >确定</el-button
            >
          </div>
        </div>
      </div>
    </div>

    <!-- 功能详情 -->
    <div class="feature-wrapper">
      <div class="feature-container">
        <div class="case-inner">
          <!-- 功能名称 -->
          <!-- <div class="triangle"></div>
          <div class="feature-title">{{ curFeature.funcName }}：</div> -->
          <div class="feature-content">
            <!-- 功能描述 -->
            <div class="description-wrapper wrapper">
              <div class="sub-title">
                <div class="dot pink"></div>
                <span>功能描述</span>
              </div>
              <div class="text-wrapper subwrapper">
                <div class="text-content">
                  {{ curFeature.funcDescription }}
                </div>
              </div>
            </div>

            <!-- 使用工具 -->
            <div class="tool-wrapper wrapper">
              <div class="sub-title">
                <div class="dot blue"></div>
                <span>使用工具</span>
              </div>
              <div class="text-wrapper subwrapper">
                <div class="text-content">
                  {{ curFeature.funcTool }}
                </div>
              </div>
            </div>

            <!-- 功能流程 -->
            <div class="flow-wrapper wrapper">
              <div class="sub-title">
                <div class="dot green"></div>
                <span>功能流程</span>
              </div>
              <div class="text-wrapper subwrapper">
                <div class="text-content">
                  {{ curFeature.funcFlow }}
                </div>
              </div>
            </div>

            <!-- 操作视频 -->
            <div class="feature-video-wrapper wrapper">
              <div class="sub-title">
                <div class="dot purple"></div>
                <span>操作视频</span>
              </div>
              <div class="video-wrapper subwrapper">
                <div class="video-container">
                  <video width="680" height="420" controls>
                    <source src="video" type="video/mp4" />
                    您的浏览器不支持 video 标签。
                  </video>
                  <div>{{ curFeature.funcName }}</div>
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
import { getFileLists } from "@/api/file";
import { featureStore } from "@/store/feature";
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

// 视频 url
let video = ref("");

// 路由对象
const router = useRouter();

// 当前角色
const role = useRoute().query.role;
let roleName = ref(role);

// 获取共享数据
const store = featureStore();
let curFeature = store.curFeature ? reactive(store.curFeature) : reactive({}), // 当前功能
  tableData = store.tableData ? reactive(store.tableData) : reactive([]), // 按角色对功能分类
  featureList = store.featureList ? reactive(store.featureList) : reactive([]); // 功能列表

// 防止 pinia 中的 curFeature, tableData, featureList 由于刷新而丢失
if (!curFeature || tableData.length === 0 || featureList.length === 0) {
  console.log("已丢失");
  // 使用 sessionStorage 中的值
  curFeature = JSON.parse(sessionStorage.getItem("curFeature"));
  tableData = JSON.parse(sessionStorage.getItem("tableData"));
  featureList = JSON.parse(sessionStorage.getItem("featureList"));
}

// 缓存 curFeature, tableData, featureList，缓存对象需使用 JSON.stringify
sessionStorage.setItem("curFeature", JSON.stringify(curFeature));
sessionStorage.setItem("tableData", JSON.stringify(tableData));
sessionStorage.setItem("featureList", JSON.stringify(featureList));

// 初始化视频
async function initVideo() {
  await getFileLists(curFeature.funcVideo).then((res) => {
    let item = res.data.filePathList[0];
    video.value =
      process.env.VUE_APP_INTERFACE_URL +
      "\\file\\files?filePath=" +
      encodeURI(item);
  });
}
initVideo();

// 选中的当前角色和功能
let selectedRole = ref(curFeature.funcRole),
  selectedFeature = ref(curFeature.funcName);

// 选定功能
let nextFeature = reactive({});

// selector 选择器数据
const selectRoleOptions = reactive(["前台", "医助", "医师"]); // 角色
let selectFeatureOptions = ref([]); // 功能

let curIndex = ref();

// 初始化功能列表
const initCurIndex = () => {
  // 更改角色对应的功能列表
  if (role === "前台") {
    curIndex.value = 0;
  } else if (role === "医助") {
    curIndex.value = 1;
  } else {
    curIndex.value = 2;
  }
  for (let item of tableData[curIndex.value]) {
    selectFeatureOptions.value.push({ id: item.id, label: item.name });
  }
};
initCurIndex();

// 切换角色，改变功能列表
const changeCurIndex = (selected) => {
  // 更改角色选中项
  if (roleName.value !== selected.value && roleName.value !== selected) {
    selectedFeature.value = "";
  } else {
    selectedFeature.value = curFeature.funcName;
  }
  // 更改角色对应的功能列表
  if (selected === "前台") {
    curIndex.value = 0;
  } else if (selected === "医助") {
    curIndex.value = 1;
  } else {
    curIndex.value = 2;
  }
  selectFeatureOptions.value = [];
  for (let item of tableData[curIndex.value]) {
    selectFeatureOptions.value.push({ id: item.id, label: item.name });
  }
};

// 处理 selector 选择角色
const handleSelectRole = (selected) => {
  selectedRole.value = selected;
  changeCurIndex(selected);
};

// 处理 selector 选择功能
const handleSelectFeature = (id) => {
  for (let item of featureList) {
    if (item.funcId == id) {
      nextFeature = item;
      selectedFeature.value = item.funcName;
      break;
    }
  }
  console.log("nextFeature", nextFeature);
};

// 切换角色/功能
const handleClickBtn = () => {
  store.setCurFeature(nextFeature);
  curFeature = nextFeature;
  roleName.value = nextFeature.funcRole;
  router.push({
    path: "detail",
    query: { role: nextFeature.funcRole, name: nextFeature.funcName },
  });
};
</script>

<style lang="scss" scoped>
.playdetail-wrapper {
  overflow-y: auto;
  height: calc(100vh - 50px);
  font-size: 16px;
  .top-wrapper {
    width: 100%;
    height: 80px;
    .top-container {
      position: fixed;
      z-index: 10;
      width: 100%;
      height: 80px;
      padding: 10px 23px;
      background-color: rgb(87, 115, 148);
      border: 2px solid #000;
      border-left: none;
      border-right: none;
      color: #fffaf1;
      .feature-name {
        font-size: 18px;
      }
      .feature-name:hover {
        color: rgb(255, 203, 107);
      }
      .select-wrapper {
        float: right;
        position: relative;
        right: 13%;
        width: 530px;
        .select-container {
          display: inline-block;
          margin-right: 15px;
        }
        .btn-container {
          display: inline-block;
        }
      }
    }
    .top-container::after {
      content: "";
      clear: both;
    }
  }

  .feature-wrapper {
    background-color: rgb(255, 250, 243);
    padding: 10px 13px;
    .feature-container {
      .feature-content {
        .wrapper {
          width: 95.5%;
          margin: 18px auto;
          border-radius: 5px;
          padding: 10px 18px;
        }
        .description-wrapper {
          margin-top: 5px;
          background-color: rgb(255, 230, 235);
          border: 1px solid rgb(223, 196, 200);
        }
        .tool-wrapper {
          background-color: rgb(232, 249, 255);
          border: 1px solid rgb(172, 211, 225);
        }
        .flow-wrapper {
          background-color: rgb(238, 255, 228);
          border: 1px solid rgb(188, 219, 170);
        }
        .feature-video-wrapper {
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
          .purple {
            background-color: rgb(211, 140, 227);
          }
        }
        .subwrapper {
          padding: 12px;
          background-color: #fff;
          border: 1px solid #ddd;
          margin: 15px;
        }
        .video-wrapper {
          position: relative;
          .video-container {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 15px;
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
