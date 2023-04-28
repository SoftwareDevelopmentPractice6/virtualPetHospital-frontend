<template>
  <el-container>
    <el-header class="header" height="20px">
      <router-link to="/question/list">
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
        <el-form-item label="问题类别">
          <el-input v-model="questionlist.questiontype" />
        </el-form-item>

        <el-form-item label="问题内容">
          <el-input
            v-model="questionlist.questioncontent"
            :autosize="{ minRows: 4 }"
            type="textarea"
          />
        </el-form-item>

        <el-form-item>
          <el-button class="SubmitButton" type="primary" @click="onSubmit"
            >保存</el-button
          >
          <router-link to="/question/list">
            <el-button class="CancelButton" @click="back">取消</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script setup>
import { reactive } from "vue";
import { ElMessage } from "element-plus";
import { insertQuestion } from "../../../api/exam";
import { useRouter } from "vue-router";

const router = useRouter();

const questionlist = reactive({
  questioncontent: "",
  questiontype: "",
  categoryid: "",
});
const onSubmit = () => {
  console.log(questionlist);
  var data = {
    questionContent: questionlist.questioncontent,
    questionType: questionlist.questiontype,
    categoryId: questionlist.categoryid,
  };
  console.log("data", data);
  insert(data).then(() => {
    ElMessage("提交成功！");
  });
};
const insert = async (val) => {
  let value = await insertQuestion(val).then((res) => {
    res.data;
  });
  console.log("val", value);
};

const back = () => {
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
