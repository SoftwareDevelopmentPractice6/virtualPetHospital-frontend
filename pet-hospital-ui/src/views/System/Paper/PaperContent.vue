<template>
	<div class="case-wrapper">
		<div class="case-container">
			<div class="header-wrapper wrapper">
				<el-form :inline="true" :model="paperlist" class="search">
					<el-form-item label="试卷名称:">
						<el-input v-model="paperlist.examSessionPaper.paperName"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<div class="table-wrapper wrapper">
				<div class="table-container">
					<el-table
						:data="tableData"
						style="width: 100%"
						height="400px"
						:header-cell-style="{ 'text-align': 'center' }"
						:cell-style="{ 'text-align': 'center' }"
						@selection-change="handleSelectionChange"
					>
						<el-table-column type="index" label="序号" width="60" />

						<el-table-column prop="questiontype" label="问题类别" width="100" />
						<el-table-column
							prop="questioncontent"
							label="问题内容"
							width="700"
						/>
						<el-table-column
							prop="questionanswer"
							label="问题答案"
							width="100"
						/>
					</el-table>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import { computed, unref, onMounted, reactive, ref } from "vue";
import {
	getQuestionList,
	deleteQuestion,
	getQuestionByType,
	getPaperList,
	getQuestionInPaperList,
} from "@/api/exam";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

const loading = ref();
const id = computed(() => {
	return route.query.paperId;
});

const paperlist = ref({});

const getPaperInfo = async () => {
	if (!unref(id)) return;
	loading.value = true;
	const list = ref();
	await getPaperList(unref(id)).then((res) => {
		list.value = res.data.examSessionList;
	});
	for (let item of list.value) {
		if (item.examSessionPaper.paperId == id.value) {
			paperlist.value = item;
		}
	}
	console.log("paperlist.value", paperlist.value);
	loading.value = false;
};
getPaperInfo();

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
	loading.value = true;
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
</script>
<style lang="scss" scoped>
.case-wrapper {
	width: 100%;
	height: calc(100vh - 50px);
	padding: 30px;
	.case-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		.wrapper {
			width: 100%;
			margin-bottom: 10px;
		}
		.header-wrapper {
			display: flex;
			justify-content: center;
			margin-bottom: 25px;
			.search-form {
				width: 800px;
				height: 32px;
			}
		}
		.btns-wrapper {
			margin-left: 75px;
			.btn-container {
				display: inline-block;
				margin-right: 7px;
			}
		}
		.table-wrapper {
			display: flex;
			justify-content: center;
			width: 100%;
			.table-container {
				width: 95%;
			}
		}
	}
}
/deep/ .el-dialog {
	width: 90% !important;
}
</style>
