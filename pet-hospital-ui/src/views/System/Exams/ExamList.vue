<template>
	<div class="app-container home">
		<el-container>
			<el-header>
				<el-form :inline="true" :model="examlist" class="search">
					<el-form-item label="考试名称">
						<el-input v-model="examlist.examname" placeholder="考试名称" />
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
								<router-link to="/exams/add">
									<el-button class="AddButton" type="primary">新增</el-button>
								</router-link>

								<router-link to="/exams/add">
									<el-button class="ChangeButton" type="primary"
										>修改</el-button
									>
								</router-link>

								<el-button class="DeleteButton" @click="open" type="primary"
									>删除</el-button
								>
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
								<el-table-column prop="examid" label="考试编号" width="80" />
								<el-table-column prop="examname" label="考试名称" width="120" />
								<el-table-column
									prop="examduration"
									label="考试时长"
									width="110"
								/>
								<el-table-column
									prop="examtotalscore"
									label="考试总分"
									width="110"
								/>
								<el-table-column
									prop="examstart"
									label="考试开始时间"
									width="170"
								/>
								<el-table-column
									prop="examend"
									label="考试结束时间"
									width="170"
								/>
								<el-table-column
									prop="papername"
									label="考试试卷名称"
									width="120"
								/>

								<el-table-column label="操作" width="200">
									<template #default="scope">
										<router-link to="/archives/update">
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
import { onMounted, reactive } from "vue";
import { getExamList, deleteExaminationById } from "@/api/exam";

let tableData = reactive([]);

onMounted(() => {
	getAll();
});
const handleSelectionChange = (val) => {
	console.log(val);
};
// 获取全部信息
const getAll = async () => {
	let data = await getExamList().then((res) => res.data);
	data.examSessionList.forEach((item) => {
		var value = {
			examid: item.examSessionId,
			examname: item.examSessionPaper.paperExam.examName,
			examduration: item.examSessionPaper.paperDuration,
			examtotalscore: item.examSessionPaper.paperTotalScore,
			examstart: item.examSessionStartTime,
			examend: item.examSessionEndTime,
			papername: item.examSessionPaper.paperName,
		};
		tableData.push(value);
	});
	console.log("tabledata", tableData);
};
const examlist = reactive({
	examid: "",
	examname: "",
	examduration: "",
	examtotalscore: "",
	examstart: "",
	examend: "",
	papername: "",
});
const handleDelete = (val) => {
	console.log("val", val);
	deleteExamination(val.id).then(() => {
		tableData = reactive([]);
		getAll();
	});
};
// 删除接口
const deleteExamination = async (id) => {
	await deleteExaminationById(id).then((res) => console.log("res", res));
};
const onSubmit = () => {
	console.log("submit!");
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
