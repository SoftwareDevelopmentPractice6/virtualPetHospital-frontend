<!-- 新增病例页 -->

<template>
  <div class="casedetail-wrapper">
    <!-- 返回键 -->
    <div class="header-wrapper">
      <div class="header-container">
        <el-button type="plain" @click="cancel">返回</el-button>
      </div>
    </div>

    <!-- 主体部分 -->
    <div class="main-wrapper">
      <!-- 表单信息 -->
      <div class="form-container">
        <div class="item diseaseName">
          疾病名称: <span>{{ curDisease.diseaseNameContent }}</span>
        </div>
        <div class="item diseaseCategory">
          疾病类型: <span>{{ curDisease.diseaseNameCategory }}</span>
        </div>
      </div>

      <!-- 上传文件 -->
      <div class="collapse-container">
        <el-collapse v-model="activeNames">
          <el-collapse-item
            v-for="(item, index) in submitInfo"
            :key="index"
            :title="item.title"
            :name="item.title"
          >
            <InputFile
              :filePath="[item.photo, item.video]"
              v-model:value="item.value"
            />
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>

    <!-- 按钮 -->
    <div class="btns-wrapper">
      <div class="btns-container">
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import InputFile from "./InputFile.vue";
import {
  getDiseaseById,
  insertCase,
  updateCase,
  deleteCaseById,
} from "@/api/case";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const diseaseNameId = route.query.diseaseNameId;

const curDisease = ref({}),
  curCase = ref([]);
const submitInfo = ref([]);

// 初始化病例数据
const initData = async () => {
  await getDiseaseById(diseaseNameId).then((res) => {
    curDisease.value = res.data;
  });
  const info = {
    diseaseNameId: diseaseNameId,
    admissionContent: "",
    caseCheckContent: "",
    diagnosticResultContent: "",
    treatmentProgramContent: "",
  };
  await insertCase(info).then((res) => {
    console.log("新增病例成功", res.data);
    curCase.value = res.data;
  });
  const caseVal = curCase.value;
  submitInfo.value.push({
    title: "接诊",
    photo: caseVal.medicalCaseAdmission.admissionPhoto,
    video: caseVal.medicalCaseAdmission.admissionVideo,
    value: "",
  });
  submitInfo.value.push({
    title: "病例检查",
    photo: caseVal.medicalCaseCaseCheck.caseCheckPhoto,
    video: caseVal.medicalCaseCaseCheck.caseCheckVideo,
    value: "",
  });
  submitInfo.value.push({
    title: "诊断结果",
    photo: caseVal.medicalCaseDiagnosticResult.diagnosticResultPhoto,
    video: caseVal.medicalCaseDiagnosticResult.diagnosticResultVideo,
    value: "",
  });
  submitInfo.value.push({
    title: "治疗方案",
    photo: caseVal.medicalCaseTreatmentProgram.treatmentProgramPhoto,
    video: caseVal.medicalCaseTreatmentProgram.treatmentProgramVideo,
    value: "",
  });
  console.log("submitInfo.value", submitInfo.value);
};

onMounted(() => {
  initData();
});

const activeNames = ref(["接诊"]); // 展开项

// 取消新增, 删除当前新病例
const cancel = async () => {
  await deleteCaseById(curCase.value.medicalCaseId).then((res) =>
    console.log("删除病例成功", res)
  );
  router.back();
};

// 提交病例更改
const onSubmit = async () => {
  const info = {
    medicalCaseId: curCase.value.medicalCaseId,
    diseaseNameId: route.query.diseaseNameId,
    admissionContent: submitInfo.value[0].value,
    caseCheckContent: submitInfo.value[1].value,
    diagnosticResultContent: submitInfo.value[2].value,
    treatmentProgramContent: submitInfo.value[3].value,
  };
  updateCase(info).then((res) => {
    console.log("新增病例成功1", res);
  });
  cancel();
};
</script>

<style lang="scss" scoped>
.casedetail-wrapper {
  overflow: auto;
  height: calc(100vh - 50px);
  padding: 10px;
  .header-wrapper {
    margin-bottom: 20px;
  }
  .main-wrapper {
    margin: 0 40px 20px;
    .form-container {
      margin-bottom: 15px;
      .item {
        margin-bottom: 10px;
        font-weight: 600;
        span {
          font-weight: 500;
        }
      }
    }
  }
  .btns-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    .btns-container {
      width: 140px;
    }
  }
}

::v-deep .el-collapse-item__header {
  font-size: 18px;
  font-weight: 600;
}
</style>
