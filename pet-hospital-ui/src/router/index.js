import { createRouter, createWebHashHistory } from "vue-router";
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
    component: () => import("@/views/login"),
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
  {
    path: "",
     component: Layout,
     children: [
       {
        path: "cases",
        component: () => import("@/views/cases"),
        name: "cases",
        meta: { title: "病例管理", icon: "dashboard", affix: true },
       },
     ],
   },
   {
    path: "",
      component: Layout,
      children: [
        {
          path: "medicine",
         component: () => import("@/views/medicine"),
         name: "medicine",
         meta: { title: "药品管理", icon: "dashboard", affix: true },
        },
      ],
    },
    {
        path: "",
        component: Layout,
        children: [
          {
            path: "hospitalized",
           component: () => import("@/views/hospitalized"),
           name: "hospitalized",
           meta: { title: "住院管理", icon: "dashboard", affix: true },
          },
        ],
      },
      {
        path: "",
        component: Layout,
        children: [
          {
            path: "charge",
           component: () => import("@/views/charge"),
           name: "charge",
           meta: { title: "收费管理", icon: "dashboard", affix: true },
          },
        ],
      },
      {
        path: "",
        component: Layout,
        children: [
          {
            path: "laboratory",
           component: () => import("@/views/laboratory"),
           name: "laboratory",
           meta: { title: "化验项目管理", icon: "dashboard", affix: true },
          },
        ],
      },
      {
        path: "",
        component: Layout,
        children: [
          {
            path: "archives",
           component: () => import("@/views/archives"),
           name: "archives",
           meta: { title: "档案管理", icon: "dashboard", affix: true },
          },
        ],
      },
      {
        path: "",
        component: Layout,
        children: [
          {
            path: "data",
           component: () => import("@/views/data"),
           name: "data",
           meta: { title: "数据管理", icon: "dashboard", affix: true },
          },
        ],
      },
  
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
