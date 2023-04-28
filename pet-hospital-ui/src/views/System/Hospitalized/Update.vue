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
        <el-form-item label="病房标准">
          <el-select v-model="admission.roomStandard">
            <el-option
              v-for="item in roomStandardList"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="护理级别">
          <el-select v-model="admission.careLevel">
            <el-option
              v-for="item in careLevelList"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="收费价格">
          <el-input v-model="admission.carePrice" />
        </el-form-item>
        <el-form-item label="病房位置">
          <el-input v-model="admission.admissionRoom.roomName" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="admission.remark" />
        </el-form-item>
        <el-form-item>
          <el-button class="SubmitButton" type="primary" @click="onSubmit">
            保存
          </el-button>
          <el-button class="CancelButton" @click="back">取消</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script setup>
import { computed, unref, onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import {
  updateAdmission,
  getAdmissionByRoomStandard,
  insertAdmission,
} from "@/api/system";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const admissionId = computed(() => {
  return route.query.admissionId;
});

const loading = ref(false);

const allList = ref([]);
const admission = ref({ admissionRoom: {} });

const roomStandardList = computed(() => {
  const list = unref(allList).map((item) => item.roomStandard);
  return [...new Set(list)].map((item) => ({
    label: item,
    value: item,
  }));
});

const careLevelList = computed(() => {
  const list = unref(allList).map((item) => item.careLevel);
  return [...new Set(list)].map((item) => ({
    label: item,
    value: item,
  }));
});
const getAdmissionInfo = async () => {
  if (!unref(admissionId)) return;
  loading.value = true;
  const { admissionList } = await getAdmissionByRoomStandard().then(
    (res) => res.data
  );
  allList.value = JSON.parse(JSON.stringify(admissionList));
  loading.value = false;
};

const getEditInfo = () => {
  if (!unref(admissionId)) return;
  const list = JSON.parse(JSON.stringify(unref(allList)));
  const emitItem =
    list.find((item) => item.admissionId.toString() === unref(admissionId)) ||
    {};
  admission.value = emitItem;
};

onMounted(async () => {
  await getAdmissionInfo();
  getEditInfo();
});

const onSubmit = async () => {
  loading.value = true;

  const { admissionRoom, ...args } = unref(admission);
  const params = {
    ...args,
    roomName: admissionRoom.roomName,
  };
  if (unref(admissionId)) {
    await updateAdmission(params);
  } else {
    await insertAdmission(params);
  }
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
