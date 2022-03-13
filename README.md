# vue_ssr
vue3+wepack5服务端渲染。客户端和服务端单独打包
```text
node版本 14.17.5
webpack 5.70.0
vue: 3.2.31
```

- 以webpack.client.js为客户端入口打包，生成dist/client下的bundle文件， 为后续替换index.html中的<div id="app">xxx做准备
- 以webpack.server.js为服务端入口打包，生成dist/server下的bundle文件，后续在服务端利用renderToString将要插入到id为app标签内的js转化成html代码
- html来自于服务端入口打包所得，js，css等静态资源，来自于客户端打包所得
