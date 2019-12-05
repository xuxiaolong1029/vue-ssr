import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import Index from '../views/index.vue'
import Login from '../views/login.vue'
import Details from '../views/details.vue'
import Person from '../views/person.vue'

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
        }
    ]
});
