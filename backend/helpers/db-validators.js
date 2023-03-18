const User = require("../models/user");
const Book = require("../models/book");
const Note = require("../models/note");

const emailExists = async (email) => {
  const exists = await User.findOne({ email });
  if (exists) {
    throw new Error("Email already in use");
  }
};
const userExists = async (uid) => {
  const exists = await User.findById(uid);
  if (!exists) {
    throw new Error("User doesn't exist");
  }
};
const bookExists = async (title = "") => {
  const exists = await Book.findOne({ title });
  if (exists) {
    throw new Error(
      `An existing book have the same name.`
    );
  }
};

module.exports = {
  emailExists,
  userExists,
  bookExists,
};
