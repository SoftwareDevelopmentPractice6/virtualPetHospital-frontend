import { createRouter, createWebHistory } from "vue-router";
import Cookies from "js-cookie";
import Layout from "@/layout";

const routes = [
  {
    path: "",
    component: Layout,
    redirect: "index",
    children: [
      {
        path: "index",
        component: () => import("@/views/index"),
        name: "Index",
        meta: { title: "首页", icon: "dashboard", affix: true },
        beforeEnter: (to, from, next) => {
          if (Cookies.get("isLogin")) {
            next();
          } else {
            router.push("login");
          }
        },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login"),
    beforeEnter: (to, from, next) => {
      if (Cookies.get("isLogin")) {
        router.push("index");
      } else {
        next();
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
