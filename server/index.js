const path = require('path')
const express = require('express')
const { renderToString } = require('@vue/server-renderer')
const fs = require('fs')
const manifest = require('../dist/server/js/ssr-manifest.json')
const server = express()

const appPath = path.join(__dirname, '../dist', 'server/js', manifest['server.js'])
const createApp = require(appPath).default
server.use('/js', express.static(path.join(__dirname, '../dist/client', 'js')))
server.use('/css', express.static(path.join(__dirname, '../dist/client', 'css')))
server.use('/img', express.static(path.join(__dirname, '../dist/client', 'img'))) // img本身在客户端还没有，也没有做单独打包
server.use(
    '/favicon.ico',
    express.static(path.join(__dirname, '../dist/client', 'favicon.ico'))
) // 这个没验证

// 同理其它实例 (诸如路由器或 store) 也是一样的。不要从一个模块直接导出路由器或 store 并将它们导入应用，
// 取而代之的是，每次有新的请求发起时都在 createApp 中创建一个干净的实例并从这个 Vue 根实例注入它
// function createApp() {
//     return createSSRApp({
//         data() {
//             return {
//                 user: 'John Doe',
//                 name: 'jay',
//             }
//         },
//         beforeCreate() {
//             console.log('beforeCreate');
//         },
//         created() {
//             console.log('created');
//         },
//         mounted() {
//             console.log('mounted');
//         },
//         template: `<div>Current user is: {{ user }}</div>
//         <input type="text" v-model="name">
//         <span>{{name}}</span>
//         `
//     })
// }
server.get('*', async (req, res) => {
    const { app, router } = createApp()
    await router.push(req.url)
    await router.isReady()
    const appContent = await renderToString(app)
    // 读取client客户端打包后的index.html模板，用appContent替换id为app标签中的内容
    fs.readFile(path.join(__dirname, '../dist/client/index.html'), (err, html) => {
        if (err) {
            throw err
        }
        html = html
            .toString()
            .replace('<div id="app">', `<div id="app">${appContent}`)
        res.setHeader('Content-Type', 'text/html')
        res.send(html)
    })
})

server.listen(9000, () => {
    console.log('server is run at 9000')
})
