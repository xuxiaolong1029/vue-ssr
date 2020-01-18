const httpProxyMiddleware = require('http-proxy-middleware');
const koaConnect = require('koa2-connect');
const URL = require('./env');
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
module.exports = {proxy,proxyTable}