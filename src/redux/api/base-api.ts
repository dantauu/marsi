import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000/", //import.meta.env.VITE_BASE_URL
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("jwt")
      if (token) headers.set("Authorization", `Bearer ${token}`)
      return headers
    },
  }),
  tagTypes: ["LikesToMe", "MyLikes"],
  endpoints: () => ({}),
})
