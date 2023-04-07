// 病例接口

import request from "@/utils/request";

const base = "disease/";

// 获取所有病种
export function getDisease() {
  return request({
    url: base + "disease",
    method: "get",
  });
}

// 获取所有病例
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
