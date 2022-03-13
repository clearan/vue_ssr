import {createRouter} from "vue-router";

const routes = [{path: '/user', component: () => import('./components/user.vue')}]
export default function (history) {
    return createRouter({
        history,
        routes
    })
}
