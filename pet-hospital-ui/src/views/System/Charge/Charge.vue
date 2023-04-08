<template>
  <div class="app-container home">
    <el-container>
      <el-header>
       <el-form :inline="true" :model="charge" class="search">
     <el-form-item label="收费项目名称">
      <el-input v-model="charge.name" placeholder="收费项目名称" />
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
              <router-link to="/charge/add">
           <el-button class="AddButton"  type="primary">新增</el-button>
              </router-link>

              <router-link to="/charge/add">
           <el-button class="ChangeButton" type="primary">修改</el-button>
              </router-link>
             
           <el-button class="DeleteButton" @click="open" type="primary">删除</el-button>
          </el-form-item>
        </el-header>
        <el-main class="inmain">   
          <el-table
                  ref="multipleTableRef"
                 :data="tableData"
                  style="width: 100%"
                  height="400px"
                 @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
              <el-table-column  prop="id" label="收费编号" width="180" />
              <el-table-column prop="name" label="收费项目名称" width="180" />
              <el-table-column prop="price" label="收费价格" width="180" />
              <el-table-column prop="date" label="收费时间" width="180" />
              <el-table-column prop="method" label="收费方式" width="180">
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

const charge = reactive({
    id: '',
    name: '',
    price: '',
    time:'',
    method:'',
})
const tableData = [
  {
    id: '001',
    name: '内科药品1',
    price: '23',
    time:'2024-7-1 10：39',
    method:'微信支付',
  },
  {
    id: '001',
    name: '内科药品1',
    price: '23',
    time:'2024-7-1 10：39',
    method:'微信支付',
  },
  {
    id: '001',
    name: '内科药品1',
    price: '23',
    time:'2024-7-1 10：39',
    method:'微信支付',
  },
  {
    id: '001',
    name: '内科药品1',
    price: '23',
    time:'2024-7-1 10：39',
    method:'微信支付',
  },
  {
    id: '001',
    name: '内科药品1',
    price: '23',
    time:'2024-7-1 10：39',
    method:'微信支付',
  },
  {
    id: '001',
    name: '内科药品1',
    price: '23',
    time:'2024-7-1 10：39',
    method:'微信支付',
  },
  {
    id: '001',
    name: '内科药品1',
    price: '23',
    time:'2024-7-1 10：39',
    method:'微信支付',
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