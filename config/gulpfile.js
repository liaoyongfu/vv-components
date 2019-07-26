const gulp = require('gulp');
const path = require('path');
const del = require('del');
const ts = require('gulp-typescript');
const merge = require('merge2');
const less = require('gulp-less');
const babel = require('gulp-babel');

function compileTsx(modules, dest) {
    return gulp
        .src('../src/**/*.tsx')
        .pipe(
            babel({
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            modules
                        }
                    ],
                    '@babel/preset-react',
                    '@babel/preset-typescript'
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    [
                        'import',
                        {
                            libraryName: 'antd',
                            libraryDirectory: 'lib', // default: lib
                            style: true
                        }
                    ]
                ]
            })
        )
        .pipe(gulp.dest(dest));
}

gulp.task('compileTs:lib', async () => {
    compileTsx('commonjs', '../lib');
});

gulp.task('compile:lib-type', () => {
    const tsProject = ts.createProject('../tsconfig.json');
    const tsResult = gulp.src('../src/**/*.tsx').pipe(tsProject());
    return tsResult.dts.pipe(gulp.dest('../lib'));
});

gulp.task('compileTs:es', async () => {
    compileTsx(false, '../es');
});

gulp.task('compile:es-type', () => {
    const tsProject = ts.createProject('../tsconfig.json', {
        module: 'es6'
    });
    const tsResult = gulp.src('../src/**/*.tsx').pipe(tsProject());
    return tsResult.dts.pipe(gulp.dest('../es'));
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
    gulp.series(
        'clean',
        'compileTs:es',
        'compile:es-type',
        'compileTs:lib',
        'compile:lib-type',
        'less',
        'assert-copy'
    )
);
