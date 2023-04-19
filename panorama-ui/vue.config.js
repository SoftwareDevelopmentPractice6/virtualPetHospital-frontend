module.exports = {
  publicPath: "./",
  productionSourceMap: false,
  //changeOrigin:true,
  devServer: {
    host: "localhost",
    port: 9630,
    open: true,
    proxy: {
      //配置跨域
      "/api": {
        target: "http://localhost:9630",
        changOrigin: true,
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
};
