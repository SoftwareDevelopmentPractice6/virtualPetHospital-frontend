<template>
	<div class="SubmitSuccess">
		<div class="submit">
			<el-icon class="icon" style="large"><SuccessFilled /></el-icon>
			<h1 class="title">提交成功</h1>
		</div>
		<div>
			<router-link to="/ExamSelection">
				<el-button type="success" round class="finish">完成</el-button></router-link
			>
		</div>
	</div>
</template>
<script setup></script>
<style lang="scss" scoped>
.SubmitSuccess {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	flex-direction: column;
	.submit {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap; /* 将组件1和组件2放在同一行 */
		max-width: 30%; /* 设置行的最大宽度 */
	}
	.icon,
	.title{
		margin: 10px; /* 设置组件之间的间距 */
		width: 130px; /* 设置组件的宽度 */
		height: 100px; /* 设置组件的高度 */
		display: flex; /* 将组件内的内容垂直水平居中 */
		justify-content: center;
		align-items: center;

        .icon{
            width:50px;
            height:50px;
        }
	}
	.finish {
		margin-top: 10px; /* 设置组件3与组件1和组件2之间的间距 */
		width: 150px;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>
