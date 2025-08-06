import { LikeCard } from "@/shared/ui/like-card"
import { useGetMyLikesQuery, useUnlikeUserMutation } from "@/shared/api/user.ts"
import { useCurrentUser } from "@/lib/hooks/use-current-user.ts"
import LoadingBalls from "@/shared/ui/loading"
import { MockCardData } from "@/lib/data/cards.ts"

export const MyLikesCard = () => {
  const { user: currentUser, isLoading: userLoading } = useCurrentUser()
  const {
    data: users,
    isFetching,
    refetch,
  } = useGetMyLikesQuery(currentUser?.id ?? "", {
    skip: !currentUser?.id,
  })
  const [unlikeUser, { isLoading: unlikeLoading }] = useUnlikeUserMutation()
  const handleUnlike = async (likedId: string) => {
    if (!currentUser?.id) return
    const scrollY = window.scrollY
    try {
      await unlikeUser({ likedId, likerId: currentUser?.id })
      await refetch()
      window.scrollTo({ top: scrollY })
    } catch (error) {
      console.error(error)
    }
  }
  if (!(userLoading || unlikeLoading || isFetching || !currentUser))
    return <LoadingBalls />
  return <LikeCard isMessage={false} users={MockCardData} onUnlike={handleUnlike} isLocked={false} />
}
