"use client";
import { format } from "date-fns";

export const dateTransaltion = (date: string) => {
  return format(date, "dd/MM/yy");
};
