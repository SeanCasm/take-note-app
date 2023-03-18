const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;
const Note = require("../models/note");
const Book = require("../models/book");

const getNotes = async (req = request, res = response) => {
  try {
    const { limit = 1, sort = 1, ...other } = req.query;
    const { token } = req.headers;
    const { uid } = jwt.decode(token);
    const book = new ObjectId(other?.book);
    const findByBook = { user: uid, status: true, book };
    const findByOther = { user: uid, status: true, other };
    const notes = await Note.find(
      other.book !== undefined ? findByBook : findByOther
    )
      .limit(limit)
      .sort({ createdAt: sort });
    res.json(notes);
  } catch (err) {
    console.log({ err });
    res.status(400).json({
      msg: "Cannot get note, please try again",
    });
  }
};
const searchNote = async (req = reques, res = response) => {
  try {
    const { limit = 1, sort = 1 } = req.query;
    const notes = await Note.find({ ...req.body })
      .limit(limit)
      .sort({ createdAt: sort });

    res.json(notes);
  } catch (err) {
    console.log({ err });
    res.status(400).json({
      msg: "Cannot get note, please try again",
    });
  }
};
const notePost = async (req = request, res = response) => {
  try {
    const lastEdit = new Date().toISOString();
    const { token } = req.headers;
    const { uid } = jwt.decode(token);
    const { book, title, content } = req.body;
    const bookId = new ObjectId(book);
    const [note, bookDoc] = await Promise.all([
      Note.create({
        title,
        content,
        user: uid,
        lastEdit,
        createdAt: lastEdit,
      }),
      Book.findByIdAndUpdate(bookId, { $inc: { notes: 1 } }, { new: true }),
    ]);
    note.book = bookDoc.id;
    await note.save();
    res.json({
      note,
      bookDoc,
      msg: `Note ${note.title} has been created`,
    });
  } catch (err) {
    console.log({ err });
    res.status(400).json({
      msg: "Cannot post this note, please try again",
    });
  }
};

const noteEdit = async (req = request, res = response) => {
  try {
    const lastEdit = new Date().toISOString();
    const { book, id, content, title } = req.body;
    const noteId = new ObjectId(id);
    const bookId = new ObjectId(book);
    const note = await Note.findById(noteId);
    let newBook = undefined,
      oldBook = undefined;
    if (note.book !== bookId) {
      const options = { new: true };
      [newBook, oldBook] = await Promise.all([
        Book.findByIdAndUpdate(
          bookId,
          { $inc: { notes: 1 }, lastEdit },
          options
        ),
        Book.findByIdAndUpdate(
          note.book,
          {
            $inc: { notes: -1 },
            lastEdit,
          },
          options
        ),
      ]);
      console.log(newBook);
    }

    note.lastEdit = lastEdit;
    note.book = book;
    note.content = content;
    note.title = title;
    await note.save();
    res.json({
      note,
      newBook,
      oldBook,
      msg: `Note ${note.title} has been updated`,
    });
  } catch (err) {
    console.log({ err });
    res.status(400).json({
      msg: "Cannot edit this note, please try again",
    });
  }
};

const noteDelete = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { book } = req.query;
    const mid = mongoose.Types.ObjectId(id);
    const bid = mongoose.Types.ObjectId(book);
    const options = { new: true };
    const [note, bookDoc] = await Promise.all([
      Note.findByIdAndUpdate(mid, { status: false }, options),
      Book.findByIdAndUpdate(bid, { $inc: { notes: -1 } }, options),
    ]);
    res.json({
      msg: `Note ${note.title} has been deleted`,
      note,
      bookDoc,
    });
  } catch (err) {
    console.log({ err });
    res.status(400).json({
      msg: "Cannot delete this note, please try again",
    });
  }
};

module.exports = {
  notePost,
  noteDelete,
  noteEdit,
  getNotes,
  searchNote,
};
