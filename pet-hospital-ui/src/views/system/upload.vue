<template>
  <div class="app-container">
    <div class="common-layout">
    <el-container>
      <el-header>
        <el-input
        v-model="textarea1"
       :autosize="{ minRows: 2, maxRows: 4 }"
      type="textarea"
      placeholder="Please input"/>
      </el-header>
      <el-container>
        <el-aside width="200px">
          
    
        </el-aside>
        <el-main>
          视频
        </el-main>
      </el-container>
    </el-container>
  </div>
  </div>
</template>

<script  setup>
import { ref } from 'vue'
const textarea1 = ref('')

</script>