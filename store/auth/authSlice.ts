"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  access_token: string | null;
  refresh_token: string | null;
  user_id: string | null;
}

const initialState: AuthState = {
  access_token: "",
  refresh_token: "",
  user_id: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.user_id = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.access_token = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refresh_token = action.payload;
    },
    removeToken: (state) => {
      state.access_token = "";
      state.refresh_token = "";
      state.user_id = "";
      localStorage.removeItem("persist:root");
    },
  },
});
export const { setToken, removeToken, setRefreshToken, setUserId } =
  authSlice.actions;

export default authSlice.reducer;
