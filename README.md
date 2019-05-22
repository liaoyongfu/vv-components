
收集一下项目中常用到的组件吧！顺便学一下 Typescript。

## 特性

- 基于 antd 组件

## 安装

````bash
$ yarn add vv-components
// or
$ npm install vv-components --save
````

## 使用

````html
import { TablePagination } from 'vv-components';

const Demo = props => {
    return (
        <div>
            <TablePagination />
        </div>
    );
};
````

## 流程

- eslint 配置

使用 [eslint-config-vv](http://172.16.1.127:8050/VV-FRONTEND/eslint-config)进行配置，具体配置方法详见 eslint-config-vv 说明文档

- git 提交流程

1. git commit 前：会先进行 eslint 校验，并启动自动修改，实现如下：

````
// package.json
{
    ...,
    scripts: {
        ...,
        "precommit": "lint-staged",
        ...
    },
     "lint-staged": {
        "**/*.tsx": [
          "npm run lint",
          "git add"
        ]
      }
}
````

2. git commit 后：为了规范化提交消息，使用 [约定式提交规范](https://www.conventionalcommits.org/zh/v1.0.0-beta.3/) 进行提交，所以我们在 `git add .` 后，
使用 `yarn commit` 命令进行提交，而不是 `git commit -m 'xxx'`。提交时的日志需要遵从此规范。当你提交后，还会进行 commit 日志校验，如果不符合规范会报错。

- 贡献流程（在 develop 开发）
    - 修改
    - git add、git commit
    - 本地自测（使用 yarn link后，在示例项目中自测）
    - 修改版本号
    - yarn build
    - 自动生成 CHANGELOG.md 文件（运行 yarn changelog）
    - git add、git commit
    - git push
    - git tag
    

## 规范参考

- [Typescript 官方决定全面采用 Eslint](https://msd.misuland.com/pd/2884249965817765216)
- [优雅的提交你的 Git Commit Message](https://juejin.im/post/5afc5242f265da0b7f44bee4)
- [监听 git hooks](https://github.com/typicode/husky)

## TODO

- [x] Eslint 配置（TS 环境下）
- [ ] 构建
- [ ] 测试和 CI
- [x] 规范化提交（CHANGLOG 自动生成、git 钩子）
- [ ] 说明文档编写
- [x] 增加 utils

## 注意事项

- 组件一般如下：

````
- QuickForm
    - index.tsx
    - QuickForm.tsx
    - QuickForm.test.tsx
    - QuickForm.less
    - README.md
````

所以我们在项目中使用的情况下，需要结合 `babel-plugin-import` 按需加载样式：

````
// .babelrc
plugins: [
    [
        "import",
        {
          libraryName: 'vv-frontend-components',
          libraryDirectory: 'lib/components', // default: lib
          style: 'less',  // 使用类似 QuickForm/QuickForm.less 样式文件
          camel2DashComponentName: false  // 不转换名称为横岗，因为我们和组件文件夹名称是大写的
        }
    ]
]
````

- 我们组件编译时已经配置 `babel-plugin-import` 按需加载了 antd 的样式，现在不会有没有样式的问题了。

## 问题

- 在 md 文件中无法用 Typescript？无法用类属性语法？
- 如何生成多个版本的文档？
- md 文件里的代码如何格式化？
- windows 下不识别 /dev/tty
- 以下钩子无法使用？

````html
"husky": {
    "hooks": {
      "prepare-commit-msg": "exec < /dev/tty && git cz --hook"
    }
  }
````