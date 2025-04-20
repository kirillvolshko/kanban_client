"use client";
import {
  IAddUser,
  IBoardResponse,
  ICreateBoard,
  IDeleteUser,
} from "@/types/board";
import { BaseQueryParams } from "../baseQuery";
import { IUserShort } from "@/types/user";

export const boardsService = BaseQueryParams("boards", [
  "BOARDS",
  "SETTINGS",
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
    addBoardToUser: builder.mutation<unknown, IAddUser>({
      query: (body) => ({
        url: "/boards/add-user",
        method: "POST",
        credentials: "include",
        body,
      }),
    }),

    deleteBoard: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/boards/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["BOARDS"],
    }),
    deleteUserFromBoard: builder.mutation<{ message: string }, IDeleteUser>({
      query: (body) => ({
        url: `/boards/user`,
        method: "DELETE",
        credentials: "include",
        body,
      }),
      invalidatesTags: ["SETTINGS"],
    }),

    getUsersByBoardId: builder.query<IUserShort[], string>({
      query: (boardId) => ({
        url: `/boards/${boardId}/users`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["SETTINGS"],
    }),
  }),
});

export const {
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useGetBoardsByUserIdQuery,
  useGetUsersByBoardIdQuery,
  useAddBoardToUserMutation,
  useDeleteUserFromBoardMutation,
} = boardsService;
