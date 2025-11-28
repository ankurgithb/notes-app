const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "notes.json");

// Read notes file
async function loadNotes() {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return []; // file does not exist yet
  }
}

// Save notes file
async function saveNotes(notes) {
  await fs.writeFile(filePath, JSON.stringify(notes, null, 2));
}

// Add note
async function addNote(text) {
  const notes = await loadNotes();
  notes.push({ text });
  await saveNotes(notes);
  console.log("Note added!");
}

// Lidt notes
async function listNotes() {
  const notes = await loadNotes();
  console.log("Your notes:");
  notes.forEach((note, index) => {
    console.log(`${index + 1}. ${note.text}`);
  });
}

// Delete a note
async function deleteNote(index) {
  const notes = await loadNotes();
  notes.splice(index - 1, 1);
  await saveNotes(notes);
  console.log("Note deleted!");
}

module.exports = { addNote, listNotes, deleteNote };