
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    // devServer: {
    //     proxy: 'http://localhost:8080'
    // }
    devServer: {
        disableHostCheck: true, // 增加
        // proxy: {
        //     '/api':{
        //         target:'http://103.120.225.186:9003/',
        //         changeOrigin:true,
        //         pathRewrite:{
        //             '/api':''
        //         }
        //     }
        // }
    },
    // 显式转义依赖
    transpileDependencies: ['webpack-dev-server/client'],

    chainWebpack: config => {
        // 指定入口  es6转es5
        config.entry.app = ['babel-polyfill', './src/main.js'];
    }
}
