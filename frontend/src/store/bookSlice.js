import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookList: []
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
    onReset: () => initialState,
  },
});

export const { onUpdateList, onUpdateItem, onAddItem } = bookSlice.actions;
