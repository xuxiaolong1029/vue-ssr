const Koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');
const path = require('path');
const fs = require('fs');
const favicon = require('koa-favicon');
const createBundleRenderer = require('vue-server-renderer').createBundleRenderer;
const {proxy,proxyTable} = require('./proxy');//引入代理
const ssrApp = new Koa();
const ssrRouter = new Router();

Object.keys(proxyTable).map(vm => {
  const options = proxyTable[vm];
  // 使用代理
  ssrRouter.use(proxy(vm,options))
});
// 后端Server
const serverBundle = require(path.resolve(__dirname, '../dist/vue-ssr-server-bundle.json'));
const clientManifest = require(path.resolve(__dirname, '../dist/vue-ssr-client-manifest.json'));
const ssrTemplate = fs.readFileSync(path.resolve(__dirname, '../dist/index.ssr.html'), 'utf-8');
ssrRouter.use(favicon(path.resolve(__dirname, '../public/icon.ico')));
ssrApp.use(static(path.resolve(__dirname, '../dist')));
ssrRouter.get('*', (ctx, next) => {
  const context = {
    title: 'ssr-vue',
    keywords: '服务端渲染',
    description: '关于vue服务端渲染',
    url: ctx.url
  };
  const ssrRenderer = createBundleRenderer(serverBundle, {
    runInNewContext: false,
    template:ssrTemplate,
    clientManifest: clientManifest
  });
  const ssrStream = ssrRenderer.renderToStream(context);
  ctx.status = 200;
  ctx.type = 'html';
  ctx.body = ssrStream;
});

ssrApp.use(ssrRouter.routes()).use(ssrRouter.allowedMethods());

ssrApp.listen(1001, () => {
  console.log('服务器端渲染地址： http://localhost:1001');
});
