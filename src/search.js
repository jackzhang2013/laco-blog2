import Fuse from "fuse.js";
export var fuse;
export function importDoc(postList) {
    var documents = [];
    postList.forEach((value) => {
        documents.push({
            id: value.name,
            title: value.name,
            body: value.text,
        });
    });
    console.log(documents);
    const options = {
        includeScore: true,
        shouldSort: true,
        keys: ["title", "body"],
    };
    fuse = new Fuse(documents, options);
}
export function searchDoc(str) {
    return fuse.search(str);
}
