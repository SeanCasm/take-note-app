import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected: {
    id: "",
    title: "",
    content: "",
    book: "",
    lastEdit: "",
    createdAt: "",
  },
  notesList: [],
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    onAddNote: (state, { payload }) => {
      state.notesList.push(payload);
    },
    onUpdateNotesList: (state, { payload }) => {
      state.notesList = payload;
    },
    onDeleteNote: (state, { payload }) => {
      const notes = state.notesList.filter((item) => item.id !== payload.id);
      state.notesList = notes;
    },
    onUpdateNoteItem: (state, { payload }) => {
      const n = state.notesList.findIndex((item) => item.id === payload.id);
      state.notesList[n] = payload;
    },
    onUpdateSelected: (state, { payload }) => {
      const { title, content, lastEdit, createdAt, book, id } = payload;
      state.selected.id = id;
      state.selected.title = title;
      state.selected.book = book;
      state.selected.content = content;
      state.selected.lastEdit = lastEdit;
      state.selected.createdAt = createdAt;
    },
    onResetSelected: (state) => {
      state.selected.id = "";
      state.selected.title = "";
      state.selected.content = "";
      state.selected.book = "";
      state.selected.lastEdit = "";
      state.selected.createdAt = "";
    },
  },
});

export const {
  onUpdateSelected,
  onResetSelected,
  onUpdateNotesList,
  onUpdateNoteItem,
  onDeleteNote,
  onAddNote,
} = noteSlice.actions;