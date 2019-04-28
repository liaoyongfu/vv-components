const babel = require('@babel/core');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const base = require('./base');

function cleanDistFolder(distPaths) {
    distPaths.forEach(distPath => {
        rimraf.sync(distPath, {}, err => {
            if (err) {
                throw err;
            }
        });
    });
}

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 * @param callback
 */
function fileDisplay(filePath, callback) {
    // 根据文件路径读取文件，返回文件列表
    const files = fs.readdirSync(filePath);
    // 遍历读取到的文件列表
    files.forEach(filename => {
        // 获取当前文件的绝对路径
        const filedir = path.join(filePath, filename);
        // 根据文件路径获取文件信息，返回一个fs.Stats对象
        const stats = fs.statSync(filedir);
        const isFile = stats.isFile(); // 是文件
        const isDir = stats.isDirectory(); // 是文件夹
        if (isFile && path.extname(filename) === '.js') {
            callback(
                path.relative(path.resolve(__dirname, '../src/'), filedir),
                filename
            );
        }
        if (isDir) {
            fileDisplay(filedir, callback); // 递归，如果是文件夹，就继续遍历该文件夹下面的文件
        }
    });
}

function buildLib(modules, srcPath, distPath) {
    fileDisplay(srcPath, dir => {
        const result = babel.transformFileSync(
            path.join(srcPath, dir),
            {},
            err => {
                if (err) {
                    throw err;
                }
            }
        );
        if (!fs.existsSync(distPath)) {
            fs.mkdirSync(distPath);
        }
        if (!fs.existsSync(path.dirname(`${distPath}/${dir}`))) {
            fs.mkdirSync(path.dirname(`${distPath}/${dir}`));
        }
        fs.writeFileSync(`${distPath}/${dir}`, result.code, 'utf8', {
            flag: 'w+'
        });
    });
}

function configs(minimize, srcPath, distPath) {
    return merge(base, {
        entry: srcPath,
        mode: 'production',
        devtool: 'cheap-module-source-map',
        output: {
            path: distPath,
            filename: minimize ? 'shareui.min.js' : 'shareui.js',
            libraryTarget: 'umd',
            library: 'Shareui'
        },
        externals: [nodeExternals()],
        optimization: {
            minimize
        }
    });
}

module.exports = { cleanDistFolder, buildLib, configs };
