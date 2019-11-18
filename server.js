const Vue = require('vue');
const consola = require('consola');
const server = require('express')();
const fs = require('fs');
const renderer = require('vue-server-renderer').createRenderer({
  template:fs.readFileSync('./src/index.template.html', 'utf-8')
});
const host = 'localhost';

server.get('*',(req,res)=>{
  const createApp = require('./src/app');
  const context ={
    title:'vue-ssr',
    meta:` <meta charset="utf-8">`,
    url:req.url
  };
  const app = createApp(context);
  renderer.renderToString(app,context,(err,html)=>{
    if(err){
      res.status(500).end('Internal Server Error');
      return false
    }
    res.end(html)
  })
});
server.listen(9090,function(){
  console.log('Node app start at port 9090');
});
consola.ready({
  message: `Server listening on http://${host}:9090`,
  badge: true
});

