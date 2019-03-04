<!--
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 简单文档
 * @Date: 2019-03-04 17:11:56
 * @LastEditTime: 2019-03-04 17:16:29
 -->

# sako-cli (say ko to cli)
> 基于 `nodejs` 的前端脚手架工具，用于下载相关的前端模版、编译、打包、mock服务等。

### Install (安装)
> npm i sako-cli -g 

### Useage & API (应用文档)
> 查看使用[文档](/USEAGES.md)

### PR && Commit (提交代码)
- 使用 commitizen 来格式化 Git commit message
  - 安装 commitizen
  > npm install -g commitizen
  - 使用 angular 的 commit 规范 
  > commitizen init cz-conventional-changelog --save-dev --save-exact
  - 重新安装 husky 与 lint-staged
  > npm i -D husky 
  > npm i -D lint-staged 
  
- 提交规则
  - feat: 新功能
  - fix: 修复bug
  - docs: 文档更新
  - style: 格式更新（不影响代码运行的变动）
  - refactor: 重构（既不是新增功能，又不是bug修复）
  - test: 添加测试
  - chore: 构建过程或辅助工具的变动

- git 提交
  - 将 `git commit` 用 `git cz` 代替

### 更新日志
> 每次发布版本请更新日志(在change.md中修改)，查看[日志](./CHANGE.md)
