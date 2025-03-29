import { glob } from "glob";
import fs from "fs";
import path from "path";
import Fuse from "fuse.js";
import MarkdownIt from "markdown-it";
const mdfiles = await glob("./public/asset/*.md");
var post_list = [];
const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
});
for (var i = 0; i < mdfiles.length; i++) {
    console.log(path.basename(mdfiles[i]));
    var data = fs.readFileSync("./public/asset/" + path.basename(mdfiles[i]));
    var str = md.render(data.toString());
    str = str.replace(/<[^>]*>/g, "");
    console.log(str);
    post_list.push({
        name: path.basename(mdfiles[i], ".md"),
        text: str,
    });
}
var documents = [];
post_list.forEach((value) => {
    documents.push({
        id: value.name,
        title: value.name,
        body: value.text,
    });
});
const myIndex = Fuse.createIndex(["title", "body"], documents);
try {
    fs.writeFileSync("./public/asset/posts.json", JSON.stringify(post_list));
    fs.writeFileSync(
        "./public/asset/fuse-index.json",
        JSON.stringify(myIndex.toJSON())
    );
} catch (err) {
    console.error("Error writing file:", err);
}
