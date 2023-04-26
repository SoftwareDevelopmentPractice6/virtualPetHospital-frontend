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
	// 试卷管理
	{
		path: "/paper",
		component: Layout,
		redirect: "/paper/list",
		children: [
			{
				path: "list",
				component: () => import("@/views/System/Paper/PaperList"),
				beforeEnter: myBeforeEnter,
			},
			{
				path: "add",
				component: () => import("@/views/System/Paper/PaperAdd"),
				beforeEnter: myBeforeEnter,
			},
			{
				path: "update",
				component: () => import("@/views/System/Paper/PaperUpdate"),
				beforeEnter: myBeforeEnter,
			},
			{
				path: "content",
				component: () => import("@/views/System/Paper/PaperContent"),
				beforeEnter: myBeforeEnter,
			},
		],
	},
	// 题库管理
	{
		path: "/question",
		component: Layout,
		redirect: "/question/list",
		children: [
			{
				path: "list",
				component: () => import("@/views/System/QuestionBank/QuestionList"),
				beforeEnter: myBeforeEnter,
			},
			{
				path: "add",
				component: () => import("@/views/System/QuestionBank/QuestionAdd"),
				beforeEnter: myBeforeEnter,
			},
			{
				path: "update",
				component: () => import("@/views/System/QuestionBank/QuestionUpdate"),
				beforeEnter: myBeforeEnter,
			},
		],
	},
	// 用户管理
	{
		path: "/user",
		component: Layout,
		redirect: "/user/list",
		children: [
			{
				path: "list",
				component: () => import("@/views/System/User/user"),
				beforeEnter: myBeforeEnter,
			},
			{
				path: "add",
				component: () => import("@/views/System/User/useradd"),
				beforeEnter: myBeforeEnter,
			},
			{
				path: "update",
				component: () => import("@/views/System/User/userupdate"),
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
	// 疾病/病例管理
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
				path: "caseDetail",
				component: () => import("@/views/Cases/CaseDetail"),
				beforeEnter: myBeforeEnter,
			},
			{
				path: "addCase",
				component: () => import("@/views/Cases/AddCase"),
				beforeEnter: myBeforeEnter,
			},
			{
				path: "editCase",
				component: () => import("@/views/Cases/EditCase"),
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
	},
	// 收费管理路由
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
	},
	// 住院管理路由
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
				path: "rolePlay/detail",
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
			{
				path: "caseStudy/:disease/allVideos",
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
