<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header" height="30px">
        <el-button type="plain" @click="cancel">Back</el-button>
      </el-header>
      <el-main>
        <el-header>
          <el-form-item label="疾病名称">
            <el-input
              v-model="submitInfo.medicalCaseDiseaseName.diseaseNameContent"
              disabled
            />
          </el-form-item>
          <el-form-item label="疾病类型">
            <el-input
              v-model="submitInfo.medicalCaseDiseaseName.diseaseNameCategory"
              disabled
            />
          </el-form-item>
        </el-header>
        <el-main>
          <div class="demo-collapse">
            <el-collapse v-model="activeNames">
              <el-collapse-item title="疾病" name="疾病信息">
                <InputFile
                  :filePath="submitInfo.medicalCaseDiseaseName.diseaseNamePhoto"
                  v-model:value="
                    submitInfo.medicalCaseDiseaseName.diseaseNameContent
                  "
                />
              </el-collapse-item>
              <el-collapse-item title="接诊" name="接诊">
                <InputFile
                  :filePath="submitInfo.medicalCaseAdmission.admissionPhoto"
                  v-model:value="
                    submitInfo.medicalCaseAdmission.admissionContent
                  "
                />
              </el-collapse-item>
              <el-collapse-item title="病例检查" name="病例检查">
                <InputFile
                  :filePath="submitInfo.medicalCaseCaseCheck.caseCheckPhoto"
                  v-model:value="
                    submitInfo.medicalCaseCaseCheck.caseCheckContent
                  "
                />
              </el-collapse-item>
              <el-collapse-item title="诊断结果" name="诊断结果">
                <InputFile
                  :filePath="
                    submitInfo.medicalCaseDiagnosticResult.diagnosticResultPhoto
                  "
                  v-model:value="
                    submitInfo.medicalCaseDiagnosticResult
                      .diagnosticResultContent
                  "
                />
              </el-collapse-item>
              <el-collapse-item title="治疗方案" name="治疗方案">
                <InputFile
                  :filePath="
                    submitInfo.medicalCaseTreatmentProgram.treatmentProgramPhoto
                  "
                  v-model:value="
                    submitInfo.medicalCaseTreatmentProgram
                      .treatmentProgramContent
                  "
                />
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-main>
        <el-form-item class="footer-btn">
          <el-button type="primary" @click="onSubmit"> 保存 </el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-main>
    </el-container>
  </div>
  <!--   <pre>
    {{ submitInfo.medicalCaseTreatmentProgram.treatmentProgramPhoto }}
  </pre> -->
</template>

<script  setup>
import { ref, computed, onMounted, unref } from "vue";
import InputFile from "./InputFile.vue";
import { getMedicalCase, putMedicalCase, insertCase } from "@/api/case";

import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

const submitInfo = ref({
  medicalCaseAdmission: {},
  medicalCaseCaseCheck: {},
  medicalCaseDiagnosticResult: {},
  medicalCaseDiseaseName: {},
  medicalCaseTreatmentProgram: {},
  medicalCaseId: "",
});
const diseaseNameId = computed(() => {
  return route.query.diseaseNameId.toString();
});
const getMedicalCaseApi = async () => {
  if (!unref(diseaseNameId)) return;
  const res = await getMedicalCase({ diseaseNameId: unref(diseaseNameId) });
  console.log("res", res);
  submitInfo.value = res.data.medicalCaseList.medicalCaseList[0];
};

const activeNames = ref(["接诊"]);

const cancel = () => {
  router.back();
};

/* const val = submitInfo.medicalCaseTreatmentProgram.treatmentProgramPhoto;
let vars = val.split('/')
vars[2] = filepath.
  let final = vars.join('/') */

const onSubmit = async () => {
  const p = {
    medicalCaseId: unref(submitInfo).medicalCaseId,
    diseaseNameId: unref(diseaseNameId),
    admissionContent: unref(submitInfo).medicalCaseAdmission.admissionContent,
    caseCheckContent: unref(submitInfo).medicalCaseCaseCheck.caseCheckContent,
    diagnosticResultContent:
      unref(submitInfo).medicalCaseDiagnosticResult.diagnosticResultContent,
    treatmentProgramContent:
      unref(submitInfo).medicalCaseTreatmentProgram.treatmentProgramContent,
  };

  if (unref(diseaseNameId)) {
    await putMedicalCase(p);
  } else {
    await insertCase(p);
  }
  cancel();
};

onMounted(() => {
  getMedicalCaseApi();
});
</script>
<style lang="scss" scoped>
.common-layout {
  height: calc(100vh - 50px);
  overflow: auto;
}
/* .upload {
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 70px;
} */
.ID {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px 900px 0px 15px;
}
.name {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px 900px 0px 0px;
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
.footer-btn {
  &.el-form-item {
    :deep(.el-form-item__content) {
      justify-content: flex-end;
    }
  }
}
</style>