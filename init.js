import { glob } from "glob";
import fs from "fs";
import path from "path";
import MarkdownIt from "markdown-it";
import YAML from "yaml";

const mdfiles = await glob("./public/post/*.md");
let post_list = [];
const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
});
for (let i = 0; i < mdfiles.length; i++) {
    console.log(path.basename(mdfiles[i]));
    let data = fs.readFileSync("./public/post/" + path.basename(mdfiles[i]));
    let createTime = fs.statSync(
        "./public/post/" + path.basename(mdfiles[i]),
    ).birthtime;
    let strLS = data.toString().split("\n");
    let title, tags, digest, str;
    let bodyContent = "";
    if (strLS[0] === "---") {
        let yamlContent = "";
        let i = 1;
        for (; i < strLS.length; i++) {
            if (strLS[i] === "---") break;
            yamlContent += strLS[i] + "\n";
        }
        for (i++; i < strLS.length; i++) {
            if (strLS[i] !== "") break;
        }
        for (; i < strLS.length; i++) {
            bodyContent += strLS[i] + "\n";
        }
        str = md.render(bodyContent);
        str = str.replace(/<[^>]*>/g, "");
        title = YAML.parse(yamlContent).title;
        tags = YAML.parse(yamlContent).tags;
        digest = YAML.parse(yamlContent).digest;
    }
    post_list.push({
        name: path.basename(mdfiles[i], ".md"),
        title: title ? title : path.basename(mdfiles[i], ".md"),
        digest: digest ? digest : str.slice(0, 50) + " ... ",
        content: bodyContent,
        createTime: createTime,
        tags: tags,
    });
}
try {
    fs.writeFileSync("./public/posts.json", JSON.stringify(post_list));
} catch (err) {
    console.error("Error writing file:", err);
}
