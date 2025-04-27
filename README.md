> [!WARNING]  
> 该分支已停止维护，请前往typescript分支查看最新进展

<div align="center">

# laco blog

![](https://img.shields.io/github/forks/jackzhang2013/temp?style=flat) ![](https://img.shields.io/github/stars/jackzhang2013/temp?style=flat)

[![My Skills](https://skillicons.dev/icons?i=ts,html,scss,webpack,babel,vscode&theme=dark)](https://skillicons.dev)

</div>

## 依赖项目

这个项目的诞生离不开这些项目：

- Axios
- Fuse.js
- Katex
- Prism.js
- Viewerjs
- Bootstrap Icons

开发过程中使用的工具：

- Webpack 及其插件
- Babel 及其插件
- Postcss 及其插件
- VSCode 及其插件

## 开源协议

MIT License

## 如何使用

在最新版本中，会有一个`config.json`，你可以通过更改它来更改博客名等等

如果你想写文章，那么可以更改`md`文件夹内的内容，并且需要更改`config.json`的内容

### config.json 格式

```json
{
    "name": "jackzhang",
    "theme": "light",
    "auto_dark": false
}
```

- name: 博客名
- theme: 主题，分别是 light 和 dark
- auto_dark: 自动调整主题

### init.js

用于初始化 `posts.json`

## 更新日志

### v2.0.1

使用 Typescript

UI 大改

### v2.0.0

使用 Webpack 和 Node.js，使得导入其他项目更方便

删除 JQuery 以及 Vue，因为没有用到

将 highlight.js 改为 prism.js

**v1 更新历史请前往 [laco-blog](https://github.com/jackzhang2013/laco-blog) 存储库查看**
