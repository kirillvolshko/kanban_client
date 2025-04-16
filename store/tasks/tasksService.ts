"use client";
import { ICreateTask, IMoveTask, ITask, IUpdateTask } from "@/types/task";
import { BaseQueryParams } from "../baseQuery";

export const tasksService = BaseQueryParams("tasks", ["TASKS"]).injectEndpoints(
  {
    endpoints: (builder) => ({
      getTasksByColumn: builder.query<ITask[], string>({
        query: (columnId) => ({
          url: `/columns/${columnId}/tasks`,
          method: "GET",
          credentials: "include",
        }),
        providesTags: ["TASKS"],
      }),

      createTask: builder.mutation<unknown, ICreateTask>({
        query: (body) => ({
          url: `/tasks`,
          method: "POST",
          credentials: "include",
          body,
        }),
        invalidatesTags: ["TASKS"],
      }),

      updateTask: builder.mutation<unknown, { id: string; data: IUpdateTask }>({
        query: ({ id, data }) => ({
          url: `/tasks/${id}`,
          method: "PATCH",
          credentials: "include",
          body: data,
        }),
        invalidatesTags: ["TASKS"],
      }),

      moveTask: builder.mutation<{ message: string }, IMoveTask>({
        query: ({ id, position, column_id }) => ({
          url: `/tasks/${id}/move`,
          method: "PATCH",
          credentials: "include",
          body: { position, column_id },
        }),
        invalidatesTags: ["TASKS"],
      }),

      deleteTask: builder.mutation<{ message: string }, string>({
        query: (id) => ({
          url: `/tasks/${id}`,
          method: "DELETE",
          credentials: "include",
        }),
        invalidatesTags: ["TASKS"],
      }),
    }),
  }
);
export const {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useGetTasksByColumnQuery,
  useMoveTaskMutation,
} = tasksService;
