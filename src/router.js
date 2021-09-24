import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/home'
import Index from './pages/index'

Vue.use(Router);
export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            redirect: '/index',//重定向
            children: [
                {
                    path: '/index',
                    name: 'index',
                    component: Index
                }, {
                    path: '/product/:id',//子路由是绝对地址就需要加"/"
                    name: 'product',
                    component: () => import('./pages/index.vue')
                }, {
                    path: '/detail/:id',
                    name: 'detail',
                    component: () => import('./pages/detail.vue')
                }
            ]
        },{
            path: '/login',
            name: 'login',
            component: () => import('./pages/login.vue')
        },{
            path: '/cart',
            name: 'cart',
            component: () => import('./pages/cart.vue')
        },{
            path: '/order',
            name: 'order',
            component: () => import('./pages/order.vue'),
            children: [
                {
                    path: 'list',//子路由如果要拼接父路由的地址就不需要加"/"
                    name: 'order-list',
                    component: () => import('./pages/orderList.vue')
                }, {
                    path: 'confirm',
                    name: 'order-confirm',
                    component: () => import('./pages/orderConfirm.vue')
                }, {
                    path: 'pay',
                    name: 'order-pay',
                    component: () => import('./pages/orderPay.vue')
                }, {
                    path: 'alipay',
                    name: 'alipay',
                    component: () => import('./pages/alipay.vue')
                }
            ]
        }
    ]
});