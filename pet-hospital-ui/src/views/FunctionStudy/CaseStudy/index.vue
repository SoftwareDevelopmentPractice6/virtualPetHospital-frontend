<!-- 病例学习：病名列表 -->

<template>
  <div class="casestudy-wrapper">
    <div class="container">
      <!-- select 选择病种 -->
      <div class="select-container">
        <div class="select-title">请选择病种：</div>
        <el-select
          v-model="selectValue"
          class="m-2"
          placeholder="未选择"
          @change="handleSelect(selectValue)"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <!-- 病名表格 -->
      <div class="table-container">
        <div
          :id="item1[0]"
          class="table"
          v-for="(item1, key1) in diseaseMap"
          :key="key1"
        >
          <div class="title">
            <span>{{ item1[0] }}</span>
          </div>
          <div class="item-container">
            <div
              class="item"
              v-for="(item2, key2) in item1[1]"
              :key="key2"
              @click="handleClick(item2)"
            >
              <div class="item-center">
                {{ item2.diseaseNameContent }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getDisease } from "@/api/case";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

// 获取疾病列表并处理数据
let selectValue = ref("");
let diseaseData = null; // 疾病列表
let diseaseMap = reactive(new Map()); // 病种->病例数组
let diseaseSet = reactive(new Set()); // 病种集合
let options = reactive([]); // select options

// 获取疾病列表
getDisease()
  .then((res) => {
    diseaseData = res.data.diseaseNameList;
    console.log("获取疾病列表成功", diseaseData);
    // 处理数据
    for (let item of diseaseData) {
      const curCate = item.diseaseNameCategory;
      let value = [];
      if (!diseaseSet.has(curCate)) {
        options.push({
          value: curCate,
          label: curCate,
        });
        diseaseSet.add(curCate);
        value = new Array(item);
      } else {
        value = diseaseMap.get(curCate);
        value.push(item);
      }
      diseaseMap.set(curCate, value);
    }
  })
  .catch((error) => {
    console.log("获取疾病列表错误", error);
  });

// 处理 select 选择
const handleSelect = (selected) => {
  document.querySelector("#" + selected).scrollIntoView(false);
};

// 处理点击跳转事件
const router = useRouter();
const handleClick = (disease) => {
  const diseaseName = disease.diseaseNameContent,
    diseaseId = disease.diseaseNameId;
  router.push({
    path: "caseStudy/detail/" + diseaseName,
    params: { diseaseName: diseaseName, diseaseId: diseaseId },
  });
};
</script>

<style lang="scss" scoped>
.casestudy-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 50px);
  background-color: rgb(255, 245, 231);
  letter-spacing: 1.5px;
  .container {
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 95%;
    height: 95%;
    border-radius: 5px;
    border: 1px solid #bcbcbc;
    box-shadow: 4px 4px 4px 2px rgb(241, 234, 224);
    background-color: #fdebf8;
    .select-container {
      display: flex;
      justify-content: right;
      position: relative;
      right: 50px;
      width: 100%;
      margin-bottom: 6px;
      .select-title {
        line-height: 32px;
        margin-right: 8px;
        letter-spacing: 1px;
      }
    }
    .table-container {
      width: 100%;
      height: 100%;
      background-color: #fdebf8;
      overflow: auto;
      .table {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding: 5px;
        width: 99.6%;
        background-color: #fff;
        border-radius: 15px;
        margin-bottom: 10px;
        .title {
          width: 100%;
          margin: 0 0 6px 12px;
          span {
            text-decoration: underline;
            font-size: 20px;
            color: #4e0086;
          }
          span:hover {
            color: rgb(255, 166, 0);
          }
        }
        .item-container {
          width: 100%;
          .item {
            display: inline-block;
            justify-content: center;
            width: 30%;
            height: 50px;
            margin: 0.5% 1.6%;
            border-radius: 5px;
            border: 1px solid #bbb;
            background-color: #ede9f5;
            .item-center {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100%;
            }
          }
          .item:hover {
            cursor: pointer;
            color: #4e0086;
            background-color: #ebd9f9;
            border: 1px solid #4e0086;
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
  background-color: rgba(0, 153, 77, 0.08);
}
::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: rgba(0, 153, 77, 0.08);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
}
::-webkit-scrollbar-track:hover {
  background-color: rgba(0, 153, 77, 0.15);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 153, 153, 0.4);
}
::-webkit-scrollbar-track:active {
  background-color: rgba(0, 153, 77, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 153, 153, 0.1);
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: rgba(0, 153, 77, 0.15);
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 153, 153, 0.25);
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}
::-webkit-scrollbar-thumb:active {
  background: rgba(0, 153, 153, 0.3);
}
</style>
