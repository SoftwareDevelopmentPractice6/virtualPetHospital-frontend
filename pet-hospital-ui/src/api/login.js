// 登录接口

import request from "@/utils/request";

// 登录方法
export function login(userName, userPassword) {
  const data = {
    userName,
    userPassword,
  };
  return request({
    url: "auth/login",
    method: "post",
    data: data,
  });
}
