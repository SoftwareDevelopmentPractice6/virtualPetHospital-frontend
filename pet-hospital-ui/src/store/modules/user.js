import { defineStore } from "pinia";
import { login, logout, getInfo } from "@/api/login";
import { getToken, setToken, removeToken } from "@/utils/auth";

export const userStore = defineStore("user", {
  state: () => ({
    token: getToken(),
    name: "",
    avatar: "",
    roles: [],
    permissions: [],
  }),
  getters: {
    finishedTodos(state) {
      // 自动完成
      return state.todos.filter((todo) => todo.isFinished);
    },
    unfinishedTodos(state) {
      return state.todos.filter((todo) => !todo.isFinished);
    },
    filteredTodos() {
      if (this.filter === "finished") {
        // 自动调用其他 getter
        return this.finishedTodos;
      } else if (this.filter === "unfinished") {
        return this.unfinishedTodos;
      }
      return this.todos;
    },
  },
  actions: {
    SET_TOKEN: (token) => {
      this.token = token;
    },
    SET_NAME: (name) => {
      this.name = name;
    },
    SET_AVATAR: (avatar) => {
      this.avatar = avatar;
    },
    SET_ROLES: (roles) => {
      this.roles = roles;
    },
    SET_PERMISSIONS: (permissions) => {
      this.permissions = permissions;
    },
    // 登录
    Login(userInfo) {
      const username = userInfo.username.trim(); // 移除前后空格
      const password = userInfo.password;
      return new Promise((resolve, reject) => {
        login(username, password)
          // 登录后设置并储存 token
          .then((res) => {
            setToken(res.token);
            this.token = res.token;
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 获取用户信息
    GetInfo() {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((res) => {
            const user = res.user;
            const avatar =
              user.avatar == "" || user.avatar == null
                ? require("@/assets/images/profile.jpg")
                : process.env.VUE_APP_BASE_API + user.avatar;
            if (res.roles && res.roles.length > 0) {
              // 验证返回的roles是否是一个非空数组
              this.roles = res.roles;
              this.permissions = res.permissions;
            } else {
              this.roles = ["ROLE_DEFAULT"];
            }
            this.name = user.userName;
            this.avatar = avatar;
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 退出系统
    LogOut() {
      return new Promise((resolve, reject) => {
        logout(this.token)
          .then(() => {
            this.token = "";
            this.roles = [];
            this.permissions = [];
            removeToken();
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 前端登出
    FedLogOut() {
      return new Promise((resolve) => {
        this.token = "";
        removeToken();
        resolve();
      });
    },
  },
});
