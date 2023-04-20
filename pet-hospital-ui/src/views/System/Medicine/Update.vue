<template>
  <el-container v-loading="loading">
    <el-header class="header" height="20px">
      <router-link to="/medicine/list">
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
        <el-form-item label="药品ID">
          <el-input v-model="medicine.medicineId" />
        </el-form-item>
        <el-form-item label="药品名称">
          <el-input v-model="medicine.medicineName" />
        </el-form-item>
        <el-form-item label="药品类别">
          <el-input v-model="medicine.medicineCategory" />
        </el-form-item>
        <!-- <el-form-item label="疾病类别">
          <el-select
            v-model="medicine.medicineCategory"
            placeholder="请选择药品类别"
          >
            <el-option label="传染病" value="传染病" />
            <el-option label="寄生虫病" value="寄生虫病" />
            <el-option label="内科" value="内科" />
            <el-option label="外产科" value="外产科" />
            <el-option label="常用手术" value="常用手术" />
            <el-option label="免疫" value="免疫" />
          </el-select>
        </el-form-item> -->
        <el-form-item label="生产厂家">
          <el-input v-model="medicine.manufacturer" />
        </el-form-item>

        <el-form-item label="药品价格">
          <el-input v-model="medicine.medicinePrice" />
        </el-form-item>
        <el-form-item label="药品规格">
          <el-input v-model="medicine.specification" />
        </el-form-item>
        <el-form-item label="是否是疫苗">
          <el-radio-group v-model="medicine.isVaccine">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button class="SubmitButton" type="primary" @click="onSubmit">
            保存
          </el-button>
          <router-link to="/medicine/list">
            <el-button class="CancelButton"> 取消 </el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script setup>
import { computed, unref, onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { updateMedicine, getMedicineByName } from "@/api/system";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();

const router = useRouter();
const medicineName = computed(() => {
  return route.query.medicineName;
});

const loading = ref(false);

const medicine = ref({});

const getMedicineInfo = async () => {
  if (!unref(medicineName)) return;
  loading.value = true;
  const {
    medicineList: [info],
  } = await getMedicineByName(unref(medicineName)).then((res) => res.data);
  medicine.value = info;
  loading.value = false;
};

onMounted(() => {
  getMedicineInfo();
});

const onSubmit = async () => {
  loading.value = true;
  await updateMedicine(unref(medicine));
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