import { createRouter, createWebHistory } from "vue-router";
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
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login"),
  },
  // {
  //   path: "/user",
  //   component: Layout,
  //   hidden: true,
  //   redirect: "noredirect",
  //   children: [
  //     {
  //       path: "profile",
  //       component: () => import("@/views/system/user/profile/index"),
  //       name: "Profile",
  //       meta: { title: "个人中心", icon: "user" },
  //     },
  //   ],
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
