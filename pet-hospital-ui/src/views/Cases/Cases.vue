<template>
  <div class="case-wrapper">
    <div class="case-container">
      <!-- 模糊搜索框 -->
      <div class="header-wrapper wrapper">
        <el-form :inline="true" :model="cases" class="search-form">
          <!-- 病种 -->
          <el-form-item label="疾病种类:">
            <el-input v-model="cases.category" placeholder="请输入疾病种类" />
          </el-form-item>
          <!--病名 -->
          <el-form-item label="疾病名称:">
            <el-input v-model="cases.name" placeholder="请输入疾病名称" />
          </el-form-item>
          <!-- 搜索 -->
          <el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
            <el-button type="info" @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 操作按键 -->
      <div class="btns-wrapper wrapper">
        <div class="btn-container">
          <router-link to="/cases/add">
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

      <!-- 病种表格 -->
      <div class="table-wrapper wrapper">
        <div class="table-container">
          <el-table
            ref="multipleTableRef"
            :data="diseaseData"
            v-loading="loading"
            height="500px"
            :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }"
          >
            <el-table-column type="selection" width="100" />
            <el-table-column type="index" label="序号" width="105" />
            <el-table-column prop="diseaseNameId" label="病名 ID" width="105" />
            <el-table-column
              prop="diseaseNameContent"
              label="疾病名称"
              width="310"
            />
            <el-table-column
              prop="diseaseNameCategory"
              label="疾病类型"
              width="310"
            />
            <el-table-column label="操作" width="300">
              <template #default="scope">
                <!-- <el-button
                  size="small"
                  @click.prevent="handleEdit(scope.$index)"
                  >编辑</el-button
                > -->
                <el-button size="small" @click.prevent="showCases(scope.$index)"
                  >查看病例</el-button
                >
                <el-button
                  size="small"
                  type="danger"
                  @click.prevent="handleDelete(scope.$index)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <!-- 病例表格 -->
      <el-dialog
        :width="dialogWidth"
        v-model="dialogTableVisible"
        :title="curItem.title"
      >
        <el-table
          ref="singleTableRef"
          :data="caseData"
          highlight-current-row
          height="400px"
          style="width: 100%"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column type="selection" width="30" />
          <el-table-column type="index" label="序号" width="55" />
          <el-table-column property="medicalCaseId" label="ID" width="55" />
          <el-table-column
            property="medicalCaseAdmission.admissionContent"
            label="接诊"
            width="230"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            property="medicalCaseCaseCheck.caseCheckContent"
            label="病例检查"
            width="250"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            property="medicalCaseDiagnosticResult.diagnosticResultContent"
            label="诊断结果"
            width="250"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            property="medicalCaseTreatmentProgram.treatmentProgramContent"
            label="治疗方案"
            width="250"
            :show-overflow-tooltip="true"
          />
          <el-table-column label="操作" width="180">
            <template #default="scope">
              <el-button size="small" @click.prevent="handleEdit(scope.$index)"
                >编辑</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click.prevent="handleDeleteCase(scope.$index)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="dialogTableVisible = false"
              >确定</el-button
            >
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import {
  getDisease,
  deleteDiseaseById,
  getMedicineByKeyword,
  getCase,
} from "@/api/case";
import { useRouter } from "vue-router";

const dialogWidth = reactive({
  type: String,
  default: "80%",
});

const router = useRouter();

const multipleTableRef = ref(); // 病名表格引用
const loading = ref(true); // 病名表格加载
const diseaseData = ref([]); // 病名数据
const curItem = ref({}); // 当前选中项

const dialogTableVisible = ref(false); // 病例表格可见性
const caseData = ref([]); // 病例数据

const cases = reactive({
  // 搜索框内容
  id: "",
  name: "",
  category: "",
});

// 排序函数（按照病种）
const compareByCate = (a, b) => {
  let cateA = a.diseaseNameCategory,
    cateB = b.diseaseNameCategory;
  if (cateA < cateB) {
    return -1;
  }
  if (cateA > cateB) {
    return 1;
  }
  return 0;
};

// 获取全部病名信息
const getDiseaseData = async () => {
  getDisease()
    .then((res) => {
      console.log("获取病名信息成功", res);
      diseaseData.value = res.data.diseaseNameList;
    })
    .catch((err) => console.log("获取病名信息失败", err));
  diseaseData.value.sort(compareByCate);
  loading.value = false;
  console.log("diseaseData", diseaseData);
};
getDiseaseData();

// 获取全部病例信息
const getCaseData = async (id) => {
  getCase(null, null, null, null, id)
    .then((res) => {
      console.log("获取病例列表成功", res);
      caseData.value = res.data.medicalCaseList.medicalCaseList;
    })
    .catch((err) => console.log("获取病例列表失败", err));
};
getDiseaseData();

// 单个删除
const handleDelete = async (val) => {
  await deleteDiseaseById(diseaseData.value[val].diseaseNameId)
    .then((res) => console.log("删除病例成功", res))
    .catch((err) => console.log("删除病例失败", err));
  getDiseaseData();
};

// 批量删除
const handleMultiDelete = async () => {
  let rows = multipleTableRef.value.getSelectionRows();
  for (let item of rows) {
    await deleteDiseaseById(item.diseaseNameId)
      .then((res) => console.log("删除病例成功", res))
      .catch((err) => console.log("删除病例失败", err));
  }
  getDiseaseData();
};

// 查看病例
const showCases = async (val) => {
  curItem.value = diseaseData.value[val];
  curItem.value.title =
    curItem.value.diseaseNameCategory +
    " > " +
    curItem.value.diseaseNameContent +
    " 病例 :";
  await getCaseData(curItem.value.diseaseNameId);
  dialogTableVisible.value = true;
};

// 编辑
const handleEdit = (row) => {
  const diseaseNameId = row.id;
  router.push(`/cases/detail?diseaseNameId=${diseaseNameId}`);
};

// 搜索
const onSubmit = async () => {
  if (cases.category === "") return;
  diseaseData.value = [];
  loading.value = true;
  await getMedicineByKeyword(cases.category, cases.name)
    .then((res) => {
      res.data.diseaseNameList.forEach((item) => {
        diseaseData.value.push(item);
      });
    })
    .catch((err) => console.log("搜索病例失败", err));
  loading.value = false;
  console.log("diseaseData", diseaseData);
};

// 重置
const resetForm = () => {
  cases.id = "";
  cases.category = "";
  cases.name = "";
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
      margin-bottom: 25px;
      .search-form {
        width: 800px;
        height: 32px;
      }
    }
    .btns-wrapper {
      margin-left: 80px;
      .btn-container {
        display: inline-block;
        margin-right: 8px;
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
/deep/ .el-dialog {
  width: 90% !important;
}
</style>
