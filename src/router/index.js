import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
const ENV = process.env.NODE_ENV;
import Index from '../views/index.vue'
import Login from '../views/login.vue'
import Otc from '../views/otc.vue'
import Person from '../views/person.vue'

const router = new VueRouter({
    mode: ENV==='production'?'history':'hash',
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
        path: '/otc',
        component:Otc
      },{
        path: '/person',
        component:Person
      }
    ]
  });

export default router
