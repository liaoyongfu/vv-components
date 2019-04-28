const tsImportPluginFactory = require('ts-import-plugin');

module.exports = {
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            useCache: true,
                            useBabel: false, // !important!
                            getCustomTransformers: () => ({
                                before: [
                                    tsImportPluginFactory({
                                        libraryName: 'antd',
                                        libraryDirectory: 'lib',
                                        style: false
                                    })
                                ]
                            })
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'source-map-loader',
                exclude: /node_modules/
            },
            // {
            //     test: /\.jsx?$/,
            //     exclude: /node_modules/,
            //     use: [
            //         {
            //             loader: 'babel-loader',
            //             options: {
            //                 plugins: [
            //                     [
            //                         'import',
            //                         {
            //                             libraryName: 'antd',
            //                             libraryDirectory: 'es',
            //                             style: 'css' // `style: true` 会加载 less 文件
            //                         }
            //                     ]
            //                 ]
            //             }
            //         }
            //     ]
            // },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]',
                    'sass-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    }
};
