const webpack = require('webpack');
const path = require('path');
require('colors');
const { configs, cleanDistFolder } = require('./_util');

// src目录
const SRC_PATH = path.resolve(__dirname, '../src/');
const DIST_PATH = path.resolve(__dirname, '../dist/');

console.log(`清空dist目录...`.green);
cleanDistFolder(['./dist/**']);
// 编译dist
console.log('编译dist...'.green);

webpack(
    [configs(false, SRC_PATH, DIST_PATH), configs(true, SRC_PATH, DIST_PATH)],
    (err, stats) => {
        if (err) {
            console.error(err.stack || err);
            if (err.details) {
                console.error(err.details);
            }
            return;
        }

        const info = stats.toJson();

        if (stats.hasErrors()) {
            console.error(info.errors);
        }

        if (stats.hasWarnings()) {
            console.warn(info.warnings);
        }

        console.log('编译完成...'.green);
    }
);
