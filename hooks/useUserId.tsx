"use client";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

export const useUserId = () => {
  return useSelector((state: RootState) => state.auth.user_id);
};
