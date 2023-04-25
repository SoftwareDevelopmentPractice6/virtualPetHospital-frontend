// 病例接口

import request from "@/utils/request";

const base = "disease/";

// 获取所有病名
export function getDisease() {
  return request({
    url: base + "disease",
    method: "get",
  });
}

// 根据 id 获取病名
export function getDiseaseById(id) {
  return request({
    url: base + "disease/sys",
    method: "get",
    params: {
      id,
    },
  });
}

// 根据关键字获取所有病例
export function getCase(
  admissionKeyword,
  caseCheckKeyword,
  diagnosticResultKeyword,
  treatmentProgramKeyword,
  diseaseNameId
) {
  return request({
    url: base + "medical-case",
    method: "get",
    params: {
      admissionKeyword,
      caseCheckKeyword,
      diagnosticResultKeyword,
      treatmentProgramKeyword,
      diseaseNameId,
    },
  });
}

// 根据 id 获取病例
export function getCaseById(id) {
  return request({
    url: base + "medical-case/sys",
    method: "get",
    params: {
      id,
    },
  });
}

// 根据疾病名称关键词搜索
export function getMedicineByKeyword(diseaseNameKeyword, diseaseNameCategory) {
  return request({
    url: base + "disease",
    method: "get",
    params: {
      diseaseNameKeyword,
      diseaseNameCategory,
    },
  });
}

// 根据药品名称获取药品信息
export function getCaseByName(medicineName) {
  return request({
    url: base + "medical-case",
    method: "get",
    params: {
      medicineName,
    },
  });
}

// 新增病例
export function insertCase(data) {
  return request({
    url: base + "medical-case",
    method: "post",
    data: data,
  });
}

// 更改药品信息
export function updateCase(data) {
  return request({
    url: base + "medical-case",
    method: "put",
    data: data,
  });
}

// 删除疾病信息
export function deleteDiseaseById(diseaseNameId) {
  return request({
    url: base + "disease",
    method: "delete",
    param: {
      diseaseNameId,
    },
  });
}

// 修改病例信息
export function updateMedicalCase(data) {
  return request({
    url: base + "medical-case",
    method: "put",
    data,
  });
}
