const {default: merge} = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {resolve} = require('path')
const base = require('./webpack.base.js')

module.exports = merge(base, {
    entry: {
        'client': resolve( 'src/entry/client.entry.js'),
    },
    output: {
        path: resolve('dist/client/js'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: '../index.html', //当启动本地服务的时候 HTML 模板是必须提供的，通常是 index.html。确保将脚本引用添加到 HTML 中，webpack-dev-server 不会自动注入它们。
            template: resolve('src/public/client.html')
        })
    ]
})
