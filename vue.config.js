// 时间戳保证不会版本重复
const timestamp = new Date().getTime();
module.exports = {
  publicPath: '/grape/',
  productionSourceMap: false,
  configureWebpack: { // webpack 配置
    output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      filename: `[name].${process.env.VUE_APP_Version}.${timestamp}.js`,
      chunkFilename: `[name].${process.env.VUE_APP_Version}.${timestamp}.js`
    },
  }
};
