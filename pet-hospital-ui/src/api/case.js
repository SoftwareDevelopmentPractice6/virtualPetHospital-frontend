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
    url: `${base}disease/sys/${id}`,
    method: "get",
  });
}

// 根据疾名&病种关键词搜索
export function getDiseaseByKeyword(diseaseNameKeyword, diseaseNameCategory) {
  return request({
    url: `${base}disease/${diseaseNameKeyword}`,
    method: "get",
    params: {
      diseaseNameCategory,
    },
  });
}

// 更改疾病信息
export function updateDisease(data) {
  return request({
    url: base + "disease",
    method: "put",
    data: data,
  });
}

// 删除疾病
export function deleteDiseaseById(diseaseNameId) {
  return request({
    url: `${base}disease/${diseaseNameId}`,
    method: "delete",
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
    url: `${base}medical-case/sys/${id}`,
    method: "get",
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

// 更改病例信息
export function updateCase(data) {
  return request({
    url: base + "medical-case",
    method: "put",
    data: data,
  });
}

// 删除病例
export function deleteCaseById(id) {
  return request({
    url: `${base}medical-case/${id}`,
    method: "delete",
  });
}
