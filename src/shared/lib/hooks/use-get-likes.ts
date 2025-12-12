import { useCurrentUser } from "@/shared/lib/hooks/use-current-user.ts"
import { useGetLikesToMeQuery, useGetMyLikesQuery } from "@/shared/api/likes.ts"

export const useGetLikes = () => {
  const { userToken } = useCurrentUser()
  const userId = userToken?.userId
  const { data: likesToMe, isFetching: fetchingLikesToMe } =
    useGetLikesToMeQuery(userId ?? "", {
      skip: !userId,
    })
  const { data: myLikes, isFetching: fetchingMyLikes } = useGetMyLikesQuery(
    userId ?? "",
    {
      skip: !userId,
    }
  )
  return { likesToMe, fetchingLikesToMe, myLikes, fetchingMyLikes }
}
