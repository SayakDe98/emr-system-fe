import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  profileData: {},
  isLoading: false,
  error: null,
};
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getProfileData: (state, action) => {
      state.profileData = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    errorFetchingData: (state, action) => {
      state.profileData = null;
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const profileActions = profileSlice.actions;

export default profileSlice;
