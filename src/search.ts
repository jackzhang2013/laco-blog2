import Fuse from "fuse.js";
export let fuse: Fuse<{ id: string; title: string; body: string }>;
export function importDoc(postList: { name: string; text: string }[]) {
    const documents: { id: string; title: string; body: string }[] = [];
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
export function searchDoc(str: string) {
    return fuse.search(str);
}
