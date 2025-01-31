import $ from "cash-dom";
import axios from "axios";
import { highlightAll, parseMarkdown } from "./markdown.js";
import "./base.js";
import { intitheme } from "./base.js";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./style/post.scss";

console.log("post.js loaded");

window.clickfunction = function (name) {
    window.open(name, "_blank");
};

axios.get("./asset/config.json").then(function (response) {
    var data = response.data;
    intitheme(data);
    console.log(data);
    var data_name = data.name;
    const search_params = new URLSearchParams(window.location.search);
    var post_name = search_params.get("name");

    $("#logo-text").text(data_name + "'s blog");
    $("#title").text(post_name);
    $("#post-name").text(post_name);

    axios.get(`./asset/${post_name}.md`).then(function (response) {
        var post = response.data;
        $("#post").html(parseMarkdown(post));
        highlightAll();
    });
});
