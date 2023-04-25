<template>
  <div class="laboratory-wrapper">
    <div class="laboratory-container">
      <!-- 模糊搜索框 -->
      <div class="header-wrapper wrapper">
        <el-form :inline="true" :model="charge" class="search-form">
          <!-- 化验项目名称-->
          <el-form-item label="化验项目名称">
            <el-input v-model="examine.name" placeholder="化验项目名称" />
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
          <router-link to="/laboratory/add">
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

      <!-- 收费表格 -->
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

            <el-table-column prop="id" label="项目编号" width="200" />
            <el-table-column prop="name" label="项目名称" width="250" />

            <el-table-column prop="price" label="项目价格" width="250" />
            <el-table-column prop="position" label="项目地点" width="250" />
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
import { getExamine, deleteExamineById, getExamineByName } from "@/api/system";
import { useRouter } from "vue-router";
const multipleTableRef = ref(); // 病名表格引用
const router = useRouter();
const loading = ref();

const examine = reactive({
  id: "",
  name: "",
  price: "",
  position: "",
});
const tableData = ref([]);

onMounted(() => {
  getAll();
});

// 获取全部信息
const getAll = async () => {
  let data = await getExamine().then((res) => res.data);
  data.examineList.forEach((item) => {
    var value = {
      id: item.examineId,
      name: item.examineName,
      price: item.examinePrice,
      position: item.examineRoom.roomName,
    };
    tableData.value.push(value);
  });
  loading.value = false;
  console.log("tabledata", tableData);
};
const handleDelete = (val) => {
  console.log("val", val);
  deleteExamine(val.id).then(() => {
    tableData.value = [];
    getAll();
  });
};
// 删除接口
const deleteExamine = async (id) => {
  await deleteExamineById(id).then((res) => console.log("res", res));
};
const onSubmit = async () => {
  if (examine.name === "") return;
  tableData.value = [];
  loading.value = true;
  const data = await getExamineByName(examine.name).then((res) => res.data);
  data.examineList.forEach((item) => {
    var value = {
      id: item.examineId,
      name: item.examineName,
      price: item.examinePrice,
      position: item.examineRoom.roomName,
    };

    tableData.value.push(value);
  });
  loading.value = false;
  console.log("tabledata", tableData);
};

const handleEdit = (row) => {
  const name = row.name;
  router.push(`/laboratory/update?examineName=${name}`);
};
// 批量删除
const handleMultiDelete = async () => {
  let rows = multipleTableRef.value.getSelectionRows();
  for (let item of rows) {
    await deleteExamineById(item.id)
      .then((res) => console.log("删除化验项目成功", res))
      .catch((err) => console.log("删除化验项目失败", err));
  }
  getAll();
};

// 重置
const resetForm = () => {
  examine.id = "";
  examine.name = "";
  examine.price = "";
  examine.position = "";
};
</script>

<style lang="scss" scoped>
.laboratory-wrapper {
  width: 100%;
  height: calc(100vh - 50px);
  padding: 30px;
  .laboratory-container {
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
        width: 500px;
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