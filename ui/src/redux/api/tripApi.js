/** @format */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tripApi = createApi({
  reducerPath: "trip",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getAllTrip: builder.query({
      query: ({stratlte,stratgte,keyword}) => {
         let url;
        if(stratlte || stratgte || keyword){
           url = `/trips?keyword=${keyword}&startDate[gte]=${stratgte}&startDate[lte]=${stratlte}`
        }else{
            url = `/trips`
        }
        return {
          url,
          method: "GET",
        };
      },
    }),

    newTrip: builder.mutation({
      query: (body) => {
        return {
          url: "/trips",
          method: "POST",
          body,
        };
      },
    }),

    updateTrip: builder.mutation({
      query: ({body,id}) => {
      
        return {
          url: `/trips/${id}`,
          method: "PUT",
          body
        };
      },
    }),

    getTrip:builder.query({
      query:({id}) => {
        
        return {
          url: `/trips/${id}`,
          method: "GET",
        };
      },
    }),

    getMyTrip:builder.query({
      query:() => {
        return {
          url: `/trips/my`,
          method: "GET",
        };
      },
    }),

    getMostVisited:builder.query({
      query:() => {
        return {
          url: `/trips/most`,
          method: "GET",
        };
      },
    }),

    getMostActive:builder.query({
      query:() => {
        return {
          url: `/trips/active`,
          method: "GET",
        };
      },
    }),

    getMyTripAsMember:builder.query({
      query:() => {
        return {
          url: `/trips/members`,
          method: "GET",
        };
      },
    }),
    

    deleteTrip: builder.mutation({
      query: ({id}) => {
        return {
          url: `/trips/${id}`,
          method: "DELETE",
        };
      },
    }),

    // getTrip: builder.mutation({
    //   query: ({id}) => {
    //     return {
    //       url: `/trips/${id}`,
    //       method: "DELETE",
    //     };
    //   },
    // }),

    getProfile: builder.query({
      query: () => {
        return {
          url: "/me",
          method: "GET",
        };
      },
    }),

    newReview: builder.mutation({
      query: (body) => {
     
        
        return {
          url: "/review",
          method: "POST",
          body
        };
      },
    }),

    deleteReview: builder.mutation({
      query: ({id}) => {
        return {
          url: `/review/${id}`,
          method: "DELETE",
        };
      },
    }),
     
    getReview: builder.query({
      query: ({id}) => {
        return {
          url: `/review/${id}`,
          method: "GET",
        };
      },
    }),

  }),
});

export const {
  useGetAllTripQuery,
  useGetProfileQuery,
  useNewTripMutation,
  useUpdateTripMutation,
  useDeleteTripMutation,
  useGetTripQuery,
  useGetMyTripQuery,
  useGetMyTripAsMemberQuery,
  useNewReviewMutation,
  useDeleteReviewMutation,
  useGetReviewQuery,
  useGetMostActiveQuery,
  useGetMostVisitedQuery
} = tripApi;
