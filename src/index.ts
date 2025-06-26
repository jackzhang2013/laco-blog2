import "./base";
import { intitheme, postListBuild } from "./base";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./style/index.scss";

console.log("index.js loaded");

window.onload = () => {
    intitheme();
    postListBuild();
};
