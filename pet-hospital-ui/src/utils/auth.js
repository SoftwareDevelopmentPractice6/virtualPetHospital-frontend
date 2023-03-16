// 封装 token 方法

import Cookies from "js-cookie";

const TokenKey = "Admin-Token";

// 获取 token
export function getToken() {
  return Cookies.get(TokenKey);
}

// 设置 token
export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

// 移除 token
export function removeToken() {
  return Cookies.remove(TokenKey);
}
