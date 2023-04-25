<template>
  <div class="archive-wrapper">
    <div class="archive-container">
      <!-- 模糊搜索框 -->
      <div class="header-wrapper wrapper">
        <el-form :inline="true" :model="archive" class="search-form">
          <!-- 收费项目名称-->
          <el-form-item label="宠物名称">
            <el-input v-model="archive.name" placeholder="宠物名称" />
          </el-form-item>

          <!-- 搜索 -->
          <el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
            <el-button type="info" @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 操作按键 -->
      <div class="btns-wrapper wrapper">
        <div class="btn-container">
          <router-link to="/archive/add">
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

      <!-- 档案表格 -->
      <div class="table-wrapper wrapper">
        <div class="table-container">
          <el-table
            ref="multipleTableRef"
            :data="tableData"
            v-loading="loading"
            height="500px"
            :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column prop="id" label="档案编号" width="120" />
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
            <el-table-column prop="phone" label="主人联系方式" width="120" />
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
        </div>
      </div>
    </div>
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
const multipleTableRef = ref(); // 病名表格引用
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
// 批量删除
const handleMultiDelete = async () => {
  let rows = multipleTableRef.value.getSelectionRows();
  for (let item of rows) {
    await deleteArchiveById(item.archiveId)
      .then((res) => console.log("删除档案成功", res))
      .catch((err) => console.log("删除档案失败", err));
  }
  getAll();
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
.archive-wrapper {
  width: 100%;
  height: calc(100vh - 50px);
  padding: 30px;
  .archive-container {
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
        width: 480px;
        height: 32px;
      }
    }
    .btns-wrapper {
      margin-left: 80px;
      .btn-container {
        display: inline-block;
        margin-right: 8px;
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