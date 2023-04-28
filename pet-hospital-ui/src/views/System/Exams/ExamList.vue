<template>
  <div class="case-wrapper">
    <div class="case-container">
      <!-- 模糊搜索框 -->
      <div class="header-wrapper wrapper">
        <el-form :inline="true" :model="examlist" class="search">
          <el-form-item label="考试名称">
            <el-input v-model="examlist.examname" placeholder="考试名称" />
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
          <router-link to="/exams/add">
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
            height="400px"
            :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column type="index" label="序号" width="55" />

            <el-table-column prop="examname" label="考试名称" width="200" />
            <el-table-column prop="examduration" label="考试时长" width="110" />
            <el-table-column
              prop="examtotalscore"
              label="考试总分"
              width="110"
            />
            <el-table-column
              prop="examstart"
              label="考试开始时间"
              width="170"
            />
            <el-table-column prop="examend" label="考试结束时间" width="170" />
            <el-table-column
              prop="papername"
              label="考试试卷名称"
              width="200"
            />

            <el-table-column label="操作" width="150">
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
import { getExamList, deleteExaminationById, getExamByName } from "@/api/exam";
import { useRouter } from "vue-router";
const router = useRouter();
const loading = ref();

const multipleTableRef = ref();

// let tableData = reactive([]);
const examlist = reactive({
  id: "",
  examname: "",
  examrealid: "",
  examduration: "",
  examtotalscore: "",
  examstart: "",
  examend: "",
  papername: "",
});
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
  loading.value = true;
  let data = await getExamList().then((res) => res.data);
  data.examSessionList.forEach((item) => {
    var value = {
      id: item.examSessionId,
      examname: item.examSessionPaper.paperExam.examName,
      examrealid: item.examSessionPaper.paperExam.examId,
      examduration: item.examSessionPaper.paperDuration,
      examtotalscore: item.examSessionPaper.paperTotalScore,
      examstart: item.examSessionStartTime,
      examend: item.examSessionEndTime,
      papername: item.examSessionPaper.paperName,
    };
    tableData.value.push(value);
  });
  console.log("tabledata", tableData);
};

const handleDelete = (val) => {
  console.log("val", val);
  deleteExam(val.examrealid).then(() => {
    tableData.value = [];
    getAll();
  });
};
// 删除接口
const deleteExam = async (examrealid) => {
  await deleteExaminationById(examrealid).then((res) =>
    console.log("res", res)
  );
};
const onSubmit = async () => {
  // console.log("submit!");
  if (examlist.examname === "") return;
  tableData.value = [];
  loading.value = true;
  const data = await getExamByName(examlist.examname).then((res) => res.data);
  data.examSessionList.forEach((item) => {
    var value = {
      examname: item.examSessionPaper.paperExam.examName,
      examrealid: item.examSessionPaper.paperExam.examId,
      examduration: item.examSessionPaper.paperDuration,
      examtotalscore: item.examSessionPaper.paperTotalScore,
      examstart: item.examSessionStartTime,
      examend: item.examSessionEndTime,
      papername: item.examSessionPaper.paperName,
    };
    tableData.value.push(value);
  });
  loading.value = false;

  console.log("tabledata", tableData);
};

const resetForm = () => {
  examlist.id = "";
  examlist.examname = "";
  examlist.examrealid = "";
  examlist.examduration = "";
  examlist.examtotalscore = "";
  examlist.examstart = "";
  examlist.examend = "";
  examlist.papername = "";
};
const handleMultiDelete = async () => {
  let rows = multipleTableRef.value.getSelectionRows();
  for (let item of rows) {
    await deleteExaminationById(item.examrealid)
      .then((res) => console.log("删除考试成功", res))
      .catch((err) => console.log("删除考试失败", err));
  }
  getAll();
};
const handleEdit = (examSessionList) => {
  const examrealid = examSessionList.examrealid;
  // router.push(`/exams/update?examSessionId=${id}`);
  router.push({ path: "update", query: { examId: examrealid } });
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
