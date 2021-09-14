import NotesView from "./NotesView.js";
import NotesAPI from "./NotesAPI.js";
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
    onNoteEdit(newTitle, newBody) {
        console.log(newTitle + " " + newBody);
    },
});

view.updateNoteList(NotesAPI.getAllNotes());
