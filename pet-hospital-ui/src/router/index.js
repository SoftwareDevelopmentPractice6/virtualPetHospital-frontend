import { createRouter, createWebHistory } from "vue-router";
import Cookies from "js-cookie";
import Layout from "@/layout";

// 路由守卫: 未登录则回到 login 页
const myBeforeEnter = (to, from, next) => {
  if (Cookies.get("isLogin")) {
    next();
  } else {
    router.push("login");
  }
};

const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/index"),
        beforeEnter: myBeforeEnter,
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/Login"),
    beforeEnter: (to, from, next) => {
      if (Cookies.get("isLogin")) {
        router.push("index");
      } else {
        next();
      }
    },
  },
  {
    path: "/hospitalGuide",
    component: Layout,
    redirect: "/hospitalGuide/overview",
    children: [
      {
        path: "overview",
        component: () => import("@/views/HospitalGuide/Overview"),
        beforeEnter: myBeforeEnter,
      },
      {
        path: "panorama",
        component: () => import("@/views/HospitalGuide/Panorama"),
        beforeEnter: myBeforeEnter,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
