import { glob } from "glob";
import fs from "fs";
import path from "path";
const mdfiles = await glob("./public/asset/*.md");
var post_list = {
    post_list: [],
};
for (var i = 0; i < mdfiles.length; i++) {
    console.log(path.basename(mdfiles[i]));
    post_list.post_list.push(path.basename(mdfiles[i], ".md"));
}
try {
    fs.writeFileSync("./public/asset/posts.json", JSON.stringify(post_list));
} catch (err) {
    console.error("Error writing file:", err);
}
