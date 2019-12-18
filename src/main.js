//对于vue项目的ssr改造 测试代码
import Vue from 'vue';
import App from './App.vue';
import createStore from './store';
import router from './router';
import {sync} from 'vuex-router-sync' // 把当VueRouter状态同步到Vuex中
import headMixin from '../public/head.mixin'
Vue.mixin(headMixin);
import '../src/assets/css/reset.less';
import "../src/utils/element-config";
if(process.env.VUE_ENV === 'client'){
  require('element-ui/lib/theme-chalk/index.css');
}
import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);

export function createApp() {
  const store = createStore();
  //const router = createRouter();
  // 同步路由状态到store中
  sync(store,router);
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });

  return { app, store, router };
}
