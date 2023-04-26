<template>
	<div class="app-container home" v-loading="loading">
		<el-container>
			<el-header>
				<el-form :inline="true" :model="examlist" class="search">
					<el-form-item label="试卷名称:">
						<el-input v-model="examlist.examSessionPaper.paperName"></el-input>
					</el-form-item>
				</el-form>
			</el-header>
			<el-main class="main">
				<div class="common-layout">
					<el-container>
						<el-main class="inmain">
							<el-table
								:data="tableData"
								style="width: 100%"
								height="400px"
								@selection-change="handleSelectionChange"
							>
								<el-table-column type="index" label="序号" width="60" />

								<el-table-column
									prop="questiontype"
									label="问题类别"
									width="100"
								/>
								<el-table-column
									prop="questioncontent"
									label="问题内容"
									width="700"
								/>

								<el-table-column label="输入答案" width="100">
									<el-input v-model="input" class="answer" width="50" />
								</el-table-column>
								<el-table-column label="查看答案" width="100">
									<el-button size="small" @click="handleOpen(item)"
										>查看</el-button
									>
								</el-table-column>
							</el-table>
						</el-main>
					</el-container>
				</div>
			</el-main>
		</el-container>
	</div>
</template>
<script setup>
import { computed, unref, onMounted, reactive, ref } from "vue";
import {
	getQuestionList,
	deleteQuestion,
	getQuestionByType,
	getExamList,
} from "@/api/exam";
import { ElMessageBox } from "element-plus";

import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

const loading = ref();
const id = computed(() => {
	return route.query.examId;
});

const examlist = ref({});

const getExamInfo = async () => {
	if (!unref(id)) return;
	loading.value = true;
	const list = ref();
	await getExamList(unref(id)).then((res) => {
		list.value = res.data.examSessionList;
	});
	for (let item of list.value) {
		if (item.examSessionPaper.paperExam.examId == id.value) {
			examlist.value = item;
		}
	}
	console.log("examlist.value", examlist.value);
	loading.value = false;
};
getExamInfo();

// let tableData = reactive([]);
const questionlist = reactive({
	categoryid: "",
	questionid: "",
	questiontype: "",
	questioncontent: "",
	questionanswer: "",
});
const tableData = ref([]);

onMounted(() => {
	getAll();
});
const handleSelectionChange = (val) => {
	console.log(val);
};
// 获取全部信息
const getAll = async () => {
	tableData.value = [];
	// loading.value = true;
	let data = await getQuestionList().then((res) => res.data);
	data.questionList.forEach((item) => {
		var value = {
			questioncontent: item.questionContent,
			questionid: item.questionId,
			categoryname: item.questionCategory.categoryName,
			questionanswer: item.questionAnswer,
			categoryid: item.questionCategory.categoryId,
			questiontype: item.questionType,
		};
		tableData.value.push(value);
	});
	console.log("tabledata", tableData);
};

const handleDelete = (val) => {
	console.log("val", val);
	deletequestion(val.questionid).then(() => {
		tableData = reactive([]);
		getAll();
	});
};
// 删除接口
const deletequestion = async (questionid) => {
	await deleteQuestion(questionid).then((res) => console.log("res", res));
};
//模糊搜索
const onSubmit = async () => {
	// console.log("submit!");
	if (questionlist.questiontype === "") return;
	tableData.value = [];
	loading.value = true;
	const data = await getQuestionByType(questionlist.questiontype).then(
		(res) => res.data
	);
	data.questionList.forEach((item) => {
		var value = {
			questioncontent: item.questionContent,
			questionid: item.questionId,
			categoryname: item.questionCategory.categoryName,
			questionanswer: item.questionAnswer,

			categoryid: item.questionCategory.categoryId,
			questiontype: item.questionType,
		};
		tableData.value.push(value);
	});
	loading.value = false;

	console.log("tabledata", tableData);
};
const handleOpen = () => {
	ElMessageBox.alert("This is a message", "答案", {
		// if you want to disable its autofocus
		// autofocus: false,
		confirmButtonText: "OK",
	});
};
//const { questionAnswer } = getQuestionList()
// 你可以像这样传递参数：
// ElMessageBox({}, questionAnswer)
// // 或者正在使用不同的调用方式
// ElMessageBox.alert('Hello world!', 'Title', {}, appContext)
// // 查看病例
// const handleOpen = async (val) => {
// 	curItem.value = tableData.value[val];
// 	// curItem.value.title = "答案";
// 	await getQuestionList(curItem.value.questionanswer);
// 	dialogTableVisible.value = true;
// };
</script>
<style lang="scss" scoped>
.page {
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
	padding: 30px 0px 0px 0px;
}
.search {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 25px;
	height: 100%;
}
.main {
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	padding: 10px 10px 0px 10px;
}
.inmain {
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	padding: 10px 0px 0px 0px;
}
.button {
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
}
.AddButton {
	width: 80px;
	height: 40px;
	margin: 0px 90px 30px 30px;
}
.DeleteButton {
	width: 80px;
	height: 40px;
	margin: 0px 30px 30px 90px;
}
.ChangeButton {
	width: 80px;
	height: 40px;
	margin: 0px 60px 30px 60px;
}
body {
	margin: 0;
}
.example-showcase .el-loading-mask {
	z-index: 9;
}
</style>
