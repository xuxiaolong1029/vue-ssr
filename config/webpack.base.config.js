const path = require('path');
const {VueLoaderPlugin} = require('vue-loader');
const utils = require('./utils');
module.exports = {
    stats: { children: false },
    mode: process.env.NODE_ENV,
    output: {
        path:path.join(__dirname,'../dist'),
        filename:'bundle.js'
    },
    resolve: {
        alias:{
            'vue$':'vue/dist/vue.esm.js'//配置别名 确保webpack可以找到.vue文件
        },
        extensions: ['*', '.js', '.vue','.jsx','.json']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    utils.resolve('src'),
                    utils.resolve('test'),
                    utils.resolve('/node_modules/element-ui/src'),
                    utils.resolve('/node_modules/element-ui/packages'),
                    utils.resolve('node_modules/webpack-dev-server/client')
                ]
            },{
                test: /\.vue$/,
                use: 'vue-loader'
            },{
                test: /\.(jpg|jpeg|png|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },{
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};
