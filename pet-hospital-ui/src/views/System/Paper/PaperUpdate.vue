<template>
  <el-container v-loading="loading">
    <el-header class="header" height="20px">
      <router-link to="/paper/list">
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
        <el-form-item label="试卷名称">
          <el-input v-model="paperlist.examSessionPaper.paperName" />
        </el-form-item>
        <el-form-item label="试卷时长">
          <el-input v-model="paperlist.examSessionPaper.paperDuration" />
        </el-form-item>

        <el-form-item label="试卷总分">
          <el-input v-model="paperlist.examSessionPaper.paperTotalScore" />
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
import { updatePaper, getPaperList } from "@/api/exam";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const id = computed(() => {
  return route.query.paperId;
});

const back = () => {
  router.back();
};

const loading = ref(false);

const paperlist = ref({});

const getPaperInfo = async () => {
  if (!unref(id)) return;
  loading.value = true;
  const list = ref();
  await getPaperList(unref(id)).then((res) => {
    list.value = res.data.examSessionList;
  });
  for (let item of list.value) {
    if (item.examSessionPaper.paperId == id.value) {
      paperlist.value = item;
    }
  }
  console.log("paperlist.value", paperlist.value);
  loading.value = false;
};
getPaperInfo();
onMounted(() => {});

const onSubmit = async () => {
  loading.value = true;
  const info = {
    examid: paperlist.value.examSessionPaper.paperExam.examId,
    examname: paperlist.value.examSessionPaper.paperExam.examName,
    papername: paperlist.value.examSessionPaper.paperName,
    paperduration: paperlist.value.examSessionPaper.paperDuration,
    papertotalscore: paperlist.value.examSessionPaper.paperTotalScore,
    examstart: paperlist.value.examSessionStartTime,
    examend: paperlist.value.examSessionEndTime,
  };
  await updatePaper(unref(info));
  ElMessage.success("提交成功！");
  loading.value = false;
  back();
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
