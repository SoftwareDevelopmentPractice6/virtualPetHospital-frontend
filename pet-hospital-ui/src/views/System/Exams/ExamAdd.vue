<template>
  <el-container>
    <el-header class="header" height="20px">
      <router-link to="/exams/list">
        <el-button type="plain" @click="back">Back</el-button>
      </router-link>
    </el-header>
    <el-main>
      <div style="margin: 20px" />
      <el-form
        :label-position="right"
        label-width="100px"
        :model="formLabelAlign"
        style="max-width: 460px"
      >
        <el-form-item label="考试名称">
          <el-input v-model="examlist.examname" />
        </el-form-item>
        <el-form-item label="考试时长">
          <el-input v-model="examlist.examduration" />
        </el-form-item>

        <el-form-item label="考试总分">
          <el-input v-model="examlist.examtotalscore" />
        </el-form-item>

        <el-form-item label="考试开始时间">
          <el-input v-model="examlist.examstart" />
        </el-form-item>
        <el-form-item label="考试结束时间">
          <el-input v-model="examlist.examend" />
        </el-form-item>
        <el-form-item label="考试试卷名称">
          <el-input v-model="examlist.papername" />
        </el-form-item>
        <el-form-item>
          <el-button class="SubmitButton" type="primary" @click="onSubmit"
            >保存</el-button
          >
          <el-button class="CancelButton" @click="back">取消</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script setup>
import { reactive } from "vue";
import { ElMessage } from "element-plus";
import { insertExamination } from "../../../api/exam";
import { useRouter } from "vue-router";

const router = useRouter();

const back = () => {
  router.back();
};

const examlist = reactive({
  examid: "",
  examname: "",
  examduration: "",
  examtotalscore: "",
  examstart: "",
  examend: "",
  papername: "",
});
const onSubmit = () => {
  console.log(examlist);
  var data = {
    examSessionId: examlist.examid,
    examName: examlist.examname,
    paperDuration: examlist.examduration,
    paperTotalScore: examlist.examtotalscore,
    examSessionStartTime: examlist.examstart,
    examSessionEndTime: examlist.examend,
    paperName: examlist.papername,
  };
  console.log("data", data);
  insert(data).then(() => {
    ElMessage.success("提交成功！");
    back();
  });
};
const insert = async (val) => {
  let value = await insertExamination(val).then((res) => {
    res.data;
  });
  console.log("val", value);
};
</script>

<style lang="scss" scoped>
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
.header {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px 10px 0px 10px;
}
.CancelButton {
  width: 80px;
  height: 40px;
  margin: 0px 30px 0px 60px;
}
.SubmitButton {
  width: 80px;
  height: 40px;
  margin: 0px 60px 0px 30px;
}
</style>
