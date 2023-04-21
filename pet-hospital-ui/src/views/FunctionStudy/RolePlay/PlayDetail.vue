<!-- 角色扮演：详情页 -->

<template>
  <div class="playdetail-wrapper">play detail</div>
</template>

<script setup>
import { useRoute } from "vue-router";

const role = useRoute().query.role;

if (role === "receptionist") {
  console.log("前台");
} else if (role === "assistant") {
  console.log("医助");
} else {
  console.log("医生");
}
</script>

<style lang="scss" scoped></style>
