import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({
      createdAt: -1,
    }); // -1 will sort in desc. order (newest first)
    return res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!note) return res.status(404).json({ message: "Note not found!" });
    return res.json(note);
  } catch (error) {
    console.error("Error in getNoteById controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content, tags } = req.body;
    const note = new Note({
      title,
      content,
      tags: tags || [],
      user: req.user._id,
    });

    const savedNote = await note.save();
    return res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content, tags } = req.body;
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });

    if (!note) {
      return res
        .status(404)
        .json({ message: "Note not found or unauthorized" });
    }

    // Update the fields
    note.title = title ?? note.title;
    note.content = content ?? note.content;
    note.tags = tags ?? note.tags;

    const updatedNote = await note.save();

    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });

    return res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in updateNote controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!note) {
      return res
        .status(404)
        .json({ message: "Note not found or unauthorized" });
    }
    return res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteNote controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
