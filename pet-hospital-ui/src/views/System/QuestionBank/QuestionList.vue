<template>
	<div class="app-container home">
		<el-container>
			<el-header>
				<el-form :inline="true" :model="paperlist" class="search">
					<el-form-item label="问题类别">
						<el-select prop="questiontype" placeholder="问题类别">
							<el-option label="单选" value="单选" />
							<el-option label="多选" value="多选" />
						</el-select>
					</el-form-item>
					<el-form-item label="问题内容">
						<el-input prop="questioncontent" placeholder="问题内容" />
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit">搜索</el-button>
					</el-form-item>
				</el-form>
			</el-header>
			<el-main class="main">
				<div class="common-layout">
					<el-container>
						<el-header>
							<el-form-item class="button">
								<router-link to="/question/add">
									<el-button class="AddButton" type="primary">新增</el-button>
								</router-link>
							</el-form-item>
						</el-header>
						<el-main class="inmain">
							<el-table
								ref="multipleTableRef"
								:data="tableData"
								style="width: 100%"
								height="400px"
								@selection-change="handleSelectionChange"
							>
								<el-table-column type="selection" width="55" />
								<el-table-column
									prop="questiontype"
									label="问题类别"
									width="200"
								/>
								<el-table-column
									prop="questioncontent"
									label="问题内容"
									width="500"
								/>

								<el-table-column label="操作" width="200">
									<template #default="scope">
										<router-link to="/paper/update">
											<el-button
												size="small"
												@click="handleEdit(scope.$index, scope.row)"
												>编辑</el-button
											>
										</router-link>
										<el-button
											size="small"
											type="danger"
											@click="handleDelete(scope.row)"
											>删除</el-button
										>
									</template>
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
import { onMounted, reactive, ref } from "vue";
import { getQuestionList, deleteQuestion, getQuestionByType } from "@/api/exam";
import { useRouter } from "vue-router";
const router = useRouter();
const loading = ref();

// let tableData = reactive([]);
const questionlist = reactive({
	categoryid: "",
	questionid: "",
	questiontype: "",
	questioncontent: "",
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
