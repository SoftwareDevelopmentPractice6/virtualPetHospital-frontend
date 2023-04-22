<!--
 * @Author: pikapikapi pikapikapi_kaori@icloud.com
 * @Date: 2023-04-14 14:58:58
 * @LastEditors: pikapikapi pikapikapi_kaori@icloud.com
 * @LastEditTime: 2023-04-14 20:22:46
 * @FilePath: /virtualPetHospital-frontend/pet-hospital-ui/src/components/FileUpload.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="upload">
    <el-upload
      class="upload-demo"
      action="/"
      :http-request="selectFiles"
      :on-preview="handlePreview"
      multiple
      drag
      :on-remove="handleRemove"
      :before-upload="beforeAvatarUpload"
      :file-list="fileList"
      list-type="picture"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">拖拽文件或 <em>点击这里上传</em></div>
    </el-upload>
    <el-button @click="onSubmit">上传</el-button>
  </div>
</template>

<script>
import { uploadFile, getFileLists, downloadFile } from "@/api/file";
export default {
  name: "FileUpload",
  data() {
    return {
      supportedPictureTypes: ["bmp", "jpg", "gif", "png"],
      supportedVideoTypes: [
        "asx",
        "asf",
        "mpg",
        "wmv",
        "3gp",
        "mp4",
        "mov",
        "avi",
        "flv",
        "rmvb",
      ],
      fileList: [],
      uploadResult: "",
    };
  },
  props: {
    filePath: {
      type: String,
      default: "",
    },
    // defaultShowList: {
    //   type: Array,
    //   dfault: () => [],
    // },
  },
  methods: {
    getFileSuffix(name) {
      const index = name.lastIndexOf(".");
      const len = name.length;
      return name.substring(index + 1, len) || "-";
    },
    validType(fileName) {
      var fileSuffix = this.getFileSuffix(fileName).toLowerCase();
      return (
        this.supportedPictureTypes.includes(fileSuffix) ||
        this.supportedVideoTypes.includes(fileSuffix)
      );
    },
    beforeAvatarUpload(file) {
      const isSupportedType = this.validType(file.name);
      const isLt2M = file.size / 1024 / 1024 < 100;

      if (!isSupportedType) {
        this.$message.error("上传文件格式不支持!");
      }
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 100MB!");
      }

      return isSupportedType && isLt2M;
    },
    handleRemove(file) {
      this.fileList.forEach((fileInList, fileInListIndex) => {
        if (file.name === fileInList.get("file").name) {
          this.fileList.splice(fileInListIndex);
        }
      });
    },
    handlePreview(file) {
      console.log(file);
    },
    selectFiles(param) {
      console.log(2222, param);
      const formData = new FormData();
      formData.append("file", param.file);
      formData.append("filePath", this.filePath);
      this.fileList.push(formData);
    },
    async onSubmit() {
      this.fileList.forEach((file) => {
        console.log("1111", file);
        uploadFile(file.get("file"), file.get("filePath"));
      });

      // const res = await getFileLists("case");

      // Promise.all(res.data.filePathList.map((item) => downloadFile(item))).then(
      //   (res) => {
      //     // const blob = new Blob([res]);
      //     // url = window.URL.createObjectURL(blob)
      //     console.log(res);
      //   }
      // );

      const res2 = await downloadFile(
        "case\\28d11053-aeb7-4e63-9de3-977a57e4eaf2\\BC01CDA1B3FF929359473D1FDE29524E.png"
      );
      const blob = new Blob([res2]);
      const url = window.URL.createObjectURL(blob);
      console.log(url);

      // const list = res.data.filePathList.map((item) => {
      //   // const downloadFile
      //   // return (
      //   //   process.env.VUE_APP_INTERFACE_URL +
      //   //   "\\file\\files?filePath=" +
      //   //   encodeURI(item)
      //   // );
      // });
      /**
       * 
       *  process.env.VUE_APP_INTERFACE_URL +
          "\\file\\files?filePath=" +
          encodeURI(item)
      );
       */
      console.log("1111", res, list);
    },
  },
};
</script>

<style scoped>
/* .upload {
  margin-top: 70px;
  margin-left: 30px; 
  margin-right: 30px;
  margin-bottom: 30px;
} */
</style>