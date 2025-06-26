import axios from "axios";
import { solveAll, parseMarkdown } from "./markdown";
import "./base";
import { intitheme } from "./base";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./style/post.scss";

console.log("post.js loaded");

window.onload = () => {
    intitheme();
    const search_params = new URLSearchParams(window.location.search);
    const post_name = search_params.get("name");
    const title = document.getElementById("title").innerText;

    document.getElementById("title").innerText = post_name + " | " + title;
    document.getElementById("post-name").innerText = post_name;

    axios.get(`./post/${post_name}.md`).then(function (response) {
        const post = response.data;
        document.getElementById("post").innerHTML = parseMarkdown(post);
        solveAll();
    });

    const scrollToTopBtn = document.getElementById("to-top-btn");
    const rootElement = document.documentElement;

    const scrollToTop = () => {
        rootElement.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    scrollToTopBtn.addEventListener("click", scrollToTop);

    function handleScroll() {
        const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
        if (rootElement.scrollTop / scrollTotal > 0.2) {
            scrollToTopBtn.classList.add("show-btn");
        } else {
            scrollToTopBtn.classList.remove("show-btn");
        }
    }

    document.addEventListener("scroll", handleScroll);
};
