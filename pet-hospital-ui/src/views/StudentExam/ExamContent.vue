<template>
	<div class="ExamContent">
		<h1 class="title">试卷内容</h1>
		<div class="Select">
			<h2 class="title1">一、选择题</h2>
			<el-row>
				<el-text class="selection1"
					>1、第一个选择题巴拉巴拉巴拉不知道是什么题</el-text
				></el-row
			>
			<el-radio-group class="seleAnswer1" v-model="radio">
				<el-radio :label="1">A.第一个选项阿巴阿巴</el-radio>
				<el-radio :label="2">B.第二个选项阿巴阿巴</el-radio>
				<el-radio :label="3">C.第三个选项阿巴阿巴</el-radio>
			</el-radio-group>
		</div>
		<div class="Essay">
			<h2 class="title2">二、简答题</h2>
			<el-row>
				<el-text class="essay1"
					>1、第一个简答题题干信息巴拉巴拉</el-text
				></el-row
			>
			<el-input
				class="essayAnswer1"
				v-model="textarea"
				:rows="3"
				type="textarea"
				placeholder="Please input"
			/>
		</div>
		<div class="button">
			<el-button class="submitButton" type="primary" @click="open"
				>提交</el-button
			>
			<div v-if="show">
				<div class="mask"></div>
				<div class="confirm">
					<p>你确定要跳转到详情页吗？</p>
					<button @click="confirm">确定</button>
					<button @click="cancel">取消</button>
				</div>
			</div>
			<router-link to="/StudentExam/ExamSelection">
				<el-button class="cancelButton">取消</el-button></router-link
			>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { ElMessageBox } from "element-plus";
import { useRoute } from "vue-router";
// import router from "@/router";

// data 重新定义（用 ref 或 reactive）
// methods 重新定义
// this 全部删掉，this.$router, this.$route, this.$emit 去查一下 vue3 的语法
// Mounted, BeforeDestroy 去查一下 vue3 的语法
import { useRouter } from "vue-router";


const router = useRouter();
let show = ref(false);
// const showConfirm = () => {
// 	show = true;
// };
const confirm = () => {
	show = false;
	router.push({name: '/StudentExam/ExamSelection'});
	// this.$router.push({ name: "detail" });
};
const cancel = () => {
	show = false;
};

// export default {
//   data() {
//     return {
//       show: false,
// 	  obj: {
// 		a: 'a',
// 		b: 'b'
// 	  }
//     };
//   },
//   methods: {
//     showConfirm() {
//       this.show = true;
//     },
//     confirm() {
//       this.show = false;
//       this.$router.push({ name: "detail" });
//     },
//     cancel() {
//       this.show = false;
//     },
//   },
// }
const radio = ref(3);
const textarea = ref("");
// data = () => {
// 	return {
// 		show: false,
// 	};
// },
// open = () => {
// 	this.show = true;
// };
// confirm = () => {
// 	this.show = false;
// 	this.$router.push("/StudentExam/ExamSelection");
// };
// cancel = () => {
// 	this.show = false;
// };

// const open = () => {
// 	// ElMessageBox.alert("提交成功", "Success", {
// 	// 	// if you want to disable its autofocus
// 	// 	autofocus: false,
// 	// 	confirmButtonText: "OK",
// 	// });
// 	ElMessageBox.confirm("提交成功", "Success", {
// 		confirmButtonText: "OK",
// 		showCancelButton: false,
// 		type: "success"
// 	}).then(() => {
// 		// 用户点击了确认按钮，执行页面跳转的操作
// 		this.$router.replace('/StudentExam/ExamSelection');
// 	});
// };
</script>

<style lang="scss" scoped>
.title {
	margin: 30px auto 30px auto;
	text-align: center;
}

.Select {
	margin: 30px 30px 30px 30px;
}

.Essay {
	margin: 30px 30px 30px 30px;
}

.essayAnswer1 {
	margin: 20px auto 20px auto;
}

.button {
	text-align: center;
	margin-block-end: 10px;
}
.submitButton {
	width: 150px;
	height: 40px;
	margin: auto 100px auto auto;
}

.cancelButton {
	width: 150px;
	height: 40px;
}
</style>
