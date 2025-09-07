import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL || "http://localhost:9000/",
  }),
  tagTypes: ["LikesToMe", "MyLikes"],
  endpoints: () => ({}),
})
