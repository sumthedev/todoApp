const express = require("express");
const {
  getNote,
  createNote,
  updateNote,
  deleteNote,
} = require("../controller/noteController");
const auth = require("../middleware/auth");
const yourNoteRouter = express.Router();

// Get all the notes.
yourNoteRouter.get("/", auth, getNote);
// Create the note.
yourNoteRouter.post("/", auth, createNote);
// Update the note.
yourNoteRouter.put("/:id", auth, updateNote);
// Delete the note.
yourNoteRouter.delete("/:id", auth, deleteNote);

module.exports = yourNoteRouter;
