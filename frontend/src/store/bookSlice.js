import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookList: [],
  selected: {
    title: "",
    id: "",
  },
  load: false,
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    onUpdateLoad: (state, { payload }) => {
      state.load = payload;
    },
    onUpdateList: (state, { payload }) => {
      state.bookList = payload;
      state.load = true;
    },
    onAddItem: (state, { payload }) => {
      state.bookList.push(payload);
    },
    onUpdateItem: (state, { payload }) => {
      const b = state.bookList.findIndex((item) => item.id === payload.id);
      state.bookList[b] = payload;
    },
    onUpdateSelected: (state, { payload }) => {
      state.selected = payload;
    },
    onDeleteBook: (state, { payload }) => {
      const books = state.bookList.filter((item) => item.id !== payload);
      console.log(payload);
      state.bookList = books;
      state.selected = initialState.selected;
    },
    onReset: () => initialState,
  },
});

export const {
  onUpdateList,
  onUpdateItem,
  onAddItem,
  onUpdateSelected,
  onDeleteBook,
  onUpdateLoad,
} = bookSlice.actions;
