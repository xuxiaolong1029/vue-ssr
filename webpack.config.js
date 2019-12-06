const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin'); //自动打开浏览器插件
const urlList={
  development:'http://10.1.1.61:8090',
  production:'https://www.citex.co.kr',
  prepare:'https://pre.citex.io'
};

const URL = urlList[process.env.NODE_ENV];
module.exports ={
  mode: process.env.NODE_ENV,
  entry: './src/entry-client.js',
  stats:{children:false},
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },{
        test: /\.(less|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
       // use: ['vue-style-loader', 'css-loader','less-loader','postcss-loader']
      },{
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000    // 10Kb
          }
        }
      },{
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  resolve: {
    extensions: [
      '.js', '.vue', '.json'
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath:'/'
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
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/icon.ico'
    }),
    new ExtractTextPlugin("styles.css"),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    })
  ]
};
