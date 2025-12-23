import { createSlice } from "@reduxjs/toolkit";
import type { UserI } from "../../types/user";

const initialState = {
  user: null as null | UserI,
  isLoggedIn: false,
  isAdmin: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: { payload: UserI }) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isAdmin = action.payload.role === "admin";
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.isAdmin = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;