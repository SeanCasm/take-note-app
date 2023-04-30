import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookList: [],
  selected: {
    title: "",
    id: "",
  },
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    onUpdateList: (state, { payload }) => {
      state.bookList = payload;
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
    onReset: () => initialState,
  },
});

export const { onUpdateList, onUpdateItem, onAddItem, onUpdateSelected } =
  bookSlice.actions;
