<template>
  <div class="medicine-wrapper">
    <div class="medicine-container">
      <!-- 搜索框 -->
      <div class="header-wrapper wrapper">
        <el-form :inline="true" :model="cases" class="search-form">
          <!--药名 -->
          <el-form-item label="疾病名称:">
            <el-input v-model="medicine.name" placeholder="请输入药品名称" />
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
      <!-- 药品表格 -->
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
            <el-table-column prop="id" label="药品编号" width="100" />
            <el-table-column prop="name" label="药品名称" width="100" />
            <el-table-column
              prop="classification"
              label="药品类别"
              width="100"
            />
            <el-table-column prop="price" label="药品价格" width="100" />
            <el-table-column prop="manufacturer" label="生产厂家" width="100" />
            <el-table-column
              prop="specifications"
              label="药品规格"
              width="100"
            />
            <el-table-column prop="vaccine" label="是否是疫苗" width="100" />
            <el-table-column label="操作" width="200">
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
import { getMedicine, deleteById, getMedicineByName } from "@/api/system";
import { useRouter } from "vue-router";
const router = useRouter();
const multipleTableRef = ref(); // 药品表格引用
const loading = ref();

const medicine = reactive({
  id: "",
  name: "",
  classification: "",
  price: "",
  manufacturer: "",
  specifications: "",
  vaccine: "",
});
const tableData = ref([]);

onMounted(() => {
  getAll();
});

// 获取全部药品信息
const getAll = async () => {
  tableData.value = [];
  loading.value = true;
  let data = await getMedicine().then((res) => res.data);
  data.medicineList.forEach((item) => {
    var value = {
      id: item.medicineId,
      name: item.medicineName,
      classification: item.medicineCategory,
      price: item.medicinePrice,
      manufacturer: item.manufacturer,
      specifications: item.specification,
      vaccine: item.isVaccine,
    };
    if (value.vaccine == "0") {
      value.vaccine = "否";
    } else {
      value.vaccine = "是";
    }
    tableData.value.push(value);
  });
  loading.value = false;

  console.log("tabledata", tableData);
};

const handleDelete = (val) => {
  console.log("val", val);
  deleteMedicine(val.id).then(() => {
    tableData.value = [];
    getAll();
  });
};
// 删除接口
const deleteMedicine = async (id) => {
  await deleteById(id).then((res) => console.log("res", res));
};

const onSubmit = async () => {
  if (medicine.name === "") return;
  tableData.value = [];
  loading.value = true;
  const data = await getMedicineByName(medicine.name).then((res) => res.data);
  data.medicineList.forEach((item) => {
    var value = {
      id: item.medicineId,
      name: item.medicineName,
      classification: item.medicineCategory,
      price: item.medicinePrice,
      manufacturer: item.manufacturer,
      specifications: item.specification,
      vaccine: item.isVaccine,
    };
    if (value.vaccine == "0") {
      value.vaccine = "否";
    } else {
      value.vaccine = "是";
    }
    tableData.value.push(value);
  });
  loading.value = false;

  console.log("tabledata", tableData);
};

const handleEdit = (row) => {
  const name = row.name;
  router.push(`/medicine/update?medicineName=${name}`);
};
const handleMultiDelete = async () => {
  let rows = multipleTableRef.value.getSelectionRows();
  for (let item of rows) {
    await deleteById(item.id)
      .then((res) => console.log("删除病例成功", res))
      .catch((err) => console.log("删除病例失败", err));
  }
  getAll();
};
const resetForm = () => {
  medicine.id = "";
  medicine.name = "";
  medicine.classification = "";
  medicine.price = "";
  medicine.manufacturer = "";
  medicine.specifications = "";
  medicine.vaccine = "";
};
</script>

<style lang="scss" scoped>
.medicine-wrapper {
  width: 100%;
  height: calc(100vh - 50px);
  padding: 30px;
  .medicine-container {
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