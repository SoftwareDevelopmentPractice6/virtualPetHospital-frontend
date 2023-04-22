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

//根据疾病名称关键词搜索
export function getMedicineByKeyword(diseaseNameKeyword) {
	return request({
		url: base + `disease/${diseaseNameKeyword}`,
		method: "get",
	});
}
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
export function insertDisease(val) {
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
//删除疾病信息
export function deleteDiseaseById(diseaseNameId) {
	return request({
		url: base + `disease/${diseaseNameId}`,
		method: "delete",
	});
}

//获取病例信息
export function getMedicalCase(params) {
	return request({
		url: base + `medical-case`,
		method: "get",
		params,
	});
}

//保存病例信息------接口跨域
export function putMedicalCase(data) {
	return request({
		url: base + `medical-case `,
		method: "put",
		data,
	});
}
