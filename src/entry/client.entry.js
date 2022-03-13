import {createSSRApp} from "vue";
import App from '../demo.vue'
import {createWebHistory} from "vue-router";
import createRouter from '../router.js'

const app = createSSRApp(App)
const router = createRouter(createWebHistory())
app.use(router)

// 在客户端和服务端我们都需要等待路由器先解析异步路由组件以合理地调用组件内的钩子
router.isReady().then(() => {
    app.mount('#app')
})
