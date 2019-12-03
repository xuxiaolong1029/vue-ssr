import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
const ENV = process.env.NODE_ENV;

const router = new VueRouter({
    mode: ENV==='production'?'history':'hash',
    linkActiveClass: 'active',
    base: __dirname,
    routes:[
      {
        path:'/',
        component:() => import('../views/index.vue')
      },{
        path:'/login',
        component:() => import('../views/login.vue')
      },{
        path: '/otc',
        component:() => import('../views/otc.vue')
      },{
        path: '/person',
        component: () => import('../views/person.vue')
      }
    ]
  });

export default router
