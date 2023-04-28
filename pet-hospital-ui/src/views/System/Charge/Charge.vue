<template>
  <div class="charge-wrapper">
    <div class="charge-container">
      <!-- 模糊搜索框 -->
      <div class="header-wrapper wrapper">
        <el-form :inline="true" :model="charge" class="search-form">
          <!-- 收费项目名称-->
          <el-form-item label="收费项目名称">
            <el-input v-model="charge.name" placeholder="请输入收费项目名称" />
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
          <router-link to="/medicine/add">
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
            <el-table-column prop="id" label="收费编号" width="220" />
            <el-table-column prop="name" label="收费项目名称" width="420" />
            <el-table-column prop="price" label="收费价格" width="250" />
            <el-table-column label="操作" width="300">
              <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.row)">
                  编辑
                </el-button>

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
import { getCharge, deleteChargeById, getChargeByName } from "@/api/system";
import { useRouter } from "vue-router";
const router = useRouter();
const multipleTableRef = ref(); // 病名表格引用
const loading = ref();
const tableData = ref([]);
const charge = reactive({
  id: "",
  name: "",
  price: "",
});
onMounted(() => {
  getAll();
});

// 获取全部信息
// 获取全部病例信息

const getAll = async () => {
  tableData.value = [];
  loading.value = true;
  let data = await getCharge().then((res) => res.data);
  data.chargeList.forEach((item) => {
    var value = {
      id: item.chargeId,
      name: item.itemName,
      price: item.chargePrice,
    };
    tableData.value.push(value);
  });
  loading.value = false;

  console.log("tabledata", tableData);
};

const handleDelete = async (val) => {
  await deleteCharge(val.id).then(() => {
    tableData.value = [];
    getAll();
  });
};
// 删除接口
const deleteCharge = async (id) => {
  await deleteChargeById(id).then((res) => console.log("res", res));
};
const onSubmit = async () => {
  if (charge.name === "") return;
  tableData.value = [];
  loading.value = true;
  const data = await getChargeByName(charge.name).then((res) => res.data);
  data.chargeList.forEach((item) => {
    var value = {
      id: item.chargeId,
      name: item.itemName,
      price: item.chargePrice,
    };

    tableData.value.push(value);
  });
  loading.value = false;

  console.log("tabledata", tableData);
};

const handleEdit = (row) => {
  const name = row.name;
  router.push(`/charge/update?itemName=${name}`);
};
// 批量删除
const handleMultiDelete = async () => {
  let rows = multipleTableRef.value.getSelectionRows();
  for (let item of rows) {
    await deleteChargeById(item.id)
      .then((res) => console.log("删除收费项目成功", res))
      .catch((err) => console.log("删除收费项目失败", err));
  }
  getAll();
};

// 重置
const resetForm = () => {
  charge.id = "";
  charge.price = "";
  charge.name = "";
};
</script>

<style lang="scss" scoped>
.charge-wrapper {
  width: 100%;
  height: calc(100vh - 50px);
  padding: 30px;
  .charge-container {
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
