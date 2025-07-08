import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { FilteredUsers, UserCard } from "@/app/types/global.d.ts"

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL || "http://localhost:9000/",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<
      UserCard[],
      Partial<FilteredUsers>
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
