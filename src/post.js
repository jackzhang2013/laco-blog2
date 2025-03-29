import axios from "axios";
import { solveAll, parseMarkdown } from "./markdown.js";
import "./base.js";
import { intitheme } from "./base.js";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./style/post.scss";
import { importDoc } from "./search.js";

console.log("post.js loaded");

window.clickfunction = function (name) {
    window.open(name, "_blank");
};

axios.get("./asset/config.json").then(function (response) {
    var data = response.data;
    intitheme(data);
    var data_name = data.name;
    const search_params = new URLSearchParams(window.location.search);
    var post_name = search_params.get("name");

    document.getElementById("logo-text").innerText = data_name + "'s blog";
    document.getElementById("title").innerText = post_name;
    document.getElementById("post-name").innerText = post_name;

    axios.get(`./asset/${post_name}.md`).then(function (response) {
        var post = response.data;
        document.getElementById("post").innerHTML = parseMarkdown(post);
        solveAll();
    });
});
axios.get("./asset/posts.json").then(function (response) {
    var postlist = response.data;
    importDoc(postlist);
});
