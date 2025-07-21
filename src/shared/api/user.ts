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
    getUsers: builder.query<User[], Partial<FilteredUsers>>({
      query: (params) => ({
        url: "users",
        method: "GET",
        params,
      }),
    }),
    getUserById: builder.query<User, string>({
      query: (id) => `users/user-id/${id}`,
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
        formData.append("file", file)
        return {
          url: "upload-photo",
          method: "POST",
          body: formData,
          responseHandler: (response) => response.text(),
        }
      },
    }),
    deletePhoto: builder.mutation<string, string>({
      query: (file) => ({
        url: `upload-photo?filename=${file}`,
        method: "DELETE",
        responseHandler: (response) => response.text(),
      }),
    }),
  }),
})

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useInitUserMutation,
  useUpdateUserMutation,
  useUploadPhotoMutation,
  useDeletePhotoMutation,
} = userApi
