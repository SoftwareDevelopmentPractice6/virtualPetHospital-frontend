<template>
  <el-container>
    <el-header class="header" height="20px">
      <router-link to="/charge/list">
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
        <el-form-item label="收费项目名称">
          <el-input v-model="charge.name" />
        </el-form-item>
        <el-form-item label="收费价格">
          <el-input v-model="charge.price" />
        </el-form-item>
        <el-form-item>
          <el-button class="SubmitButton" type="primary" @click="onSubmit"
            >保存</el-button
          >
          <el-button class="CancelButton" @click="back">取消</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script setup>
import { reactive } from "vue";
import { ElMessage } from "element-plus";
import { insertCharge } from "../../../api/system";
import { useRouter } from "vue-router";

const router = useRouter();

const back = () => {
  router.back();
};

const onSubmit = () => {
  console.log(charge);
  var data = {
    chargeId: charge.id,
    itemName: charge.name,
    chargePrice: charge.price,
  };
  console.log("data", data);
  insert(data).then(() => {
    ElMessage.success("提交成功！");
    back();
  });
};
const insert = async (val) => {
  let value = await insertCharge(val).then((res) => {
    res.data;
  });
  console.log("val", value);
};

const charge = reactive({
  id: "",
  name: "",
  price: "",
  time: "",
  method: "",
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
