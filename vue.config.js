const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
    historyApiFallback: true, // 解决history路由刷新404问题
    port: 8888,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASE_API,
        ws: false,
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
        logLevel: 'debug',
      },
    }
  },
  // webpack的配置需要单独写在这里
  configureWebpack: {
    optimization: {
      nodeEnv: false, //让webpack5不会自动读取配置文件中的mode给process.env.NODE_ENV赋值(这样才可以自定义NODE_ENV)
    },
  }
})
