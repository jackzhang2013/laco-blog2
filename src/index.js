import $ from "cash-dom";
import axios from "axios";
import "./base.js";
import { intitheme } from "./base.js";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./style/style.scss";

console.log("index.js loaded");

window.clickfunction = function (name) {
    window.open(name, "_blank");
};

axios.get("./asset/config.json").then(function (response) {
    var data = response.data;
    intitheme(data);
    console.log(data);
    var dataname = data.name;
    $("#title").text(dataname + "的博客");
    $("#name").text(dataname + "的博客");
    $("#logo-text").text(dataname + "'s blog");
});
axios.get("./asset/posts.json").then(function (response) {
    var postlist = response.data.post_list;
    for (var index = 0; index < postlist.length; index++) {
        var postname = postlist[index];
        console.log(postname);
        var template = `
        <div id="post${index}" class="postcard" onclick="clickfunction('post.html?name=${postname}')">
            <p>${postname}</p>
        </div>
        `;
        $("#post").append(template);
    }
});
