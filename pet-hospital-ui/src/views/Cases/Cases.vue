<!-- 疾病/病例管理首页 -->

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
            <el-table-column type="selection" width="90" />
            <el-table-column type="index" label="序号" width="90" />
            <el-table-column prop="diseaseNameId" label="病名 ID" width="90" />
            <el-table-column
              prop="diseaseNameContent"
              label="疾病名称"
              width="310"
            />
            <el-table-column
              prop="diseaseNameCategory"
              label="疾病种类"
              width="310"
            />
            <el-table-column label="操作" width="320">
              <template #default="scope">
                <el-button
                  size="small"
                  type="info"
                  plain
                  @click.prevent="showCases(scope.$index)"
                  >查看病例</el-button
                >
                <el-button
                  size="small"
                  type="warning"
                  plain
                  @click.prevent="editDisease(scope.$index)"
                  >编辑</el-button
                >
                <el-button
                  size="small"
                  type="danger"
                  plain
                  @click.prevent="handleDelete(scope.$index)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <!-- 病例表格 -->
      <el-dialog v-model="dialogTableVisible" :title="curItem.title">
        <el-button type="success" plain @click="addCase" class="addcase-btn"
          >新增病例</el-button
        >
        <el-button
          type="danger"
          plain
          @click="multiDeleteCase"
          class="deletecase-btn"
          >删除病例</el-button
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
            width="210"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            property="medicalCaseCaseCheck.caseCheckContent"
            label="病例检查"
            width="230"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            property="medicalCaseDiagnosticResult.diagnosticResultContent"
            label="诊断结果"
            width="230"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            property="medicalCaseTreatmentProgram.treatmentProgramContent"
            label="治疗方案"
            width="280"
            :show-overflow-tooltip="true"
          />
          <el-table-column label="操作" width="230">
            <template #default="scope">
              <el-button
                size="small"
                type="info"
                plain
                @click.prevent="detailedCase(scope.$index)"
                >查看详情</el-button
              >
              <el-button
                size="small"
                type="warning"
                plain
                @click.prevent="editCase(scope.$index)"
                >编辑</el-button
              >
              <el-button
                size="small"
                type="danger"
                plain
                @click.prevent="handleDeleteCase(scope.$index)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>

      <!-- 编辑疾病表单 -->
      <el-dialog
        v-model="dialogFormVisible"
        title="编辑疾病信息："
        style="max-width: 600px"
        class="dialog-form"
      >
        <el-form :model="form" label-width="70px">
          <el-form-item label="疾病 ID">
            <el-input v-model="form.diseaseId" disabled />
          </el-form-item>
          <el-form-item label="疾病名称">
            <el-input v-model="form.diseaseName" />
          </el-form-item>
          <el-form-item label="疾病种类">
            <el-input v-model="form.diseaseCategory" />
          </el-form-item>
          <el-form-item>
            <div class="btn-container">
              <el-button type="primary" @click="onSubmitForm">确定</el-button>
              <el-button @click="cancelForm">取消</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import {
  getDisease,
  deleteDiseaseById,
  getDiseaseByKeyword,
  getCase,
  deleteCaseById,
  updateDisease,
} from "@/api/case";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const router = useRouter();

const multipleTableRef = ref(); // 病名表格引用
const loading = ref(true); // 病名表格加载
const diseaseData = ref([]); // 病名数据
const curItem = ref({}); // 当前选中项

const singleTableRef = ref(); // 病例表格引用
const dialogTableVisible = ref(false); // 病例表格可见性
const caseData = ref([]); // 病例数据

const dialogFormVisible = ref(false); // 编辑疾病表单可见性
const form = reactive({
  // 编辑疾病表单数据
  diseaseId: "",
  diseaseName: "",
  diseaseCategory: "",
});
const curDisease = ref(); // 编辑疾病对象

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

// 编辑疾病
const editDisease = (val) => {
  dialogFormVisible.value = true;
  curDisease.value = diseaseData.value[val];
  const cueVal = curDisease.value;
  form.diseaseId = cueVal.diseaseNameId;
  form.diseaseName = cueVal.diseaseNameContent;
  form.diseaseCategory = cueVal.diseaseNameCategory;
};

// 提交编辑疾病表单
const onSubmitForm = () => {
  const info = {
    diseaseNameId: curDisease.value.diseaseNameId,
    diseaseNameContent: form.diseaseName,
    diseaseNameCategory: form.diseaseCategory,
  };
  updateDisease(info).then((res) => {
    console.log("编辑疾病成功", res);
  });
  cancelForm();
  getDiseaseData();
};

// 关闭编辑疾病表格
const cancelForm = () => {
  dialogFormVisible.value = false;
};

// 单个删除疾病
const handleDelete = async (val) => {
  await deleteDiseaseById(diseaseData.value[val].diseaseNameId)
    .then((res) => console.log("删除病例成功", res))
    .catch((err) => console.log("删除病例失败", err));
  getDiseaseData();
};

// 批量删除疾病
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
    " 全部病例 :";
  await getCaseData(curItem.value.diseaseNameId);
  dialogTableVisible.value = true;
};

// 编辑病例
const editCase = (id) => {
  router.push({
    path: "editCase",
    query: {
      diseaseNameId: caseData.value[id].medicalCaseDiseaseName.diseaseNameId,
      medicalCaseId: caseData.value[id].medicalCaseId,
    },
  });
};

// 查看病例详情
const detailedCase = (id) => {
  router.push({
    path: "caseDetail",
    query: {
      diseaseNameId: caseData.value[id].medicalCaseDiseaseName.diseaseNameId,
      medicalCaseId: caseData.value[id].medicalCaseId,
    },
  });
};

// 新增病例
const addCase = () => {
  router.push({
    path: "addCase",
    query: {
      diseaseNameId: curItem.value.diseaseNameId,
    },
  });
};

// 单个删除病例
const handleDeleteCase = async (val) => {
  await deleteCaseById(caseData.value[val].medicalCaseId)
    .then((res) => console.log("删除病例成功", res))
    .catch((err) => console.log("删除病例失败", err));
  getCaseData(curItem.value.diseaseNameId);
};

// 批量删除病例
const multiDeleteCase = async () => {
  let rows = singleTableRef.value.getSelectionRows();
  for (let item of rows) {
    await deleteCaseById(item.medicalCaseId)
      .then((res) => console.log("删除病例成功", res))
      .catch((err) => console.log("删除病例失败", err));
  }
  getCaseData(curItem.value.diseaseNameId);
};

// 模糊搜索
const onSubmit = async () => {
  diseaseData.value = [];
  loading.value = true;
  if (!cases.name && !cases.category) {
    getDiseaseData();
    return;
  } else if (!cases.name && cases.category) {
    ElMessage({
      message: "疾病名称为必填项",
      type: "warning",
    });
    getDiseaseData();
    return;
  }
  await getDiseaseByKeyword(cases.name, cases.category)
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
    .addcase-btn,
    .deletecase-btn {
      float: right;
      position: relative;
      right: 65px;
      bottom: 25px;
    }
    .deletecase-btn {
      right: 80px;
    }
  }
}
::v-deep .el-dialog {
  width: 90% !important;
}
::v-deep .el-dialog__body {
  padding: 0 20px 30px;
}
::v-deep .el-dialog__header {
  padding-bottom: 0;
}

.dialog-form {
  .el-form {
    padding: 35px 50px 0;
    .el-form-item {
      margin-bottom: 25px;
      .btn-container {
        margin-top: 10px;
      }
    }
  }
}
</style>
