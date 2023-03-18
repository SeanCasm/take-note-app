const { Schema, model } = require("mongoose");

const BookSchema = Schema({
  title: {
    type: String,
    required: [true, "Book title is required"],
  },
  notes: {
    type: Number,
    default: 0,
  },
  status: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
  },
  lastEdit: {
    type: Date,
  },
  user: {
    type: Schema.Types.ObjectId,
  },
});

BookSchema.methods.toJSON = function () {
  const { __v, _id, ...book } = this.toObject();
  book.id = _id;
  return book;
};
module.exports = model("Book", BookSchema);
