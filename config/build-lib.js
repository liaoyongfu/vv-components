const path = require('path');
require('colors');
const { buildLib, cleanDistFolder } = require('./_util');

// src目录
const SRC_PATH = path.resolve(__dirname, '../src/');
const LIB_PATH = path.resolve(__dirname, '../lib/');
const ES_PATH = path.resolve(__dirname, '../es/');

console.log('清空lib、es文件夹...'.green);
cleanDistFolder(['./lib/**', './es/**']);
console.log('编译lib...'.green);
buildLib('commonjs', SRC_PATH, LIB_PATH);
// console.log('编译es...'.green);
// buildLib(false, SRC_PATH, ES_PATH);
