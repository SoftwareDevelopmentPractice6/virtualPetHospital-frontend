<template>
  <el-container>
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
          <el-input v-model="paperlist.papername" />
        </el-form-item>
        <el-form-item label="试卷时长">
          <el-input v-model="paperlist.paperduration" />
        </el-form-item>

        <el-form-item label="试卷总分">
          <el-input v-model="paperlist.papertotalscore" />
        </el-form-item>

        <el-form-item>
          <el-button class="SubmitButton" type="primary" @click="onSubmit"
            >保存</el-button
          >
          <router-link to="/exams/list">
            <el-button class="CancelButton">取消</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script setup>
import { reactive } from "vue";
import { ElMessage } from "element-plus";
import { insertPaper } from "../../../api/exam";
const paperlist = reactive({
  paperid: "",
  papername: "",
  paperduration: "",
  papertotalscore: "",
});
const onSubmit = () => {
  console.log(paperlist);
  var data = {
    paperId: paperlist.paperid,
    paperName: paperlist.papername,
    paperDuration: paperlist.paperduration,
    paperTotalScore: paperlist.papertotalscore,
  };
  console.log("data", data);
  insert(data).then(() => {
    // console.log(res);
    // if(res.code !== 200) return  ElMessage.error('提交失败！')
    // medicine = {}
    ElMessage("提交成功！");
  });
};
const insert = async (val) => {
  let value = await insertPaper(val).then((res) => {
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
