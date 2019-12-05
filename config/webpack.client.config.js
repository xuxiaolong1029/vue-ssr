const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const base = require('./webpack.base.config');

module.exports = merge(base,{
  entry: {
    client: path.resolve(__dirname, '../src/entry-client.js')
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: ['vue-style-loader', 'css-loader','less-loader', 'postcss-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueSSRClientPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, process.env.NODE_ENV!=='production'?'../src/index.html':'../src/index.ssr.html'),
      filename: process.env.NODE_ENV!=='production'?'index.html':'index.ssr.html'
    })
  ]
});
