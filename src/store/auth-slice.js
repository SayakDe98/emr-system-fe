import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: localStorage.getItem("token") ? true : false,
    userId: localStorage.getItem("userId") || "",
  },
  reducers: {
    isLoggedIn: (state) => {
      if (localStorage.getItem("token") && localStorage.getItem("userId")) {
        state.isLoggedIn = true;
        state.userId = localStorage.getItem("userId");
      } else {
        state.isLoggedIn = false;
        state.userId = "";
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
      }
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
