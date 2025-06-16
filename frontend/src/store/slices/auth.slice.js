import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  likes: JSON.parse(localStorage.getItem("likes")) || [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.likes = action.payload.likes;
      localStorage.setItem("likes", JSON.stringify(action.payload.likes));
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem("user");
      state.likes = [];
      localStorage.removeItem("likes");
    },
    setLikes(state, action) {
      console.log(action.payload);
      state.likes = action.payload;
      localStorage.setItem("likes", JSON.stringify(action.payload));
    },
  },
});

export const { setUser, clearUser, setLikes } = authSlice.actions;
export const selectUser = (state) => state?.auth?.user;
export const selectLikes = (state) => state?.auth?.likes;
export default authSlice.reducer;
