<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header" height="20px">
        <router-link to="/archive/list">
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
          <!-- <el-form-item label="档案编号">
            <el-input v-model="archive.id" />
          </el-form-item> -->
          <el-form-item label="宠物名称">
            <el-input v-model="archive.name" />
          </el-form-item>
          <el-form-item label="宠物性别">
            <el-input v-model="archive.gender" />
          </el-form-item>
          <el-form-item label="保存时间">
            <el-col :span="11">
              <div class="block">
                <el-date-picker
                  v-model="archive.date"
                  type="date"
                  placeholder="选择一个日期"
                  :size="size"
                />
              </div>
            </el-col>
          </el-form-item>
          <el-form-item label="宠物类别">
            <el-select
              v-model="archive.petclassification"
              placeholder="请选择宠物类别"
            >
              <el-option label="哺乳类动物" value="哺乳类动物" />
              <el-option label="爬行类宠物" value="爬行类宠物" />
              <el-option label="鸟类宠物" value="鸟类宠物" />
              <el-option label="鱼类宠物" value="鱼类宠物" />
              <el-option label="昆虫类宠物" value="昆虫类宠物" />
            </el-select>
          </el-form-item>
          <el-form-item label="疾病名称">
            <el-input v-model="archive.classification" />
          </el-form-item>

          <el-form-item label="主人联系方式">
            <el-input v-model="archive.phone" />
          </el-form-item>
          <el-form-item>
            <el-button class="SubmitButton" type="primary" @click="onSubmit"
              >保存</el-button
            >
            <router-link to="/archive/list">
              <el-button class="CancelButton">取消</el-button>
            </router-link>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { ElMessage } from "element-plus";
import { insertArchive } from "../../../api/system";

const onSubmit = () => {
  console.log(archive);
  var data = {
    archiveId: archive.id,
    storeTime: archive.date,
    petName: archive.name,
    diseaseType: archive.classification,
    petType: archive.petclassification,
    petSex: archive.gender,
    ownerTel: archive.phone,
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
  let value = await insertArchive(val).then((res) => {
    res.data;
  });
  console.log("val", value);
};

const archive = reactive({
  id: "",
  date: "",
  name: "",
  classification: "",
  petclassification: "",
  gender: "",
  phone: "",
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