import type { User } from "@/app/types/user"
import { baseApi } from "@/redux/api/base-api.ts"

export const likesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    likeUser: builder.mutation<void, { likerId: string; likedId: string }>({
      query: ({ likedId, likerId }) => ({
        url: "likes",
        method: "POST",
        body: { likedId, likerId },
      }),
      invalidatesTags: (_result, _error, { likedId }) => [
        { type: "LikesToMe", id: likedId },
        { type: "Users" },
      ],
    }),
    dislikeUser: builder.mutation<
      void,
      { dislikerId: string; dislikedId: string }
    >({
      query: ({ dislikedId, dislikerId }) => ({
        url: "dislikes",
        method: "POST",
        body: { dislikedId, dislikerId },
      }),
      invalidatesTags: () => [
        { type: "Users" },
      ]
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
    unlikeIncomingUser: builder.mutation<
      void,
      { likerId: string; likedId: string }
    >({
      query: ({ likedId, likerId }) => ({
        url: "likes/incoming-unlike",
        method: "POST",
        body: { likedId, likerId },
      }),
      invalidatesTags: (_result, _error, { likedId }) => [
        { type: "LikesToMe", id: likedId },
      ],
    }),
    getMyLikes: builder.query<User[], string>({
      query: (userId) => `likes/mine?userId=${userId}`,
      providesTags: (_result, _error, userId) =>
        userId ? [{ type: "MyLikes", id: userId }] : [],
    }),
    getLikesToMe: builder.query<User[], string>({
      query: (userId) => `likes/who-liked-me?userId=${userId}`,
      providesTags: (_result, _error, userId) =>
        userId ? [{ type: "LikesToMe", id: userId }] : [],
    }),
  }),
})

export const {
  useLikeUserMutation,
  useDislikeUserMutation,
  useUnlikeUserMutation,
  useUnlikeIncomingUserMutation,
  useGetMyLikesQuery,
  useGetLikesToMeQuery,
} = likesApi
