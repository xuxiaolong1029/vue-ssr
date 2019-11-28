const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin'); //自动打开浏览器插件
const URl = "http://10.1.1.61:8090";
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
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000    // 10Kb
          }
        }
      },
      {
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
    historyApiFallback: true,
    hot: true,
    inline: true,
    contentBase: "./src",
    port:9999,
    proxy: {
      "/common": {
        target: URl, // 接口的域名
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true // 如果接口跨域，需要进行这个参数配置
      },
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'}),
    new ExtractTextPlugin("styles.css"),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV" : (JSON.stringify(process.env.NODE_ENV))
    }),
    new OpenBrowserPlugin({ url: 'http://localhost:9999' })
  ]
};