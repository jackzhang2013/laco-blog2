// import { searchDoc } from "./search";
import "normalize.css";
import axios from "axios";
import "./style/catppuccin.scss";

console.log("base.js loaded");

let theme: string;

export function intitheme() {
    const storage = window.localStorage;
    if (storage.theme) {
        theme = storage.theme;
    }
    const comments = document.createElement("script");
    const giscus: string[][] = [
        ["src", "https://giscus.app/client.js"],
        ["data-repo", "jackzhang2013/laco-blog"],
        ["data-repo-id", "R_kgDOLu7GBA"],
        ["data-category", "Announcements"],
        ["data-category-id", "DIC_kwDOLu7GBM4Cl_Us"],
        ["data-mapping", "url"],
        ["data-strict", "0"],
        ["data-reactions-enabled", "1"],
        ["data-emit-metadata", "0"],
        ["data-input-position", "top"],
        ["data-lang", "zh-CN"],
        ["data-loading", "lazy"],
        [
            "data-theme",
            theme == "dark" ? "catppuccin_mocha" : "catppuccin_latte",
        ],
        ["crossorigin", "anonymous"],
        ["async", "true"],
    ];
    giscus.forEach((e) => comments.setAttribute(e[0], e[1]));
    const comments_script = document.getElementById("giscus-script");
    if (comments_script) {
        comments_script.replaceWith(comments);
    }
    settheme(theme);
}

function settheme(theme: string) {
    document.getElementsByTagName("body")[0].setAttribute("class", theme);
    const moonsun = document.getElementById("moon-sun");
    if (moonsun == null) {
        console.error("Can't find moon-sun.");
        return;
    }
    if (theme == "dark") {
        moonsun.setAttribute("class", "bi bi-sun");
    } else {
        moonsun.setAttribute("class", "bi bi-moon-stars");
    }
}

function switchTheme() {
    if (theme == "dark") {
        theme = "light";
    } else {
        theme = "dark";
    }
    const storage = window.localStorage;
    storage.theme = theme;
    const frame: HTMLIFrameElement = document.querySelector(".giscus-frame");
    if (frame) {
        if (frame.contentWindow) {
            frame.contentWindow.postMessage(
                {
                    giscus: {
                        setConfig: {
                            theme:
                                theme == "dark"
                                    ? "catppuccin_mocha"
                                    : "catppuccin_latte",
                        },
                    },
                },
                "https://giscus.app",
            );
        }
    }
    settheme(theme);
}

// function searchInput() {
//     const inputNode = document.querySelectorAll("input")[0];
//     const listNode = document.getElementById("res-list");
//     listNode.innerHTML = "";
//     if (inputNode.value == "") {
//         listNode.innerHTML = "<div class='res'><p>键入以开始搜索</p></div>";
//         return;
//     }
//     const res = searchDoc(inputNode.value);
//     console.log(res);
//     res.forEach((value: { item: { id: string; body: string } }) => {
//         const template = `<a
//     href="post.html?name=${value.item.id}"
//     target="_blank"
// >
//     <div class="res">
//     <b>${value.item.id}</b>
//     <p>${value.item.body}</p>
//     </div>
// </a>`;
//         listNode.innerHTML += template;
//     });
//     console.log(res.length);
//     if (res.length === 0) {
//         listNode.innerHTML =
//             "<div class='res'><p>没有找到符合条件的结果</p></div>";
//     }
// }

document.getElementById("moon-sun").addEventListener("click", () => {
    switchTheme();
});

export function postListBuild() {
    axios.get("./posts.json").then(function (response) {
        const postlist = response.data;
        postlist.forEach(
            (element: { name: string; digest: string; title: string }) => {
                const template = `<div class="postcard">
    <p>${element.title}</p>
    <p>${element.digest}</p>
    <a href="post.html?name=${element.name}" target="_blank">>> 阅读全文</a>
</div>`;
                document.getElementById("posts").innerHTML += template;
            },
        );
    });
}

const name = "jackzhang";
document.getElementById("title").innerText = name + " 的博客";
document.getElementById("logo-text").innerText = name + "'s blog";
