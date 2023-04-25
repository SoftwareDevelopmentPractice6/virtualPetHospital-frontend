<template>
  <div class="casedetail-wrapper">
    <div class="header-wrapper">
      <div class="header-container">
        <el-button type="plain" @click="cancel">返回</el-button>
      </div>
    </div>
    <div class="title-wrapper">
      <div class="title-container"></div>
    </div>
    <div class="main-wrapper">
      <div class="demo-collapse">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="接诊" name="接诊">
            <InputFile :filePath="[filePaths.photos[0], filePaths.videos[0]]" />
          </el-collapse-item>
          <el-collapse-item title="病例检查" name="病例检查">
            <InputFile :filePath="[filePaths.photos[1], filePaths.videos[1]]" />
          </el-collapse-item>
          <el-collapse-item title="诊断结果" name="诊断结果">
            <InputFile :filePath="[filePaths.photos[2], filePaths.videos[2]]" />
          </el-collapse-item>
          <el-collapse-item title="治疗方案" name="治疗方案">
            <InputFile :filePath="[filePaths.photos[3], filePaths.videos[3]]" />
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <div class="btns-wrapper">
      <el-button type="primary" @click="onSubmit"> 保存 </el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import InputFile from "./InputFile.vue";
import { getDiseaseById, getCaseById, updateCase } from "@/api/case";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const diseaseNameId = route.query.diseaseNameId,
  medicalCaseId = route.query.medicalCaseId;

const curDisease = ref({}),
  curCase = ref([]);
const filePaths = reactive({
  photos: [],
  videos: [],
});

const initData = async () => {
  await getDiseaseById(diseaseNameId).then((res) => {
    curDisease.value = res.data;
  });
  await getCaseById(medicalCaseId).then((res) => {
    curCase.value = res.data;
  });
  const caseVal = curCase.value;
  filePaths.photos = [
    caseVal.medicalCaseAdmission.admissionPhoto,
    caseVal.medicalCaseCaseCheck.caseCheckPhoto,
    caseVal.medicalCaseDiagnosticResult.diagnosticResultPhoto,
    caseVal.medicalCaseTreatmentProgram.treatmentProgramPhoto,
  ];
  filePaths.videos = [
    caseVal.medicalCaseAdmission.admissionVideo,
    caseVal.medicalCaseCaseCheck.caseCheckVideo,
    caseVal.medicalCaseDiagnosticResult.diagnosticResultVideo,
    caseVal.medicalCaseTreatmentProgram.treatmentProgramVideo,
  ];
  console.log("filePaths.value", filePaths.value);
};

onMounted(() => {
  initData();
});

const activeNames = ref(["接诊"]); // 展开项

const submitInfo = reactive({
  medicalCaseAdmission: {},
  medicalCaseCaseCheck: {},
  medicalCaseDiagnosticResult: {},
  medicalCaseDiseaseName: {},
  medicalCaseTreatmentProgram: {},
  medicalCaseId: "",
});

const getMedicalCaseData = async () => {};
getMedicalCaseData();

const cancel = () => {
  router.back();
};

const onSubmit = async () => {
  const info = {
    medicalCaseId: route.query.medicalCaseId,
    diseaseNameId: route.query.diseaseNameId,
    admissionContent: submitInfo.medicalCaseAdmission.admissionContent,
    caseCheckContent: submitInfo.medicalCaseCaseCheck.caseCheckContent,
    diagnosticResultContent:
      submitInfo.medicalCaseDiagnosticResult.diagnosticResultContent,
    treatmentProgramContent:
      submitInfo.medicalCaseTreatmentProgram.treatmentProgramContent,
  };
  updateCase(info);
  cancel();
};
</script>

<style lang="scss" scoped>
.casedetail-wrapper {
  padding: 10px 25px;
  .header-wrapper {
    margin-bottom: 5px;
  }
  .main-wrapper {
  }
}

::v-deep .el-collapse-item__header {
  font-size: 20px;
}
</style>
