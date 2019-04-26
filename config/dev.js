const merge = require('webpack-merge');
const baseConfig = require('./base');

module.exports = merge(baseConfig, {
    mode: 'development',
    devServer: {
        hot: true,
        inline: true
    }
});