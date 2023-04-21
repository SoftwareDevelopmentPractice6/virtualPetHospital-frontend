<template>
  <el-container>
    <el-header class="header" height="20px">
      <router-link to="/medicine/list">
        <el-button type="plain" @click="back">Back</el-button>
      </router-link>
    </el-header>
    <el-main>
      <div style="margin: 20px" />
      <el-form
        :label-position="right"
        label-width="100px"
        :model="formLabelAlign"
        style="max-width: 460px"
      >
        <!-- <el-form-item label="药品ID">
          <el-input v-model="medicine.id" />
        </el-form-item> -->
        <el-form-item label="药品名称">
          <el-input v-model="medicine.name" />
        </el-form-item>
        <el-form-item label="药品类别">
          <el-input v-model="medicine.classification" />
        </el-form-item>
        <!-- <el-form-item label="疾病类别">
          <el-select
            v-model="medicine.classification"
            placeholder="请选择药品类别"
          >
            <el-option label="传染病" value="传染病" />
            <el-option label="寄生虫病" value="寄生虫病" />
            <el-option label="内科" value="内科" />
            <el-option label="外产科" value="外产科" />
            <el-option label="常用手术" value="常用手术" />
            <el-option label="免疫" value="免疫" />
          </el-select>
        </el-form-item> -->
        <el-form-item label="生产厂家">
          <el-input v-model="medicine.manufacturer" />
        </el-form-item>

        <el-form-item label="药品价格">
          <el-input v-model="medicine.price" />
        </el-form-item>
        <el-form-item label="药品规格">
          <el-input v-model="medicine.specifications" />
        </el-form-item>
        <el-form-item label="是否是疫苗">
          <el-radio-group v-model="medicine.vaccine">
            <el-radio label="是" />
            <el-radio label="否" />
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button class="SubmitButton" type="primary" @click="onSubmit"
            >保存</el-button
          >
          <router-link to="/medicine/list">
            <el-button class="CancelButton">取消</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script setup>
import { reactive } from "vue";
import { ElMessage } from "element-plus";
import { insertMedicine } from "../../../api/system";

const onSubmit = () => {
  console.log(medicine);
  var data = {
    medicineName: medicine.name,
    medicinePrice: medicine.price,
    manufacturer: medicine.manufacturer,
    medicineCategory: medicine.classification,
    specification: medicine.specifications,
    isVaccine: medicine.vaccine,
  };
  if (medicine.vaccine == "是") {
    data.isVaccine = "1";
  } else {
    data.isVaccine = "0";
  }
  console.log("data", data);
  insert(data).then(() => {
    // console.log(res);
    // if(res.code !== 200) return  ElMessage.error('提交失败！')
    // medicine = {}
    ElMessage("提交成功！");
  });
};
const insert = async (val) => {
  let value = await insertMedicine(val).then((res) => {
    res.data;
  });
  console.log("val", value);
};
const medicine = reactive({
  id: "",
  name: "",
  classification: "",
  price: "",
  manufacturer: "",
  specifications: "",
  vaccine: "",
});
</script>

<style lang="scss" scoped>
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
.header {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px 10px 0px 10px;
}
.CancelButton {
  width: 80px;
  height: 40px;
  margin: 0px 30px 0px 60px;
}
.SubmitButton {
  width: 80px;
  height: 40px;
  margin: 0px 60px 0px 30px;
}
</style>