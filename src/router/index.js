import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/Home.vue'

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/category',
        name: 'Category',
        component: () => import('../views/category/Category.vue')
    },
    {
        path: '/shopcart',
        name: 'ShopCart',
        component: () => import('../views/shopcart/ShopCart.vue')
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('../views/profile/Profile.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
