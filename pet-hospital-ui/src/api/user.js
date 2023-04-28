// 用户接口

import request from "@/utils/request";

const base = "auth/";
//获取学生用户列表接口
export function getUserList() {
  return request({
    url: base + "user",
    method: "get",
  });
}
//根据身份获取用户列表接口
export function getListByUserAuthority(userAuthority) {
  return request({
    url: base + "user",
    method: "get",
    params: {
      userAuthority,
    },
  });
}
//删除用户列表信息
export function deleteUserById(userId) {
  return request({
    url: base + `user/${userId}`,
    method: "delete",
  });
}
//根据用户名模糊搜索用户列表接口
export function getUserByName(userNameKeyword) {
  return request({
    url: `${base}user/${userNameKeyword}`,
    method: "get",
  });
}
// 新增用户信息
export function insertUser(val) {
  return request({
    url: base + "user",
    method: "post",
    data: val,
  });
}
//更改用户信息
export function updateUser(val) {
  return request({
    url: base + "user",
    method: "put",
    data: val,
  });
}
