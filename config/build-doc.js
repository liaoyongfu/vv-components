const merge = require('webpack-merge');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const base = require('./base');

module.exports = merge.smartStrategy({
    'module.rules.use': 'replace'
})(base, {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: '../'
                        }
                    },
                    'css-loader'
                ]
            }
        ]
    },
    devServer: {
        proxy: {
            '/api/dict': {
                target: 'http://172.16.1.98:7003',
                changeOrigin: true, // target是域名的话需要这个参数
                secure: false
            }
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ],
    resolve: {
        alias: {
            'vv-frontend-components': path.resolve(__dirname, '../src')
        }
    },
    // not work?
    // see: https://github.com/styleguidist/react-styleguidist/issues/136
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    }
});
