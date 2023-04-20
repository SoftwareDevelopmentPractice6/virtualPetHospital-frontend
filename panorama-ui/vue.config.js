module.exports = {
  publicPath: "./",
  productionSourceMap: false,
  //changeOrigin:true,
  devServer: {
    host: "0.0.0.0",
    port: 9630,
    open: true,
    proxy: {
      //配置跨域
      "/api": {
        target: "http://0.0.0.0:9630",
        changOrigin: true,
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
};
