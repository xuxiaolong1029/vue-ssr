import Vue from 'vue';
import Router from 'vue-router';
import Bar from '../components/Bar.vue';
import Foo from '../components/Foo.vue';
import Login from '../components/login.vue';
Vue.use(Router);
const ENV = process.env.NODE_ENV;
function createRouter() {
  const router = new Router({
    mode: ENV==='production'?'history':'hash',
    routes : [
      {
        path:'/',
        component: Login
      },
      {
        path:'/Login',
        component: Login
      },
      {
        path: '/bar',
        component: Bar
      },
      {
        path: '/foo',
        component: Foo
      }
    ]
  });
  return router;
}

export default createRouter;
