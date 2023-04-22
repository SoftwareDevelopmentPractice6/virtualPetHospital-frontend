<template>
  <div class="input-file">
    <div>
      <span>{{ desc || "文字描述" }}</span>
      <el-input
        v-model="value"
        class="text"
        :rows="3"
        type="textarea"
        placeholder="Please input"
      />
      <span>上传图片或教学视频</span>
      <file-upload file-path="case"> </file-upload>
    </div>
  </div>
</template>

<script  setup>
import FileUpload from "@/components/FileUpload.vue";
import { computed, defineProps, defineEmits } from "vue";

const props = defineProps(["value", "filePath", "desc"]);

const emit = defineEmits(["update:value"]);

const value = computed({
  get() {
    return props.value;
  },
  set(val) {
    emit("update:value", val);
  },
});
</script>

<style lang="scss" scoped>
.input-file {
  height: 100%;
}
</style>