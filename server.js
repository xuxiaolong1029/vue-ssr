const Vue = require('vue');
const consola = require('consola');
const server = require('express')();
const fs = require('fs');
const renderer = require('vue-server-renderer').createRenderer({
  //template:
});
const host = '10.10.1.98';
async function start () {
  server.get('*',(req,res)=>{
    const app = new Vue({
      data:{
        url:req.url
      },
      template:`<div>访问的 URL 是： {{ url }}</div>`
    })
    renderer.renderToString(app,(err,html)=>{
      if(err){
        res.status(500).end('Internal Server Error');
        return false
      }
      res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head><meta charset="utf-8"><title>Hello</title></head>
        <body>${html}</body>
      </html>
    `)
    })
  });
  server.listen(9090,function(){
    console.log('Node app start at port 9090');
  });
  consola.ready({
    message: `Server listening on http://${host}:9090`,
    badge: true
  })
}
start();

