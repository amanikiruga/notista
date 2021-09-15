export default class NotesView {
    constructor(
        root,
        { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}
    ) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;
        this.root.innerHTML = `
            <div class="notes__sidebar">
                    <button class="notes__add" type="button">Add Note</button>
                    <div class="notes__list">
                    </div>
            </div>
            <div class="notes__preview">
                    <input
                        class="notes__title"
                        type="text"
                        placeholder="Enter a title..."
                    />
                    <textarea class="notes__body">Write your note here ...</textarea>
                </div>
        `;
        const btnAddNote = this.root.querySelector(".notes__add");
        const inpTitle = this.root.querySelector(".notes__title");
        const inpBody = this.root.querySelector(".notes__body");

        btnAddNote.addEventListener("click", () => {
            this.onNoteAdd();
        });

        [inpTitle, inpBody].forEach((inputField) => {
            inputField.addEventListener("blur", () => {
                const updatedTitle = inpTitle.value.trim();
                const updatedBody = inpBody.value.trim();

                this.onNoteEdit(updatedTitle, updatedBody);
            });
        });

        console.log(
            this._createListItemHTML(300, "Hey", "how are you", new Date())
        );
    }

    _createListItemHTML(id, title, body, updated) {
        const MAX_BODY_LENGTH = 60;

        return `
            <div class="notes__list-item" data-note-id="${id}">
                <div class="notes__small-title">${title}</div>
                <div class="notes__small-body">${body.substring(
                    0,
                    MAX_BODY_LENGTH
                )} ${body.length > MAX_BODY_LENGTH ? "..." : ""}</div>
                <div class="notes__small-updated">${updated.toLocaleString(
                    undefined,
                    { dateStyle: "full", timeStyle: "short" }
                )}</div>
            </div>

        `;
    }

    updateNoteList(notes) {
        const noteslistContainer = this.root.querySelector(".notes__list");

        //empty the list
        noteslistContainer.innerHTML = "";

        //retrieve list of notes from localstorage
        for (const note of notes) {
            const html = this._createListItemHTML(
                note.id,
                note.title,
                note.body,
                new Date(note.updated)
            );
            noteslistContainer.insertAdjacentHTML("beforeend", html);
        }

        noteslistContainer
            .querySelectorAll(".notes__list-item")
            .forEach((noteListItem) => {
                noteListItem.addEventListener("click", () => {
                    this.onNoteSelect(noteListItem.dataset.noteId);
                    // console.log(noteListItem.dataset.noteId);
                });
                noteListItem.addEventListener("dblclick", () => {
                    const doDelete = confirm(
                        "Are you sure you want to delete the note?"
                    );
                    if (doDelete) {
                        this.onNoteDelete(noteListItem.dataset.noteId);
                    }
                });
            });
    }

    updateActiveNote(note) {
        this.root.querySelector(".notes__title").value = note.title;
        this.root.querySelector(".notes__body").value = note.body;
        this.root
            .querySelectorAll(".notes__list-item")
            .forEach((noteListItem) => {
                noteListItem.classList.remove("notes__list-item--selected");
            });
        this.root
            .querySelector(`.notes__list-item[data-note-id="${note.id}"]`)
            .classList.add("notes__list-item--selected");
    }
}
