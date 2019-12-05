const Koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');
const path = require('path');
const fs = require('fs');
const favicon = require('koa-favicon');
const httpProxyMiddleware = require('http-proxy-middleware');
const koaConnect = require('koa2-connect');
const createBundleRenderer = require('vue-server-renderer').createBundleRenderer;
const ssrApp = new Koa();
const ssrRouter = new Router();
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

//const URL = 'https://www.citex.co.kr';
const URL = 'http://10.1.1.61:8090';
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
  ssrRouter.use(proxy(vm,options))
});
// 后端Server
const serverBundle = require(path.resolve(__dirname, '../dist/vue-ssr-server-bundle.json'));
const clientManifest = require(path.resolve(__dirname, '../dist/vue-ssr-client-manifest.json'));
const ssrTemplate = fs.readFileSync(path.resolve(__dirname, '../dist/index.ssr.html'), 'utf-8');
ssrRouter.use(favicon(path.resolve(__dirname, '../src/icon.ico')))
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
if(process.env.NODE_ENV!=='production'){
  const clientApp = new Koa();
  const clientRouter = new Router();
  // 前端Server
  const clientTemplate = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
  clientApp.use(favicon(path.resolve(__dirname, '../src/icon.ico')))
  clientApp.use(static(path.resolve(__dirname, '../dist')));
  clientRouter.get('*', (ctx, next) => {
    ctx.type = 'html';
    ctx.status = 200;
    ctx.body = clientTemplate;
  });
  clientApp.use(clientRouter.routes()).use(clientRouter.allowedMethods());

  clientApp.listen(9001, () => {
    console.log('浏览器端渲染地址： http://localhost:9001');
  });
}

