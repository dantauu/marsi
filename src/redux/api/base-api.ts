import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import Cookies from "js-cookie"

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL || "http://localhost:9000/",
    prepareHeaders: (headers) => {
      const token = Cookies.get("jwt")
      if (token) headers.set("Authorization", `Bearer ${token}`)
      return headers
    },
  }),
  tagTypes: ["LikesToMe", "MyLikes"],
  endpoints: () => ({}),
})
