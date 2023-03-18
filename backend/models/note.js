const { Schema, model } = require("mongoose");

const NoteSchema = Schema({
  title: {
    type: String,
    required: [true, "Note title is required"],
  },
  content: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
  book: {
    type: Schema.Types.ObjectId,
  },
  user: {
    type: Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
  },
  lastEdit: {
    type: Date,
  },
});

NoteSchema.methods.toJSON = function () {
  const { __v, _id, ...note } = this.toObject();
  note.id = _id;
  return note;
};

module.exports = model("Note", NoteSchema);
