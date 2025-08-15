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
  tagTypes: ["LikesToMe"],
  endpoints: (builder) => ({
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
    likeUser: builder.mutation<void, { likerId: string; likedId: string }>({
      query: ({ likedId, likerId }) => ({
        url: "likes",
        method: "POST",
        body: { likedId, likerId },
      }),
      invalidatesTags: (_result, _error, { likedId }) => [
        { type: "LikesToMe", id: likedId },
      ],
    }),
    unlikeUser: builder.mutation<void, { likerId: string; likedId: string }>({
      query: ({ likedId, likerId }) => ({
        url: "likes/unlike",
        method: "POST",
        body: { likedId, likerId },
      }),
      invalidatesTags: (_result, _error, { likedId }) => [
        { type: "LikesToMe", id: likedId },
      ],
    }),
    getMyLikes: builder.query<User[], string>({
      query: (userId) => `likes/mine?userId=${userId}`,
    }),
    getLikesToMe: builder.query<User[], string>({
      query: (userId) => `likes/who-liked-me?userId=${userId}`,
      providesTags: (_result, _error, userId) =>
        userId ? [{ type: "LikesToMe", id: userId }] : [],
    }),
    uploadPhoto: builder.mutation<string, File | Blob>({
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
  useLikeUserMutation,
  useUnlikeUserMutation,
  useGetMyLikesQuery,
  useGetLikesToMeQuery,
  useUploadPhotoMutation,
  useDeletePhotoMutation,
} = userApi
