import axios from "axios";
import "./base.js";
import { intitheme } from "./base.js";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./style/index.scss";
import { importDoc } from "./search.js";

console.log("index.js loaded");

window.onload = () => {
    axios.get("./asset/config.json").then(function (response) {
        var data = response.data;
        intitheme(data);
        var dataname = data.name;
        document.getElementById("title").innerText = dataname + "的博客";
        document.getElementById("logo-text").innerText = dataname + "'s blog";
    });
    axios.get("./asset/posts.json").then(function (response) {
        var postlist = response.data;
        postlist.forEach((element) => {
            var template = `<div class="postcard">
    <p>${element.name}</p>
    <p>${element.text.slice(0, 50) + " ... "}</p>
    <a href="post.html?name=${element.name}" target="_blank">>> 阅读全文</a>
</div>`;
            document.getElementById("post").innerHTML += template;
        });

        importDoc(postlist);
    });
};
