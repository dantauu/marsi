import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { FilteredUsers, UserCard, UserInit } from "@/app/types/global.d.ts"

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
    initUser: builder.mutation<UserCard, UserInit>({
      query: (userData) => ({
        url: "users/init",
        method: "POST",
        body: userData
      })
    })
  }),
})

export const { useGetUsersQuery, useInitUserMutation } = userApi
