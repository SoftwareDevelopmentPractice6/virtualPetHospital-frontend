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
    path: "/StudentExam/ExamSelection",
    name: "ExamSelection",
    component: () => import("@/views/StudentExam/ExamSelection"),
  },
  {
    path: "/StudentExam/ExamContent",
    name: "ExamContent",
    component: () => import("@/views/StudentExam/ExamContent"),
  },
  {
    path: "/StudentExam/SubmitSuccess",
    name: "SubmitSuccess",
    component: () => import("@/views/StudentExam/SubmitSuccess"),
  },
  {
    path: "/StudentExam/ScoreQuery",
    name: "ScoreQuery",
    component: () => import("@/views/StudentExam/ScoreQuery"),
  },
  {
    path: "",
    component: Layout,
    children: [
      {
        path: "cases",
        component: () => import("@/views/Cases/cases"),
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
        component: () => import("@/views/System/medicine"),
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
        component: () => import("@/views/System/hospitalized"),
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
        component: () => import("@/views/System/charge"),
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
        component: () => import("@/views/System/laboratory"),
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
        component: () => import("@/views/System/archives"),
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
        component: () => import("@/views/System/data"),
        name: "data",
        meta: { title: "数据管理", icon: "dashboard", affix: true },
      },
    ],
  },
  {
    path: "/functionStudy",
    component: Layout,
    redirect: "/functionStudy/rolePlay",
    children: [
      {
        path: "rolePlay",
        component: () => import("@/views/FunctionStudy/RolePlay"),
        beforeEnter: myBeforeEnter,
      },
      {
        path: "rolePlay/detail/:role",
        component: () => import("@/views/FunctionStudy/RolePlay/PlayDetail"),
        beforeEnter: myBeforeEnter,
      },
      {
        path: "caseStudy",
        component: () => import("@/views/FunctionStudy/CaseStudy"),
        beforeEnter: myBeforeEnter,
      },
      {
        path: "caseStudy/detail",
        component: () => import("@/views/FunctionStudy/CaseStudy/CaseDetail"),
        beforeEnter: myBeforeEnter,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
