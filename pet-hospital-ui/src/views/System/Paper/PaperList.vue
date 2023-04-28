<template>
  <div class="case-wrapper">
    <div class="case-container">
      <!-- 模糊搜索框 -->
      <div class="header-wrapper wrapper">
        <el-form :inline="true" :model="paperlist" class="search">
          <el-form-item label="试卷名称">
            <el-input v-model="paperlist.papername" placeholder="试卷名称" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
            <el-button type="info" @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="btns-wrapper wrapper">
        <div class="btn-container">
          <router-link to="/paper/add">
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
            <el-table-column type="selection" width="70" />
            <el-table-column type="index" label="序号" width="80" />

            <el-table-column prop="papername" label="试卷名称" width="400" />
            <el-table-column
              prop="paperduration"
              label="试卷时长"
              width="160"
            />
            <el-table-column
              prop="papertotalscore"
              label="试卷总分"
              width="160"
            />

            <el-table-column label="操作" width="400">
              <template #default="scope">
                <el-button
                  size="small"
                  type="info"
                  plain
                  @click="handleView(scope.row)"
                  >查看试卷内容</el-button
                >

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
                  plain
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
import {
  getPaperList,
  deleteExaminationById,
  getPaperByName,
} from "@/api/exam";
import { useRouter } from "vue-router";
const router = useRouter();
const loading = ref();

let tableData = ref([]);
const paperlist = reactive({
  examrealid: "",

  paperid: "",
  papername: "",
  paperduration: "",
  papertotalscore: "",
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
  let data = await getPaperList().then((res) => res.data);
  data.examSessionList.forEach((item) => {
    var value = {
      examrealid: item.examSessionPaper.paperExam.examId,
      paperid: item.examSessionPaper.paperId,
      papername: item.examSessionPaper.paperName,
      paperduration: item.examSessionPaper.paperDuration,
      papertotalscore: item.examSessionPaper.paperTotalScore,
    };
    tableData.value.push(value);
  });
  console.log("tabledata", tableData);
};

const handleDelete = (val) => {
  console.log("val", val);
  deletePaper(val.examrealid).then(() => {
    getAll();
  });
};
// 删除接口
const deletePaper = async (examrealid) => {
  await deleteExaminationById(examrealid).then((res) =>
    console.log("res", res)
  );
};
const onSubmit = async () => {
  // console.log("submit!");
  if (paperlist.papername === "") return;
  tableData.value = [];
  loading.value = true;
  const data = await getPaperByName(paperlist.papername).then(
    (res) => res.data
  );
  data.examSessionList.forEach((item) => {
    var value = {
      paperid: item.examSessionPaper.paperId,
      papername: item.examSessionPaper.paperName,
      paperduration: item.examSessionPaper.paperDuration,
      papertotalscore: item.examSessionPaper.paperTotalScore,
    };
    tableData.value.push(value);
  });
  loading.value = false;

  console.log("tabledata", tableData);
};

const handleMultiDelete = async () => {
  let rows = multipleTableRef.value.getSelectionRows();
  for (let item of rows) {
    await deleteExaminationById(item.examrealid)
      .then((res) => console.log("删除试卷成功", res))
      .catch((err) => console.log("删除试卷失败", err));
  }
  getAll();
};
const resetForm = () => {
  paperlist.examrealid = "";
  paperlist.paperid = "";
  paperlist.papername = "";
  paperlist.paperduration = "";
  paperlist.papertotalscore = "";
};

const handleEdit = (examSessionList) => {
  const paperid = examSessionList.paperid;
  // router.push(`/exams/update?examSessionId=${id}`);
  router.push({ path: "update", query: { paperId: paperid } });
};

const handleView = (examSessionList) => {
  const paperid = examSessionList.paperid;
  // router.push(`/exams/update?examSessionId=${id}`);
  router.push({ path: "content", query: { paperId: paperid } });
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
