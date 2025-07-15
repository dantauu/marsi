import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type {
  FilteredUsers,
  UpdateUserData,
  User,
  UserInit,
} from "@/app/types/global.d.ts"

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL || "http://localhost:9000/",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void | Partial<FilteredUsers>>({
      query: (params) => ({
        url: "users",
        method: "GET",
        ...(params ? { params } : {}),
      }),
    }),
    initUser: builder.mutation<User, UserInit>({
      query: (userData) => ({
        url: "users/init",
        method: "POST",
        body: userData,
      }),
    }),
    updateUser: builder.mutation<UpdateUserData, Partial<UpdateUserData>>({
      query: (userData) => ({
        url: "users/update",
        method: "PATCH",
        body: userData,
      }),
    }),
    uploadPhoto: builder.mutation<string, File>({
      query: (file) => {
        const formData = new FormData()
        formData.append("files", file)
        return {
          url: "upload-photo",
          method: "POST",
          body: formData,
        }
      }
    })
  }),
})

export const { useGetUsersQuery, useInitUserMutation, useUpdateUserMutation, useUploadPhotoMutation } =
  userApi
