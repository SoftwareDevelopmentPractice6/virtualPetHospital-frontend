<template>
  <el-container v-loading="loading">
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
        <el-form-item label="考试Id">
          <el-input v-model="examlist.examSessionPaper.paperExam.examId" />
        </el-form-item>
        <el-form-item label="考试名称">
          <el-input v-model="examlist.examSessionPaper.paperExam.examName" />
        </el-form-item>
        <el-form-item label="考试试卷名称">
          <el-input v-model="examlist.examSessionPaper.paperName" />
        </el-form-item>
        <el-form-item label="考试时长">
          <el-input v-model="examlist.examSessionPaper.paperDuration" />
        </el-form-item>

        <el-form-item label="考试总分">
          <el-input v-model="examlist.examSessionPaper.paperTotalScore" />
        </el-form-item>

        <el-form-item label="考试开始时间">
          <el-input v-model="examlist.examSessionStartTime" />
        </el-form-item>
        <el-form-item label="考试结束时间">
          <el-input v-model="examlist.examSessionEndTime" />
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
import { computed, unref, onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { updateExamination, getExamList } from "@/api/exam";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();

const router = useRouter();
const id = computed(() => {
  return route.query.examId;
});

const loading = ref(false);

const examlist = ref({});

const getExamInfo = async () => {
  if (!unref(id)) return;
  loading.value = true;
  const list = ref();
  await getExamList(unref(id)).then((res) => {
    list.value = res.data.examSessionList;
  });
  for (let item of list.value) {
    if (item.examSessionId == id.value) {
      examlist.value = item;
    }
  }
  console.log("examlist.value", examlist.value);
  loading.value = false;
};
getExamInfo();

onMounted(() => {});

const onSubmit = async () => {
  loading.value = true;
  console.log("examlist.examSessionPaper", examlist.value.examSessionPaper);
  const info = {
    examId: examlist.value.examSessionPaper.paperExam.examId,
    examName: examlist.value.examSessionPaper.paperExam.examName,
    paperName: examlist.value.examSessionPaper.paperName,
    paperDuration: examlist.value.examSessionPaper.paperDuration,
    paperTotalScore: examlist.value.examSessionPaper.paperTotalScore,
    examSessionStartTime: examlist.value.examSessionStartTime,
    examSessionEndTime: examlist.value.examSessionEndTime,
  };
  updateExamination(info);
  ElMessage.success("提交成功！");
  loading.value = false;
  router.back();
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
