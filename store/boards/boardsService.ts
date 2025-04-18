"use client";
import { IBoardResponse, ICreateBoard } from "@/types/board";
import { BaseQueryParams } from "../baseQuery";
import { IUserShort } from "@/types/user";

export const boardsService = BaseQueryParams("boards", [
  "BOARDS",
]).injectEndpoints({
  endpoints: (builder) => ({
    getBoardsByUserId: builder.query<IBoardResponse[], string>({
      query: (userId) => ({
        url: `/boards/${userId}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["BOARDS"],
    }),

    createBoard: builder.mutation<unknown, ICreateBoard>({
      query: (body) => ({
        url: "/boards",
        method: "POST",
        credentials: "include",
        body,
      }),
      invalidatesTags: ["BOARDS"],
    }),

    deleteBoard: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/boards/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["BOARDS"],
    }),

    getUsersByBoardId: builder.query<IUserShort[], string>({
      query: (boardId) => ({
        url: `/boards/${boardId}/users`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useGetBoardsByUserIdQuery,
  useGetUsersByBoardIdQuery,
} = boardsService;
