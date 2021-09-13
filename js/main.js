import NotesView from "./NotesView.js";
const app = document.getElementById("app");
const view = new NotesView(app, {
    onNoteSelect() {
        console.log("Note has been selected");
    },
    onNoteAdd() {
        console.log("Note has been added");
    },
    onNoteDelete() {
        console.log("Note has been deleted");
    },
    onNoteEdit() {
        console.log("Note has been edited");
    },
});
