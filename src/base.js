import { searchDoc } from "./search";

console.log("base.js loaded");

var theme;

export function intitheme(data) {
    var auto = data.auto_dark;
    var storage = window.localStorage;
    theme = data.theme;
    if (auto) {
        const is_dark = window.matchMedia("(prefers-color-scheme: dark)");
        if (is_dark) {
            theme = "dark";
        } else {
            theme = "light";
        }
    }
    if (storage.theme) {
        theme = storage.theme;
    }
    var comments = document.createElement("script");
    Object.entries({
        src: "https://giscus.app/client.js",
        "data-repo": "jackzhang2013/laco-blog",
        "data-repo-id": "R_kgDOLu7GBA",
        "data-category": "Announcements",
        "data-category-id": "DIC_kwDOLu7GBM4Cl_Us",
        "data-mapping": "url",
        "data-strict": "0",
        "data-reactions-enabled": "1",
        "data-emit-metadata": "0",
        "data-input-position": "top",
        "data-lang": "zh-CN",
        "data-loading": "lazy",
        "data-theme": theme,
        crossorigin: "anonymous",
        async: true,
    }).forEach((e) => comments.setAttribute(e[0], e[1]));
    var comments_script = document.getElementById("giscus-script");
    if (comments_script) {
        comments_script.replaceWith(comments);
    }
    settheme(theme);
}

function settheme(theme) {
    document.getElementsByTagName("body")[0].setAttribute("class", theme);
    if (theme == "dark") {
        document.getElementById("moon-sun").setAttribute("class", "bi bi-sun");
    } else {
        document
            .getElementById("moon-sun")
            .setAttribute("class", "bi bi-moon-stars");
    }
}

window.switchtheme = () => {
    if (theme == "dark") {
        theme = "light";
    } else {
        theme = "dark";
    }
    var storage = window.localStorage;
    storage.theme = theme;
    var frame = document.querySelector(".giscus-frame");
    if (frame) {
        frame.contentWindow.postMessage(
            { giscus: { setConfig: { theme } } },
            "https://giscus.app"
        );
    }
    settheme(theme);
};

window.searchInput = () => {
    var inputNode = document.querySelectorAll("input")[0];
    var listNode = document.getElementById("res-list");
    listNode.innerHTML = "";
    if (inputNode.value == "") {
        listNode.innerHTML = "<div class='res'><p>键入以开始搜索</p></div>";
        return;
    }
    var res = searchDoc(inputNode.value);
    console.log(res);
    res.forEach((value) => {
        var template = `<a
    href="post.html?name=${value.item.id}"
    target="_blank"
>
    <div class="res">
    <b>${value.item.id}</b>
    <p>${value.item.body}</p>
    </div>
</a>`;
        listNode.innerHTML += template;
    });
    console.log(res.length);
    if (res.length === 0) {
        listNode.innerHTML =
            "<div class='res'><p>没有找到符合条件的结果</p></div>";
    }
};

document.addEventListener("click", (event) => {
    var parent = document.getElementById("center-right");
    var listNode = document.getElementById("res-list");
    if (parent.contains(event.target)) {
        listNode.setAttribute("style", "display: block");
    } else {
        listNode.setAttribute("style", "display: none");
    }
});

window.clickfunction = function (name) {
    window.open(name, "_blank");
};
