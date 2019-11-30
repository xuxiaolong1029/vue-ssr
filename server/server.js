const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const path = require('path');
const fs = require('fs');
const httpProxyMiddleware = require('http-proxy-middleware');
const koaConnect = require('koa2-connect');
const { createBundleRenderer } = require('vue-server-renderer');
const backendApp = new Koa();
const frontendApp = new Koa();
const backendRouter = new Router();
const frontendRouter = new Router();

const serverBundle = require(path.resolve(__dirname, '../dist/vue-ssr-server-bundle.json'));
const clientManifest = require(path.resolve(__dirname, '../dist/vue-ssr-client-manifest.json'));
const template = fs.readFileSync(path.resolve(__dirname, '../dist/index.ssr.html'), 'utf-8');

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template: template,
  clientManifest: clientManifest
});
// 后端Server
backendApp.use(serve(path.resolve(__dirname, '../dist')));
// 代理兼容封装
const proxy = function (vm, options) {
  if (typeof options === 'string') {
    options = {
      target: options
    }
  }
  return async function (ctx, next) {
    await koaConnect(httpProxyMiddleware(vm, options))(ctx, next)
  }
};
const URL = 'https://www.citex.co.kr';
//const URL = 'http://10.1.1.61:8090';
// 代理配置
const proxyTable = {
  "/common": {
    target:URL, // 接口的域名
    secure:false, // 如果是https接口，需要配置这个参数
    changeOrigin: true // 如果接口跨域，需要进行这个参数配置
  },
  "/quot":{
    target:URL, // 接口的域名
    secure:false, // 如果是https接口，需要配置这个参数
    changeOrigin: true // 如果接口跨域，需要进行这个参数配置
  }
};
Object.keys(proxyTable).map(vm => {
  const options = proxyTable[vm];
  // 使用代理
  backendRouter.use(proxy(vm, options))
});
backendRouter.get('*', (ctx, next) => {
  const context = {
    title: 'ssr-vue',
    keywords: '服务端渲染',
    description: '关于vue服务端渲染',
    url: ctx.url
  };
  const ssrStream = renderer.renderToStream(context);
  ctx.status = 200;
  ctx.type = 'html';
  ctx.body = ssrStream;
});
backendApp.use(backendRouter.routes()).use(backendRouter.allowedMethods());

backendApp.listen(1001, () => {
  console.log('服务器端渲染地址： http://localhost:1001');
});
// 前端Server
frontendApp.use(serve(path.resolve(__dirname, '../dist')));
frontendRouter.get('*', (ctx, next) => {
  let html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
  ctx.type = 'html';
  ctx.status = 200;
  ctx.body = html;
});

frontendApp.use(frontendRouter.routes()).use(frontendRouter.allowedMethods());

frontendApp.listen(9001, () => {
  console.log('浏览器端渲染地址： http://localhost:9001');
});
