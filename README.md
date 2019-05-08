
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

## TODO

- Eslint 配置（TS 环境下）
- 构建
- 测试和 CI
- 规范化提交（CHANGLOG 自动生成、git 钩子）
- 说明文档编写
- 增加 utils？
- ...

## 问题

- 在 md 文件中无法用 Typescript？无法用类属性语法？
- 如何生成多个版本的文档？
- md 文件里的代码如何格式化？
- windows 下不识别 /dev/tty
- 以下钩子无法使用？
````
"husky": {
    "hooks": {
      "prepare-commit-msg": "exec < /dev/tty && git cz --hook"
    }
  }
````

## workflow

- Make changes
- Commit those changes
- Make sure Travis turns green
- Bump version in package.json
- conventionalChangelog
- Commit package.json and CHANGELOG.md files
- Tag
- Push