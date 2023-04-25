<template>
	<el-container v-loading="loading">
		<el-header class="header" height="20px">
			<router-link to="/question/list">
				<el-button type="plain" @click="back">Back</el-button>
			</router-link>
		</el-header>
		<el-main>
			<div style="margin: 20px" />
			<el-form
				:label-position="right"
				label-width="100px"
				:model="formLabelAlign"
				style="max-width: 460px"
			>
				<el-form-item label="问题类别">
					<el-input v-model="questionlist.questionType"> </el-input>
				</el-form-item>

				<el-form-item label="问题内容">
					<el-input
						v-model="questionlist.questionContent"
						:autosize="{ minRows: 4 }"
						type="textarea"
					/>
				</el-form-item>
				<el-form-item label="问题答案">
					<el-input v-model="questionlist.questionAnswer"> </el-input>
				</el-form-item>

				<el-form-item>
					<el-button class="SubmitButton" type="primary" @click="onSubmit"
						>保存</el-button
					>
					<router-link to="/question/list">
						<el-button class="CancelButton">取消</el-button>
					</router-link>
				</el-form-item>
			</el-form>
		</el-main>
	</el-container>
</template>
<script setup>
import { computed, unref, onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { updateQuestion, getQuestionList } from "@/api/exam";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();

const router = useRouter();
const id = computed(() => {
	return route.query.questionId;
});

const loading = ref(false);

const questionlist = ref({});

const getQuestionInfo = async () => {
	if (!unref(id)) return;
	loading.value = true;
	const list = ref();
	await getQuestionList(unref(id)).then((res) => {
		list.value = res.data.questionList;
	});
	for (let item of list.value) {
		if (item.questionId == id.value) {
			questionlist.value = item;
		}
	}
	console.log("questionlist.value", questionlist.value);
	loading.value = false;
};

onMounted(() => {
	getQuestionInfo();
});

const onSubmit = async () => {
	loading.value = true;
	await updateQuestion(unref(questionlist));
	ElMessage.success("提交成功！");
	loading.value = false;
	router.back();
};
</script>

<style lang="scss" scoped>
.demo-date-picker {
	display: flex;
	width: 100%;
	padding: 0;
	flex-wrap: wrap;
}

.demo-date-picker .block {
	padding: 30px 0;
	text-align: center;
	border-right: solid 1px var(--el-border-color);
	flex: 1;
}

.demo-date-picker .block:last-child {
	border-right: none;
}

.demo-date-picker .demonstration {
	display: block;
	color: var(--el-text-color-secondary);
	font-size: 14px;
	margin-bottom: 20px;
}
.header {
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	padding: 10px 10px 0px 10px;
}
.CancelButton {
	width: 80px;
	height: 40px;
	margin: 0px 30px 0px 60px;
}
.SubmitButton {
	width: 80px;
	height: 40px;
	margin: 0px 60px 0px 30px;
}
</style>
