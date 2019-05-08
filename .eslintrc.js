const path = require('path');

module.exports = {
    extends: [
        "vv/react-typescript"
    ],
    rules: {
        "import/no-extraneous-dependencies": ['error', {
            "devDependencies": [
                '**/tests/**.js',
                '/mock/**/**.js',
                '**/**.test.js',
                "config/**/**.js",
                'styleguide.config.js'
            ]
        }]
    }
};