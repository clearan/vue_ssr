import {createSSRApp} from "vue";
// 服务器端路由与客户端使用不同的历史记录
import { createMemoryHistory } from 'vue-router'
import createRouter from '../router.js'
import App from '../demo.vue'

// ，我们需要为每个请求创建一个新的 Vue 根实例服务端入口使用了一个默认导出，它是一个可以在每次渲染的过程中重复调用的函数
// 服务端入口使用了一个默认导出，它是一个可以在每次渲染的过程中重复调用的函数
export default function () {
    const app = createSSRApp(App)
    const router = createRouter(createMemoryHistory())

    app.use(router)

    return {
        app,
        router
    }
}
