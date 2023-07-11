const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpiliDependencies: true,
    devServer: {
        client: {
            overlay: false
        },
        proxy: {
            '/api': {
                target: 'http://lcoalhost:8090/api',
                changeOrigin: true,
                pathRewrite: { '^/api': '' }
            }
        }
    }
})