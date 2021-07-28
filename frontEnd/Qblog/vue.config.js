module.exports = {
    devServer: {
        port: 8888,
        proxy: {
            '/api': {
              target: `http://10.31.52.38:3000`, // 这个链接是要代理到的api地址
              changeOrigin: true
            },
            '/admin': {
                target: `http://10.31.52.38:3000`,
                changeOrigin: true
              },
            '/public': {
                target: `http://10.31.52.38:3000`,
                changeOrigin: true
              },
        }
    },
    lintOnSave: false
}
