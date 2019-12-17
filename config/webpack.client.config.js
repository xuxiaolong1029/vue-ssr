const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const base = require('./webpack.base.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(base,{
  entry: {
    client: path.resolve(__dirname, '../public/entry-client.js')
  },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use:[
          {loader:MiniCssExtractPlugin.loader},'css-loader', 'less-loader'
      ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({filename:'assets/[hash].css'}),
    new CleanWebpackPlugin(),
    new VueSSRClientPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    new HtmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true,//删除空格、换行
        removeAttributeQuotes: true
      },
      template: path.resolve(__dirname, process.env.NODE_ENV!=='production'?'../public/index.html':'../public/index.ssr.html'),
      filename: process.env.NODE_ENV!=='production'?'index.html':'index.ssr.html'
    })
  ]
});
