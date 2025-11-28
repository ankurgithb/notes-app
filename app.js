const { addNote, listNotes, deleteNote } = require("./notes");

const action = process.argv[2];
const value = process.argv[3];

(async () => {
  if (action === "add") {
    await addNote(value);
  } else if (action === "list") {
    await listNotes();
  } else if (action === "delete") {
    await deleteNote(Number(value));
  } else {
    console.log("Usage:");
    console.log('node app.js add "note text"');
    console.log("node app.js list");
    console.log("node app.js delete <index>");
  }
})();