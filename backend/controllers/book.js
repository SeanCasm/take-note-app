const { response, request } = require("express");
const Book = require("../models/book");
const Note = require("../models/note");
const ObjectId = require("mongodb").ObjectId;

const bookGet = async (req = request, res = response) => {
  try {
    const { id } = req.query;
    const bid = new ObjectId(id);
    const book = await Book.findById(bid);
    res.json(book);
  } catch (err) {
    console.log({ err });
    res.status(400).json({
      msg: "Cannot get book, please try again",
    });
  }
};

const bookGetAll = async (req = request, res = response) => {
  try {
    const createdAt = new Date().toISOString();
    const books = await Book.find({ status: true });

    if (books.length === 0) {
      const books = await Book.create({
        title: "First book",
        createdAt,
        lastEdit: createdAt,
      });
      res.json([books]);
    } else {
      res.json(books);
    }
  } catch (err) {
    console.log({ err });
    res.status(400).json({
      msg: "Cannot get the list of books, please try again",
    });
  }
};
const bookPost = async (req = request, res = response) => {
  try {
    const { title } = req.body;
    const createdAt = new Date().toISOString();
    const book = await Book.create({ title, createdAt, lastEdit: createdAt });
    res.json(book);
  } catch (err) {
    console.log({ err });
    res.status(400).json({
      msg: "Cannot create, please try again",
    });
  }
};
const bookEdit = async (req = request, res = response) => {
  try {
    const { id, title } = req.body;
    const lastEdit = new Date().toISOString();
    const options = { new: true };
    const bid = new ObjectId(id);
    const book = await Book.findByIdAndUpdate(
      bid,
      { title, lastEdit },
      options
    );
    console.log(book);
    res.json({
      book,
      msg: "Update successful",
    });
  } catch (err) {
    console.log({ err });
    res.status(400).json({
      msg: "Cannot edit, please try again",
    });
  }
};
const bookDelete = async (req = request, res = response) => {
  try {
    const { id } = req.query;
    const bid = new ObjectId(id);
    await Book.findOneAndUpdate(bid, { status: false });
    await Note.updateMany({ book: bid }, { status: false });
    res.json({
      msg: "Your book has been deleted",
    });
  } catch (err) {
    console.log({ err });
    res.status(400).json({
      msg: "Cannot delete, please try again",
    });
  }
};
module.exports = {
  bookPost,
  bookDelete,
  bookEdit,
  bookGet,
  bookGetAll,
};
