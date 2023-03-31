<template>
  <div class="app-container home">
    <el-container>
      <el-header>
        <el-form :inline="true" :model="formInline" class="search">
          <el-form-item label="疾病类别">
      <el-select v-model="formInline.classification" placeholder="疾病类别">
        <el-option label="传染病" value="传染病" />
        <el-option label="寄生虫病" value="寄生虫病" />
        <el-option label="内科" value="内科" />
        <el-option label="外产科" value="外产科" />
        <el-option label="常用手术" value="常用手术" />
        <el-option label="免疫" value="免疫" />
      </el-select>
      </el-form-item>
     <el-form-item label="搜索内容">
      <el-input v-model="formInline.name" placeholder="搜索内容" />
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
          <el-row class="button">
           <el-button type="primary">新增</el-button>
           <el-button type="primary">修改</el-button>
           <el-button type="primary">删除</el-button>
           </el-row> 
        </el-header>
        <el-main class="inmain">   
          <el-table
                  ref="multipleTableRef"
                 :data="tableData"
                  style="width: 100%"
                  height="400px"
                 @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
            <el-table-column type="expand">
                   <template #default="props">
                    <div m="4">
                     
                      <el-table :data="props.row.text" :border="childBorder">
                      <el-table-column label="接诊" prop="admissions" />
                      <el-table-column label="病例检查" prop="check" />
                      <el-table-column label="检查结果" prop="result" />
                      <el-table-column label="治疗方案" prop="treatment" />
                   </el-table>
                 </div>
              </template>
               </el-table-column>
              <el-table-column  prop="id" label="病例ID" width="120" />
              <el-table-column prop="name" label="疾病名称" width="120" />
              <el-table-column prop="classification" label="疾病类型" width="120" />
              <el-table-column prop="admissions" label="接诊" width="120" />
              <el-table-column prop="check" label="病例检查" width="120" />
              <el-table-column prop="result" label="检查结果" width="120" />
              <el-table-column prop="treatment" label="治疗方案" width="120" />
              <el-table-column prop="hospitalized" label="住院需求" width="120"
                :filters="[
                 { text: '是', value: '是' },
                 { text: '否', value: '否' },]"
                 :filter-method="filterTag"
                filter-placement="bottom-end">
                <template #default="scope">
                <el-tag
                :type="scope.row.tag === 'Home' ? '' : 'success'"
                      disable-transitions
                 >{{ scope.row.tag }}
                </el-tag>
               </template>
              </el-table-column>
         </el-table>
        </el-main>
       </el-container>
      </div>
      </el-main>
      <el-footer>
         <el-pagination background layout="prev, pager, next" :total="1000"
      class="page" />
      </el-footer>
    </el-container>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const formInline = reactive({
  classification:'',
  name: '',
})
const tableData = [
  {
    id: '098738009',
    name: '膀胱结石',
    classification: '内科',
    admissions: '病例的基本情况',
    check: '检查项目',
    result: '检查结果',
    treatment:'消毒',
    hospitalized:'否',
    text: [
      {
        admissions: '病例的基本情况',
        check: '检查项目',
        result: '检查结果',
        treatment:'消毒',
      },
      {
        admissions: '病例的基本情况',
        check: '检查项目',
        result: '检查结果',
        treatment:'消毒',
      },
      {
        admissions: '病例的基本情况',
        check: '检查项目',
        result: '检查结果',
        treatment:'消毒',
      },
    ],
  },
  {
    id: '098738009',
    name: '膀胱结石',
    classification: '内科',
    admissions: '病例的基本情况',
    check: '检查项目',
    result: '检查结果',
    treatment:'消毒',
    hospitalized:'否',
  },
  {
    id: '098738009',
    name: '膀胱结石',
    classification: '内科',
    admissions: '病例的基本情况',
    check: '检查项目',
    result: '检查结果',
    treatment:'消毒',
    hospitalized:'否',
  },
  {
    id: '098738009',
    name: '膀胱结石',
    classification: '内科',
    admissions: '病例的基本情况',
    check: '检查项目',
    result: '检查结果',
    treatment:'消毒',
    hospitalized:'否',
  },
  {
    id: '098738009',
    name: '膀胱结石',
    classification: '内科',
    admissions: '病例的基本情况',
    check: '检查项目',
    result: '检查结果',
    treatment:'消毒',
    hospitalized:'否',
  },
  {
    id: '098738009',
    name: '膀胱结石',
    classification: '内科',
    admissions: '病例的基本情况',
    check: '检查项目',
    result: '检查结果',
    treatment:'消毒',
    hospitalized:'否',
  },
  {
    id: '098738009',
    name: '膀胱结石',
    classification: '内科',
    admissions: '病例的基本情况',
    check: '检查项目',
    result: '检查结果',
    treatment:'消毒',
    hospitalized:'否',
  },
]
const onSubmit = () => {
  console.log('submit!')
}
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding:30px 0px 0px 0px;
}
.search {
  display: flex;
  justify-content:center;
  align-items: center;
  height: 100%;
  
}
.main {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding:10px 10px 0px 10px;
}
.inmain {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding:10px 0px 0px 0px;
}
.button {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
 
}
</style>