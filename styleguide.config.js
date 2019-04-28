const path = require('path');
const glob = require('glob');
const docgen = require('react-docgen-typescript');
const webpackConfig = require('./config/base');

module.exports = {
    title: 'React Components',
    require: ['antd/dist/antd.min.css'],
    webpackConfig,
    propsParser: docgen.withDefaultConfig({
        propFilter: { skipPropsWithoutDoc: true }
    }).parse,
    components() {
        return glob
            .sync(path.resolve(__dirname, 'src/components/**/*.tsx'))
            .filter(function(module) {
                const paths = path.parse(module);

                return (
                    path.basename(path.dirname(module)) === paths.name &&
                    /\/[A-Z]\w*\.tsx$/.test(module)
                );
            });
    },
    styleguideDir: path.resolve(__dirname, 'docs'),
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
        }
    },
    assetsDir: path.resolve(__dirname, 'example')
};
