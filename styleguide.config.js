const path = require('path');
const glob = require('glob');
const docgen = require('react-docgen-typescript');
const webpackConfig = require('./config/build-doc');

module.exports = {
    title: 'VV Components',
    require: ['antd/dist/antd.min.css'],
    webpackConfig,
    propsParser: docgen.withDefaultConfig({
        propFilter: { skipPropsWithoutDoc: true }
    }).parse,
    styleguideDir: path.resolve(__dirname, 'docs'),
    usageMode: 'expand',
    theme: {
        maxWidth: 'inherit'
    },
    sections: [
        {
            name: '快速入门',
            content: './README.md'
        },
        {
            name: '组件',
            components() {
                return glob
                    .sync(path.resolve(__dirname, 'src/components/**/*.tsx'))
                    .filter(module => {
                        const paths = path.parse(module);

                        return (
                            path.basename(path.dirname(module)) ===
                                paths.name && /\/[A-Z]\w*\.tsx$/.test(module)
                        );
                    });
            }
        }
    ],
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
