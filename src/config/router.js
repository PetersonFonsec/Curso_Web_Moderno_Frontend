import  Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import ArticlesByCategory from '@/components/article/ArticlesByCategory'
import ArticleById from '@/components/article/ArticleById'
import Auth from '@/components/auth/Auth'

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
        },
        {
            name: 'ArticlesByCategory',
            path: '/categories/:id/articles',
            component: ArticlesByCategory
        },
        {
            name: 'ArticleById',
            path: '/article/:id',
            component: ArticleById
        },
        {
            name: 'Auth',
            path: '/auth',
            component: Auth
        }
    ]
})