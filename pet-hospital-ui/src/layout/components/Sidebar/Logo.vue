<!-- 侧边栏 logo -->

<template>
  <div
    class="sidebar-logo-container"
    :class="{ collapse: props.collapse }"
    :style="{ backgroundColor: variables.menuBackground }"
  >
    <transition name="sidebarLogoFade">
      <!-- 折叠 -->
      <router-link
        v-if="collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/"
      >
        <svg
          t="1679452377004"
          class="icon sidebar-logo"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="6182"
          width="30"
          height="30"
        >
          <path
            d="M911.923 492.547a19.907 19.907 0 0 1-11.213-3.454L511.388 224.86 122.065 489.094c-9.14 6.204-21.576 3.823-27.78-5.317-6.203-9.139-3.822-21.577 5.317-27.78L500.156 184.14a19.996 19.996 0 0 1 22.463 0l400.554 271.857c9.14 6.203 11.521 18.641 5.317 27.78-3.868 5.699-10.161 8.77-16.567 8.77z"
            fill="#1afa29"
            p-id="6183"
          ></path>
          <path
            d="M753.007 849.393H269.769c-11.046 0-20-8.954-20-20v-334.54c0-11.046 8.954-20 20-20s20 8.954 20 20v314.54h443.238v-314.54c0-11.046 8.954-20 20-20s20 8.954 20 20v334.54c0 11.045-8.954 20-20 20z"
            fill="#1afa29"
            p-id="6184"
          ></path>
          <path
            d="M254.899 309.523c-11.046 0-20-8.954-20-20v-66.91c0-11.046 8.954-20 20-20s20 8.954 20 20v66.91c0 11.046-8.954 20-20 20z"
            fill="#1afa29"
            p-id="6185"
          ></path>
          <path
            d="M602.46 745.323H401.73c-11.046 0-20-8.954-20-20s8.954-20 20-20h200.73c11.046 0 20 8.954 20 20s-8.954 20-20 20z"
            fill="#1afa29"
            p-id="6186"
          ></path>
          <path
            d="M592.41 633.522c-26.059 15.105-53.283-5.16-80.987-5.164-34.623-0.005-90.974 26.469-106.508-22.038-18.079-56.455 58.213-107.781 106.497-107.788 39.112 0.003 92.951 32.032 106.031 69.734 5.706 16.448 5.248 47.705-25.033 65.256z"
            fill="#1afa29"
            p-id="6187"
          ></path>
          <path
            d="M379.402 520.324m-32.993 0a32.993 32.993 0 1 0 65.986 0 32.993 32.993 0 1 0-65.986 0Z"
            fill="#1afa29"
            p-id="6188"
          ></path>
          <path
            d="M452.001 442.794m-32.993 0a32.993 32.993 0 1 0 65.986 0 32.993 32.993 0 1 0-65.986 0Z"
            fill="#1afa29"
            p-id="6189"
          ></path>
          <path
            d="M562.013 442.794m-32.993 0a32.993 32.993 0 1 0 65.986 0 32.993 32.993 0 1 0-65.986 0Z"
            fill="#1afa29"
            p-id="6190"
          ></path>
          <path
            d="M643.374 520.324m-32.993 0a32.993 32.993 0 1 0 65.986 0 32.993 32.993 0 1 0-65.986 0Z"
            fill="#1afa29"
            p-id="6191"
          ></path>
        </svg>
      </router-link>

      <!-- 展开 -->
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <svg
          t="1679452377004"
          class="icon sidebar-logo"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="6182"
          width="30"
          height="30"
        >
          <path
            d="M911.923 492.547a19.907 19.907 0 0 1-11.213-3.454L511.388 224.86 122.065 489.094c-9.14 6.204-21.576 3.823-27.78-5.317-6.203-9.139-3.822-21.577 5.317-27.78L500.156 184.14a19.996 19.996 0 0 1 22.463 0l400.554 271.857c9.14 6.203 11.521 18.641 5.317 27.78-3.868 5.699-10.161 8.77-16.567 8.77z"
            fill="#1afa29"
            p-id="6183"
          ></path>
          <path
            d="M753.007 849.393H269.769c-11.046 0-20-8.954-20-20v-334.54c0-11.046 8.954-20 20-20s20 8.954 20 20v314.54h443.238v-314.54c0-11.046 8.954-20 20-20s20 8.954 20 20v334.54c0 11.045-8.954 20-20 20z"
            fill="#1afa29"
            p-id="6184"
          ></path>
          <path
            d="M254.899 309.523c-11.046 0-20-8.954-20-20v-66.91c0-11.046 8.954-20 20-20s20 8.954 20 20v66.91c0 11.046-8.954 20-20 20z"
            fill="#1afa29"
            p-id="6185"
          ></path>
          <path
            d="M602.46 745.323H401.73c-11.046 0-20-8.954-20-20s8.954-20 20-20h200.73c11.046 0 20 8.954 20 20s-8.954 20-20 20z"
            fill="#1afa29"
            p-id="6186"
          ></path>
          <path
            d="M592.41 633.522c-26.059 15.105-53.283-5.16-80.987-5.164-34.623-0.005-90.974 26.469-106.508-22.038-18.079-56.455 58.213-107.781 106.497-107.788 39.112 0.003 92.951 32.032 106.031 69.734 5.706 16.448 5.248 47.705-25.033 65.256z"
            fill="#1afa29"
            p-id="6187"
          ></path>
          <path
            d="M379.402 520.324m-32.993 0a32.993 32.993 0 1 0 65.986 0 32.993 32.993 0 1 0-65.986 0Z"
            fill="#1afa29"
            p-id="6188"
          ></path>
          <path
            d="M452.001 442.794m-32.993 0a32.993 32.993 0 1 0 65.986 0 32.993 32.993 0 1 0-65.986 0Z"
            fill="#1afa29"
            p-id="6189"
          ></path>
          <path
            d="M562.013 442.794m-32.993 0a32.993 32.993 0 1 0 65.986 0 32.993 32.993 0 1 0-65.986 0Z"
            fill="#1afa29"
            p-id="6190"
          ></path>
          <path
            d="M643.374 520.324m-32.993 0a32.993 32.993 0 1 0 65.986 0 32.993 32.993 0 1 0-65.986 0Z"
            fill="#1afa29"
            p-id="6191"
          ></path>
        </svg>
        <h1 class="sidebar-title" :style="{ color: variables.logoTitleColor }">
          {{ title }}
        </h1>
      </router-link>
    </transition>
  </div>
</template>

<script setup>
import variables from "@/assets/styles/variables.module.scss";
import { ref, defineProps } from "vue";

let title = ref("虚拟宠物医院学习系统");

const props = defineProps({
  collapse: {
    type: Boolean,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 23px;
      height: 23px;
      vertical-align: middle;
      margin-right: 5px;
    }
    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 12.5px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
