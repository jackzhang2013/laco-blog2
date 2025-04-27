import axios from "axios";
import "./base";
import { intitheme } from "./base";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./style/index.scss";
import { importDoc } from "./search";

console.log("index.js loaded");

window.onload = () => {
    axios.get("./config.json").then(function (response) {
        const data = response.data;
        intitheme(data);
        const dataname = data.name;
        document.getElementById("title").innerText = dataname + "的博客";
        document.getElementById("logo-text").innerText = dataname + "'s blog";
    });
    axios.get("./posts.json").then(function (response) {
        const postlist = response.data;
        postlist.forEach((element: { name: string; text: string }) => {
            const template = `<div class="postcard">
    <p>${element.name}</p>
    <p>${element.text.slice(0, 50) + " ... "}</p>
    <a href="post.html?name=${element.name}" target="_blank">>> 阅读全文</a>
</div>`;
            document.getElementById("post").innerHTML += template;
        });

        importDoc(postlist);
    });
};
