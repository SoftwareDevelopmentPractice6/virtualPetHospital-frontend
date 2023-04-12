<template>
  <el-container>
    <el-header class="header" height="20px">
      <router-link to="/hospitalized/list">
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
        <el-form-item label="病房编号">
          <el-input v-model="hospitalized.id" />
        </el-form-item>
        <el-form-item label="病房标准">
          <el-input v-model="hospitalized.name" />
        </el-form-item>
        <el-form-item label="护理级别">
          <el-select
            v-model="hospitalized.classification"
            placeholder="请选择药品类别"
          >
            <el-option label="传染病" value="传染病" />
            <el-option label="寄生虫病" value="寄生虫病" />
            <el-option label="内科" value="内科" />
            <el-option label="外产科" value="外产科" />
            <el-option label="常用手术" value="常用手术" />
            <el-option label="免疫" value="免疫" />
          </el-select>
        </el-form-item>
        <el-form-item label="收费价格">
          <el-input v-model="hospitalized.price" />
        </el-form-item>
        <el-form-item label="病房位置">
          <el-input v-model="hospitalized.position" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="hospitalized.text" />
        </el-form-item>
        <el-form-item>
          <el-button class="SubmitButton" type="primary" @click="onSubmit"
            >保存</el-button
          >
          <router-link to="/hospitalized/list">
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
import { insertAdmission } from "../../../api/system";

const onSubmit = () => {
  console.log(admission);
  var data = {
    admissionId: admission.id,
    roomStandard: admission.roomclassification,
    careLevel: admission.classification,
    carePrice: admission.price,
    admissionRoom: admission.position,
    remark: admission.text,
  };
  console.log("data", data);
  insert(data).then(() => {
    // console.log(res);
    // if(res.code !== 200) return  ElMessage.error('提交失败！')
    // medicine = {}
    ElMessage("提交成功！");
  });
};
const insert = async (val) => {
  let value = await insertAdmission(val).then((res) => {
    res.data;
  });
  console.log("val", value);
};

const admission = reactive({
  id: "",
  roomclassification: "",
  classification: "",
  price: "",
  position: "",
  text: "",
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