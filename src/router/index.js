import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import Home from '../views/home'
import NotFound from '../views/404'
//登录
import Login from '../views/login'
import Verify from '../views/verify'
//功能页面
import Index from '../views/index'
import Order from '../views/order'
import Setting from '../views/setting'

export default new VueRouter({
    mode: process.env.NODE_ENV==='production'?'history':'hash',
    linkActiveClass: 'active',
    base: __dirname,
    routes:[
        {
            path: '/',
            component: Home,
            redirect:'/index',
            name: '公共',
            children: [
                {
                    path: '/index',
                    index:'1',
                    icon:'el-icon-s-home',
                    component:Index,
                    name: '首页'
                },
                {
                    path: '/order',
                    index:'2',
                    icon:'el-icon-s-order',
                    component:Order,
                    name: '我的订单'
                },
                {
                    path: '/setting',
                    index:'3',
                    icon:'el-icon-setting',
                    component:Setting,
                    name: '交易设置'
                }
            ]
        },{
            path:'/login',
            name:'Login',
            component:Login
        },{
            path:'/verify',
            name:'verify',
            component:Verify
        },{
            path: '*',
            component: NotFound,
            name: '网络出错',
            hidden: true
        }, {
            path: '*',
            component: NotFound,
            hidden: true,
            redirect: { path: '/404' }
        }
    ]
});
