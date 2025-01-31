import katex from "katex";
import "katex/dist/katex.min.css";
import "katex/contrib/copy-tex";
import MarkdownIt from "markdown-it";
import katexPlugin from "@vscode/markdown-it-katex";
import anchor from "markdown-it-anchor";
import Prism from "prismjs";
import "./style/prism-material.scss";
import "./style/prism-line-numbers.scss";
import "./style/prism-toolbar.scss";
import "prismjs/plugins/inline-color/prism-inline-color.css";
import "./style/github-markdown.scss";

console.log("markdown.js loaded");

export function parseMarkdown(text) {
    const md = new MarkdownIt();
    katexPlugin(md, {
        katex,
    });
    md.use(anchor);
    return md.render(text);
}

export function highlightAll() {
    // hljs.addPlugin(new CopyButtonPlugin());
    // hljs.highlightAll();
    Prism.highlightAll(false);
}
