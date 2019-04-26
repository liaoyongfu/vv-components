const path = require('path');
const glob = require('glob');
const docgen = require('react-docgen-typescript');
const webpackConfig = require('./config/dev');

module.exports = {
    title: 'React Components',
    require: [
        'antd',
        'antd/dist/antd.min.css'
    ],
    webpackConfig,
    propsParser: docgen.withDefaultConfig({ propFilter: { skipPropsWithoutDoc: true } }).parse,
    contextDependencies: [path.resolve(__dirname, 'lib/components')],
    components: function () {
        return glob.sync(path.resolve(__dirname, 'src/components/**/*.tsx'))
            .filter(function (module) {
                const paths = path.parse(module);

                return path.basename(path.dirname(module)) === paths.name &&
                    /\/[A-Z]\w*\.tsx$/.test(module);
            });
    },
    usageMode: 'expand',
    theme: {
        maxWidth: 'inherit'
    },
    pagePerSection: true,
    styles: {
        StyleGuide: {
            footer: {
                display: 'none'
            }
        },
    },
    assetsDir: path.resolve(__dirname, 'example'),
};