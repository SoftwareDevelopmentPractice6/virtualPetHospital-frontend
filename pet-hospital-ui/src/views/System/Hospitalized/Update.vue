<template>
  <el-container>
    <el-header class="header" height="20px">
      <router-link to="/hospitalized/list">
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
        <!-- <el-form-item label="病房编号">
          <el-input v-model="hospitalized.admissionId" />
        </el-form-item> -->
        <el-form-item label="病房标准">
          <el-input v-model="admission.roomStandard" />
        </el-form-item>
        <el-form-item label="护理级别">
          <el-input v-model="admission.careLevel" />
        </el-form-item>
        <el-form-item label="收费价格">
          <el-input v-model="admission.carePrice" />
        </el-form-item>
        <el-form-item label="病房名字">
          <el-input v-model="admission.admissionRoom" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="admission.remark" />
        </el-form-item>
        <el-form-item>
          <el-button class="SubmitButton" type="primary" @click="onSubmit"
            >保存</el-button
          >
          <router-link to="/hospitalized/list">
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
import { updateAdmission, getAdmissionByRoomStandard } from "@/api/system";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const roomStandard = computed(() => {
  return route.query.roomStandard;
});

const loading = ref(false);
const admission = ref({});
const getAdmissionInfo = async () => {
  if (!unref(roomStandard)) return;
  loading.value = true;
  const {
    admissionList: [info],
  } = await getAdmissionByRoomStandard(unref(roomStandard)).then(
    (res) => res.data
  );
  admission.value = info;
  loading.value = false;
};

onMounted(() => {
  getAdmissionInfo();
});

const onSubmit = async () => {
  loading.value = true;
  await updateAdmission(unref(admission));
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