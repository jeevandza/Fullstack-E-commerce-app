import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

 const productApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4001/v1/product" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "list",
      method: "GET",
    }),
  }),
});


export const { useGetProductsQuery } = productApiSlice
