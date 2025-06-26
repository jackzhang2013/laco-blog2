import "./base";
import { intitheme, postListBuild } from "./base";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./style/post-list.scss";

console.log("post-list.js loaded");

window.onload = () => {
    intitheme();
    postListBuild();
    const title = document.getElementById("title").innerText;

    document.getElementById("title").innerText = "文章列表 | " + title;
};
