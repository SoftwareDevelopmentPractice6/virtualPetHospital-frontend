<template>
  <div class="case-wrapper">
    <div class="case-container">
      <!-- 模糊搜索框 -->
      <div class="header-wrapper wrapper">
        <el-form :inline="true" :model="questionlist" class="search">
          <el-form-item label="问题类别">
            <el-input
              v-model="questionlist.questiontype"
              placeholder="问题类别"
            />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
            <el-button type="info" @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 操作按键 -->
      <div class="btns-wrapper wrapper">
        <div class="btn-container">
          <router-link to="/question/add">
            <el-button class="AddButton" type="success" plain>新增</el-button>
          </router-link>
        </div>
        <div class="btn-container"></div>
        <div class="btn-container">
          <el-button
            class="DeleteButton"
            @click="handleMultiDelete"
            type="danger"
            plain
            >删除</el-button
          >
        </div>
      </div>
      <div class="table-wrapper wrapper">
        <div class="table-container">
          <el-table
            ref="multipleTableRef"
            :data="tableData"
            height="500px"
            :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column type="index" label="序号" width="55" />

            <el-table-column prop="questiontype" label="问题类别" width="100" />
            <el-table-column
              prop="questioncontent"
              label="问题内容"
              width="750"
            />
            <el-table-column
              prop="questionanswer"
              label="问题答案"
              width="100"
            />

            <el-table-column label="操作" width="200">
              <template #default="scope">
                <el-button
                  size="small"
                  type="warning"
                  plain
                  @click="handleEdit(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from "vue";
import { getQuestionList, deleteQuestion, getQuestionByType } from "@/api/exam";
import { useRouter } from "vue-router";
const router = useRouter();
const loading = ref();

let tableData = ref([]);
const questionlist = reactive({
  questionid: "",
  questioncontent: "",
  questionanswer: "",
  questiontype: "",
  categoryid: "",
});
const multipleTableRef = ref();

onMounted(() => {
  getAll();
});
const handleSelectionChange = (val) => {
  console.log(val);
};
// 获取全部信息
const getAll = async () => {
  tableData.value = [];
  loading.value = true;
  let data = await getQuestionList().then((res) => res.data);
  data.questionList.forEach((item) => {
    var value = {
      questionid: item.questionId,
      questioncontent: item.questionContent,
      questionanswer: item.questionAnswer,
      questiontype: item.questionType,
      categoryid: item.questionCategory.categoryId,
    };
    tableData.value.push(value);
  });
  console.log("tabledata", tableData);
};

const handleDelete = (val) => {
  console.log("val", val);
  deletequestion(val.questionid).then(() => {
    tableData = reactive([]);
    getAll();
  });
};
// 删除接口
const deletequestion = async (questionid) => {
  await deleteQuestion(questionid).then((res) => console.log("res", res));
};
//模糊搜索
const onSubmit = async () => {
  // console.log("submit!");
  if (questionlist.questiontype === "") return;
  tableData.value = [];
  loading.value = true;
  const data = await getQuestionByType(questionlist.questiontype).then(
    (res) => res.data
  );
  data.questionList.forEach((item) => {
    var value = {
      questionid: item.questionId,
      questioncontent: item.questionContent,
      questionanswer: item.questionAnswer,
      questiontype: item.questionType,
      categoryid: item.questionCategory.categoryId,
    };
    tableData.value.push(value);
  });
  loading.value = false;

  console.log("tabledata", tableData);
};
const handleMultiDelete = async () => {
  let rows = multipleTableRef.value.getSelectionRows();
  for (let item of rows) {
    await deleteQuestion(item.questionid)
      .then((res) => console.log("删除问题成功", res))
      .catch((err) => console.log("删除问题失败", err));
  }
  getAll();
};
const resetForm = () => {
  questionlist.questionid = "";
  questionlist.questioncontent = "";
  questionlist.questionanswer = "";
  questionlist.questiontype = "";
  questionlist.categoryid = "";
};
const handleEdit = (questionList) => {
  const questionid = questionList.questionid;
  // router.push(`/exams/update?examSessionId=${id}`);
  router.push({ path: "update", query: { questionId: questionid } });
};
</script>
<style lang="scss" scoped>
.case-wrapper {
  width: 100%;
  height: calc(100vh - 50px);
  padding: 30px;
  .case-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    .wrapper {
      width: 100%;
      margin-bottom: 10px;
    }
    .header-wrapper {
      display: flex;
      justify-content: center;
      .search-form {
        width: 800px;
        height: 32px;
      }
    }
    .btns-wrapper {
      margin-left: 75px;
      .btn-container {
        display: inline-block;
        margin-right: 7px;
      }
    }
    .table-wrapper {
      display: flex;
      justify-content: center;
      width: 100%;
      .table-container {
        width: 95%;
      }
    }
  }
}
</style>
