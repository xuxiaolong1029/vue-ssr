import Vue from 'vue';
import Router from 'vue-router';
import Index from '../views/index.vue';
import OTC from '../views/otc.vue';
import Person from '../views/person.vue';
import Login from '../views/login.vue';

Vue.use(Router);
const ENV = process.env.NODE_ENV;
function createRouter() {
  const router = new Router({
    mode: ENV==='production'?'history':'hash',
    routes : [
      {
        path:'/',
        component: Index
      },
      {
        path:'/login',
        component: Login
      },
      {
        path: '/otc',
        component: OTC
      },
      {
        path: '/person',
        component: Person
      }
    ]
  });
  return router;
}

export default createRouter;
