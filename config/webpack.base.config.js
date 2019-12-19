const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
module.exports = {
  stats: { children: false },
  mode: process.env.NODE_ENV,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js'
  },
  resolve: {
    alias:{
      'vue$':'vue/dist/vue.esm.js'//配置别名 确保webpack可以找到.vue文件
    },
    extensions: ['*', '.js', '.vue','.jsx','.json']
  },
  module: {
    noParse: /es6-promise\.js$/,
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
          limit:100000,//限制图片大小 <= 100kb 进行base64编码（小于100kb打包进js文件）--测试时根据图片的大小调整
          outputPath:'image'//设置输出文件夹名称，这个文件夹会与主入口文件在同一路径下
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader'
      }
    ]
  },

  plugins: [
    new VueLoaderPlugin(),
    new FriendlyErrorsPlugin()
  ]
};
