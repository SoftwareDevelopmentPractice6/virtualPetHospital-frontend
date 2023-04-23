<template>
  <div class="app-container home">
    <el-container>
      <el-header>
        <el-form :inline="true" :model="cases" class="search">
          <el-form-item label="搜索内容">
            <el-input v-model="cases.name" placeholder="搜索内容" />
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
                <router-link to="/cases/add">
                  <el-button class="AddButton" type="primary">新增</el-button>
                </router-link>

                <router-link to="/cases/data">
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
                <el-table-column prop="id" label="病例ID" width="180" />
                <el-table-column prop="name" label="疾病名称" width="180" />
                <el-table-column
                  prop="classification"
                  label="疾病类型"
                  width="180"
                />
                <el-table-column label="操作" width="250">
                  <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.row)"
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
            </el-main>
          </el-container>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import {
  getDisease,
  deleteDiseaseById,
  getMedicineByKeyword,
} from "@/api/case";
import { useRouter } from "vue-router";
const router = useRouter();
const loading = ref();
const tableData = ref([]);
const cases = reactive({
  id: "",
  name: "",
  classification: "",
});
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
  let data = await getDisease().then((res) => res.data);
  data.diseaseNameList.forEach((item) => {
    var value = {
      id: item.diseaseNameId,
      name: item.diseaseNameContent,
      classification: item.diseaseNameCategory,
    };
    tableData.value.push(value);
  });
  loading.value = false;
  console.log("tabledata", tableData);
};

const handleDelete = (val) => {
  console.log("val", val);
  deleteDisease(val.id).then(() => {
    tableData.value = [];
    getAll();
  });
};
// 删除接口
const deleteDisease = async (id) => {
  await deleteDiseaseById(id).then((res) => console.log("res", res));
};

const handleEdit = (row) => {
  const diseaseNameId = row.id;
  router.push(`/cases/detail?diseaseNameId=${diseaseNameId}`);
};

//搜索事件
const onSubmit = async () => {
  if (cases.classification === "") return;
  tableData.value = [];
  loading.value = true;
  const data = await getMedicineByKeyword(cases.classification).then(
    (res) => res.data
  );
  data.diseaseNameList.forEach((item) => {
    var value = {
      id: item.diseaseNameId,
      name: item.diseaseNameContent,
      classification: item.diseaseNameCategory,
    };
    tableData.value.push(value);
  });
  loading.value = false;
  console.log("tabledata", tableData);
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
  text-align: center;
  margin-block-end: 10px;
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
</style>