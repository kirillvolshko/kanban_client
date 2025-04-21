"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BoardState {
  owner_id: string | null;
}

const initialState: BoardState = {
  owner_id: "",
};

export const boardSlice = createSlice({
  name: "board",
  initialState,

  reducers: {
    setOwnerId: (state, action: PayloadAction<string>) => {
      state.owner_id = action.payload;
    },

    removeToken: (state) => {
      state.owner_id = "";
    },
  },
});
export const { setOwnerId } = boardSlice.actions;

export default boardSlice.reducer;
