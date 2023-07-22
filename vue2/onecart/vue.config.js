// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//     transpiliDependencies: true,
//     devServer: {
//         client: {
//             overlay: false
//         },
//         proxy: {
//             '/api': {
//                 target: 'http://lcoalhost:8090/api',
//                 changeOrigin: true,
//                 pathRewrite: { '^/api': '' }
//             }
//         }
//     }
// })

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://172.30.1.73:8081/api",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
  },
};
