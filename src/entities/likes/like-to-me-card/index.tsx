import { LikeCard } from "@/shared/ui/like-card"
import {
  useGetLikesToMeQuery,
  useUnlikeUserMutation,
} from "@/shared/api/user.ts"
import { useCurrentUser } from "@/lib/hooks/use-current-user.ts"
import LoadingBalls from "@/shared/ui/loading"g

export const LikesToMeCard = () => {
  const { user: currentUser, isLoading: userLoading } = useCurrentUser()
  const {
    data: users,
    isFetching,
    refetch,
  } = useGetLikesToMeQuery(currentUser?.id ?? "", {
    skip: !currentUser?.id,
  })
  const [unlikeUser, { isLoading: unlikeLoading }] = useUnlikeUserMutation()
  const handleUnlike = async (likerId: string) => {
    if (!currentUser?.id) return
    const scrollY = window.scrollY
    try {
      await unlikeUser({ likerId, likedId: currentUser?.id })
      await refetch()
      window.scrollTo({ top: scrollY })
    } catch (error) {
      console.error(error)
    }
  }

  if (userLoading || unlikeLoading || isFetching || !currentUser)
    return <LoadingBalls />
  return <LikeCard isMessage={true} users={users} onUnlike={handleUnlike} isLocked={false} />
}
