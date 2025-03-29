import katex from "katex";
import "katex/dist/katex.min.css";
import "katex/contrib/copy-tex";
import MarkdownIt from "markdown-it";
import katexPlugin from "@vscode/markdown-it-katex";
import anchor from "markdown-it-anchor";
import imageFiguresPlugin from "markdown-it-image-figures";
import MarkdownItGitHubAlerts from "markdown-it-github-alerts";
import Prism from "prismjs";
import "./style/prism-material.scss";
import "./style/prism-line-numbers.scss";
import "./style/prism-toolbar.scss";
import "prismjs/plugins/inline-color/prism-inline-color.css";
import "./style/github-markdown.scss";
import "viewerjs/dist/viewer.css";
import "./style/github-colors-light.scss";
import "./style/github-colors-dark-class.scss";
import "./style/github-base.scss";
import Viewer from "viewerjs";
console.log("markdown.js loaded");
function wikiLink(state, startLine) {
    var pos = state.bMarks[startLine] + state.tShift[startLine],
        max = state.eMarks[startLine],
        ch = state.src.charCodeAt(pos);
    if (ch !== 0x5b /*@*/ || pos >= max) {
        return false;
    }
    let text = state.src.substring(pos, max);
    state.line = startLine + 1;
    let rg = /\[\[.*\]\]/;
    let match = text.match(rg);
    if (match && match.length) {
        const name = state.src.slice(pos + 2, max - 2);
        const token_o = state.push("heading_open", "a", 1);
        token_o.markup = "[[";
        token_o.map = [startLine, state.line];
        token_o.attrPush(["href", "./post.html?name=" + name]);
        const token_i = state.push("inline", "", 0);
        token_i.content = name;
        token_i.map = [startLine, state.line];
        token_i.children = [];
        const token_c = state.push("heading_close", "a", -1);
        token_c.markup = "]]";
        state.line = startLine + 1;
        return true;
    }
    return false;
}
export function parseMarkdown(text) {
    //TODO: add more plugin
    //TODO: TOC
    const md = new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
    });
    katexPlugin(md, {
        katex,
    });
    md.use(anchor);
    md.use(imageFiguresPlugin);
    md.use(MarkdownItGitHubAlerts);
    md.block.ruler.before("paragraph", "wikiLink", wikiLink);
    return md.render(text);
}

export function solveAll() {
    // hljs.addPlugin(new CopyButtonPlugin());
    // hljs.highlightAll();
    Prism.highlightAll(false);
    var imageList = document.getElementsByTagName("img");
    for (var i = 0; i < imageList.length; i++) {
        new Viewer(imageList[i], {});
    }
}
