import NotesView from "./NotesView.js";
import NotesAPI from "./NotesAPI.js";

export default class App {
    constructor(root) {
        this.notes = [];
        this.activeNote = null;
        this.view = new NotesView(root, this._handlers());
        this._refreshNotes();
    }

    _handlers() {
        return {
            onNoteSelect: (idSel) => {
                console.log("Note has been selected: " + idSel);
                const notes = NotesAPI.getAllNotes(); //.slice(0, 2);
                this._setActiveNote(notes.find((note) => note.id == idSel));
            },
            onNoteAdd: () => {
                const noteToAdd = {
                    title: "Enter a title",
                    body: "Write your note here ... ",
                };
                NotesAPI.saveNote(noteToAdd);
                this._refreshNotes();
            },
            onNoteDelete: (id) => {
                NotesAPI.deleteNode(id);
                this._refreshNotes();

                console.log("Note has been deleted");
            },
            onNoteEdit: (newTitle, newBody) => {
                NotesAPI.saveNote({
                    title: newTitle,
                    body: newBody,
                    id: this.activeNote.id,
                });
                this._refreshNotes();

                // this.refreshNotes();
                console.log(newTitle + " " + newBody);
            },
        };
    }

    _refreshNotes() {
        const notes = NotesAPI.getAllNotes();
        this._setNotes(notes);
        if (notes.length > 0) {
            this._setActiveNote(notes[0]);
        }
    }
    _setNotes(notes) {
        this.notes = notes;
        this.view.updateNoteList(notes);
    }

    _setActiveNote(activeNote) {
        this.activeNote = activeNote;
        this.view.updateActiveNote(activeNote);
    }
}
