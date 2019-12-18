import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import Index from '../views/index'
import Login from '../views/login'
import Details from '../views/details'
import Person from '../views/person'
import From from '../views/from'

export default new VueRouter({
    mode: process.env.NODE_ENV==='production'?'history':'hash',
    linkActiveClass: 'active',
    base: __dirname,
    routes:[
        {
            path:'/',
            component:Index
        },{
            path:'/login',
            component:Login
        },{
            path: '/details',
            component:Details
        },{
            path: '/person',
            component:Person
        },{
            path: '/from',
            component:From
        }
    ]
});
