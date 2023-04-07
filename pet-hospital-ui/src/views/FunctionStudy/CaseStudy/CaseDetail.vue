<!-- 病例学习：病例详情 -->

<template>
  <div class="casedetail-wrapper">
    <div class="casedetail-container">
      <div class="disease-name">{{ diseaseName }}</div>
      <div class="case-wrapper">
        <div class="case-title"></div>
        <div class="case-container">
          <div class="text-wrapper">
            <div class="title"></div>
          </div>
          <div class="image-wrapper">
            <div class="title"></div>
          </div>
          <div class="video-wrapper">
            <div class="title"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCase } from "@/api/case";
import { reactive } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const params = route.params;

let caseData = reactive();
const diseaseName = params.diseaseName,
  diseaseId = params.diseaseId;

getCase()
  .then((res) => {
    caseData = res.data.medicalCaseList;
    console.log("caseData", caseData);
  })
  .catch(() => {});
</script>

<style lang="scss" scoped>
.casedetail-wrapper {
  width: 100%;
}
</style>
