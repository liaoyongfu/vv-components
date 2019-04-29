const path = require('path');

module.exports = {
    parser: '@typescript-eslint/parser',  // Specifies the ESLint parser
    extends: [
        'airbnb-typescript',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'prettier/@typescript-eslint',  // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:prettier/recommended',  // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    env: {
        browser: true,
        node: true,
        es6: true,
        mocha: true,
        jest: true,
        jasmine: true
    },
    parserOptions: {
        ecmaVersion: 2018,  // Allows for the parsing of modern ECMAScript features
        sourceType: 'module',  // Allows for the use of imports
    },
    "rules": {
        "prettier/prettier": ['error', {
            // 使用单引号
            singleQuote: true,
            // 指定每个缩进级别为 4 个空格数
            tabWidth: 4
        }],
        // jsx 缩进为 4 个空格
        "react/jsx-indent": ['error', 4],
        //
        "import/no-extraneous-dependencies": ["error", {
            "pageDir": path.resolve(__dirname, 'src')
        }],
        "react/jsx-one-expression-per-line": ['off', { "allow": "single-child" }],
        // 允许 console
        "no-console": ['off', { "allow": ["warn", "error"]}],
        // jsx 属性缩进 4 个空格
        "react/jsx-indent-props": ['error', 4]
    }
};