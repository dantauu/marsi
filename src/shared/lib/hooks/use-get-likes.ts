import { useCurrentUser } from "@/shared/lib/hooks/use-current-user.ts"
import { useGetLikesToMeQuery, useGetMyLikesQuery } from "@/shared/api/likes.ts"

export const useGetLikes = () => {
  const { userToken } = useCurrentUser()
  const userId = userToken?.userId
  const {
    data: likesToMe,
    isFetching: fetchingLikesToMe,
    isSuccess: successLikesToMe,
    isError: errorLikesToMe,
    isLoading: loadingLikesToMe,
  } = useGetLikesToMeQuery(userId ?? "", {
    skip: !userId,
  })
  const {
    data: myLikes,
    isFetching: fetchingMyLikes,
    isSuccess: successMyLikes,
    isError: errorMyLikes,
    isLoading: loadingMyLikes,
  } = useGetMyLikesQuery(userId ?? "", {
    skip: !userId,
  })
  return {
    likesToMe,
    fetchingLikesToMe,
    myLikes,
    fetchingMyLikes,
    successLikesToMe,
    errorLikesToMe,
    successMyLikes,
    errorMyLikes,
    loadingMyLikes,
    loadingLikesToMe,
  }
}
