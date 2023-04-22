<template>
  <div class="app-container home">
    <el-container>
      <el-header>
        <el-form :inline="true" :model="archive" class="search">
          <el-form-item label="宠物类别">
            <el-select
              v-model="archive.petclassification"
              placeholder="宠物类别"
            >
              <el-option label="哺乳类动物" value="哺乳类动物" />
              <el-option label="爬行类宠物" value="爬行类宠物" />
              <el-option label="鸟类宠物" value="鸟类宠物" />
              <el-option label="鱼类宠物" value="鱼类宠物" />
              <el-option label="昆虫类宠物" value="昆虫类宠物" />
            </el-select>
          </el-form-item>
          <el-form-item label="宠物名称">
            <el-input v-model="archive.name" placeholder="宠物名称" />
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
                <router-link to="/archive/add">
                  <el-button class="AddButton" type="primary">新增</el-button>
                </router-link>

                <router-link to="/archive/add">
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
                v-loading="loading"
                ref="multipleTableRef"
                :data="tableData"
                style="width: 100%"
                height="400px"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="55" />
                <!-- <el-table-column prop="id" label="档案编号" width="120" /> -->
                <el-table-column prop="date" label="保存时间" width="120" />
                <el-table-column prop="name" label="宠物名称" width="120" />
                <el-table-column
                  prop="classification"
                  label="疾病名称"
                  width="120"
                />
                <el-table-column
                  prop="petclassification"
                  label="宠物类别"
                  width="120"
                />
                <el-table-column prop="gender" label="宠物性别" width="120" />
                <el-table-column
                  prop="phone"
                  label="主人联系方式"
                  width="120"
                />
                <el-table-column label="操作" width="250">
                  <template #default="scope">
                    <!--   <router-link to="/archive/update"> -->
                    <el-button size="small" @click="handleEdit(scope.row)"
                      >编辑</el-button
                    >
                    <!-- </router-link> -->
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
  getArchive,
  deleteArchiveById,
  getArchiveByPetName,
} from "@/api/system";
import { useRouter } from "vue-router";

const router = useRouter();

const loading = ref();
const archive = reactive({
  id: "",
  date: "",
  name: "",
  classification: "",
  petclassification: "",
  gender: "",
  phone: "",
});

const tableData = ref([]);

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
  let data = await getArchive().then((res) => res.data);
  data.archiveList.forEach((item) => {
    var value = {
      id: item.archiveId,
      date: item.storeTime,
      name: item.petName,
      classification: item.diseaseType,
      petclassification: item.petType,
      gender: item.petSex,
      phone: item.ownerTel,
    };
    tableData.value.push(value);
  });
  loading.value = false;
  console.log("tabledata", tableData);
};

const handleDelete = (val) => {
  console.log("val", val);
  deleteArchive(val.id).then(() => {
    tableData.value = [];
    getAll();
  });
};
// 删除接口
const deleteArchive = async (id) => {
  await deleteArchiveById(id).then((res) => console.log("res", res));
};

const onSubmit = async () => {
  if (archive.name === "") return;
  tableData.value = [];
  loading.value = true;
  const data = await getArchiveByPetName(archive.name).then((res) => res.data);
  data.archiveList.forEach((item) => {
    var value = {
      id: item.archiveId,
      date: item.storeTime,
      name: item.petName,
      classification: item.diseaseType,
      petclassification: item.petType,
      gender: item.petSex,
      phone: item.ownerTel,
    };

    tableData.value.push(value);
  });
  loading.value = false;

  console.log("tabledata", tableData);
};
const handleEdit = (row) => {
  const name = row.name;
  router.push(`/archive/update?petName=${name}`);
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
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
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