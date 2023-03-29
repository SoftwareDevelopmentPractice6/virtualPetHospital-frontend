import { login } from "@/api/login";
import { getRole } from "@/utils/role";
import { defineStore } from "pinia";
import Cookies from "js-cookie";

export const userStore = defineStore("user", {
  state: () => ({
    name: "",
    role: "",
    isLogin: false,
  }),
  getters: {},
  actions: {
    // 登录
    Login(userInfo) {
      const username = userInfo.username.trim(); // 移除前后空格
      const password = userInfo.password;
      return new Promise((resolve, reject) => {
        login(username, password)
          // 登录后储存登录态，获取用户角色
          .then((res) => {
            let data = res.data;
            Cookies.set("isLogin", true, {
              expires: 30,
            });
            this.isLogin = true;
            this.name = data.userName;
            this.role = getRole(data.userAuthority);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 退出系统
    LogOut() {
      Cookies.remove("isLogin");
      this.name = "";
      this.role = "";
      this.isLogin = false;
    },
  },
});
