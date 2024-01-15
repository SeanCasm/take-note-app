import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNewNote: true,
};

export const createNoteSlice = createSlice({
  name: "create",
  initialState,
  reducers: {
    onUpdateCreationStatus: (state, { payload }) => {
      state.isNewNote = payload;
    },
  },
});

export const { onUpdateCreationStatus } = createNoteSlice.actions;
