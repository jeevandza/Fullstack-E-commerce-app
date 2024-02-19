import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApiSlice = createApi({
  // reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4001/v1/auth" }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: () => "signup",
      method: "POST",
    }),
    login: builder.mutation({
      query: () => "login",
      method: "POST",
    }),
    getProfile: builder.query({
      query: () => "profile",
      method: "GET",
    }),
  }),
});

export const { useSignUpMutation, useGetProfileQuery, useLoginMutation } = authApiSlice;
