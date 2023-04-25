<template>
  <div class="admission-wrapper">
    <div class="admission-container">
      <!-- 模糊搜索框 -->
      <div class="header-wrapper wrapper">
        <el-form :inline="true" :model="admission" class="search-form">
          <!-- 住院信息-->
          <el-form-item label="护理级别">
            <el-input
              v-model="admission.classification"
              placeholder="护理级别"
            />
          </el-form-item>
          <el-form-item label="病房标准">
            <el-input
              v-model="admission.roomclassification"
              placeholder="病房标准"
            />
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
          <router-link to="/hospitalized/add">
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
            <el-table-column prop="id" label="病房编号" width="120" />
            <el-table-column
              prop="roomclassification"
              label="病房标准"
              width="150"
            />
            <el-table-column
              prop="classification"
              label="护理级别"
              width="150"
            />
            <el-table-column prop="price" label="收费价格" width="150" />
            <el-table-column prop="position" label="病房位置" width="150" />
            <el-table-column prop="text" label="备注" width="150" />
            <el-table-column label="操作" width="250">
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
import {
  getAdmission,
  deleteAdmissionById,
  getAdmissionByRoomStandard,
} from "@/api/system";
import { useRouter } from "vue-router";
const multipleTableRef = ref(); // 病名表格引用
const router = useRouter();
const loading = ref();
const tableData = ref([]);
const admission = reactive({
  id: "",
  roomclassification: "",
  classification: "",
  price: "",
  position: "",
  text: "",
});
onMounted(() => {
  getAll();
});

// 获取全部信息
const getAll = async () => {
  tableData.value = [];
  loading.value = true;
  let data = await getAdmission().then((res) => res.data);
  data.admissionList.forEach((item) => {
    var value = {
      id: item.admissionId,
      roomclassification: item.roomStandard,
      classification: item.careLevel,
      price: item.carePrice,
      position: item.admissionRoom.roomName,
      text: item.remark,
    };
    tableData.value.push(value);
  });
  loading.value = false;
  console.log("tabledata", tableData);
};
//处理删除事件
const handleDelete = (val) => {
  console.log("val", val);
  deleteAdmission(val.id).then(() => {
    tableData.value = [];
    getAll();
  });
};
// 删除接口
const deleteAdmission = async (id) => {
  await deleteAdmissionById(id).then((res) => console.log("res", res));
};
//提交事件
const onSubmit = async () => {
  if (admission.roomclassification == "") return;
  tableData.value = [];
  loading.value = true;
  const data = await getAdmissionByRoomStandard(
    admission.roomclassification
  ).then((res) => res.data);
  data.admissionList.forEach((item) => {
    var value = {
      id: item.admissionId,
      roomclassification: item.roomStandard,
      classification: item.careLevel,
      price: item.carePrice,
      position: item.admissionRoom.roomName,
      text: item.remark,
    };
    tableData.value.push(value);
  });
  loading.value = false;
  console.log("tabledata", tableData);
};

const handleEdit = (row) => {
  console.log(">>>", row);
  const id = row.id;
  router.push(`/hospitalized/update?admissionId=${id}`);
};
// 批量删除
const handleMultiDelete = async () => {
  let rows = multipleTableRef.value.getSelectionRows();
  for (let item of rows) {
    await deleteAdmissionById(item.id)
      .then((res) => console.log("删除住院项目成功", res))
      .catch((err) => console.log("删除住院项目失败", err));
  }
  getAll();
};

// 重置
const resetForm = () => {
  admission.id = "";
  admission.roomclassification = "";
  admission.classification = "";
  admission.price = "";
  admission.position = "";
  admission.text = "";
};
</script>

<style lang="scss" scoped>
.admission-wrapper {
  width: 100%;
  height: calc(100vh - 50px);
  padding: 30px;
  .admission-container {
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