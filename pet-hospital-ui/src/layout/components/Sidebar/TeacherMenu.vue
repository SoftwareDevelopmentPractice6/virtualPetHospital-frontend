<!-- 老师侧边菜单 -->

<template>
	<div class="teacherBar">
		<el-sub-menu index="1">
			<template #title>
				<el-icon><notebook /></el-icon> <span>考试题库管理</span></template
			>
			<el-menu-item index="1-1">
				<template #title>
					<el-icon><collection /></el-icon> <span>题库管理</span></template
				></el-menu-item
			>
			<el-menu-item index="/exams/list">
				<template #title>
					<el-icon><timer /></el-icon> <span>考试管理</span></template
				></el-menu-item
			>
			<el-menu-item index="/paper/list"
				><template #title>
					<el-icon><document /></el-icon> <span>试卷管理</span></template
				></el-menu-item
			>
		</el-sub-menu>
	</div>
</template>
