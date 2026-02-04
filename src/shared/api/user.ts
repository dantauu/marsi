import type { FilteredUsers } from "@/app/types/global.ts"
import type { User, UserInit, UpdateUserData } from "@/app/types/user.ts"
import { baseApi } from "@/redux/api/base-api.ts"

export type UploadPhotoResponse = {
  small: string
  medium: string
  large: string
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    authUser: builder.mutation<
      { access_token: string; user: User },
      { id: string }
    >({
      query: (initData) => ({
        method: "POST",
        url: "auth/user",
        body: initData,
      }),
    }),
    deleteUser: builder.mutation<unknown, string>({
      query: (id) => ({
        method: "DELETE",
        url: "users/delete-user",
        body: { id },
      }),
    }),
    getUsers: builder.query<User[], Partial<FilteredUsers> & { id?: string }>({
      query: ({ id, ...params }) => ({
        url: "users",
        method: "GET",
        params,
        headers: id ? { "x-user-id": id } : {},
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
    uploadPhoto: builder.mutation<UploadPhotoResponse, File | Blob>({
      query: (file) => {
        const formData = new FormData()
        formData.append("file", file)
        return {
          url: "upload-photo",
          method: "POST",
          body: formData,
        }
      },
      // transformResponse: (response: UploadPhotoResponse) => response.profile,
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
  useAuthUserMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useInitUserMutation,
  useUpdateUserMutation,
  useUploadPhotoMutation,
  useDeletePhotoMutation,
} = userApi
