<template>
  <div class="app-container home">
    <el-container>
      <el-header>
        <el-form :inline="true" :model="formInline" class="search">
          <el-form-item label="宠物类别">
      <el-select v-model="formInline.petclassification" placeholder="宠物类别">
        <el-option label="哺乳类动物" value="哺乳类动物" />
        <el-option label="爬行类宠物" value="爬行类宠物" />
        <el-option label="鸟类宠物" value="鸟类宠物" />
        <el-option label="鱼类宠物" value="鱼类宠物" />
        <el-option label="昆虫类宠物" value="昆虫类宠物" />
      </el-select>
      </el-form-item>
     <el-form-item label="宠物名称">
      <el-input v-model="formInline.name" placeholder="宠物名称" />
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
              <el-table-column  prop="id" label="档案编号" width="150" />
              <el-table-column prop="date" label="保存时间" width="150" />
              <el-table-column prop="name" label="宠物名称" width="150" />
              <el-table-column prop="classification" label="疾病名称" width="150" />
              <el-table-column prop="petclassification" label="宠物类别" width="150" />
              <el-table-column prop="gender" label="宠物性别" width="150" />
              <el-table-column prop="phone" label="主人联系方式" width="150" />
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
  petclassification:'',
  name: '',
})
const tableData = [
  {
    id: '001',
    date:'2023-3-6',
    name: '麻薯',
    classification: '气管支气管炎',
    petclassification: '猫',
    gender: '男',
    phone: '13323332333',
  },
  {
    id: '001',
    date:'2023-3-6',
    name: '麻薯',
    classification: '气管支气管炎',
    petclassification: '猫',
    gender: '男',
    phone: '13323332333',
  },
  {
    id: '001',
    date:'2023-3-6',
    name: '麻薯',
    classification: '气管支气管炎',
    petclassification: '猫',
    gender: '男',
    phone: '13323332333',
  },
  {
    id: '001',
    date:'2023-3-6',
    name: '麻薯',
    classification: '气管支气管炎',
    petclassification: '猫',
    gender: '男',
    phone: '13323332333',
  },
  {
    id: '001',
    date:'2023-3-6',
    name: '麻薯',
    classification: '气管支气管炎',
    petclassification: '猫',
    gender: '男',
    phone: '13323332333',
  },
  {
    id: '001',
    date:'2023-3-6',
    name: '麻薯',
    classification: '气管支气管炎',
    petclassification: '猫',
    gender: '男',
    phone: '13323332333',
  },
  {
    id: '001',
    date:'2023-3-6',
    name: '麻薯',
    classification: '气管支气管炎',
    petclassification: '猫',
    gender: '男',
    phone: '13323332333',
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