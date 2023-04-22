<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header" height="40px">
        <el-page-header @back="goBack">
          <template #content>
            <span class="text-default font-600 mr-3"> 数据上传 </span>
          </template>
        </el-page-header>
      </el-header>
      <el-main>
        <el-form>
          <el-form-item label="输入文字">
            <el-input v-model="form.text" type="textarea" />
          </el-form-item>
          <!-- 以下是图片上传 -->
          <!-- <el-upload
    v-model="fileList"
    class="upload-demo"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :on-change="handleChange"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    list-type="picture"
    :before-remove="beforeRemove"
    :limit="2"
    :on-exceed="handleExceed"
  >
    <el-button type="primary">Click to upload</el-button>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload> -->
          <!-- 以下是视频上传 -->
          <!--  <el-upload
    class="upload-demo"
    drag
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    multiple
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
    </el-upload> -->
          <el-upload
            v-model="fileList"
            class="upload-demo"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            multiple
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="3"
            :on-exceed="handleExceed"
          >
            <el-button type="primary">Click to upload</el-button>
            <template #tip>
              <div class="el-upload__tip">
                jpg/png files with a size less than 500KB.
              </div>
            </template>
          </el-upload>
        </el-form>
      </el-main>
      <el-footer>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script  setup>
import { ref } from "vue";
/* import { uploadFile } from "@/api/file"; */
//import { ElMessage, ElMessageBox } from 'element-plus'
/* import { UploadFilled } from '@element-plus/icons-vue'
import  { UploadProps, UploadUserFile } from 'element-plus' */

const fileList = ref([
  {
    name: "element-plus-logo.svg",
    url: "https://element-plus.org/images/element-plus-logo.svg",
  },
  {
    name: "element-plus-logo2.svg",
    url: "https://element-plus.org/images/element-plus-logo.svg",
  },
]);

const handleRemove = (file, uploadFiles) => {
  console.log(file, uploadFiles);
};

const handlePreview = (uploadFile) => {
  console.log(uploadFile);
};

const handleExceed = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  );
};
/* 
const beforeRemove= (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfer of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  )
} */

const form = ref([
  {
    text: "",
  },
]);
</script>


<style lang="scss" scoped>
.ID {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px 900px 0px 15px;
}
.name {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px 900px 0px 0px;
}
.header {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px 10px 0px 10px;
}
</style>