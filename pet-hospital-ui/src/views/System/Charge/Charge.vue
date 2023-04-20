<template>
  <div class="app-container home">
    <el-container>
      <el-header>
        <el-form :inline="true" :model="charge" class="search">
          <el-form-item label="收费项目名称">
            <el-input v-model="charge.name" placeholder="收费项目名称" />
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
                <router-link to="/charge/add">
                  <el-button class="AddButton" type="primary">新增</el-button>
                </router-link>

                <router-link to="/charge/add">
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
                <el-table-column prop="id" label="收费编号" width="220" />
                <el-table-column prop="name" label="收费项目名称" width="220" />
                <el-table-column prop="price" label="收费价格" width="220" />
                <el-table-column label="操作" width="200">
                  <template #default="scope">
                    <!-- <router-link to="/charge/update"> -->
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
import { getCharge, deleteChargeById, getChargeByName } from "@/api/system";
import { useRouter } from "vue-router";
const router = useRouter();

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
const handleSelectionChange = (val) => {
  console.log(val);
};
// 获取全部信息
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

const handleDelete = (val) => {
  console.log("val", val);
  deleteCharge(val.id).then(() => {
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