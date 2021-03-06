const path = require('path');

module.exports = {
    extends: [
        "vv/react-typescript"
    ],
    rules: {
        'import/no-unresolved': [2, { ignore: ['^@/'] }],
        "import/no-extraneous-dependencies": ['error', {
            "devDependencies": [
                '**/tests/**.js',
                '/mock/**/**.js',
                '**/**.test.{js,jsx,tsx}',
                "config/**/**.js",
                'styleguide.config.js'
            ]
        }]
    },
    settings: {
        "polyfills": [
            "Object.assign",
        ]
    }
};