<template>
  <div class="app-container home">
    <el-container>
      <el-header>
        <el-form :inline="true" :model="medicine" class="search">
          <!-- <el-form-item label="药品类别">
            <el-select v-model="medicine.classification" placeholder="药品类别">
              <el-option label="抗生素" value="传染病" />
              <el-option label="口腔用药" value="寄生虫病" />
              <el-option label="抗菌药物" value="内科" />
              <el-option label="益生菌制剂" value="外产科" />
              <el-option label="" value="常用手术" />
              <el-option label="免疫" value="免疫" />
            </el-select>
          </el-form-item> -->
          <el-form-item label="药品名称">
            <el-input v-model="medicine.name" placeholder="药品名称" />
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
                <router-link to="/medicine/add">
                  <el-button class="AddButton" type="primary">新增</el-button>
                </router-link>

                <router-link to="/medicine/add">
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
                <el-table-column prop="id" label="药品编号" width="100" />
                <el-table-column prop="name" label="药品名称" width="100" />
                <el-table-column
                  prop="classification"
                  label="药品类别"
                  width="100"
                />
                <el-table-column prop="price" label="药品价格" width="100" />
                <el-table-column
                  prop="manufacturer"
                  label="生产厂家"
                  width="100"
                />
                <el-table-column
                  prop="specifications"
                  label="药品规格"
                  width="120"
                />
                <el-table-column
                  prop="vaccine"
                  label="是否是疫苗"
                  width="100"
                />
                <el-table-column label="操作" width="200">
                  <template #default="scope">
                    <!-- <router-link to="/medicine/update"> -->
                    <el-button size="small" @click="handleEdit(scope.row)">
                      编辑
                      <!-- 获取详情接口时什么？设想是刚刚那个按照名称获取的，想一起用，可以吗 -->
                    </el-button>
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
import { getMedicine, deleteById, getMedicineByName } from "@/api/system";
import { useRouter } from "vue-router";
const router = useRouter();

const loading = ref();
// 按照你的思路   在什么时候调用  就是输入药品名称然后下面渲染的数据可以进行筛选 ， 不需要点击查询时吗 需要 ， 那就是点击查询？是的，前面疾病类型别管了，那个忘记删了ok

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

const handleSelectionChange = (val) => {
  console.log(val);
};
// 获取全部信息
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
//编辑接口

//根据id获取数据

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

  console.log("tabledata22222", tableData);
};

const handleEdit = (row) => {
  const name = row.name;
  router.push(`/medicine/update?medicineName=${name}`);

  // 在哪里编辑？
  //点击编辑之后跳转到那个界面，需要那个界面可以先有编辑的数据然后在那个界面编辑，刚刚你是点击谁出来的额
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
body {
  margin: 0;
}
.example-showcase .el-loading-mask {
  z-index: 9;
}
</style>