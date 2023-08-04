// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 在这里对开发环境做自定义的定制
  // 开发服务器的键名devServer
  devServer: {
    proxy: { 
      // 代理：对开发服务器设置代理要求，要求服务器把指定的请求转移到代理到指定地方去
        "/": {
          target: "http://localhost:2999",
          ws: false
        }
    }
  },
})

