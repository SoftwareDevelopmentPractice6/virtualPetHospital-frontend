<template>
  <el-container v-loading="loading">
    <el-header class="header" height="20px">
      <router-link to="/user/list">
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
        <el-form-item label="用户名称">
          <el-input v-model="userlist.userName" />
        </el-form-item>
        <el-form-item label="用户密码">
          <el-input v-model="userlist.userPassword" />
        </el-form-item>

        <el-form-item label="用户身份类别">
          <el-input v-model="userlist.userAuthority" />
        </el-form-item>

        <el-form-item>
          <el-button class="SubmitButton" type="primary" @click="onSubmit"
            >保存</el-button
          >
          <router-link to="/exams/list">
            <el-button class="CancelButton" @click="back">取消</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>
<script setup>
import { computed, unref, onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { updateUser, getUserList } from "@/api/user";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();

const router = useRouter();
const id = computed(() => {
  return route.query.userId;
});

const loading = ref(false);

const userlist = ref({});

const getUserInfo = async () => {
  if (!unref(id)) return;
  loading.value = true;
  const list = ref();
  await getUserList(unref(id)).then((res) => {
    list.value = res.data.userList;
  });
  for (let item of list.value) {
    if (item.userId == id.value) {
      userlist.value = item;
    }
  }
  console.log("userlist.value", userlist.value);
  loading.value = false;
};
getUserInfo();

onMounted(() => {});

const onSubmit = async () => {
  loading.value = true;
  await updateUser(unref(userlist));
  ElMessage.success("提交成功！");
  loading.value = false;
  router.back();
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
