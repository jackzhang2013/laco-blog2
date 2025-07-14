import axios from "axios";
import { parseMarkdown, solveAll } from "./markdown";
import "./base";
import { intitheme } from "./base";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./style/post.scss";

console.log("post.js loaded");

window.onload = () => {
    intitheme();
    const search_params = new URLSearchParams(window.location.search);
    const post_name = search_params.get("name");

    axios.get(`./posts.json`).then(function (response) {
        const postlist = response.data;
        postlist.forEach(
            (element: {
                name: string;
                text: string;
                title: string;
                createTime: string;
                content: string;
                tags: string[];
            }) => {
                if (element.name == post_name) {
                    const title = document.getElementById("title").innerText;

                    document.getElementById("title").innerText =
                        element.title + " | " + title;
                    document.getElementById("post-name").innerText =
                        element.title;

                    document.getElementById("post").innerHTML = parseMarkdown(
                        element.content,
                    );

                    solveAll();

                    let count: number = 0;
                    document
                        .querySelectorAll("p,b,h1,h2,h3,h4,h5,h6,li,th,td")
                        .forEach((element: Element) => {
                            count += element.innerHTML.length;
                        });

                    const tagStr: string = element.tags.join(" • ");

                    document.getElementById("post-mate").innerHTML =
                        `<span><i class="bi bi-file-word"></i><span>${count}</span></span>`;
                    document.getElementById("post-mate").innerHTML +=
                        `<span><i class="bi bi-clock"></i><span>${Math.round(count / 400)}分钟</span></span>`;
                    document.getElementById("post-mate").innerHTML +=
                        `<span><i class="bi bi-clock"></i><span>${element.createTime.slice(0, 10)}</span></span>`;
                    document.getElementById("post-tags").innerHTML +=
                        `<span><i class="bi bi-tags"></i><span>${tagStr}</span></span>`;
                }
            },
        );
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
