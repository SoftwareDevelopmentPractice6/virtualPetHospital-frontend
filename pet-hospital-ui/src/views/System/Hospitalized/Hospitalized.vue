<template>
  <div class="app-container home">
    <el-container>
      <el-header>
        <el-form :inline="true" :model="hospitalized" class="search">
          <el-form-item label="护理级别">
      <el-select v-model="hospitalized.classification" placeholder="护理级别">
        <el-option label="特别护理" value="特别护理" />
        <el-option label="一级护理" value="一级护理" />
        <el-option label="二级护理" value="二级护理" />
        <el-option label="普通护理" value="普通护理" />
        <el-option label="夜间监护" value="夜间监护" />
      </el-select>
      </el-form-item>
      <el-form-item label="病房标准">
      <el-input v-model="hospitalized.roomclassification" placeholder="病房标准" />
       </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" >搜索</el-button>
            </el-form-item>
         </el-form>
      </el-header>
      <el-main class="main">
        <div class="common-layout">
        <el-container>
        <el-header>
          <el-form-item class="button">
              <router-link to="/hospitalized/add">
           <el-button class="AddButton"  type="primary">新增</el-button>
              </router-link>

              <router-link to="/hospitalized/add">
           <el-button class="ChangeButton" type="primary">修改</el-button>
              </router-link>
             
           <el-button class="DeleteButton" @click="open" type="primary">删除</el-button>
          </el-form-item> 
        </el-header>
        <el-main class="inmain">   
          <el-table :data="tableData" style="width: 100%" height="400">
            <el-table-column type="selection" width="55" />
              <el-table-column  prop="id" label="病房编号" width="180" />
              <el-table-column prop="roomclassification" label="病房标准" width="180" />  
              <el-table-column prop="classification" label="护理级别" width="180" />
              <el-table-column prop="price" label="收费价格" width="180" />
              <el-table-column prop="position" label="病房位置" width="180"/>
              <el-table-column prop="text" label="备注" width="180"/>
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

const hospitalized = reactive({
    id: '',
    roomclassification: '',
    classification: '',
    price: '',
    position: '',
    text: '',
})
const tableData = [
  {
    id: 'K001',
    roomclassification: '普通病房',
    classification: '一般护理',
    price: '230/天',
    position: '4楼401',
    text: '空房',
  },
  {
    id: 'K001',
    roomclassification: '普通病房',
    classification: '一般护理',
    price: '230/天',
    position: '4楼401',
    text: '空房',
  },
  {
    id: 'K001',
    roomclassification: '普通病房',
    classification: '一般护理',
    price: '230/天',
    position: '4楼401',
    text: '空房',
  },
  {
    id: 'K001',
    roomclassification: '普通病房',
    classification: '一般护理',
    price: '230/天',
    position: '4楼401',
    text: '空房',
  },
  {
    id: 'K001',
    roomclassification: '普通病房',
    classification: '一般护理',
    price: '230/天',
    position: '4楼401',
    text: '空房',
  },
  {
    id: 'K001',
    roomclassification: '普通病房',
    classification: '一般护理',
    price: '230/天',
    position: '4楼401',
    text: '空房',
  },
  {
    id: 'K001',
    roomclassification: '普通病房',
    classification: '一般护理',
    price: '230/天',
    position: '4楼401',
    text: '空房',
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