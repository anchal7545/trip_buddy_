/** @format */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => {
        return {
          url: "/signup",
          method: "POST",
          body,
        };
      },
    }),
    login: builder.mutation({
      query: (body) => {
        return {
          url: "/login",
          method: "POST",
          body,
        };
      },
    }),

    forgot: builder.mutation({
      query: (body) => {
        return {
          url: "/forgot",
          method: "POST",
          body,
        };
      },
    }),
    reset: builder.mutation({
      query({ token, body }){
         return {
          url: `/resetpassword/${token}`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useForgotMutation ,useResetMutation} =
  authApi;
