import Vue from 'vue';
import App from './App.vue';
import './assets/reset.less';
import createStore from './store/store';
import router from './router';
import {sync} from 'vuex-router-sync' // 把当VueRouter状态同步到Vuex中
import headMixin from './head.mixin'
Vue.mixin(headMixin)

export function createApp(ssrContext) {
  const store = createStore();
  //const router = createRouter();
  // 同步路由状态到store中
  sync(store,router);

  const app = new Vue({
    router,
    store,
    ssrContext,
    render: h => h(App)
  });

  return { app, store, router };
}
