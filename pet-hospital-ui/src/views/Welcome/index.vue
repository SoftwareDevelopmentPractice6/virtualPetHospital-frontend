<!-- 欢迎页 -->
<template>
  <div class="welcome-wrapper">
    <div class="container">
      <h1><span>欢迎来到虚拟宠物医院学习系统</span></h1>
      <hr />
      <h2>
        <span
          >使宠物工作者充分熟悉宠物医院的工作环境、岗位责任及工作流程等，积累临床经验，为成为一名合格的宠物医生奠定基础</span
        >
      </h2>
      <h3>
        <span
          >Make pet workers fully familiar with the working environment, post
          responsibilities and workflow of pet hospitals, accumulate clinical
          experience, and lay the foundation for becoming a qualified pet
          doctor.</span
        >
      </h3>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.welcome-wrapper {
  display: flex;
  min-height: calc(100vh - 50px);
  background-image: url(@/assets/images/pet-hospital-background.jpg);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  opacity: 0.7;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1,
h2,
h3 {
  color: #fff;
  margin: 6px 0;
}

h1 {
  color: rgb(31, 42, 56);
  font-size: 53px;
  margin: 12.5% 0 5px;
}

hr {
  background-color: rgb(134, 146, 162);
  height: 5px;
  width: 25%;
  margin-bottom: 25px;
}

h2 {
  font-size: 23px;
}

h3 {
  padding: 0 100px;
  font-size: 24px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
</style>
