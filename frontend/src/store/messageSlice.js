import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: "",
  failure: false,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    onSuccessUpdate: (state, { payload }) => {
      state.text = payload;
      state.failure = false;
    },
    onFailureUpdate: (state, { payload }) => {
      state.text = payload;
      state.failure = true;
    },
    onClear: () => initialState,
  },
});

export const { onSuccessUpdate, onFailureUpdate, onClear } =
  messageSlice.actions;
