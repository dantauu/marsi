import type { User } from "@/app/types/user.ts"
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
    }),
    unlikeUser: builder.mutation<void, { likerId: string; likedId: string }>({
      query: ({ likedId, likerId }) => ({
        url: "likes/unlike",
        method: "POST",
        body: { likedId, likerId },
      }),
      invalidatesTags: (_result, _error, { likerId }) => [
        { type: "MyLikes", id: likerId },
      ],
      async onQueryStarted({ likedId, likerId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          likesApi.util.updateQueryData("getMyLikes", likerId, (draft) => {
            const idx = draft.findIndex((u) => u.id === likedId)
            if (idx !== -1) draft.splice(idx, 1)
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
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
      async onQueryStarted({ likedId, likerId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          likesApi.util.updateQueryData("getLikesToMe", likedId, (draft) => {
            const idx = draft.findIndex((u) => u.id === likerId)
            if (idx !== -1) draft.splice(idx, 1)
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
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
