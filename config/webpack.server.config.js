const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const base = require('./webpack.base.config');

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(base, {
  target: 'node',
   // 对 bundle renderer 提供 source map 支持
  devtool: '#source-map',
  entry: {
    server: path.resolve(__dirname, '../public/entry-server.js')
  },
  externals: [nodeExternals()],
  output: {
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: ['vue-style-loader',{loader: 'css-loader'},'less-loader', 'postcss-loader']
      },{
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [

    new VueSSRServerPlugin(),   // 这个要放到第一个写，否则 CopyWebpackPlugin 不起作用，原因还没查清楚
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV || 'production'),
      'process.env.VUE_ENV': '"server"'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.ssr.html'),
      filename: 'index.ssr.html',
      files: {
        js: 'client.bundle.js'
      },
      excludeChunks: ['server']
    }),
    new CopyWebpackPlugin([
      {
        //拷贝server文件夹到打包dist文件夹中
        from: path.resolve(__dirname, '../server'),
        to:path.resolve(__dirname, '../dist')
      },
      {
        //拷贝package文件到打包dist文件夹中
        from: path.resolve(__dirname, '../package.json'),
        to:path.resolve(__dirname, '../dist')
      },
    ])
  ]
});
