const path = require('path');
const glob = require('glob');
const docgen = require('react-docgen-typescript');
const webpackConfig = require('./config/build-doc');

module.exports = {
    title: 'VV Components',
    require: ['antd/dist/antd.min.css', './example/doc.css'],
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
            name: 'Components',
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
            },
            sectionDepth: 1
        }
    ],
    pagePerSection: true,
    styles: {
        StyleGuide: {
            footer: {
                display: 'none'
            }
        },
        Code: {
            code: {
                color: '#e83e8c',
                margin: '0 5px'
            }
        },
        Blockquote: {
            blockquote: {
                padding: '0 20px',
                borderLeft: '5px solid #eee'
            }
        }
    },
    assetsDir: path.resolve(__dirname, 'example')
};
