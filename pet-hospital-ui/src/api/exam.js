// 考试接口

import request from "@/utils/request";

const base = "exam/";

//获取考试列表接口
export function getExamList() {
	return request({
		url: base + "examinations",
		method: "get",
	});
}

//删除考试列表信息
export function deleteExaminationById(examId) {
	return request({
		url: base + `examinations/${examId}`,
		method: "delete",
	});
}
// 新增考试信息
export function insertExamination(val) {
	return request({
		url: base + "examinations",
		method: "post",
		data: val,
	});
}
//根据考试名称获取考试信息
export function getExamByName(examNameKeyword) {
	return request({
		url: base + "examinations",
		method: "get",
		params: {
			examNameKeyword,
		},
	});
}
export function getExamById(examrealid) {
	return request({
		url: base + "examinations",
		method: "get",
		params: {
			examrealid,
		},
	});
}
export function getExamSessionById(id) {
	return request({
		url: base + "examinations",
		method: "get",
		params: {
			id,
		},
	});
}
export function getExamByScore(paperTotalScore) {
	return request({
		url: base + "examinations",
		method: "get",
		params: {
			paperTotalScore,
		},
	});
}
//更改考试信息
export function updateExamination(val) {
	return request({
		url: base + "examinations",
		method: "put",
		data: val,
	});
}
//获取试卷列表接口
export function getPaperList() {
	return request({
		url: base + "examinations",
		method: "get",
	});
}
//根据试卷名称获取考试信息
export function getPaperByName(paperNameKeyword) {
	return request({
		url: base + "examinations",
		method: "get",
		params: {
			paperNameKeyword,
		},
	});
}
//删除试卷列表信息
export function deletePapernById(paperId) {
	return request({
		url: base + `examinations/${paperId}`,
		method: "delete",
	});
}
// 新增试卷信息
export function insertPaper(val) {
	return request({
		url: base + "examinations",
		method: "post",
		data: val,
	});
}
