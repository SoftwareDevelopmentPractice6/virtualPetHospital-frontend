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
export function deleteExaminationById(id) {
	return request({
		url: base + `examinations/${id}`,
		method: "delete",
	});
}
// 新增考试信息
export function insertExam(val) {
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
//更改考试信息
export function updateExam(val) {
	return request({
		url: base + "examinations",
		method: "put",
		data: val,
	});
}
