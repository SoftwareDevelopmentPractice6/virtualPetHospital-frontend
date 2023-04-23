<template>
	<div class="app-container home">
		<el-container>
			<el-header>
				<el-form :inline="true" :model="paperlist" class="search">
					<el-form-item label="试卷名称">
						<el-input v-model="paperlist.papername" placeholder="试卷名称" />
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
								<router-link to="/paper/add">
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
									prop="papername"
									label="试卷名称"
									width="200"
								/>
								<el-table-column
									prop="paperduration"
									label="试卷时长"
									width="130"
								/>
								<el-table-column
									prop="papertotalscore"
									label="试卷总分"
									width="130"
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

								<el-table-column label="查看试卷内容" width="200">
									<template #default="scope">
										<router-link to="/exams/update">
											<el-button
												size="small"
												@click="handleView(scope.$index, scope.row)"
												>查看</el-button
											>
										</router-link>
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
import {
	getPaperList,
	deleteExaminationById,
	getPaperByName,
} from "@/api/exam";
import { useRouter } from "vue-router";
const router = useRouter();
const loading = ref();

// let tableData = reactive([]);
const paperlist = reactive({
	examrealid: "",

	paperid: "",
	papername: "",
	paperduration: "",
	papertotalscore: "",
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
	let data = await getPaperList().then((res) => res.data);
	data.examSessionList.forEach((item) => {
		var value = {
			examrealid: item.examSessionPaper.paperExam.examId,
			paperid: item.examSessionPaper.paperId,
			papername: item.examSessionPaper.paperName,
			paperduration: item.examSessionPaper.paperDuration,
			papertotalscore: item.examSessionPaper.paperTotalScore,
		};
		tableData.value.push(value);
	});
	console.log("tabledata", tableData);
};

const handleDelete = (val) => {
	console.log("val", val);
	deletePaper(val.examrealid).then(() => {
		tableData = reactive([]);
		getAll();
	});
};
// 删除接口
const deletePaper = async (examrealid) => {
	await deleteExaminationById(examrealid).then((res) =>
		console.log("res", res)
	);
};
const onSubmit = async () => {
	// console.log("submit!");
	if (paperlist.papername === "") return;
	tableData.value = [];
	loading.value = true;
	const data = await getPaperByName(paperlist.papername).then(
		(res) => res.data
	);
	data.examSessionList.forEach((item) => {
		var value = {
			paperid: item.examSessionPaper.paperId,
			papername: item.examSessionPaper.paperName,
			paperduration: item.examSessionPaper.paperDuration,
			papertotalscore: item.examSessionPaper.paperTotalScore,
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
