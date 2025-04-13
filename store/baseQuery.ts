"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./index";
import { BaseApi } from "@/config";

const baseQueryWithReAuth = fetchBaseQuery({
  baseUrl: BaseApi,
  prepareHeaders: (headers, { getState }) => {
    const { access_token } = (getState() as RootState).auth;
    if (access_token) {
      headers.set("Authorization", `Bearer ${access_token}`);
    }
    return headers;
  },
});

export const BaseQueryParams = (reducerPath: string, tags: string[]) => {
  const baseQuery = createApi({
    baseQuery: baseQueryWithReAuth,
    endpoints: () => ({}),
    reducerPath,
    tagTypes: tags?.length ? tags : [],
  });

  return baseQuery;
};
