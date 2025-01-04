/** @format */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const groupApi = createApi({
  reducerPath: "group",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({

    getGroup: builder.query({
      query: ({id}) => {
        return {
          url: `/groups/${id}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 0,
    }),

    getGroupChats: builder.query({
      query: ({id}) => {
         return {
          url: `/groups/message/${id}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 0,
    }),


  }),
});

export const {
  useGetGroupQuery,
  useGetGroupChatsQuery
} = groupApi;
