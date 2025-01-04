/** @format */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({

    getMyGroups: builder.query({
      query: () => {
        return {
          url: "/groups",
          method: "GET",
        };
      },
    }),

    searchUser: builder.query({
      query: (name) => {
        return {
          url: `/search?name=${name}`,
          method: "GET",
        };
      },
    }),

    sendRequest:builder.mutation({
       query:(body)=>{
           return{
              url: `/request/send`,
              method: "POST",
              body
           }
       }
    }),

    acceptRequest:builder.mutation({
      query:(body)=>{
          return{
             url: `/request/accept`,
             method: "PUT",
             body
          }
      }
    }),

    getAllNotification:builder.query({
      query:()=>{
          return{
             url: `/notifications`,
             method: "GET",
          }
      }
    }),

    uploadAvatar: builder.mutation({
      query: (body) => {
        return {
          url: `/avatar`,
          method: "PUT",
          body
        };
      },
    })

  }),
});

export const {
  useGetMyGroupsQuery,
  useLazySearchUserQuery,
  useSendRequestMutation,
  useAcceptRequestMutation,
  useGetAllNotificationQuery,
  useUploadAvatarMutation
} = userApi;
