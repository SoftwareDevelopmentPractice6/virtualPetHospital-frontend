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
     <el-form-item label="化验项目名称">
      <el-input v-model="formInline.name" placeholder="化验项目名称" />
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
              <el-table-column  prop="id" label="项目编号" width="180" />
              <el-table-column prop="name" label="项目名称" width="180" />
              <el-table-column prop="classification" label="疾病类型" width="180" />
              <el-table-column prop="price" label="项目价格" width="180" />
              <el-table-column prop="position" label="项目地点" width="180" /> 
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
    id: '001',
    name: '化验项目1',
    classification: '内科',
    price: '230',
    position:'3楼304室',
  },
  {
    id: '001',
    name: '化验项目1',
    classification: '内科',
    price: '230',
    position:'3楼304室',
  },
  {
    id: '001',
    name: '化验项目1',
    classification: '内科',
    price: '230',
    position:'3楼304室',
  },
  {
    id: '001',
    name: '化验项目1',
    classification: '内科',
    price: '230',
    position:'3楼304室',
  },
  {
    id: '001',
    name: '化验项目1',
    classification: '内科',
    price: '230',
    position:'3楼304室',
  },
  {
    id: '001',
    name: '化验项目1',
    classification: '内科',
    price: '230',
    position:'3楼304室',
  },
  {
    id: '001',
    name: '化验项目1',
    classification: '内科',
    price: '230',
    position:'3楼304室',
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