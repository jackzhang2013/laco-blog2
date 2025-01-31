<div align="center">

# laco blog

![](https://img.shields.io/github/forks/jackzhang2013/temp?style=flat) ![](https://img.shields.io/github/stars/jackzhang2013/temp?style=flat)

[![My Skills](https://skillicons.dev/icons?i=js,html,css,jquery,vue,vscode&theme=dark)](https://skillicons.dev)

![](https://stats.deeptrain.net/repo/jackzhang2013/temp/?theme=dark)

<a href="https://star-history.com/#jackzhang2013/temp&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=jackzhang2013/temp&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=jackzhang2013/temp&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=jackzhang2013/temp&type=Date" />
 </picture>
</a>

</div>

## 依赖项目

---

这个项目的诞生离不开这些项目：

- KaTeX
- Copy-Tex
- highlightjs-copy
- highlightjs-line-numbers
- highlight
- cash-dom
- Bootstrap Icons

开发过程中使用的工具：

- VSCode

### 开源协议

---

MIT License

### 如何使用

---

在最新版本中，会有一个`config.json`，你可以通过更改它来更改博客名等等

如果你想写文章，那么可以更改`md`文件夹内的内容，并且需要更改`config.json`的内容

### config.json 格式

---

```json
{
    "name": "jackzhang",
    "theme": "light",
    "auto_dark": false,
    "post": {
        "count": 1,
        "name": ["洛谷P1001题解"]
    }
}
```

- name: 博客名
- theme: 主题，分别是 light 和 dark
- auto_dark: 自动调整主题
- post
  - count: 文章数量
  - name: 文章名

### 更新日志

---

### v1.0.0

第一个版本，和之前的 beta 版相比，更加自动化，并增加了暗黑模式的控制。

\>\> 更多请看[CHANGE.md](CHANGE.md)
