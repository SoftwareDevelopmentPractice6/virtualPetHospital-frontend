<template>
  <el-container>
    <el-header class="header" height="20px">
      <router-link to="/archive/list">
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
        <el-form-item label="档案编号">
          <el-input v-model="archive.archiveId" />
        </el-form-item>
        <el-form-item label="保存时间">
          <el-input v-model="archive.storeTime" />
        </el-form-item>
        <el-form-item label="宠物名称">
          <el-input v-model="archive.petName" />
        </el-form-item>
        <el-form-item label="疾病名称">
          <el-input v-model="archive.diseaseType" />
        </el-form-item>
        <el-form-item label="宠物类别">
          <el-input v-model="archive.petType" />
        </el-form-item>
        <el-form-item label="宠物性别">
          <el-input v-model="archive.petSex" />
        </el-form-item>
        <el-form-item label="主人联系方式">
          <el-input v-model="archive.ownerTel" />
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
</template>

<script setup>
import { computed, unref, onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { updateArchive, getArchiveByPetName } from "../../../api/system";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();

const router = useRouter();
const petName = computed(() => {
  return route.query.petName;
});

const loading = ref(false);

const archive = ref({});

const getArchiveInfo = async () => {
  if (!unref(petName)) return;
  loading.value = true;
  const {
    archiveList: [info],
  } = await getArchiveByPetName(unref(petName)).then((res) => res.data);
  archive.value = info;
  loading.value = false;
};

onMounted(() => {
  getArchiveInfo();
});

const onSubmit = async () => {
  loading.value = true;
  await updateArchive(unref(archive));
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
