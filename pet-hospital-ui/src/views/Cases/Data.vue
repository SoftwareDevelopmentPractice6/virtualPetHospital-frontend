<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header" height="20px">
        <router-link to="/cases/list">
          <el-button type="plain" @click="back">Back</el-button>
        </router-link>
      </el-header>
      <el-main>
    <el-form>  
    <el-form-item class="ID" label="病例ID"  >
      <el-input v-model="form.id" />
    </el-form-item>
    <el-form-item class="name" label="病例名称" >
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="疾病类别">
      <el-select v-model="form.classification" placeholder="选择疾病类别">
        <el-option label="传染病" value="传染病" />
        <el-option label="寄生虫病" value="寄生虫病" />
        <el-option label="内科" value="内科" />
        <el-option label="外产科" value="外产科" />
        <el-option label="常用手术" value="常用手术" />
        <el-option label="免疫" value="免疫" />
      </el-select>
    </el-form-item>
    <el-form-item label="病例接诊">
      <el-input v-model="form.admissions" type="textarea"  />
    </el-form-item>
    <el-form-item label="病例检查">
      <el-input v-model="form.check" type="textarea" />
    </el-form-item>
    <el-form-item label="检查结果">
      <el-input v-model="form.result" type="textarea" />
    </el-form-item>
    <el-form-item label="治疗方案">
      <el-input v-model="form.treatment" type="textarea" />
    </el-form-item>
    <el-form-item label="住院需求">
      <el-radio-group v-model="form.hospitalized">
        <el-radio label="是" />
        <el-radio label="否" />
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button class="SubmitButton" type="primary" @click="onSubmit">保存</el-button>
      <router-link to="/cases/list">
      <el-button class="CancelButton">取消</el-button>
      </router-link>
      
    </el-form-item>
  </el-form>
</el-main>
</el-container>
  </div>
</template>

<script  setup>
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'

const onSubmit = () => {
  ElMessage('提交成功！')
}
// do not use same name with ref
const form = reactive({
  id:'',
  name: '',
  classification: '',
  admissions: '',
  check: '',
  result: '',
  treatment: '',
  hospitalized: '',
})


</script>
<style lang="scss" scoped>
.ID {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding:10px 900px 0px 15px;
}
.name {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding:10px 900px 0px 0px;
}
.header {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding:10px 10px 0px 10px;
 
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