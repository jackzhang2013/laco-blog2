import katex from "katex";
import "katex/dist/katex.min.css";
import "katex/contrib/copy-tex";
import MarkdownIt from "markdown-it";
import katexPlugin from "@vscode/markdown-it-katex";
import anchor from "markdown-it-anchor";
import toc from "markdown-it-toc-done-right";
import { alert } from "@mdit/plugin-alert";
import { imgSize } from "@mdit/plugin-img-size";
import { tasklist } from "@mdit/plugin-tasklist";
import Prism from "prismjs";
import "prismjs/plugins/inline-color/prism-inline-color.css";
import "./style/markdown.scss";
import "viewerjs/dist/viewer.css";
import Viewer from "viewerjs";
import StateBlock from "markdown-it/lib/rules_block/state_block.mjs";

console.log("markdown.js loaded");
function wikiLink(state: StateBlock, startLine: number) {
    const pos = state.bMarks[startLine] + state.tShift[startLine],
        max = state.eMarks[startLine],
        ch = state.src.charCodeAt(pos);
    if (ch !== 0x5b /*@*/ || pos >= max) {
        return false;
    }
    const text = state.src.substring(pos, max);
    state.line = startLine + 1;
    const rg = /\[\[.*\]\]/;
    const match = text.match(rg);
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
export function parseMarkdown(text: string) {
    const md = new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
    });
    katexPlugin(md, {
        katex,
    });
    md.use(anchor, {
        permalink: true,
        permalinkBefore: true,
        permalinkSymbol: "§",
    });
    md.use(toc, {
        listType: "ul",
    });
    md.use(alert);
    md.use(imgSize);
    md.use(tasklist);
    md.block.ruler.before("paragraph", "wikiLink", wikiLink);
    return md.render("${toc}\n" + text);
}

export function solveAll() {
    Prism.highlightAll(false);
    const imageList = document.getElementsByTagName("img");
    for (let i = 0; i < imageList.length; i++) {
        new Viewer(imageList[i], {});
    }
    const hasImg = document.querySelector(".markdown-body img") !== null;
    if (hasImg) {
        document.getElementById("head").innerHTML += `<div id="tips-card">
    <b>Warning</b>
    <p>
        图片在暗色模式呈现的效果可能不太理想，切换到亮色模式即可避免此问题
    </p>
</div>`;
    }
    const toc = document.getElementsByClassName("table-of-contents")[0];
    const title = document.createElement("h3");
    title.textContent = "目录";
    toc.insertBefore(title, toc.firstChild);
}
