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
/* 
export function getMedicine() {
	return request({
		url: base + "medicine",
		method: "get",
	});
}
 */
/* export function getMedicineByCategory(medicineCategory) {
	return request({
		url: base + "medicine",
		method: "get",
		params: {
			medicineCategory,
		},
	});
} */
//根据疾病ID获取药品信息
/* export function getMedicineByID(medicineId) {
	return request({
		url: base + "medicine",
		method: "get",
		params: {
			medicineId,
		},
	});
} */
//根据药品名称获取药品信息
/* export function getCaseByName(medicineName) {
	return request({
		url: base + `medical-case/${medicineName}`,
		method: "get",
	});
} */
// 新增
export function insertCase(val) {
	return request({
		url: base + "medical-case",
		method: "post",
		data: val,
	});
}
//更改药品信息
export function updateCase(val) {
	return request({
		url: base + "medical-case",
		method: "put",
		data: val,
	});
}
//删除病例信息
export function deleteById(medicalCaseId) {
	return request({
		url: base + `medical-case/${medicalCaseId}`,
		method: "delete",
	});
}
