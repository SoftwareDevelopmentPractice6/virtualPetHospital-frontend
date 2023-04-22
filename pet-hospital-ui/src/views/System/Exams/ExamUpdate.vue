<template>
	<el-container v-loadin="loading">
		<el-header class="header" height="20px">
			<router-link to="/exams/list">
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
				<el-form-item label="考试编号">
					<el-input v-model="examlist.examid" />
				</el-form-item>
				<el-form-item label="考试名称">
					<el-input v-model="examlist.examname" />
				</el-form-item>
				<el-form-item label="考试时长">
					<el-input v-model="examlist.examduration" />
				</el-form-item>

				<el-form-item label="考试总分">
					<el-input v-model="examlist.examtotalscore" />
				</el-form-item>

				<el-form-item label="考试开始时间">
					<div class="block">
						<el-date-picker
							v-model="examlist.examstart"
							type="datetime"
							placeholder="选择考试考试时间"
						/>
					</div>
				</el-form-item>
				<el-form-item label="考试结束时间">
					<div class="block">
						<el-date-picker
							v-model="examlist.examend"
							type="datetime"
							placeholder="选择考试结束时间"
						/>
					</div>
				</el-form-item>
				<el-form-item label="考试试卷名称">
					<el-input v-model="examlist.papername" />
				</el-form-item>
				<el-form-item>
					<el-button class="SubmitButton" type="primary" @click="onSubmit"
						>保存</el-button
					>
					<router-link to="/exams/list">
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
import { updateExam, getExamByName } from "@/api/exam";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();

const router = useRouter();
const examName = computed(() => {
	return route.query.examName;
});
const loading = ref(false);

const examlist = ref({});
const getExamsInfo = async () => {
	if (!unref(examName)) return;
	loading.value = true;
	const {
		examSessionList: [info],
	} = await getExamByName(unref(examName)).then((res) => res.data);
	examlist.value = info;
	loading.value = false;
};
onMounted(() => {
	getExamsInfo();
});

const onSubmit = async () => {
	loading.value = true;
	await updateExam(unref(examlist));
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
