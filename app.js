const yargs = require("yargs");
const fs = require("fs");

// -----------------
// Helper Functions
// -----------------
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync("notes.json");
        return JSON.parse(dataBuffer.toString());
    } catch (e) {
        return [];
    }
};

const saveNotes = (notes) => {
    fs.writeFileSync("notes.json", JSON.stringify(notes));
};

// Add Note
yargs.command({
    command: "add",
    describe: "Add a new note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string"
        },
        body: {
            describe: "Note body",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        const notes = loadNotes();
        const duplicate = notes.find((n) => n.title === argv.title);

        if (!duplicate) {
            notes.push({
                title: argv.title,
                body: argv.body
            });
            saveNotes(notes);
            console.log("Note added!");
        } else {
            console.log("Title already exists!");
        }
    }
});

// List Notes
yargs.command({
    command: "list",
    describe: "List all notes",
    handler() {
        const notes = loadNotes();
        console.log("Your notes:");
        notes.forEach((note) => console.log("-", note.title));
    }
});

// Read Note
yargs.command({
    command: "read",
    describe: "Read a note",
    builder: {
        title: {
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        const notes = loadNotes();
        const note = notes.find((n) => n.title === argv.title);

        if (note) {
            console.log("Title:", note.title);
            console.log("Body:", note.body);
        } else {
            console.log("Note not found!");
        }
    }
});

// Remove Note
yargs.command({
    command: "remove",
    describe: "Remove a note",
    builder: {
        title: {
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        const notes = loadNotes();
        const kept = notes.filter((n) => n.title !== argv.title);

        if (kept.length === notes.length) {
            console.log("Note not found!");
        } else {
            saveNotes(kept);
            console.log("Note removed!");
        }
    }
});

yargs.parse();
