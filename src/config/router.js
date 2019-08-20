import  Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes:  [
        {
            name: 'home',
            path: '/',
            component: Home
        },
        {
            name: 'adminPages',
            path: '/admin',
            component: AdminPages
        }
    ]
})