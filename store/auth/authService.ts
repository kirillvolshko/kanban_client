"use client";
import { BaseQueryParams } from "../baseQuery";

export const authService = BaseQueryParams("authUser", [
  "USER",
]).injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        credentials: "include",
        body,
      }),
      invalidatesTags: ["USER"],
    }),
    registration: builder.mutation({
      query: (body) => ({
        url: "/registration",
        method: "POST",
        credentials: "include",
        body,
      }),
      invalidatesTags: ["USER"],
    }),
    refresh: builder.query({
      query: () => ({
        url: "/refresh",
        method: "GET",
        credentials: "include",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});
export const {
  useRegistrationMutation,
  useLoginMutation,
  useRefreshQuery,
  useLogoutMutation,
} = authService;
