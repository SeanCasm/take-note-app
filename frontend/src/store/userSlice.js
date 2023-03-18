import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  lastname: "",
  email: "",
  status: "not-logged",
  message: "",
  google: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    onLogSuccess: (state, { payload }) => {
      const { name, lastname, email, google } = payload;
      state.name = name;
      state.lastname = lastname;
      state.email = email;
      state.google = google;
      state.status = "logged";
    },
    onLogError: (state, { payload }) => {
      state.status = "not-logged";
      state.name = "";
      state.lastname = "";
      state.email = "";
      state.google = false;
      state.message = payload;
    },
    onLogout: () => initialState,
  },
});

export const { onLogSuccess, onLogError, onLogout } = userSlice.actions;
