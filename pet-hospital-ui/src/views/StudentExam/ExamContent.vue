<template>
  <div class="app-container home" v-loading="loading">
    <el-container>
      <el-header style="margin-top: 10px">
        <el-form class="search">
          <strong>试卷名称：</strong>{{ examlist.examSessionPaper.paperName }}
        </el-form>
      </el-header>
      <el-main class="main">
        <div class="common-layout">
          <el-container>
            <el-main class="inmain">
              <el-table
                :data="tableData"
                style="width: 100%"
                height="530px"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="index" label="序号" width="70" />

                <el-table-column
                  prop="questiontype"
                  label="问题类别"
                  width="120"
                />
                <el-table-column
                  prop="questioncontent"
                  label="问题内容"
                  width="920"
                />
                <el-table-column label="输入答案" width="100">
                  <input type="text" style="width: 65px" />
                </el-table-column>
                <el-table-column label="查看答案" width="120">
                  <template #default="scope">
                    <el-button size="small" @click="handleOpen(scope.$index)"
                      >查看</el-button
                    ></template
                  >
                </el-table-column>
              </el-table>
            </el-main>
          </el-container>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script setup>
import { computed, unref, onMounted, ref } from "vue";
import { getQuestionList, getExamList } from "@/api/exam";
import { ElMessageBox } from "element-plus";

import { useRoute } from "vue-router";
const route = useRoute();

const loading = ref();
const id = computed(() => {
  return route.query.examId;
});

const examlist = ref({});

const getExamInfo = async () => {
  if (!unref(id)) return;
  loading.value = true;
  const list = ref();
  await getExamList(unref(id)).then((res) => {
    list.value = res.data.examSessionList;
  });
  for (let item of list.value) {
    if (item.examSessionPaper.paperExam.examId == id.value) {
      examlist.value = item;
    }
  }
  console.log("examlist.value", examlist.value);
  loading.value = false;
};
getExamInfo();

const tableData = ref([]);

onMounted(() => {
  getAll();
});
const handleSelectionChange = (val) => {
  console.log(val);
};
// 获取全部信息
const getAll = async () => {
  tableData.value = [];
  let data = await getQuestionList().then((res) => res.data);
  data.questionList.forEach((item) => {
    var value = {
      questioncontent: item.questionContent,
      questionid: item.questionId,
      categoryname: item.questionCategory.categoryName,
      questionanswer: item.questionAnswer,
      categoryid: item.questionCategory.categoryId,
      questiontype: item.questionType,
      inputValue: "",
    };
    tableData.value.push(value);
  });
  console.log("tabledata", tableData);
};

const handleOpen = (curIndex) => {
  ElMessageBox.alert(tableData.value[curIndex].questionanswer, "答案", {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: "OK",
  });
};
</script>
<style lang="scss" scoped>
.page {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 30px 0px 0px 0px;
}
.search {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
  height: 100%;
}
.main {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px 10px 0px 10px;
}
.inmain {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px 0px 0px 0px;
}
.button {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.AddButton {
  width: 80px;
  height: 40px;
  margin: 0px 90px 30px 30px;
}
.DeleteButton {
  width: 80px;
  height: 40px;
  margin: 0px 30px 30px 90px;
}
.ChangeButton {
  width: 80px;
  height: 40px;
  margin: 0px 60px 30px 60px;
}
body {
  margin: 0;
}
.example-showcase .el-loading-mask {
  z-index: 9;
}
</style>
