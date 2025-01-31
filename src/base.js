import $ from "cash-dom";

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
    $(document).ready(function () {
        var comments = document.createElement("script");
        Object.entries({
            src: "https://giscus.app/client.js",
            "data-repo": "jackzhang2013/laco-blog",
            "data-repo-id": "R_kgDOLu7GBA",
            "data-category": "Announcements",
            "data-category-id": "DIC_kwDOLu7GBM4Cl_Us",
            "data-mapping": "pathname",
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
    });
}

function settheme(theme) {
    $("body").attr("class", theme);
    if (theme == "dark") {
        $("#moon-sun").attr("class", "bi bi-sun");
    } else {
        $("#moon-sun").attr("class", "bi bi-moon-stars");
    }
}

window.switchtheme = function () {
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
