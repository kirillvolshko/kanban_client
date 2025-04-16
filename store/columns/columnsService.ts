"use client";
import {
  IColumnResponse,
  ICreateColumn,
  IMoveColumn,
  IUpdateColumnTitle,
} from "@/types/column";
import { BaseQueryParams } from "../baseQuery";

export const columnsService = BaseQueryParams("columns", [
  "COLUMNS",
]).injectEndpoints({
  endpoints: (builder) => ({
    getColumnsByBoardId: builder.query<IColumnResponse[], string>({
      query: (board_id) => ({
        url: `/boards/${board_id}/columns`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["COLUMNS"],
    }),

    createColumn: builder.mutation<unknown, ICreateColumn>({
      query: (body) => ({
        url: `/columns`,
        method: "POST",
        credentials: "include",
        body,
      }),
      invalidatesTags: ["COLUMNS"],
    }),

    renameColumn: builder.mutation<unknown, IUpdateColumnTitle>({
      query: ({ id, title }) => ({
        url: `/column/${id}/rename`,
        method: "PATCH",
        credentials: "include",
        body: { title },
      }),
      invalidatesTags: ["COLUMNS"],
    }),

    moveColumn: builder.mutation<unknown, IMoveColumn>({
      query: ({ id, position }) => ({
        url: `/column/${id}/move`,
        method: "PATCH",
        credentials: "include",
        body: { position },
      }),
      invalidatesTags: ["COLUMNS"],
    }),

    deleteColumn: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/columns/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["COLUMNS"],
    }),
  }),
});
export const {
  useCreateColumnMutation,
  useDeleteColumnMutation,
  useGetColumnsByBoardIdQuery,
  useRenameColumnMutation,
  useMoveColumnMutation,
} = columnsService;
