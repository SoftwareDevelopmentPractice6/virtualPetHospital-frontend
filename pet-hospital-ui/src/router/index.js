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
    path: "/cases",
     component: Layout,
     children: [
       {
        path: "list",
        component: () => import("@/views/Cases/Cases"),
        beforeEnter: myBeforeEnter,
       },
       {
        path: "data",
        component: () => import("@/views/Cases/Data"),
        beforeEnter: myBeforeEnter,
       },
       {
        path: "upload",
        component: () => import("@/views/Cases/Upload"),
        beforeEnter: myBeforeEnter,
       }, 
     ],
   },
    /*以下是药品路由设置 
    杭海培参考*/
    
    {
      path: "/medicine",
        component: Layout,
        children: [
          {
            path: "list",
            component: () => import("@/views/System/Medicine/Medicine"),
            beforeEnter: myBeforeEnter,
           },
           {
            path: "add",
            component: () => import("@/views/System/Medicine/Add"),
            beforeEnter: myBeforeEnter,
           },
        ],
      },
      // 收费管理路由
      {
        path: "/charge",
          component: Layout,
          children: [
            {
              path: "list",
              component: () => import("@/views/System/Charge/Charge"),
              beforeEnter: myBeforeEnter,
             },
             {
              path: "add",
              component: () => import("@/views/System/Charge/Add"),
              beforeEnter: myBeforeEnter,
             },
          ],
        },
        // 住院管理路由
      {
        path: "/hospitalized",
          component: Layout,
          children: [
            {
              path: "list",
              component: () => import("@/views/System/Hospitalized/Hospitalized"),
              beforeEnter: myBeforeEnter,
             },
             {
              path: "add",
              component: () => import("@/views/System/Hospitalized/Add"),
              beforeEnter: myBeforeEnter,
             },
          ],
        },
         // 档案管理路由
      {
        path: "/archives",
          component: Layout,
          children: [
            {
              path: "list",
              component: () => import("@/views/System/Archives/Archives"),
              beforeEnter: myBeforeEnter,
             },
             {
              path: "add",
              component: () => import("@/views/System/Archives/Add"),
              beforeEnter: myBeforeEnter,
             },
          ],
        },
          // 化验项目管理路由
      {
        path: "/laboratory",
          component: Layout,
          children: [
            {
              path: "list",
              component: () => import("@/views/System/Laboratory/Laboratory"),
              beforeEnter: myBeforeEnter,
             },
             {
              path: "add",
              component: () => import("@/views/System/Laboratory/Add"),
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
     
]


const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
