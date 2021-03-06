import { createApp } from '../src/main.js';

export default context => {
  return new Promise((resolve, reject) => {
    const { app, store, router } = createApp();
    router.push(context.url);

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }
      Promise.all(matchedComponents.map(component => {
        if (component.asyncData) {
          return component.asyncData({
            store,
            router:router.currentRoute
           });
        }
      })).then(() => {
        // 当使用 template 时，context.state 将作为 window.__INITIAL_STATE__ 状态，自动嵌入到最终的 HTML 中
        context.state = store.state;
        // 返回根组件
        resolve(app);
      }).catch(err =>{
        console.log('renderer error','entry-server',err);
        context.serverError = true;
        resolve(app)
      });
    }, reject);
  });
}
