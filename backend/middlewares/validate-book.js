const { response, request } = require("express");
const Book = require("../models/book");

const updateBook = async (req = request, res = response, next) => {
  if (req.body.title === undefined) {
    return next();
  }
  const { title } = req.body;
  try {
    const book = await Book.findOne({ title });
    if (!book) {
      const lastEdit = new Date().toISOString().split("T")[0];
      const book = new Book({ title, notes: 1, lastEdit, createdAt: lastEdit });
      await book.save();
      req.body.book = book.id;
    } else {
      book.notes += 1;
      await book.save();
      req.body.book = book.id;
    }
    next();
  } catch (err) {
    console.log({ err });
    res.status(400).json({
      msg: "New book doesn't exist",
    });
  }
};
module.exports = { updateBook };
