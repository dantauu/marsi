import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { UserCard } from "@/app/types/global.ts"

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL || "http://localhost:9000/",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<
      UserCard[],
      Partial<{
        minAge: number
        maxAge: number
        minHeight: number
        maxHeight: number
        city: string
        gender: string
      }>
    >({
      query: (params) => ({
        url: "users",
        method: "GET",
        params,
      }),
    }),
  }),
})

export const { useGetUsersQuery } = userApi
