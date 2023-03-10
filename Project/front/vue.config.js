module.exports = {
    devServer: {  // 开发环境跨域情况的代理配置
        port: 9090,
        proxy: {
            // 【必要】访问自己搭建的后端服务器
            '/api': {
                target: 'http://192.168.43.25:8080',
                changOrigin: true,
                ws: true,
                secure: false,
                pathRewrite: {
                    '^/api': '/'
                }
            },
        }
    }
}
