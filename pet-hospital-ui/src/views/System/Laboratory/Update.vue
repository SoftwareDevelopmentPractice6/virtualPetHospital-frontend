<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header" height="20px">
        <router-link to="/laboratory/list">
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
          <el-form-item label="项目编号">
            <el-input v-model="examine.examineId" />
          </el-form-item>
          <el-form-item label="项目名称">
            <el-input v-model="examine.examineName" />
          </el-form-item>
          <el-form-item label="项目价格">
            <el-input v-model="examine.examinePrice" />
          </el-form-item>
          <el-form-item label="项目地点">
            <el-input v-model="examine.examineRoom.roomName" />
          </el-form-item>
          <el-form-item>
            <el-button class="SubmitButton" type="primary" @click="onSubmit"
              >保存</el-button
            >
            <el-button class="CancelButton" @click="back">取消</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { computed, unref, onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { updateExamine, getExamineByName } from "../../../api/system";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();

const router = useRouter();

const examineName = computed(() => {
  return route.query.examineName;
});

const loading = ref(false);
const examine = ref({ examineRoom: {} });

const getExamineInfo = async () => {
  if (!unref(examineName)) return;
  loading.value = true;
  const {
    examineList: [info],
  } = await getExamineByName(unref(examineName)).then((res) => res.data);
  examine.value = info;
  loading.value = false;
};

onMounted(() => {
  getExamineInfo();
});

const onSubmit = async () => {
  loading.value = true;
  const { examineRoom, ...args } = unref(examine);
  await updateExamine({
    ...args,
    roomName: examineRoom.roomName,
  });
  ElMessage.success("提交成功！");
  loading.value = false;
  back();
};

const back = () => {
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
