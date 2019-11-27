import Vue from 'vue';
import Router from 'vue-router';
import Bar from '../components/Bar.vue';
import Foo from '../components/Foo.vue';
Vue.use(Router);

console.log(process.env.NODE_ENV);
function createRouter() {
  const ENV = process.env.NODE_ENV;
  const router = new Router({
    mode: ENV==='production'?'history':'hash',
    routes : [
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