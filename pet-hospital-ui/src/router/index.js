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
	// 登录
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
	// 医院导览
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
	// 学生测试
	{
		path: "/StudentExam",
		component: Layout,
		redirect: "/StudentExam/ExamSelection",
		children: [
			{
				path: "ExamSelection",
				component: () => import("@/views/StudentExam/ExamSelection"),
				beforeEnter: myBeforeEnter,
			},
			{
				path: "ExamContent",
				component: () => import("@/views/StudentExam/ExamContent"),
				beforeEnter: myBeforeEnter,
			},
			{
				path: "ScoreQuery",
				component: () => import("@/views/StudentExam/ScoreQuery"),
				beforeEnter: myBeforeEnter,
			},
		],
	},
	// 考试管理
	{
		path: "/exams",
		component: Layout,
		redirect: "/exams/list",
		children: [
			{
				path: "list",
				component: () => import("@/views/System/Exams/ExamList"),
				beforeEnter: myBeforeEnter,
			},
			{
				path: "add",
				component: () => import("@/views/System/Exams/ExamAdd"),
				beforeEnter: myBeforeEnter,
			},
			{
				path: "update",
				component: () => import("@/views/System/Exams/ExamUpdate"),
				beforeEnter: myBeforeEnter,
			},
		],
	},
	// 档案管理
	{
		path: "/archive",
		component: Layout,
		redirect: "/archive/list",
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
			{
				path: "update",
				component: () => import("@/views/System/Archives/Update"),
				beforeEnter: myBeforeEnter,
			},
		],
	},
	// 化验项目管理
	{
		path: "/laboratory",
		component: Layout,
		redirect: "/laboratory/list",
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
			{
				path: "update",
				component: () => import("@/views/System/Laboratory/Update"),
				beforeEnter: myBeforeEnter,
			},
		],
	},
	{
		path: "/cases",
		component: Layout,
		redirect: "/cases/list",
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
	{
		path: "/medicine",
		component: Layout,
		redirect: "/medicine/list",
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
			{
				path: "update",
				component: () => import("@/views/System/Medicine/Update"),
				beforeEnter: myBeforeEnter,
			},
		],
	}, // 收费管理路由
	{
		path: "/charge",
		component: Layout,
		redirect: "/charge/list",
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
			{
				path: "update",
				component: () => import("@/views/System/Charge/Update"),
				beforeEnter: myBeforeEnter,
			},
		],
	}, // 住院管理路由
	{
		path: "/hospitalized",
		component: Layout,
		redirect: "/hospitalized/list",
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
			{
				path: "update",
				component: () => import("@/views/System/Hospitalized/Update"),
				beforeEnter: myBeforeEnter,
			},
		],
	},
	// 职能学习
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
				path: "caseStudy/detail/:disease",
				component: () => import("@/views/FunctionStudy/CaseStudy/CaseDetail"),
				beforeEnter: myBeforeEnter,
			},
			{
				path: "caseStudy/detail/:disease/allVideos",
				component: () => import("@/views/FunctionStudy/CaseStudy/AllVideos"),
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
