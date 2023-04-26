<template>
  <div class="case-wrapper">
    <div class="case-container">
      <!-- 模糊搜索框 -->
      <div class="header-wrapper wrapper">
        <el-form :inline="true" :model="userlist" class="search">
          <el-form-item label="用户名称">
            <el-input v-model="userlist.userauthority" placeholder="用户名称" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
            <el-button type="info" @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 操作按键 -->
      <div class="btns-wrapper wrapper">
        <div class="btn-container">
          <router-link to="/user/add">
            <el-button class="AddButton" type="success" plain>新增</el-button>
          </router-link>
        </div>
        <div class="btn-container"></div>
        <div class="btn-container">
          <el-button
            class="DeleteButton"
            @click="handleMultiDelete"
            type="danger"
            plain
            >删除</el-button
          >
        </div>
      </div>
      <div class="table-wrapper wrapper">
        <div class="table-container">
          <el-table
            ref="multipleTableRef"
            :data="tableData"
            height="500px"
            :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column type="index" label="序号" width="55" />

            <el-table-column prop="userid" label="用户ID" width="200" />
            <el-table-column prop="username" label="用户名称" width="200" />
            <el-table-column prop="userpassword" label="用户密码" width="200" />
            <el-table-column
              prop="userauthority"
              label="用户身份类别"
              width="200"
            />

            <el-table-column label="操作" width="300">
              <template #default="scope">
                <el-button
                  size="small"
                  type="warning"
                  plain
                  @click="handleEdit(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from "vue";
import { getUserList, deleteUserById, getUserByName } from "@/api/user";
import { useRouter } from "vue-router";
const router = useRouter();
const loading = ref();

// let tableData = reactive([]);
const userlist = reactive({
  userid: "",
  username: "",
  userpassword: "",
  userauthority: "",
});
const tableData = ref([]);

const multipleTableRef = ref();

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

  let data = await getUserList().then((res) => res.data);
  data.userList.forEach((item) => {
    var value = {
      userid: item.userId,
      username: item.userName,
      userpassword: item.userPassword,
      userauthority: item.userAuthority,
    };
    tableData.value.push(value);
  });
  console.log("tabledata", tableData);
};

const handleDelete = (val) => {
  console.log("val", val);
  deleteUser(val.userid).then(() => {
    tableData.value = [];
    getAll();
  });
};
// 删除接口
const deleteUser = async (userid) => {
  await deleteUserById(userid).then((res) => console.log("res", res));
};
const onSubmit = async () => {
  // console.log("submit!");
  if (userlist.username === "") return;
  tableData.value = [];
  loading.value = true;
  const data = await getUserByName(userlist.username).then((res) => res.data);
  data.userList.forEach((item) => {
    var value = {
      userid: item.userId,
      username: item.userName,
      userpassword: item.userPassword,
      userauthority: item.userAuthority,
    };
    tableData.value.push(value);
  });

  loading.value = false;
  console.log("tabledata", tableData);
};
const handleEdit = (userList) => {
  const userid = userList.userid;
  // router.push(`/exams/update?examSessionId=${id}`);
  router.push({ path: "update", query: { userId: userid } });
};
const resetForm = () => {
  userlist.userid = "";
  userlist.username = "";
  userlist.userpassword = "";
  userlist.userauthority = "";
};
const handleMultiDelete = async () => {
  let rows = multipleTableRef.value.getSelectionRows();
  for (let item of rows) {
    await deleteUserById(item.userid)
      .then((res) => console.log("删除用户成功", res))
      .catch((err) => console.log("删除用户失败", err));
  }
  getAll();
};
</script>
<style lang="scss" scoped>
.case-wrapper {
  width: 100%;
  height: calc(100vh - 50px);
  padding: 30px;
  .case-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    .wrapper {
      width: 100%;
      margin-bottom: 10px;
    }
    .header-wrapper {
      display: flex;
      justify-content: center;
      margin-bottom: 25px;
      .search-form {
        width: 800px;
        height: 32px;
      }
    }
    .btns-wrapper {
      margin-left: 75px;
      .btn-container {
        display: inline-block;
        margin-right: 7px;
      }
    }
    .table-wrapper {
      display: flex;
      justify-content: center;
      width: 100%;
      .table-container {
        width: 95%;
      }
    }
  }
}
</style>
