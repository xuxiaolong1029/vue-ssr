import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
const ENV = process.env.NODE_ENV;

function createRouter() {
  return new Router({
    mode: ENV==='production'?'history':'hash',
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
}

export default createRouter;
