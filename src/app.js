const Vue = require('vue');
import App from './App';
import { createRouter } from './router'

export function createApp() {
  //创建router实例
  const router = createRouter();
  const app = new Vue({
    // 注入 router 到根 Vue 实例
    router,
    render: h => h(App)
  })
  return { app,router }
}
