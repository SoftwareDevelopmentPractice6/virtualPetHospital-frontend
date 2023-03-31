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
			<router-link to="/SubmitSuccess">
				<el-button class="submitButton" type="primary"
					>提交</el-button
				></router-link
			>
			<router-link to="/ExamSelection">
				<el-button class="cancelButton">取消</el-button></router-link
			>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
const radio = ref(3);
const textarea = ref("");
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
