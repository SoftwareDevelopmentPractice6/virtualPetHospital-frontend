// 系统接口

import request from "@/utils/request";

const base = "system/";

//获取药品信息列表接口
export function getMedicine() {
	return request({
		url: base + "medicine",
		method: "get",
	});
}

export function getMedicineByCategory(medicineCategory) {
	return request({
		url: base + "medicine",
		method: "get",
		params: {
			medicineCategory,
		},
	});
}
//根据疾病ID获取药品信息
export function getMedicineByID(medicineId) {
	return request({
		url: base + "medicine",
		method: "get",
		params: {
			medicineId,
		},
	});
}
//根据药品名称获取药品信息
export function getMedicineByName(medicineName) {
	return request({
		url: base + `medicine/${medicineName}`,
		method: "get",
	});
}
// 新增
export function insertMedicine(val) {
	return request({
		url: base + "medicine",
		method: "post",
		data: val,
	});
}
//更改药品信息
export function updateMedicine(val) {
	return request({
		url: base + "medicine",
		method: "put",
		data: val,
	});
}
//删除药品信息
export function deleteById(id) {
	return request({
		url: base + `medicine/${id}`,
		method: "delete",
	});
}

//获取档案信息列表接口
export function getArchive() {
	return request({
		url: base + "archive",
		method: "get",
	});
}
//根据宠物名称获取化档案信息
export function getArchiveByPetName(petName) {
	return request({
		url: base + "archive",
		method: "get",
		params: {
			petName,
		},
	});
}
export function getArchiveByPetType(petType) {
	return request({
		url: base + "archive",
		method: "get",
		params: {
			petType,
		},
	});
}
// 新增档案信息
export function insertArchive(val) {
	return request({
		url: base + "archive",
		method: "post",
		data: val,
	});
}
//更改档案信息
export function updateArchive(val) {
	return request({
		url: base + "archive",
		method: "put",
		data: val,
	});
}

//删除档案项目信息
export function deleteArchiveById(id) {
	return request({
		url: base + `archive/${id}`,
		method: "delete",
	});
}

//获取化验信息列表接口
export function getExamine() {
	return request({
		url: base + "examine",
		method: "get",
	});
}
//根据化验项目名称获取化验项目信息
export function getExamineByName(examineName) {
	return request({
		url: base + `examine/${examineName}`,
		method: "get",
	});
}
// 新增化验项目
export function insertExamine(val) {
	return request({
		url: base + "examine",
		method: "post",
		data: val,
	});
}
//更改化验信息
export function updateExamine(val) {
	return request({
		url: base + "examine",
		method: "put",
		data: val,
	});
}
//删除化验项目信息
export function deleteExamineById(id) {
	return request({
		url: base + `examine/${id}`,
		method: "delete",
	});
}
//获取收费信息列表接口
export function getCharge() {
	return request({
		url: base + "charge",
		method: "get",
	});
}
//根据收费项目名称获取收费项目信息
export function getChargeByName(itemName) {
	return request({
		url: base + `charge/${itemName}`,
		method: "get",
	});
}
// 新增收费项目
export function insertCharge(val) {
	return request({
		url: base + "charge",
		method: "post",
		data: val,
	});
}
//更改收费信息
export function updateCharge(val) {
	return request({
		url: base + "charge",
		method: "put",
		data: val,
	});
}
//删除收费项目信息
export function deleteChargeById(id) {
	return request({
		url: base + `charge/${id}`,
		method: "delete",
	});
}

//获取住院信息列表接口
export function getAdmission() {
	return request({
		url: base + "admission",
		method: "get",
	});
}
//根据护理级别获取化住院信息
export function getAdmissionByCareLevel(careLevel) {
	return request({
		url: base + `admission/${careLevel}`,
		method: "get",
	});
}
//根据病房标准获取住院信息
export function getAdmissionByRoomStandard(roomStandard) {
	return request({
		url: base + "admission",
		method: "get",
		params: {
			roomStandard,
		},
	});
}
// 新增住院项目
export function insertAdmission(val) {
	return request({
		url: base + "admission",
		method: "post",
		data: val,
	});
}
//更改住院信息
export function updateAdmission(val) {
	return request({
		url: base + "admission",
		method: "put",
		data: val,
	});
}
//删除住院项目信息
export function deleteAdmissionById(id) {
	return request({
		url: base + `admission/${id}`,
		method: "delete",
	});
}
/* // 登录方法
export function login(userName, userPassword) {
	const data = {
		userName,
		userPassword,
	};
	return request({
		url: base + "login",
		method: "post",
		data: data,
	});
}

// 获取用户列表
export function getUser() {
	return request({
		url: base + "user",
		method: "get",
	});
}

// 获取用户列表
export function getUserByName(userNameKeyword) {
	return request({
		url: base + "user",
		method: "get",
		params: {
			userNameKeyword,
		},
	});
} */
