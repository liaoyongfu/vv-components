const gulp = require('gulp');
const path = require('path');
const del = require('del');
const ts = require('gulp-typescript');
const merge = require('merge2');
const less = require('gulp-less');
const tsconfig = require('../tsconfig.json');

gulp.task('compileTs:lib', async () => {
    const tsProject = ts.createProject('../tsconfig.json');
    const tsResult = gulp.src('../src/**/*.tsx').pipe(tsProject());
    return merge([
        tsResult.dts.pipe(gulp.dest('../lib')),
        tsResult.js.pipe(gulp.dest('../lib'))
    ]);
});

gulp.task('compileTs:es', async () => {
    const tsProject = ts.createProject('../tsconfig.json', {
        module: 'es6'
    });
    const tsResult = gulp.src('../src/**/*.tsx').pipe(tsProject());
    return merge([
        tsResult.dts.pipe(gulp.dest('../es')),
        tsResult.js.pipe(gulp.dest('../es'))
    ]);
});

gulp.task('less', () => {
    return gulp
        .src('../src/**/*.less')
        .pipe(
            less({
                relativeUrls: true
            })
        )
        .pipe(gulp.dest('../es'))
        .pipe(gulp.dest('../lib'));
});

gulp.task('assert-copy', () => {
    return gulp
        .src(['../src/**/*.{svg,png,jpg,gif,json}'])
        .pipe(gulp.dest('../es'))
        .pipe(gulp.dest('../lib'));
});

gulp.task('clean', () => {
    return del(['../es', '../lib', '../dist'], {
        force: true
    });
});

gulp.task(
    'default',
    gulp.series('clean', 'compileTs:es', 'compileTs:lib', 'less', 'assert-copy')
);
