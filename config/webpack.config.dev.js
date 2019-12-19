const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./webpack.base.config');
const merge = require('webpack-merge');
const urlList={
  development:'http://10.1.1.61:8090',
  production:'https://www.citex.co.kr',
  prepare:'https://pre.citex.io'
};

const URL = urlList[process.env.NODE_ENV];

module.exports=merge(base,{
  entry:{
    path:path.join(__dirname,'../public/entry-client.js'),
  },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        loader: ['vue-style-loader', 'css-loader','less-loader','postcss-loader']
      }
    ]
  },
  devServer:{
    contentBase: path.join(__dirname, "src"),
    historyApiFallback:{
      rewrites:[
        {from:/./,to:'/404.html'}
      ]
    },
    overlay: {
      errors: true  // 在浏览器窗口出口错误的提示层
    },
    hot: true,
    inline: true,
    port:9999,
    proxy: {
      "/common": {
        target: URL, // 接口的域名
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true // 如果接口跨域，需要进行这个参数配置
      },
      "/quot":{
        target: URL, // 接口的域名
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true // 如果接口跨域，需要进行这个参数配置
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template:'./public/index.html',
      favicon: './public/icon.ico',
      inject: 'body',
      minify: {
        removeComments: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    })
  ]
});
