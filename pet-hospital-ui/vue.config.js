const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/styles/variables.module.scss";`,
      },
    },
  },
});
