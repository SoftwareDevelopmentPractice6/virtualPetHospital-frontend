<!-- 角色扮演：详情页 -->

<template>
  <div class="playdetail-wrapper">
    <!-- 上方 fixed bar -->
    <div class="top-wrapper">
      <div class="top-container">
        <div class="disease-name">
          {{ roleName }} &gt; {{ curFeature.funcName }}
        </div>
        <div class="select-wrapper">
          <div class="select-container">
            <el-select
              v-model="selectedRole"
              class="m-2"
              size="small"
              @change="handleSelectRole(selectedRole)"
            >
              <el-option
                v-for="item in selectRoleData.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="select-container">
            <el-select
              v-model="selectedFeature"
              class="m-2"
              size="small"
              @change="handleSelectFeature(selectedFeature)"
            >
              <el-option
                v-for="item in selectFeatureData.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="btn-container">
            <el-button type="primary" plain @click="handleClickBtn"
              >确定</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { featureStore } from "@/store/feature";
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";

const role = useRoute().query.role;
let roleName = ref("");
if (role === "receptionist") {
  roleName.value = "前台";
} else if (role === "assistant") {
  roleName.value = "医助";
} else {
  roleName.value = "医师";
}

// 获取共享数据
const store = featureStore();
const curFeature = store.curFeature, // 当前功能
  tableData = store.tableData; // 按角色对功能分类

// 选中的当前角色和功能
let selectedRole = ref(curFeature.funcRole),
  selectedFeature = ref(curFeature.funcName);

// 切换角色
const initOrChangeCurIndex = (role) => {
  if (role === "前台") {
    curIndex.value = 0;
  } else if (role === "医助") {
    curIndex.value = 1;
  } else {
    curIndex.value = 2;
  }
  console.log("tableData", tableData);
  for (let item of tableData[curIndex.value]) {
    selectFeatureData.featureList.push(item.name);
  }
};

/* selecter 选择器数据 */
// 角色
const selectRoleOptions = reactive([
  {
    value: "前台",
    label: "前台",
  },
  {
    value: "医助",
    label: "医助",
  },
  {
    value: "医师",
    label: "医师",
  },
]);

// 功能
let selectFeatureData = reactive({
  featureList: [],
  options: [],
});
// 对功能初始化
const curIndex = ref();
const initFeature = () => {
  initOrChangeCurIndex(selectedRole);
};
initFeature();

// 处理 selecter 选择角色
const handleSelectRole = (selectedRole) => {
  initOrChangeCurIndex(selectedRole);
};

// // 处理 selecter 选择功能
// const handleSelectRole = (selectedRole) => {
//   initOrChangeCurIndex(selectedRole);
// };
</script>

<style lang="scss" scoped>
.playdetail-wrapper {
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
}
</style>
