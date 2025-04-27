import axios from "axios";
import { solveAll, parseMarkdown } from "./markdown";
import "./base";
import { intitheme } from "./base";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./style/post.scss";
import { importDoc } from "./search";

console.log("post.js loaded");

axios.get("./config.json").then(function (response) {
    const data = response.data;
    intitheme(data);
    const data_name = data.name;
    const search_params = new URLSearchParams(window.location.search);
    const post_name = search_params.get("name");

    document.getElementById("logo-text").innerText = data_name + "'s blog";
    document.getElementById("title").innerText = post_name;
    document.getElementById("post-name").innerText = post_name;

    axios.get(`./post/${post_name}.md`).then(function (response) {
        const post = response.data;
        document.getElementById("post").innerHTML = parseMarkdown(post);
        solveAll();
    });
});
axios.get("./posts.json").then(function (response) {
    const postlist = response.data;
    importDoc(postlist);
});
