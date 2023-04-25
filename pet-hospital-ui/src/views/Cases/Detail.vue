<template>
  <div class="casedetail-wrapper">
    <div class="header-wrapper">
      <div class="header-container">
        <el-button type="plain" @click="cancel">返回</el-button>
      </div>
    </div>
    <div class="main-wrapper">
      <div class="form-container">
        <div class="item diseaseCategory">
          疾病类型: <span>{{ curDisease.diseaseNameCategory }}</span>
        </div>
        <div class="item diseaseName">
          疾病名称: <span>{{ curDisease.diseaseNameContent }}</span>
        </div>
      </div>
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
import { getDiseaseById, getCaseById, updateCase } from "@/api/case";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const diseaseNameId = route.query.diseaseNameId,
  medicalCaseId = route.query.medicalCaseId;

const curDisease = ref({}),
  curCase = ref([]);
const submitInfo = ref([]);

const initData = async () => {
  await getDiseaseById(diseaseNameId).then((res) => {
    curDisease.value = res.data;
  });
  await getCaseById(medicalCaseId).then((res) => {
    curCase.value = res.data;
  });
  const caseVal = curCase.value;
  submitInfo.value.push({
    title: "接诊",
    photo: caseVal.medicalCaseAdmission.admissionPhoto,
    video: caseVal.medicalCaseAdmission.admissionVideo,
    value: caseVal.medicalCaseAdmission.admissionContent,
  });
  submitInfo.value.push({
    title: "病例检查",
    photo: caseVal.medicalCaseCaseCheck.caseCheckPhoto,
    video: caseVal.medicalCaseCaseCheck.caseCheckVideo,
    value: caseVal.medicalCaseCaseCheck.caseCheckContent,
  });
  submitInfo.value.push({
    title: "诊断结果",
    photo: caseVal.medicalCaseDiagnosticResult.diagnosticResultPhoto,
    video: caseVal.medicalCaseDiagnosticResult.diagnosticResultVideo,
    value: caseVal.medicalCaseDiagnosticResult.diagnosticResultContent,
  });
  submitInfo.value.push({
    title: "治疗方案",
    photo: caseVal.medicalCaseTreatmentProgram.treatmentProgramPhoto,
    video: caseVal.medicalCaseTreatmentProgram.treatmentProgramVideo,
    value: caseVal.medicalCaseTreatmentProgram.treatmentProgramContent,
  });
  console.log("submitInfo.value", submitInfo.value);
};

onMounted(() => {
  initData();
});

const activeNames = ref(["接诊"]); // 展开项

const getMedicalCaseData = async () => {};
getMedicalCaseData();

const cancel = () => {
  router.back();
};

const onSubmit = async () => {
  const info = {
    medicalCaseId: route.query.medicalCaseId,
    diseaseNameId: route.query.diseaseNameId,
    admissionContent: submitInfo.value[0].value,
    caseCheckContent: submitInfo.value[1].value,
    diagnosticResultContent: submitInfo.value[2].value,
    treatmentProgramContent: submitInfo.value[3].value,
  };
  updateCase(info);
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
