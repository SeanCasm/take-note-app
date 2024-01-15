import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import { noteSlice } from "./noteSlice";
import { bookSlice } from "./bookSlice";
import { messageSlice } from "./messageSlice";
import { createNoteSlice } from "./createNoteSlice";
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    note: noteSlice.reducer,
    book: bookSlice.reducer,
    message: messageSlice.reducer,
    create: createNoteSlice.reducer,
  },
});
