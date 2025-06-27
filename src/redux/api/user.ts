import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { CardProps } from "@/app/types/global.ts"

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000/",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<CardProps[], void>({ query: () => "users/all" }),
  }),
})

export const { useGetUsersQuery } = userApi
