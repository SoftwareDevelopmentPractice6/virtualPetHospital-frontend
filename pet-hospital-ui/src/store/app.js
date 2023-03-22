import { defineStore } from "pinia";
import Cookies from "js-cookie";

export const appStore = defineStore("app", {
  state: () => ({
    sidebar: {
      opened: Cookies.get("sidebarStatus")
        ? !!+Cookies.get("sidebarStatus")
        : true,
      withoutAnimation: false,
      hide: false,
    },
    device: "desktop",
  }),
  actions: {
    // 展开/折叠侧边栏
    toggleSideBar() {
      console.log("toggleSideBar");
      if (this.sidebar.hide) {
        console.log("已隐藏");
        return false;
      }
      this.sidebar.opened = !this.sidebar.opened;
      this.sidebar.withoutAnimation = false;
      if (this.sidebar.opened) {
        console.log("1");
        Cookies.set("sidebarStatus", 1);
      } else {
        console.log("0");
        Cookies.set("sidebarStatus", 0);
      }
    },
    // 折叠侧边栏
    closeSideBar({ withoutAnimation }) {
      Cookies.set("sidebarStatus", 0);
      this.sidebar.opened = false;
      this.sidebar.withoutAnimation = withoutAnimation;
    },
    // 切换设备
    toggleDevice(device) {
      this.device = device;
    },
    // 隐藏/显示侧边栏
    toggleSideBarHide(status) {
      this.sidebar.hide = status;
    },
  },
});
