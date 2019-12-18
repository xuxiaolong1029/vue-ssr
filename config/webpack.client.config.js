const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const base = require('./webpack.base.config');
const MiniCssExtractPlugin =require('mini-css-extract-plugin');
const utils = require('./utils');
const isProd = process.env.NODE_ENV === 'production';
module.exports = merge(base,{
  entry: {
    client: path.resolve(__dirname, '../public/entry-client.js')
  },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader', {loader: 'css-loader'}, 'less-loader',
        ]
      },{
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'url-loader',
        options: {
          esModule:false,
          limit: 10000,
          publicPath: '../',
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isProd ? 'assets/css/[name].[chunkhash].css' : 'assets/css/[name].css',
      chunkFilename: isProd ? 'assets/css/[id].[chunkhash].css': 'assets/css/[id].css'
    }),
    new CleanWebpackPlugin(),
    new VueSSRClientPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, process.env.NODE_ENV!=='production'?'../public/index.html':'../public/index.ssr.html'),
      filename: process.env.NODE_ENV!=='production'?'index.html':'index.ssr.html'
    })
  ]
});
