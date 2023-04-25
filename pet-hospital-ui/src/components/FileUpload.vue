<!--
 * @Author: pikapikapi pikapikapi_kaori@icloud.com
 * @Date: 2023-04-14 14:58:58
 * @LastEditors: pikapikapikaori pikapikapi_kaori@icloud.com
 * @LastEditTime: 2023-04-25 23:27:16
 * @FilePath: /virtualPetHospital-frontend/pet-hospital-ui/src/components/FileUpload.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="upload">
    <el-upload class="upload-demo" action="/" :http-request="selectFiles" :on-preview="handlePreview" multiple drag
      :on-remove="handleRemove" :before-upload="beforeAvatarUpload" :file-list="fileList" list-type="picture">
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">拖拽文件或 <em>点击这里上传</em></div>
    </el-upload>
    <el-button @click="onSubmit">上传</el-button>
  </div>
</template>

<script>
import { uploadFile, getFileLists, deleteFile } from "@/api/file";
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
      type: Array,
      default: function () {
        return []
      },
    },
  },
  created() {
    this.getHistoryFiles();
  },
  watch: {
    filePath: 'getHistoryFiles'
  },
  methods: {
    async getHistoryFiles() {
      if (!this.filePath) return;
      const picRes = await getFileLists(this.filePath[0]).then((res) => res.data);
      const vidRes = await getFileLists(this.filePath[1]).then((res) => res.data);
      let res = picRes.filePathList.concat(vidRes.filePathList);
      if (res.length === 0) return;
      this.fileList = res.map((item, inx) => {
        const typeInx = item.lastIndexOf(".") + 1;
        const type = this.supportedPictureTypes.includes(item.slice(typeInx))
          ? "图片"
          : "视频";
        return {
          url:
            process.env.VUE_APP_INTERFACE_URL +
            "\\file\\files?filePath=" +
            encodeURI(item),
          name: type + (inx + 1),
          filePath: item,
        };
      });
    },
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
    async handleRemove(file) {
      console.log("file", file);
      this.fileList.forEach((fileInList, fileInListIndex) => {
        if (file.filePath) return;
        if (file.name === fileInList.get("file").name) {
          this.fileList.splice(fileInListIndex);
        }
      });
      if (file.filePath) {
        console.log("file.filePath", file.filePath);
        await deleteFile(file.filePath);
      }
      this.getHistoryFiles();
    },
    handlePreview(file) {
      console.log(file);
    },
    selectFiles(param) {
      const formData = new FormData();
      formData.append("file", param.file);
      formData.append("filePath", this.supportedPictureTypes.includes(this.getFileSuffix(param.file.name).toLowerCase()) ? this.filePath[0] : this.filePath[1]);
      this.fileList.push(formData);
    },
    async onSubmit() {
      this.fileList.forEach(async (file) => {
        if (typeof file.url === "string") return;
        await uploadFile(file.get("file"), file.get("filePath"));
        this.getHistoryFiles();
      });
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