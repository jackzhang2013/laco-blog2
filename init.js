import { glob } from "glob";
import fs from "fs";
import path from "path";
import MarkdownIt from "markdown-it";
const mdfiles = await glob("./public/post/*.md");
var post_list = [];
const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
});
for (var i = 0; i < mdfiles.length; i++) {
    console.log(path.basename(mdfiles[i]));
    var data = fs.readFileSync("./public/post/" + path.basename(mdfiles[i]));
    var str = md.render(data.toString());
    str = str.replace(/<[^>]*>/g, "");
    post_list.push({
        name: path.basename(mdfiles[i], ".md"),
        text: str,
    });
}
try {
    fs.writeFileSync("./public/posts.json", JSON.stringify(post_list));
} catch (err) {
    console.error("Error writing file:", err);
}
