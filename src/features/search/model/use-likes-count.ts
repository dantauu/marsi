import { useGetLikesToMeQuery } from "@/shared/api/likes.ts"
import { useCurrentUser } from "@/shared/lib/hooks/use-current-user.ts"

export const useLikesCount = () => {
  const { userToken } = useCurrentUser()

  const { data: countLikes } = useGetLikesToMeQuery(userToken?.userId ?? "", {
    skip: !userToken?.userId,
  })

  return { countLikes }
}
