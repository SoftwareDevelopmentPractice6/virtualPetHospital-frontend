<template>
  <div class="ExamSelection">
    <h1 class="title">考试选择</h1>

    <el-form :inline="true" :model="formInline" class="examSelectionForm">
      <el-form-item label="考试类别">
        <el-select v-model="formInline.ExamCategory" placeholder="考试类别">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="考试名称">
        <el-input v-model="formInline.ExamName" placeholder="考试名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="examTableData" height="250" class="examTable">
      <el-table-column prop="Num" label="序号" width="180"></el-table-column>
      <el-table-column
        prop="ExamCategory"
        label="考试类别"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="ExamName"
        label="考试名称"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="ExamDuration"
        label="考试时长（分钟）"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="ExamTotalScore"
        label="考试总分"
        width="180"
      ></el-table-column>

      <el-table-column prop="Operations" label="操作">
        <template #default="scope">
          <router-link to="/StudentExam/ExamContent">
          <el-button size="small" @click="handleAnwser(scope.$index, scope.row)"
            >答题</el-button
          >
        </router-link>
        <router-link to="/StudentExam/ScoreQuery">
          <el-button size="small" @click="handleScoreQuery(scope.$index, scope.row)"
            >成绩查询</el-button
          ></router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
//import { reactive } from 'vue'

import { reactive } from "@vue/reactivity";

const formInline = reactive({
  ExamCategory: "",
  ExamName: "",
});
const options = [
  {
    value: "骨科",
    label: "骨科",
  },
  {
    value: "眼科",
    label: "眼科",
  },
  {
    value: "牙科",
    label: "牙科",
  },
  {
    value: "内科",
    label: "内科",
  },
  {
    value: "妇科",
    label: "妇科",
  },
];

const onSubmit = () => {
  console.log("submit!");
};

// const handleEdit = (index, row) => {
//   console.log(index, row)
// }
// const handleDelete = (index, row) => {
//   console.log(index, row)
// }

const examTableData = [
  {
    Num: '1',
    ExamCategory: '内科',
    ExamName: '鼻炎治疗',
    ExamDuration: '60',
    ExamTotalScore: '100',
  },
  {
    Num: '2',
    ExamCategory: '内科',
    ExamName: '肺炎治疗',
    ExamDuration: '70',
    ExamTotalScore: '120',
  },
  {
    Num: '3',
    ExamCategory: '内科',
    ExamName: '感冒治疗',
    ExamDuration: '70',
    ExamTotalScore: '150',
  },
  {
    Num: '4',
    ExamCategory: '内科',
    ExamName: '',
    ExamDuration: '',
    ExamTotalScore: '',
  },
  {
    Num: '5',
    ExamCategory: '妇科',
    ExamName: '',
    ExamDuration: '',
    ExamTotalScore: '',
  },
  {
    Num: '6',
    ExamCategory: '妇科',
    ExamName: '',
    ExamDuration: '',
    ExamTotalScore: '',
  },
]
</script>
<style lang="scss" scoped>

.title{
  margin: 30px auto 30px auto;
  text-align: center;
}

.examSelectionForm{
  text-align: center;

}

.examTable{
  vertical-align: center;
  padding: 30px 30px 300px 30px;

}
</style>