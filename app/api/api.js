import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import Cookies from "js-cookie";

const token = Cookies.get("token") || "";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
    prepareHeaders: (headers) => {
      if (token) headers.set("authorization", token);
      return headers;
    },
  }),
  tagTypes: ["User", "Review", "Details", "Order", "Product", "Category"],
  endpoints: (builder) => ({}),
});

export default apiSlice;
