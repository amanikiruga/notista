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
        for (const note of notes) {
            const html = this._createListItemHTML(
                note.id,
                note.title,
                note.body,
                new Date(note.updated)
            );
            noteslistContainer.insertAdjacentHTML("beforeend", html);
        }
    }
}
